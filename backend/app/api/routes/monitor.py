"""
Monitor API
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.device_health_monitor import device_health_monitor

router = APIRouter(
    prefix="/monitor",
    tags=["Monitor"],
)


@router.post("/check")
def check_devices(
    db: Session = Depends(get_db),
):

    return device_health_monitor.check_devices(db)