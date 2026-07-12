"""
Device Service

Business logic for device management.
"""

from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models import Device
from app.repositories.device_repository import DeviceRepository
from app.services.state_manager import state_manager


class DeviceService:

    def __init__(self):
        self.repository = DeviceRepository()

    # =====================================================
    # Process Telemetry
    # =====================================================

    def process_telemetry(
        self,
        db: Session,
        telemetry,
    ) -> Device:

        device = self.repository.get_by_device_id(
            db,
            telemetry.device_id,
        )

        if device is None:

            device = Device(
                device_id=telemetry.device_id,
                device_type="ARDUINO",
                temperature=telemetry.temperature,
                humidity=telemetry.humidity,
                gas_level=telemetry.gas_level,
                smoke_detected=telemetry.smoke_detected,
                battery_level=telemetry.battery_level,
                is_online=True,
                last_seen=datetime.now(timezone.utc),
            )

            return self.repository.create(
                db,
                device,
            )

        device.temperature = telemetry.temperature
        device.humidity = telemetry.humidity
        device.gas_level = telemetry.gas_level
        device.smoke_detected = telemetry.smoke_detected
        device.battery_level = telemetry.battery_level
        device.is_online = True
        device.last_seen = datetime.now(timezone.utc)

        return self.repository.update(
            db,
            device,
        )

    # =====================================================
    # Get Device
    # =====================================================

    def get_device(
        self,
        db: Session,
        device_id: str,
    ):

        return self.repository.get_by_device_id(
            db,
            device_id,
        )

    # =====================================================
    # Get All Devices
    # =====================================================

    def get_all_devices(
        self,
        db: Session,
    ):

        return self.repository.get_all(db)

    # =====================================================
    # Device History
    # =====================================================

    def get_device_history(
        self,
        device_id: str,
    ):

        return state_manager.get_history(device_id)


device_service = DeviceService()