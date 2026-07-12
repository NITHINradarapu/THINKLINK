"""
Device History Repository

Handles database operations for device telemetry history.
"""

from sqlalchemy.orm import Session

from app.models.device_history import DeviceHistory


class DeviceHistoryRepository:

    # ======================================================
    # Save History
    # ======================================================

    def create(
        self,
        db: Session,
        telemetry,
    ) -> DeviceHistory:

        history = DeviceHistory(

            device_id=telemetry.device_id,

            temperature=telemetry.temperature,

            humidity=telemetry.humidity,

            gas_level=telemetry.gas_level,

            smoke_detected=telemetry.smoke_detected,

            battery_level=telemetry.battery_level,

            vibration=getattr(telemetry, 'vibration', 0.0) or 0.0,

        )

        db.add(history)

        db.commit()

        db.refresh(history)

        return history

    # ======================================================
    # Get History By Device
    # ======================================================

    def get_by_device(
        self,
        db: Session,
        device_id: str,
        limit: int = 100,
    ) -> list[DeviceHistory]:

        return (

            db.query(DeviceHistory)

            .filter(
                DeviceHistory.device_id == device_id
            )

            .order_by(
                DeviceHistory.recorded_at.desc()
            )

            .limit(limit)

            .all()

        )


device_history_repository = DeviceHistoryRepository()