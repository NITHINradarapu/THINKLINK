"""
AI Analysis API

Receives any combination of:
- Telemetry
- Image
- Audio

Builds a multimodal request and forwards it
to the AI Gateway.
"""

import json
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.telemetry import TelemetryRequest
from app.services.multimodal_builder import multimodal_builder
from app.services.storage_service import storage_service
from app.services.upload_service import upload_service
from app.services.master_orchestrator_service import get_master_orchestrator

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.post(
    "/analyze",
    summary="Analyze Multimodal Input",
)
async def analyze(
    telemetry: str | None = Form(default=None),
    image: UploadFile | None = File(default=None),
    audio: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
):
    """
    Accepts any combination of:
    - Telemetry
    - Image
    - Audio

    Builds a standardized multimodal request, processes it via the Multi-Agent Swarm,
    and returns a formatted diagnosis.
    """

    try:

        telemetry_data = None
        image_data = None
        audio_data = None

        # ==========================================
        # Parse Telemetry
        # ==========================================

        if telemetry:

            telemetry_json = json.loads(telemetry)

            telemetry_data = TelemetryRequest(
                **telemetry_json
            )

        # ==========================================
        # Validate & Save Image
        # ==========================================

        if image:

            upload_service.validate_image(
                image
            )

            image_data = storage_service.save_image(
                image
            )

        # ==========================================
        # Validate & Save Audio
        # ==========================================

        if audio:

            upload_service.validate_audio(
                audio
            )

            audio_data = storage_service.save_audio(
                audio
            )

        # ==========================================
        # Build Multimodal Request
        # ==========================================

        request_payload = multimodal_builder.build(
            telemetry=telemetry_data,
            image=image_data,
            audio=audio_data,
        )

        # ==========================================
        # Send to AI Swarm (Master Orchestrator)
        # ==========================================
        
        # Determine payload type based on inputs
        if telemetry_data and (image_data or audio_data):
            payload_type = "combined"
            payload_data = {
                "telemetry": telemetry_data.model_dump(),
                "image": image_data,
                "audio": audio_data
            }
        elif image_data and audio_data:
            payload_type = "combined"
            payload_data = {
                "telemetry": None,
                "image": image_data,
                "audio": audio_data
            }
        elif telemetry_data:
            payload_type = "telemetry"
            payload_data = telemetry_data.model_dump()
        elif image_data:
            payload_type = "image"
            payload_data = image_data
        elif audio_data:
            payload_type = "audio"
            payload_data = audio_data
        else:
            raise HTTPException(
                status_code=400,
                detail="At least one input (telemetry, image, or audio) is required."
            )

        req_id = request_payload.get("request_id", f"REQ-{uuid4().hex[:8].upper()}")
        incoming_payload = {
            "request_id": req_id,
            "type": payload_type,
            "data": payload_data
        }

        from fastapi.concurrency import run_in_threadpool
        orchestrator = await run_in_threadpool(get_master_orchestrator)
        ai_result = await run_in_threadpool(orchestrator.process_factory_alert, incoming_payload)

        # ==========================================
        # Save Incident to DB if should_create is True
        # ==========================================
        if ai_result.get("success") and ai_result.get("incident", {}).get("should_create", False):
            from app.services.incident_service import incident_service
            from app.enums import IncidentSource, DeviceType
            
            db_telemetry = telemetry_data
            if not db_telemetry:
                db_telemetry = TelemetryRequest(
                    device_id="WORKER-REPORT",
                    temperature=0.0,
                    humidity=0.0,
                    gas_level=0.0,
                    smoke_detected=False,
                    battery_level=100
                )
                
            ai_bridge_result = {
                "risk_level": ai_result["overall_risk"].get("level", "MEDIUM"),
                "confidence_score": ai_result["overall_risk"].get("confidence", 85),
                "summary": ai_result.get("summary", "Analysis complete."),
                "reasoning": ai_result.get("reasoning", ""),
                "recommended_actions": ai_result.get("recommended_actions", []),
                "image_path": image_data,
                "audio_path": audio_data,
                "model": "Phi-3 (Swarm)",
                "request_id": req_id
            }
            
            incident = incident_service.create(
                db=db,
                telemetry=db_telemetry,
                ai_result=ai_bridge_result,
                source=IncidentSource.WORKER if (image_data or audio_data) else IncidentSource.ARDUINO,
                device_type=DeviceType.MOBILE if (image_data or audio_data) else DeviceType.ARDUINO,
                remarks=ai_result.get("summary", "")
            )
            
            # Broadcast the incident through WebSockets
            try:
                from app.services.websocket_manager import websocket_manager
                incident_dict = {
                    "incident_id": incident.incident_id,
                    "device_id": incident.device_id,
                    "device_type": incident.device_type.value if hasattr(incident.device_type, "value") else str(incident.device_type),
                    "risk_level": incident.risk_level.value if hasattr(incident.risk_level, "value") else str(incident.risk_level),
                    "summary": incident.summary,
                    "ai_reasoning": incident.ai_reasoning,
                    "confidence_score": float(incident.confidence_score),
                    "recommended_actions": incident.recommended_actions,
                    "sensor_snapshot": incident.sensor_snapshot,
                    "status": incident.status.value if hasattr(incident.status, "value") else str(incident.status),
                    "created_at": incident.created_at.isoformat() if hasattr(incident.created_at, "isoformat") else str(incident.created_at),
                }
                await websocket_manager.broadcast_incident(incident_dict)
            except Exception as ws_err:
                print(f"[WebSocket] Broadcast failed: {ws_err}")

        # Return Response
        return {
            "success": ai_result.get("success", False),
            "message": "Request processed successfully." if ai_result.get("success") else "AI analysis failed.",
            "request": request_payload,
            "ai_response": ai_result,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )