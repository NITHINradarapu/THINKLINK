"""
Dashboard Service

Provides dashboard statistics and summaries using both:
1. SQLite Database
2. Runtime Device State Manager
"""

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.enums import IncidentStatus, RiskLevel
from app.models import Device, Incident
from app.services.state_manager import state_manager


class DashboardService:

    # ======================================================
    # Dashboard Summary
    # ======================================================

    def get_summary(
        self,
        db: Session,
    ):

        total_devices = db.query(Device).count()

        online_devices = (
            db.query(Device)
            .filter(Device.is_online.is_(True))
            .count()
        )

        active_incidents = (
            db.query(Incident)
            .filter(
                Incident.status == IncidentStatus.ACTIVE
            )
            .count()
        )

        resolved_incidents = (
            db.query(Incident)
            .filter(
                Incident.status == IncidentStatus.RESOLVED
            )
            .count()
        )

        runtime = state_manager.statistics()

        return {

            "total_devices": total_devices,

            "online_devices": online_devices,

            "offline_devices": total_devices - online_devices,

            "healthy_devices": runtime["healthy"],

            "warning_devices": runtime["warning"],

            "critical_devices": runtime["critical"],

            "active_incidents": active_incidents,

            "resolved_incidents": resolved_incidents,

        }

    # ======================================================
    # Statistics
    # ======================================================

    def get_statistics(
        self,
        db: Session,
    ):

        devices = db.query(Device).all()

        avg_temp = 0
        avg_humidity = 0
        avg_gas = 0
        avg_battery = 0

        if devices:

            avg_temp = round(
                sum(d.temperature for d in devices) / len(devices),
                2,
            )

            avg_humidity = round(
                sum(d.humidity for d in devices) / len(devices),
                2,
            )

            avg_gas = round(
                sum(d.gas_level for d in devices) / len(devices),
                2,
            )

            avg_battery = round(
                sum(d.battery_level for d in devices) / len(devices),
                2,
            )

        return {

            "total_incidents": db.query(Incident).count(),

            "critical": db.query(Incident)
            .filter(
                Incident.risk_level == RiskLevel.CRITICAL
            )
            .count(),

            "high": db.query(Incident)
            .filter(
                Incident.risk_level == RiskLevel.HIGH
            )
            .count(),

            "medium": db.query(Incident)
            .filter(
                Incident.risk_level == RiskLevel.MEDIUM
            )
            .count(),

            "low": db.query(Incident)
            .filter(
                Incident.risk_level == RiskLevel.LOW
            )
            .count(),

            "average_temperature": avg_temp,

            "average_humidity": avg_humidity,

            "average_gas_level": avg_gas,

            "average_battery": avg_battery,

        }

    # ======================================================
    # Recent Incidents
    # ======================================================

    def get_recent_incidents(
        self,
        db: Session,
        limit: int = 10,
    ):

        return (

            db.query(Incident)

            .order_by(
                Incident.created_at.desc()
            )

            .limit(limit)

            .all()

        )

    # ======================================================
    # Device Status
    # ======================================================

    def get_device_status(
        self,
        db: Session,
    ):

        db_devices = db.query(Device).all()

        devices = []
        for d in db_devices:
            devices.append({
                "device_id": d.device_id,
                "device_type": d.device_type,
                "status": "online" if d.is_online else "offline",
                "last_seen": d.last_seen.isoformat() if d.last_seen else None,
                "battery_level": d.battery_level,
                "latest_telemetry": {
                    "temperature": d.temperature,
                    "humidity": d.humidity,
                    "gas_level": d.gas_level,
                    "smoke_detected": d.smoke_detected,
                    "battery_level": d.battery_level,
                },
            })

        return devices

    # ======================================================
    # Risk Distribution
    # ======================================================

    def get_risk_distribution(
        self,
        db: Session,
    ):

        rows = (

            db.query(

                Incident.risk_level,

                func.count(Incident.id),

            )

            .group_by(
                Incident.risk_level
            )

            .all()

        )

        distribution = {

            "LOW": 0,

            "MEDIUM": 0,

            "HIGH": 0,

            "CRITICAL": 0,

        }

        for level, count in rows:

            distribution[level.value] = count

        return distribution


dashboard_service = DashboardService()