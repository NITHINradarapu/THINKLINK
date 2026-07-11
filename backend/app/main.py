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

                # Dashboard updates expect JSON from Arduino, for example:
                # {"temperature":320,"sound":120,"flame_detected":0,"safety_breach":1}
                if raw_data.startswith("{") and raw_data.endswith("}"):
                    print(f"[Arduino Data] {raw_data}", flush=True)

                    # Broadcast to all locally tracked websocket clients
                    for client in list(arduino_clients):
                        try:
                            await client.send_text(raw_data)
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
