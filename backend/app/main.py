"""
ThinkLink Backend

Main FastAPI Application
"""

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
# Application Lifespan
# ======================================================

@asynccontextmanager
async def lifespan(app: FastAPI):

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
    try:
        while True:
            data = await websocket.receive_text()
            await websocket_manager.handle_message(websocket, data)
    except WebSocketDisconnect:
        websocket_manager.disconnect(websocket)



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