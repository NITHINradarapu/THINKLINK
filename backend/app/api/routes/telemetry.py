"""
Telemetry API

Receives telemetry from Arduino devices
and forwards it through the Gateway.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.telemetry import (
    TelemetryRequest,
    TelemetryResponse,
)
from app.services.gateway_service import gateway_service
from app.services.telemetry_pipeline import telemetry_pipeline

router = APIRouter(
    prefix="/telemetry",
    tags=["Telemetry"],
)


@router.post(
    "/",
    response_model=TelemetryResponse,
    summary="Receive telemetry",
)
async def receive_telemetry(
    telemetry: TelemetryRequest,
    db: Session = Depends(get_db),
):
    """
    Receive telemetry from Arduino.

    Flow:

    Validation
        ↓
    Normalization
        ↓
    Gateway
        ↓
    Telemetry Pipeline
    """

    try:

        telemetry = gateway_service.process(
            telemetry
        )

        result = await telemetry_pipeline.process(
            db=db,
            telemetry=telemetry,
        )

        return TelemetryResponse(
            success=result["success"],
            ai_triggered=result["ai_triggered"],
            risk_level=result["risk_level"],
            message=result.get(
                "summary",
                result.get(
                    "message",
                    "Telemetry processed successfully",
                ),
            ),
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )