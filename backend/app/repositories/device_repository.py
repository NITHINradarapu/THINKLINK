"""
Device Repository
Handles all database operations related to devices.
"""

from sqlalchemy.orm import Session

from app.models import Device


class DeviceRepository:

    @staticmethod
    def create(db: Session, device: Device) -> Device:
        """Create a new device."""
        db.add(device)
        db.commit()
        db.refresh(device)
        return device

    @staticmethod
    def get_by_device_id(db: Session, device_id: str) -> Device | None:
        """Get device by device ID."""
        return (
            db.query(Device)
            .filter(Device.device_id == device_id)
            .first()
        )

    @staticmethod
    def get_all(db: Session) -> list[Device]:
        """Get all registered devices."""
        return db.query(Device).all()

    @staticmethod
    def update(db: Session, device: Device) -> Device:
        """Update an existing device."""
        db.commit()
        db.refresh(device)
        return device

    @staticmethod
    def delete(db: Session, device: Device) -> None:
        """Delete a device."""
        db.delete(device)
        db.commit()