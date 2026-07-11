"""
Device Health Monitor

Checks whether devices are online or offline.
"""

from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models import Device


class DeviceHealthMonitor:

    OFFLINE_AFTER = 30

    def check_devices(
        self,
        db: Session,
    ):

        devices = db.query(Device).all()

        now = datetime.utcnow()

        updated = 0

        for device in devices:

            if now - device.last_seen > timedelta(seconds=self.OFFLINE_AFTER):

                if device.is_online:

                    device.is_online = False
                    updated += 1

            else:

                device.is_online = True

        db.commit()

        return {
            "checked": len(devices),
            "updated": updated,
        }


device_health_monitor = DeviceHealthMonitor()