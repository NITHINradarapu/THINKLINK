"""
ThinkLink Backend

Main FastAPI Application
"""

import asyncio
import os

import serial
from serial.tools import list_ports
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.services.websocket_manager import websocket_manager

# ======================================================
# API Routes
# ======================================================

from app.api.routes.ai import router as ai_router
from app.api.routes.dashboard import router as dashboard_router
from app.api.routes.devices import router as devices_router
from app.api.routes.health import router as health_router
from app.api.routes.incidents import router as incidents_router
from app.api.routes.metrics import router as metrics_router
from app.api.routes.monitor import router as monitor_router
from app.api.routes.notifications import router as notifications_router
from app.api.routes.report import router as report_router
from app.api.routes.telemetry import router as telemetry_router
from app.api.routes.trigger import router as trigger_router

# ======================================================
# Database
# ======================================================

from app.database.init_db import init_database
from app.database.session import SessionLocal

# ======================================================
# Services
# ======================================================

from app.services.system_log_service import system_log_service


# ======================================================
# Hardware Integration (Arduino)
# ======================================================

import json
from app.schemas.telemetry import TelemetryRequest
from app.services.telemetry_pipeline import telemetry_pipeline
from app.services.threshold_checker import ThresholdChecker
from app.services.action_executor import action_executor

# Change these in .env if your Arduino appears on a different COM port.
SERIAL_PORT = os.getenv("ARDUINO_SERIAL_PORT", "COM3")
BAUD_RATE = int(os.getenv("ARDUINO_BAUD_RATE", "9600"))
arduino = None

# Keep a local track of clients specifically for hardware broadcasts
arduino_clients = []

def available_serial_ports():
    ports = [f"{port.device} ({port.description})" for port in list_ports.comports()]
    return ", ".join(ports) if ports else "none detected"

try:
    arduino = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=0.1)
    arduino.reset_input_buffer()
    print(f"[Hardware] Connected to Arduino on {SERIAL_PORT} at {BAUD_RATE} baud", flush=True)
except Exception as e:
    print(f"[Warning] Could not connect to {SERIAL_PORT}: {e}", flush=True)
    print("[Warning] Close Arduino IDE Serial Monitor before starting the backend.", flush=True)
    print(f"[Warning] Available serial ports: {available_serial_ports()}", flush=True)

def control_buzzer(triggered: bool):
    global arduino
    if arduino:
        try:
            cmd = b"1" if triggered else b"0"
            arduino.write(cmd)
            print(f"[Hardware] Control Buzzer -> {'ON' if triggered else 'OFF'}", flush=True)
        except Exception as e:
            print(f"[Hardware] Error writing to serial: {e}", flush=True)

# Register Swarm action execution handlers with the system
def activate_buzzer_handler(db, incident):
    control_buzzer(True)
    print(f"[Hardware Action] Buzzer activated via AI Swarm recommended action", flush=True)

def deactivate_buzzer_handler(db, incident):
    control_buzzer(False)
    print(f"[Hardware Action] Buzzer deactivated via AI Swarm recommended action", flush=True)

def shutdown_machine_handler(db, incident):
    global arduino
    if arduino:
        try:
            arduino.write(b"2")
            print(f"[Hardware Action] Machine shutdown signal sent to Arduino", flush=True)
        except Exception as e:
            print(f"[Hardware Action] Error sending shutdown command: {e}", flush=True)

action_executor.register("activate_buzzer", activate_buzzer_handler)
action_executor.register("deactivate_buzzer", deactivate_buzzer_handler)
action_executor.register("shutdown_machine", shutdown_machine_handler)

async def read_serial_data():
    """Background task to read live Arduino telemetry and broadcast it"""
    while True:
        if not arduino:
            await asyncio.sleep(1)
            continue

        try:
            if arduino.in_waiting > 0:
                raw_data = arduino.readline().decode("utf-8", errors="replace").strip()

                if raw_data:
                    print(f"[Arduino Raw] {raw_data}", flush=True)

                # Dashboard updates expect JSON from Arduino
                if raw_data.startswith("{") and raw_data.endswith("}"):
                    print(f"[Arduino Data] {raw_data}", flush=True)
                    
                    try:
                        data_dict = json.loads(raw_data)
                    except json.JSONDecodeError as je:
                        print(f"[Hardware] JSON decode error: {je}", flush=True)
                        continue

                    # 1. Normalize fields to fit our TelemetryRequest schema
                    device_id = data_dict.get("device_id", data_dict.get("device", "ARDUINO-01"))
                    
                    temp_val = float(data_dict.get("temperature", data_dict.get("temp", 25.0)))
                    # Handle raw scaled ADC value if it represents e.g. 320 for 32.0°C
                    if temp_val > 150.0:
                        temp_val = temp_val / 10.0

                    gas_val = float(data_dict.get("gas_level", data_dict.get("gas", data_dict.get("sound", 120.0))))
                    
                    smoke_detected = bool(data_dict.get("smoke_detected", data_dict.get("smoke", False)))
                    if data_dict.get("flame_detected", 0) > 0 or data_dict.get("safety_breach", 0) > 0:
                        smoke_detected = True

                    humidity_val = float(data_dict.get("humidity", 50.0))
                    battery_val = int(data_dict.get("battery_level", data_dict.get("battery", 100)))
                    vibration_val = float(data_dict.get("vibration", 0.05))

                    telemetry_obj = TelemetryRequest(
                        device_id=device_id,
                        temperature=temp_val,
                        humidity=humidity_val,
                        gas_level=gas_val,
                        smoke_detected=smoke_detected,
                        battery_level=battery_val,
                        vibration=vibration_val
                    )

                    # 2. Process via TelemetryPipeline to trigger warnings, SQLite logging, and AI review if needed
                    db = SessionLocal()
                    try:
                        pipeline_result = await telemetry_pipeline.process(
                            db=db,
                            telemetry=telemetry_obj
                        )
                        print(f"[Telemetry Pipeline] Result: {pipeline_result}", flush=True)
                    except Exception as pe:
                        print(f"[Telemetry Pipeline] Error processing telemetry: {pe}", flush=True)
                    finally:
                        db.close()

                    # 3. Check thresholds locally for immediate buzzer control
                    checker_res = ThresholdChecker.check(telemetry_obj)
                    if checker_res["triggered"]:
                        control_buzzer(True)
                        print(f"[Hardware] Threshold crossed: {checker_res['reasons']}. Buzzer ACTIVATED.", flush=True)
                    else:
                        control_buzzer(False)

                    # 4. Broadcast the normalized telemetry payload to connected websocket clients
                    broadcast_payload = json.dumps({
                        "device_id": device_id,
                        "temperature": temp_val,
                        "humidity": humidity_val,
                        "gas": gas_val,
                        "smoke_detected": smoke_detected,
                        "battery_level": battery_val,
                        "vibration": vibration_val,
                        "buzzer_active": checker_res["triggered"]
                    })
                    for client in list(arduino_clients):
                        try:
                            await client.send_text(broadcast_payload)
                        except Exception:
                            pass
        except serial.SerialException as e:
            print(f"[Hardware] Serial read error: {e}", flush=True)
            await asyncio.sleep(1)
        except Exception as e:
            print(f"[Hardware] Error reading Arduino data: {e}", flush=True)
        
        await asyncio.sleep(0.05)


# ======================================================
# Application Lifespan
# ======================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Store the main running event loop for thread-safe websocket streaming
    from app.utils import loop as loop_module
    loop_module.main_loop = asyncio.get_running_loop()
    
    # Start the Arduino Serial Reader Task
    serial_task = asyncio.create_task(read_serial_data())

    db = SessionLocal()

    try:

        # Initialize Database
        init_database()

        # Log Startup
        system_log_service.info(

            db=db,

            module="Application",

            message="ThinkLink Backend Started",

        )

    finally:

        db.close()

    yield

    # Clean up hardware task and connection on shutdown
    serial_task.cancel()
    if arduino:
        arduino.close()

    db = SessionLocal()

    try:

        # Log Shutdown
        system_log_service.info(

            db=db,

            module="Application",

            message="ThinkLink Backend Stopped",

        )

    finally:

        db.close()


# ======================================================
# FastAPI Application
# ======================================================

app = FastAPI(

    title=settings.APP_NAME,

    version=settings.APP_VERSION,

    description="AI-powered Industrial Safety Monitoring Backend",

    debug=settings.DEBUG,

    lifespan=lifespan,

)


# ======================================================
# CORS Middleware
# ======================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ======================================================
# WebSocket Route
# ======================================================

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket_manager.connect(websocket)
    
    # Add client to our local hardware tracker
    arduino_clients.append(websocket)
    
    try:
        while True:
            data = await websocket.receive_text()
            
            # Let your existing manager handle the standard data
            await websocket_manager.handle_message(websocket, data)
            
            # --- ADDED ARDUINO TRIGGER ---
            # If the dashboard or AI sends '1' or '0', pass it directly to the physical hardware
            if arduino and data in ["0", "1"]:
                arduino.write(data.encode('utf-8'))
                print(f"[Hardware] Sent command {data} to Arduino")
                
    except WebSocketDisconnect:
        websocket_manager.disconnect(websocket)
        if websocket in arduino_clients:
            arduino_clients.remove(websocket)



# ======================================================
# Register Routes
# ======================================================

app.include_router(telemetry_router)

app.include_router(report_router)

app.include_router(trigger_router)

app.include_router(ai_router)

app.include_router(incidents_router)

app.include_router(dashboard_router)

app.include_router(devices_router)

app.include_router(notifications_router)

app.include_router(health_router)

app.include_router(monitor_router)

app.include_router(metrics_router)


# ======================================================
# Root Endpoint
# ======================================================

@app.get("/", tags=["Root"])
def root():

    return {

        "application": settings.APP_NAME,

        "version": settings.APP_VERSION,

        "environment": settings.ENVIRONMENT,

        "status": "Running",

        "docs": "/docs",

        "health": "/health",

    }


# ======================================================
# API Information
# ======================================================

@app.get("/info", tags=["Root"])
def info():

    return {

        "name": settings.APP_NAME,

        "version": settings.APP_VERSION,

        "environment": settings.ENVIRONMENT,

        "debug": settings.DEBUG,

        "api_docs": "/docs",

        "openapi": "/openapi.json",

    }
