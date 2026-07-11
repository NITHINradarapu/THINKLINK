"""
Device History Service

Business logic for device telemetry history.
"""

from sqlalchemy.orm import Session

from app.repositories.device_history_repository import (
    device_history_repository,
)


class DeviceHistoryService:

    # ======================================================
    # Save History
    # ======================================================

    def save(
        self,
        db: Session,
        telemetry,
    ):

        return device_history_repository.create(

            db,

            telemetry,

        )

    # ======================================================
    # Get Device History
    # ======================================================

    def get_history(
        self,
        db: Session,
        device_id: str,
        limit: int = 100,
    ):

        return device_history_repository.get_by_device(

            db,

            device_id,

            limit,

        )


device_history_service = DeviceHistoryService()