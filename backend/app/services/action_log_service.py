"""
Action Log Service

Records important backend actions.
"""

from sqlalchemy.orm import Session
from app.enums import ActionLogType
from app.models import ActionLog
from app.repositories.action_log_repository import (
    ActionLogRepository,
)

from app.utils.logger import (
    log_request,
    log_error,
)


class ActionLogService:

    def __init__(self):

        self.repository = ActionLogRepository()

    # =====================================================
    # Generic Logger
    # =====================================================

    def create(
        self,
        db: Session,
        request_id: str,
        action: ActionLogType,
        incident_id: int | None = None,
        device_id: str | None = None,
        status: str = "SUCCESS",
        performed_by: str = "SYSTEM",
        message: str | None = None,
    ) -> ActionLog:

        try:

            action_log = ActionLog(

                request_id=request_id,

                incident_id=incident_id,

                device_id=device_id,

                action=action,

                status=status,

                performed_by=performed_by,

                message=message,

            )

            action_log = self.repository.create(

                db,

                action_log,

            )

            log_request(

                request_id,

                f"{action.value} logged.",

            )

            return action_log

        except Exception as e:

            log_error(

                request_id,

                str(e),

            )

            raise

    # =====================================================
    # AI Triggered
    # =====================================================

    def ai_triggered(
        self,
        db: Session,
        request_id: str,
        device_id: str,
    ):

        return self.create(

            db=db,

            request_id=request_id,

            device_id=device_id,

            action=ActionLogType.AI_TRIGGERED,

            message="Supervisor AI triggered.",

        )

    # =====================================================
    # Incident Created
    # =====================================================

    def incident_created(
        self,
        db: Session,
        request_id: str,
        incident_id: int,
        device_id: str,
    ):

        return self.create(

            db=db,

            request_id=request_id,

            incident_id=incident_id,

            device_id=device_id,

            action=ActionLogType.INCIDENT_CREATED,

            message="Incident created successfully.",

        )

    # =====================================================
    # Notification Sent
    # =====================================================

    def notification_sent(
        self,
        db: Session,
        request_id: str,
        incident_id: int,
        device_id: str,
    ):

        return self.create(

            db=db,

            request_id=request_id,

            incident_id=incident_id,

            device_id=device_id,

            action=ActionLogType.NOTIFICATION_SENT,

            message="Notification delivered.",

        )

    # =====================================================
    # Notification Failed
    # =====================================================

    def notification_failed(
        self,
        db: Session,
        request_id: str,
        incident_id: int,
        device_id: str,
        reason: str,
    ):

        return self.create(

            db=db,

            request_id=request_id,

            incident_id=incident_id,

            device_id=device_id,

            action=ActionLogType.NOTIFICATION_FAILED,

            status="FAILED",

            message=reason,

        )

    # =====================================================
    # Incident Resolved
    # =====================================================

    def incident_resolved(
        self,
        db: Session,
        request_id: str,
        incident_id: int,
        device_id: str,
    ):

        return self.create(

            db=db,

            request_id=request_id,

            incident_id=incident_id,

            device_id=device_id,

            action=ActionLogType.INCIDENT_RESOLVED,

            message="Incident resolved.",

        )

    # =====================================================
    # Device Registered
    # =====================================================

    def device_registered(
        self,
        db: Session,
        request_id: str,
        device_id: str,
    ):

        return self.create(

            db=db,

            request_id=request_id,

            device_id=device_id,

            action=ActionLogType.DEVICE_REGISTERED,

            message="New device registered.",

        )

    # =====================================================
    # Device Updated
    # =====================================================

    def device_updated(
        self,
        db: Session,
        request_id: str,
        device_id: str,
    ):

        return self.create(

            db=db,

            request_id=request_id,

            device_id=device_id,

            action=ActionLogType.DEVICE_UPDATED,

            message="Device updated.",

        )


action_log_service = ActionLogService()