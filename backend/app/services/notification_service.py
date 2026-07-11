"""
Notification Service

Maintains the latest notification for the mobile app.
Logs notification events for auditing.
"""

from app.services.action_log_service import action_log_service
from app.utils.logger import (
    log_request,
    log_error,
)


class NotificationService:

    def __init__(self):

        self._latest_notification = None

    # ======================================================
    # Send Notification
    # ======================================================

    def send(
        self,
        db=None,
        incident=None,
    ):
        """
        Stores the latest notification.
        Future:
        - Firebase Push
        - WebSocket
        - MQTT
        """

        try:

            self._latest_notification = {

                "request_id": incident.request_id,

                "incident_id": incident.incident_id,

                "device_id": incident.device_id,

                "risk_level": incident.risk_level.value,

                "summary": incident.summary,

                "recommended_actions": incident.recommended_actions,

                "created_at": incident.created_at.isoformat(),

            }

            # ---------------------------------------------
            # Action Log
            # ---------------------------------------------

            if db is not None:

                action_log_service.notification_sent(

                    db=db,

                    request_id=incident.request_id,

                    incident_id=incident.id,

                    device_id=incident.device_id,

                )

            # ---------------------------------------------
            # Logger
            # ---------------------------------------------

            log_request(

                incident.request_id,

                "Notification sent successfully.",

            )

            return True

        except Exception as e:

            if db is not None:

                action_log_service.notification_failed(

                    db=db,

                    request_id=incident.request_id,

                    incident_id=incident.id,

                    device_id=incident.device_id,

                    reason=str(e),

                )

            log_error(

                incident.request_id,

                str(e),

            )

            return False

    # ======================================================
    # Latest Notification
    # ======================================================

    def get_latest(self):
        """
        Returns the latest notification.
        """

        return self._latest_notification

    # ======================================================
    # Clear Notification
    # ======================================================

    def clear(self):
        """
        Clears the latest notification.
        """

        self._latest_notification = None


notification_service = NotificationService()