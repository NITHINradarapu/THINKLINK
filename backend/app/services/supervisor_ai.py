"""
Supervisor AI

Coordinates communication between the telemetry pipeline
and the AI Bridge.
"""

from app.services.ai_bridge import ai_bridge


class SupervisorAI:
    """
    Supervises AI analysis and normalizes the response.
    """

    @staticmethod
    def analyze(
        telemetry,
        event: dict,
    ) -> dict:
        """
        Perform AI analysis.

        Parameters
        ----------
        telemetry
            Incoming telemetry object.

        event
            Rule engine / event detector output.
        """

        payload = {
            "device_id": telemetry.device_id,
            "temperature": telemetry.temperature,
            "humidity": telemetry.humidity,
            "gas_level": telemetry.gas_level,
            "smoke_detected": telemetry.smoke_detected,
            "battery_level": telemetry.battery_level,
            "risk_level": event["risk_level"].value,
            "priority": event["priority"],
            "score": event["score"],
            "reasons": event["reasons"],
        }

        result = ai_bridge.analyze(payload)

        return {
            "risk_level": result.get(
                "risk_level",
                event["risk_level"],
            ),
            "confidence_score": result.get(
                "confidence",
                event["confidence"],
            ),
            "summary": result.get(
                "summary",
                "AI analysis completed.",
            ),
            "reasoning": result.get(
                "reasoning",
                "",
            ),
            "recommended_actions": result.get(
                "recommended_actions",
                [],
            ),
        }


supervisor_ai = SupervisorAI()