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

from fastapi import (
    APIRouter,
    File,
    Form,
    HTTPException,
    UploadFile,
)

from app.schemas.telemetry import TelemetryRequest
from app.services.ai_gateway import ai_gateway
from app.services.multimodal_builder import multimodal_builder
from app.services.storage_service import storage_service
from app.services.upload_service import upload_service

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
):
    """
    Accepts any combination of:
    - Telemetry
    - Image
    - Audio

    Builds a standardized multimodal request and
    forwards it to the AI Service.
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

            await upload_service.validate_image(
                image
            )

            image_data = await storage_service.save_image(
                image
            )

        # ==========================================
        # Validate & Save Audio
        # ==========================================

        if audio:

            await upload_service.validate_audio(
                audio
            )

            audio_data = await storage_service.save_audio(
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
        # Send to AI
        # ==========================================

        ai_result = ai_gateway.analyze(
            request_payload
        )

        # ==========================================
        # Return Response
        # ==========================================

        return {
            "success": True,
            "message": "Request processed successfully.",
            "request": request_payload,
            "ai_response": ai_result,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )