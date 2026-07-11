"""
Health Service

Provides overall backend health information.
"""

import requests
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.enums import IncidentStatus
from app.models import Device, Incident
from app.utils.logger import logger


class HealthService:

    def __init__(self):

        # TODO:
        # Move to .env later
        self.ai_health_url = "http://localhost:9000/health"

        self.ai_timeout = 3

    # ======================================================
    # Database Health
    # ======================================================

    def _database_status(
        self,
        db: Session,
    ) -> str:

        try:

            db.execute(text("SELECT 1"))

            return "UP"

        except Exception as e:

            logger.exception(e)

            return "DOWN"

    # ======================================================
    # AI Service Health
    # ======================================================

    def _ai_status(self) -> str:

        try:

            response = requests.get(
                self.ai_health_url,
                timeout=self.ai_timeout,
            )

            if response.status_code == 200:

                return "UP"

            return "DOWN"

        except Exception:

            return "DOWN"

    # ======================================================
    # Device Statistics
    # ======================================================

    def _device_statistics(
        self,
        db: Session,
    ) -> dict:

        total_devices = db.query(Device).count()

        online_devices = (
            db.query(Device)
            .filter(Device.is_online.is_(True))
            .count()
        )

        return {

            "total": total_devices,

            "online": online_devices,

            "offline": total_devices - online_devices,

        }

    # ======================================================
    # Incident Statistics
    # ======================================================

    def _incident_statistics(
        self,
        db: Session,
    ) -> dict:

        active = (
            db.query(Incident)
            .filter(
                Incident.status == IncidentStatus.ACTIVE
            )
            .count()
        )

        resolved = (
            db.query(Incident)
            .filter(
                Incident.status == IncidentStatus.RESOLVED
            )
            .count()
        )

        total = db.query(Incident).count()

        return {

            "total": total,

            "active": active,

            "resolved": resolved,

        }

    # ======================================================
    # Overall Health
    # ======================================================

    def get_health(
        self,
        db: Session,
    ) -> dict:

        return {

            "status": "UP",

            "backend": {

                "status": "UP",

                "application": "ThinkLink Backend",

                "version": "1.0.0",

            },

            "database": {

                "status": self._database_status(db),

            },

            "ai_service": {

                "status": self._ai_status(),

            },

            "devices": self._device_statistics(db),

            "incidents": self._incident_statistics(db),

        }


health_service = HealthService()