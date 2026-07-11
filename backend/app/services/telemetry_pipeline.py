"""
Telemetry Pipeline Service

Coordinates the complete ThinkLink telemetry workflow.

Flow:

Telemetry
    ↓
Device Service
    ↓
State Manager
    ↓
Threshold Checker
    ↓
Rule Engine
    ↓
Event Detector
    ↓
Cooldown Manager
    ↓
Supervisor AI
    ↓
Incident Service
    ↓
Action Executor
    ↓
Notification Service
"""

from app.services.action_executor import ActionExecutor
from app.services.cooldown_manager import cooldown_manager
from app.services.device_service import DeviceService
from app.services.event_detector import EventDetector
from app.services.incident_service import IncidentService
from app.services.metrics_service import metrics_service
from app.services.notification_service import notification_service
from app.services.rule_engine import RuleEngine
from app.services.state_manager import state_manager
from app.services.supervisor_ai import supervisor_ai
from app.services.threshold_checker import ThresholdChecker
from app.services.websocket_manager import websocket_manager

from app.utils.logger import (
    log_request,
    log_error,
)


class TelemetryPipelineService:

    def __init__(self):

        self.device_service = DeviceService()

        self.incident_service = IncidentService()

        self.action_executor = ActionExecutor()

    # ======================================================
    # Main Pipeline
    # ======================================================

    async def process(
        self,
        db,
        telemetry,
    ):
        """
        Execute the complete telemetry workflow.
        """

        request_id = f"TEL-{telemetry.device_id}"

        try:

            log_request(
                request_id,
                "Telemetry pipeline started.",
            )

            # ======================================================
            # STEP 1 - Update Device Status
            # ======================================================

            self.device_service.process_telemetry(
                db=db,
                telemetry=telemetry,
            )

            metrics_service.telemetry()

            log_request(
                request_id,
                "Device status updated.",
            )

            # ======================================================
            # STEP 2 - Update Runtime State
            # ======================================================

            state_manager.update(
                telemetry.device_id,
                telemetry,
            )

            # Broadcast telemetry to WebSockets
            try:
                telemetry_dict = {
                    "temperature": telemetry.temperature,
                    "humidity": telemetry.humidity,
                    "gas": telemetry.gas_level,
                    "smoke_detected": telemetry.smoke_detected,
                    "battery_level": telemetry.battery_level,
                    "vibration": getattr(telemetry, "vibration", 0.05) or 0.05
                }
                await websocket_manager.broadcast_telemetry(telemetry_dict)
            except Exception as ws_err:
                log_error(request_id, f"WebSocket telemetry broadcast failed: {ws_err}")

            log_request(
                request_id,
                "Runtime state updated.",
            )

            # ======================================================
            # STEP 3 - Threshold Check
            # ======================================================

            threshold_result = ThresholdChecker.check(
                telemetry
            )

            log_request(
                request_id,
                "Threshold evaluation completed.",
            )

            # ======================================================
            # STEP 4 - Rule Engine
            # ======================================================

            rule_result = RuleEngine.evaluate(
                threshold_result
            )

            log_request(
                request_id,
                "Rule engine evaluation completed.",
            )

            # ======================================================
            # STEP 5 - Event Detection
            # ======================================================

            event = EventDetector.detect(
                rule_result
            )

            log_request(
                request_id,
                "Event detection completed.",
            )

            if not event["trigger_ai"]:

                log_request(
                    request_id,
                    "AI trigger not required.",
                )

                return {

                    "success": True,

                    "ai_triggered": False,

                    "risk_level": event["risk_level"].value,

                    "confidence": event["confidence"],

                    "message": event["message"],

                    "reasons": event["reasons"],

                }

            # ======================================================
            # STEP 6 - Cooldown Check
            # ======================================================

            if not cooldown_manager.can_trigger(
                telemetry.device_id
            ):

                log_request(
                    request_id,
                    "AI cooldown active.",
                )

                return {

                    "success": True,

                    "ai_triggered": False,

                    "risk_level": event["risk_level"].value,

                    "confidence": event["confidence"],

                    "message": "AI cooldown active.",

                    "reasons": event["reasons"],

                }

            # ======================================================
            # STEP 7 - Supervisor AI
            # ======================================================

            log_request(
                request_id,
                "Sending request to Supervisor AI.",
            )

            from fastapi.concurrency import run_in_threadpool
            ai_result = await run_in_threadpool(
                supervisor_ai.analyze,
                telemetry=telemetry,
                event=event,
            )

            metrics_service.ai()

            log_request(
                request_id,
                "Supervisor AI completed analysis.",
            )

            # ======================================================
            # STEP 8 - Create Incident
            # ======================================================

            incident = self.incident_service.create(

                db=db,

                telemetry=telemetry,

                ai_result=ai_result,

            )

            # Broadcast new incident and status to WebSockets
            try:
                incident_dict = {
                    "incident_id": incident.incident_id,
                    "device_id": incident.device_id,
                    "device_type": incident.device_type.value if hasattr(incident.device_type, "value") else str(incident.device_type),
                    "risk_level": incident.risk_level.value if hasattr(incident.risk_level, "value") else str(incident.risk_level),
                    "summary": incident.summary,
                    "ai_reasoning": incident.ai_reasoning,
                    "confidence_score": float(incident.confidence_score),
                    "recommended_actions": incident.recommended_actions,
                    "sensor_snapshot": incident.sensor_snapshot,
                    "status": incident.status.value if hasattr(incident.status, "value") else str(incident.status),
                    "created_at": incident.created_at.isoformat() if hasattr(incident.created_at, "isoformat") else str(incident.created_at),
                }
                await websocket_manager.broadcast_ai_status("analyzing", f"Active incident: {incident.summary}")
                await websocket_manager.broadcast_incident(incident_dict)
            except Exception as ws_err:
                log_error(request_id, f"WebSocket incident broadcast failed: {ws_err}")

            metrics_service.incident()

            log_request(
                request_id,
                f"Incident created: {incident.incident_id}",
            )

            # ======================================================
            # STEP 9 - Execute Actions
            # ======================================================

            self.action_executor.execute(

                db=db,

                incident=incident,

            )

            log_request(
                request_id,
                "Actions executed.",
            )

            # ======================================================
            # STEP 10 - Notifications
            # ======================================================

            notification_service.send(

                db=db,

                incident=incident,

            )

            metrics_service.notification()

            log_request(
                request_id,
                "Notification sent.",
            )

            # ======================================================
            # STEP 11 - Final Response
            # ======================================================

            log_request(
                request_id,
                "Telemetry pipeline completed successfully.",
            )

            return {

                "success": True,

                "ai_triggered": True,

                "incident_id": incident.incident_id,

                "risk_level": ai_result["risk_level"],

                "confidence": ai_result["confidence_score"],

                "summary": ai_result["summary"],

                "reasoning": ai_result["reasoning"],

                "recommended_actions": ai_result[
                    "recommended_actions"
                ],

            }

        except Exception as e:

            log_error(
                request_id,
                str(e),
            )

            raise


telemetry_pipeline = TelemetryPipelineService()