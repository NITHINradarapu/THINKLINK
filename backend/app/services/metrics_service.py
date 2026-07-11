"""
Runtime Metrics Service

Tracks backend runtime statistics.
"""

from datetime import datetime


class MetricsService:

    def __init__(self):

        self.started_at = datetime.utcnow()

        self.telemetry_received = 0

        self.ai_triggered = 0

        self.incidents_created = 0

        self.notifications_sent = 0

    # =====================================================
    # Telemetry
    # =====================================================

    def telemetry(self):

        self.telemetry_received += 1

    # =====================================================
    # AI
    # =====================================================

    def ai(self):

        self.ai_triggered += 1

    # =====================================================
    # Incident
    # =====================================================

    def incident(self):

        self.incidents_created += 1

    # =====================================================
    # Notification
    # =====================================================

    def notification(self):

        self.notifications_sent += 1

    # =====================================================
    # Statistics
    # =====================================================

    def summary(self):

        uptime = datetime.utcnow() - self.started_at

        return {

            "uptime_seconds": int(
                uptime.total_seconds()
            ),

            "telemetry_received": self.telemetry_received,

            "ai_triggered": self.ai_triggered,

            "incidents_created": self.incidents_created,

            "notifications_sent": self.notifications_sent,

        }


metrics_service = MetricsService()