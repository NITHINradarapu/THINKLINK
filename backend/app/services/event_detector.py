"""
Event Detector

Determines whether telemetry should continue
through the AI processing pipeline.
"""


class EventDetector:
    """
    Converts rule evaluation into an event object.
    """

    @staticmethod
    def detect(rule_result: dict) -> dict:
        """
        Decide whether an AI event should be generated.
        """

        trigger_ai = rule_result.get("trigger_ai", False)

        if not trigger_ai:

            return {
                "event_detected": False,
                "trigger_ai": False,
                "risk_level": rule_result["risk_level"],
                "priority": rule_result["priority"],
                "confidence": rule_result["confidence"],
                "score": rule_result["score"],
                "reasons": rule_result["reasons"],
                "message": "No AI analysis required",
            }

        return {
            "event_detected": True,
            "trigger_ai": True,
            "risk_level": rule_result["risk_level"],
            "priority": rule_result["priority"],
            "confidence": rule_result["confidence"],
            "score": rule_result["score"],
            "reasons": rule_result["reasons"],
            "message": "AI analysis required",
        }