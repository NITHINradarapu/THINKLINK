"""
Device Dashboard Service

Provides device information for the frontend.
"""

from sqlalchemy.orm import Session

from app.models import Device


class DeviceDashboardService:

    def get_all_devices(
        self,
        db: Session,
    ):
        return (
            db.query(Device)
            .order_by(Device.last_seen.desc())
            .all()
        )

    def get_device(
        self,
        db: Session,
        device_id: str,
    ):
        return (
            db.query(Device)
            .filter(Device.device_id == device_id)
            .first()
        )


device_dashboard_service = DeviceDashboardService()