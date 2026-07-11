"""
Rule Engine

Converts threshold evaluation into a risk assessment
and decides whether AI should be triggered.
"""

from app.enums import RiskLevel


class RuleEngine:

    @staticmethod
    def evaluate(threshold_result: dict) -> dict:
        """
        Evaluate threshold score and determine
        risk level + AI trigger.
        """

        score = threshold_result.get("score", 0)
        reasons = threshold_result.get("reasons", [])

        # -------------------------------------------------
        # LOW
        # -------------------------------------------------

        if score < 25:

            return {
                "risk_level": RiskLevel.LOW,
                "confidence": 100,
                "trigger_ai": False,
                "priority": 1,
                "score": score,
                "reasons": reasons,
            }

        # -------------------------------------------------
        # MEDIUM
        # -------------------------------------------------

        if score < 50:

            return {
                "risk_level": RiskLevel.MEDIUM,
                "confidence": 85,
                "trigger_ai": True,
                "priority": 2,
                "score": score,
                "reasons": reasons,
            }

        # -------------------------------------------------
        # HIGH
        # -------------------------------------------------

        if score < 75:

            return {
                "risk_level": RiskLevel.HIGH,
                "confidence": 92,
                "trigger_ai": True,
                "priority": 3,
                "score": score,
                "reasons": reasons,
            }

        # -------------------------------------------------
        # CRITICAL
        # -------------------------------------------------

        return {
            "risk_level": RiskLevel.CRITICAL,
            "confidence": 99,
            "trigger_ai": True,
            "priority": 4,
            "score": score,
            "reasons": reasons,
        }