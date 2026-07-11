"""
Device API

Provides device information and telemetry history.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.services.device_service import device_service
from app.services.device_history_service import (
    device_history_service,
)

router = APIRouter(
    prefix="/devices",
    tags=["Devices"],
)

# ======================================================
# Get All Devices
# ======================================================

@router.get("/")
def get_devices(
    db: Session = Depends(get_db),
):

    return device_service.get_all_devices(db)


# ======================================================
# Get Single Device
# ======================================================

@router.get("/{device_id}")
def get_device(
    device_id: str,
    db: Session = Depends(get_db),
):

    device = device_service.get_device(
        db,
        device_id,
    )

    if device is None:

        raise HTTPException(
            status_code=404,
            detail="Device not found",
        )

    return device


# ======================================================
# Device History
# ======================================================

@router.get("/{device_id}/history")
def get_device_history(
    device_id: str,
    limit: int = 100,
    db: Session = Depends(get_db),
):

    history = device_history_service.get_history(

        db=db,

        device_id=device_id,

        limit=limit,

    )

    return {

        "device_id": device_id,

        "history_count": len(history),

        "history": history,

    }