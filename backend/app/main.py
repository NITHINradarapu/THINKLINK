"""
ThinkLink Backend

Main FastAPI Application
"""

import asyncio
import os
import threading
import time

import serial
from serial.tools import list_ports
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings
from app.services.websocket_manager import websocket_manager

from app.api.routes.database import router as database_router

# ======================================================
# API Routes
# ======================================================

from app.api.routes.ai import router as ai_router
from app.api.routes.ask import router as ask_router
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
buzzer_muted = False
last_process_time = 0.0


def available_serial_ports():
    ports = [f"{port.device} ({port.description})" for port in list_ports.comports()]
    return ", ".join(ports) if ports else "none detected"

def connect_arduino():
    global arduino
    if arduino:
        try:
            arduino.close()
        except:
            pass
        arduino = None
    try:
        arduino = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=0.1)
        arduino.reset_input_buffer()
        print(f"[Hardware] Connected to Arduino on {SERIAL_PORT} at {BAUD_RATE} baud", flush=True)
        websocket_manager.connections_status["arduino"] = True
        return True
    except Exception as e:
        print(f"[Warning] Could not connect to {SERIAL_PORT}: {e}", flush=True)
        print(f"[Warning] Available serial ports: {available_serial_ports()}", flush=True)
        websocket_manager.connections_status["arduino"] = False
        return False

# Initial connection attempt
connect_arduino()

def control_system_state(has_errors: bool):
    global arduino, buzzer_muted
    if arduino:
        try:
            if has_errors:
                # If buzzer is manually muted, write b"0" to buzzer (silent) but b"R" to LED (Red warning)
                if buzzer_muted:
                    arduino.write(b"0")
                    print(f"[Hardware] Control System State -> ALERT (Buzzer MUTED/OFF, Red LED ON, Green LED OFF)", flush=True)
                else:
                    arduino.write(b"1")
                    print(f"[Hardware] Control System State -> ALERT (Buzzer ON, Red LED ON, Green LED OFF)", flush=True)
                arduino.write(b"R")
            else:
                # Send '0' for normal, and 'G' for Green LED (system fine)
                arduino.write(b"0")
                arduino.write(b"G")
                # Reset the manual buzzer mute state once everything is nominal
                buzzer_muted = False
                print(f"[Hardware] Control System State -> FINE (Buzzer OFF, Green LED ON, Red LED OFF, Mute Reset)", flush=True)
        except Exception as e:
            print(f"[Hardware] Error writing to serial: {e}", flush=True)

# Register Swarm action execution handlers with the system
def activate_buzzer_handler(db, incident):
    control_system_state(True)
    print(f"[Hardware Action] Buzzer activated via AI Swarm recommended action", flush=True)

def deactivate_buzzer_handler(db, incident):
    control_system_state(False)
    print(f"[Hardware Action] Buzzer deactivated via AI Swarm recommended action", flush=True)

def activate_led_handler(db, incident):
    control_system_state(True)
    print(f"[Hardware Action] LED set to RED via AI Swarm recommended action", flush=True)

def deactivate_led_handler(db, incident):
    control_system_state(False)
    print(f"[Hardware Action] LED set to GREEN via AI Swarm recommended action", flush=True)

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
action_executor.register("activate_led", activate_led_handler)
action_executor.register("deactivate_led", deactivate_led_handler)
action_executor.register("shutdown_machine", shutdown_machine_handler)

async def handle_serial_disconnect():
    if websocket_manager.connections_status.get("arduino", False):
        websocket_manager.connections_status["arduino"] = False
        await websocket_manager.broadcast({
            "type": "connections",
            "data": websocket_manager.connections_status
        })
        print("[Hardware] Arduino flagged offline and broadcasted.", flush=True)

async def process_arduino_payload(raw_data: str):
    import json
    try:
        data_dict = json.loads(raw_data)
    except json.JSONDecodeError as je:
        print(f"[Hardware] JSON decode error: {je}", flush=True)
        return

    # 1. Normalize fields to fit our TelemetryRequest schema (robust checking for all sensor variations)
    device_id = data_dict.get("device_id", data_dict.get("device", "ARDUINO-01"))
    
    # Temperature
    temp_val = float(data_dict.get("temperature", data_dict.get("temp", 25.0)))
    # Handle raw scaled ADC value if it represents e.g. 320 for 32.0°C
    if temp_val > 150.0:
        temp_val = temp_val / 10.0

    # Gas / Smoke / Sound / MQ sensor
    gas_val = float(data_dict.get("gas_level", data_dict.get("gas", data_dict.get("sound", 120.0))))
    
    # Smoke / Flame / Fire / Safety breach binary alerts
    smoke_detected = bool(data_dict.get("smoke_detected", data_dict.get("smoke", False)))
    if (data_dict.get("flame_detected", 0) > 0 or 
        data_dict.get("safety_breach", 1) == 0 or 
        data_dict.get("flame", False) or 
        data_dict.get("fire", False)):
        smoke_detected = True

    # Humidity
    humidity_val = float(data_dict.get("humidity", data_dict.get("hum", 50.0)))
    
    # Battery
    battery_val = int(data_dict.get("battery_level", data_dict.get("battery", 100)))
    
    # Vibration / Sound / Motion anomalies
    vibration_val = float(data_dict.get("vibration", data_dict.get("vib", 0.05)))
    if "sound" in data_dict and "vibration" not in data_dict:
        vibration_val = float(data_dict["sound"]) / 1000.0
    if data_dict.get("motion", False) or data_dict.get("movement", False):
        vibration_val = max(vibration_val, 0.8)

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

        # Auto-broadcast reconnect updates if Arduino was previously flagged offline
        if not websocket_manager.connections_status.get("arduino", False):
            websocket_manager.connections_status["arduino"] = True
            await websocket_manager.broadcast({
                "type": "connections",
                "data": websocket_manager.connections_status
            })
            print(f"[Hardware] Arduino connection re-established and broadcasted.", flush=True)
    except Exception as pe:
        print(f"[Telemetry Pipeline] Error processing telemetry: {pe}", flush=True)
    finally:
        db.close()

    # 3. Check thresholds locally for immediate buzzer and LED control
    checker_res = ThresholdChecker.check(telemetry_obj)
    if checker_res["triggered"]:
        control_system_state(True)
        print(f"[Hardware] Threshold crossed: {checker_res['reasons']}. Alarm status: ACTIVE.", flush=True)
    else:
        control_system_state(False)

    # 4. Broadcast the normalized telemetry payload to all connected websocket clients via manager
    telemetry_broadcast = {
        "device_id": device_id,
        "temperature": temp_val,
        "humidity": humidity_val,
        "gas": gas_val,
        "gas_level": gas_val,
        "smoke_detected": smoke_detected,
        "battery_level": battery_val,
        "vibration": vibration_val,
        "buzzer_active": checker_res["triggered"],
        "led_red_active": checker_res["triggered"]
    }
    await websocket_manager.broadcast_telemetry(telemetry_broadcast)

def read_serial_data_sync():
    """Background thread function to read live Arduino telemetry synchronously without blocking FastAPI's event loop"""
    import json
    from app.utils import loop as loop_module
    global last_process_time

    print("[Hardware Thread] Serial reader thread started.", flush=True)
    
    while True:
        if not arduino:
            time.sleep(1)
            continue

        try:
            if arduino.in_waiting > 0:
                raw_data = arduino.readline().decode("utf-8", errors="replace").strip()

                if raw_data.startswith("{") and raw_data.endswith("}"):
                    current_time = time.time()
                    # Only process telemetry if at least 2.0 seconds have elapsed since the last processing
                    if current_time - last_process_time >= 2.0:
                        last_process_time = current_time
                        print(f"[Arduino Raw Thread] {raw_data}", flush=True)
                        # Schedule payload processing back onto the main event loop thread-safely
                        if loop_module.main_loop:
                            asyncio.run_coroutine_threadsafe(
                                process_arduino_payload(raw_data),
                                loop_module.main_loop
                            )
        except serial.SerialException as e:
            print(f"[Hardware Thread] Serial read error: {e}", flush=True)
            if loop_module.main_loop:
                asyncio.run_coroutine_threadsafe(
                    handle_serial_disconnect(),
                    loop_module.main_loop
                )
            time.sleep(1)
        except Exception as e:
            print(f"[Hardware Thread] Error reading Arduino data: {e}", flush=True)
        
        time.sleep(0.05)

async def run_device_health_monitor():
    """Background task to run the device health check periodically and notify clients of changes"""
    from app.services.device_health_monitor import device_health_monitor
    from app.models import Device
    
    print("[Health Monitor] Device health monitor background task started.", flush=True)
    
    while True:
        await asyncio.sleep(5)
        db = SessionLocal()
        try:
            res = device_health_monitor.check_devices(db)
            if res.get("updated", 0) > 0 or not websocket_manager.connections_status.get("pc", False):
                # Fetch latest online statuses from database
                devices = db.query(Device).all()
                arduino_online = websocket_manager.connections_status.get("arduino", False)
                glasses_online = False
                
                for d in devices:
                    dev_lower = d.device_id.lower()
                    # Skip test/simulation devices — they should not affect real connection status
                    if dev_lower.startswith("test-"):
                        continue
                    if "arduino" in dev_lower:
                        # OR logic: online if ANY real Arduino device is online
                        arduino_online = arduino_online or d.is_online
                    elif "glasses" in dev_lower or "meta" in dev_lower:
                        glasses_online = glasses_online or d.is_online
                
                new_status = {
                    "pc": True,
                    "arduino": arduino_online,
                    "glasses": glasses_online,
                }
                
                # Check if connection state changed before broadcasting
                if new_status != websocket_manager.connections_status:
                    websocket_manager.connections_status = new_status
                    await websocket_manager.broadcast({
                        "type": "connections",
                        "data": new_status
                    })
                    print(f"[Health Monitor] Connections status updated & broadcasted: {new_status}", flush=True)
        except Exception as e:
            print(f"[Health Monitor] Error checking device health: {e}", flush=True)
        finally:
            db.close()


# ======================================================
# Application Lifespan
# ======================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Store the main running event loop for thread-safe websocket streaming
    from app.utils import loop as loop_module
    loop_module.main_loop = asyncio.get_running_loop()
    
    # Start the Arduino Serial Reader Thread (daemonized to prevent hanging event loop)
    serial_thread = threading.Thread(target=read_serial_data_sync, daemon=True)
    serial_thread.start()
    
    # Start the Device Health Monitor Task
    health_task = asyncio.create_task(run_device_health_monitor())

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

    # Clean up hardware tasks and connection on shutdown
    health_task.cancel()
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

    title=settings.app_name,

    version=settings.app_version,

    description="AI-powered Industrial Safety Monitoring Backend",

    debug=settings.debug,

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
    
    try:
        while True:
            data = await websocket.receive_text()
            
            # Let websocket_manager handle standard messages (control_actuator etc.)
            await websocket_manager.handle_message(websocket, data)
            
            # Parse control_actuator message to synchronize with physical Arduino serial commands
            try:
                payload = json.loads(data)
                if payload.get("type") == "control_actuator":
                    msg_data = payload.get("data", {})
                    key = msg_data.get("key")
                    value = bool(msg_data.get("value"))
                    
                    global buzzer_muted
                    if key == "buzzer":
                        if value:
                            # User manually enables buzzer: clear muting, sound alarm, turn on Red LED
                            buzzer_muted = False
                            if arduino:
                                arduino.write(b"1")
                                arduino.write(b"R")
                            print("[Hardware Override] Buzzer manual ON, Red LED ON", flush=True)
                        else:
                            # User manually silences buzzer: set mute flag, write b"0" to Arduino
                            buzzer_muted = True
                            if arduino:
                                arduino.write(b"0")
                            print("[Hardware Override] Buzzer manual OFF (MUTED)", flush=True)
                    elif key == "led":
                        if arduino:
                            if value:
                                arduino.write(b"R")
                            else:
                                arduino.write(b"G")
                        print(f"[Hardware Override] LED set to {'RED' if value else 'GREEN'}", flush=True)
                    elif key == "relay":
                        if arduino:
                            if value:
                                arduino.write(b"2")
                            else:
                                arduino.write(b"3")
                        print(f"[Hardware Override] Emergency isolation relay set to {'ON (Shutdown)' if value else 'OFF (Nominal)'}", flush=True)
            except Exception as e:
                # Fallback to check raw legacy data bytes
                if arduino and data in ["0", "1"]:
                    arduino.write(data.encode('utf-8'))
                    print(f"[Hardware] Sent raw command {data} to Arduino")
                
    except WebSocketDisconnect:
        websocket_manager.disconnect(websocket)



# ======================================================
# Register Routes
# ======================================================

app.include_router(telemetry_router)

app.include_router(report_router)

app.include_router(trigger_router)

app.include_router(ai_router)
app.include_router(ask_router)

app.include_router(incidents_router)

app.include_router(dashboard_router)

app.include_router(devices_router)

app.include_router(notifications_router)

app.include_router(health_router)

app.include_router(monitor_router)

app.include_router(metrics_router)
app.include_router(database_router)


# ======================================================
# Root Endpoint
# ======================================================

@app.get("/", tags=["Root"])
def root():

    return {

        "application": settings.app_name,

        "version": settings.app_version,

        "environment": settings.environment,

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

        "name": settings.app_name,

        "version": settings.app_version,

        "environment": settings.environment,

        "debug": settings.debug,

        "api_docs": "/docs",

        "openapi": "/openapi.json",

    }
