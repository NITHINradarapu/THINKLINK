"""
Supervisor AI

Coordinates communication between the telemetry pipeline
and the Multi-Agent Swarm.
"""

from uuid import uuid4
from app.services.master_orchestrator_service import get_master_orchestrator


class SupervisorAI:
    """
    Supervises AI analysis and normalizes the response.
    """

    @staticmethod
    def analyze(
        telemetry,
        event: dict = None,
        **kwargs,
    ) -> dict:
        """
        Perform AI analysis.

        Parameters
        ----------
        telemetry
            Incoming telemetry object or dictionary.

        event
            Rule engine / event detector output.
        """
        def get_val(obj, key, default):
            if isinstance(obj, dict):
                return obj.get(key, default)
            return getattr(obj, key, default)

        telemetry_data = {
            "device_id": get_val(telemetry, "device_id", "TEST-ARDUINO-01"),
            "temperature": get_val(telemetry, "temperature", 23.5),
            "humidity": get_val(telemetry, "humidity", 48.0),
            "gas_level": get_val(telemetry, "gas_level", 110.0),
            "smoke_detected": get_val(telemetry, "smoke_detected", False),
            "battery_level": get_val(telemetry, "battery_level", 98),
        }

        # Fallback values if event is missing
        event_risk_level = "WARNING"
        event_confidence = 80
        if event and isinstance(event, dict):
            rl = event.get("risk_level")
            if rl:
                event_risk_level = getattr(rl, "value", rl)
            event_confidence = event.get("confidence", 80)

        req_id = f"REQ-{uuid4().hex[:8].upper()}"
        image_path = kwargs.get("image_path")
        audio_path = kwargs.get("audio_path")
        remarks = kwargs.get("remarks")
        source = kwargs.get("source")

        if remarks:
            telemetry_data["remarks"] = remarks
        if source:
            telemetry_data["source"] = source

        if image_path or audio_path:
            payload_type = "combined"
            payload_data = {
                "telemetry": telemetry_data,
                "image": image_path,
                "audio": audio_path,
            }
        else:
            payload_type = "telemetry"
            payload_data = telemetry_data

        incoming_payload = {
            "request_id": req_id,
            "type": payload_type,
            "data": payload_data
        }

        try:
            orchestrator = get_master_orchestrator()
            result = orchestrator.process_factory_alert(incoming_payload)
            
            if result.get("success"):
                return {
                    "risk_level": result["overall_risk"].get("level", event_risk_level),
                    "confidence_score": result["overall_risk"].get("confidence", event_confidence),
                    "summary": result.get("summary", "AI analysis completed."),
                    "reasoning": result.get("reasoning", ""),
                    "recommended_actions": result.get("recommended_actions", []),
                }
            else:
                return {
                    "risk_level": event_risk_level,
                    "confidence_score": event_confidence,
                    "summary": "AI analysis failed.",
                    "reasoning": result.get("error", {}).get("message", "Swarm processing error"),
                    "recommended_actions": ["notify_mobile"],
                }
        except Exception as e:
            return {
                "risk_level": event_risk_level,
                "confidence_score": event_confidence,
                "summary": "AI analysis error.",
                "reasoning": str(e),
                "recommended_actions": ["notify_mobile"],
            }


supervisor_ai = SupervisorAI()