"""
Worker Report Service

Handles manual reports submitted from
the ThinkLink mobile application.

Workflow
--------
Worker
    ↓
Validate Uploads
    ↓
Store Files
    ↓
Fetch Device
    ↓
Build AI Payload
    ↓
Supervisor AI
    ↓
Create Incident
    ↓
Execute Actions
    ↓
Send Notification
"""

from sqlalchemy.orm import Session

from app.services.upload_service import upload_service
from app.services.storage_service import storage_service
from app.services.device_service import device_service
from app.services.supervisor_ai import supervisor_ai
from app.services.incident_service import incident_service
from app.services.notification_service import notification_service
from app.services.action_executor import ActionExecutor

from app.utils.logger import (
    log_request,
    log_error,
)


class ReportService:

    def __init__(self):

        self.action_executor = ActionExecutor()

    # =====================================================
    # Worker Report
    # =====================================================

    def create_report(
        self,
        db: Session,
        device_id: str,
        worker_id: str,
        image,
        audio=None,
        remarks=None,
    ):

        request_id = f"WRK-{device_id}"

        try:

            log_request(
                request_id,
                "Worker report received.",
            )

            # ===============================================
            # Validate Uploads
            # ===============================================

            upload_service.validate(
                image=image,
                audio=audio,
            )

            # ===============================================
            # Save Files
            # ===============================================

            image_path = storage_service.save_image(
                image
            )

            audio_path = None

            if audio:

                audio_path = storage_service.save_audio(
                    audio
                )

            log_request(
                request_id,
                "Files uploaded successfully.",
            )

            # ===============================================
            # Device
            # ===============================================

            device = device_service.get_by_device_id(
                db,
                device_id,
            )

            if device is None:

                raise Exception(
                    f"Device '{device_id}' not found."
                )

            # ===============================================
            # Latest Telemetry
            # ===============================================

            telemetry = {

                "device_id": device.device_id,

                "temperature": device.temperature,

                "humidity": device.humidity,

                "gas_level": device.gas_level,

                "battery_level": device.battery_level,

                "smoke_detected": False,

            }

            # ===============================================
            # AI Analysis
            # ===============================================

            ai_result = supervisor_ai.analyze(

                telemetry=telemetry,

                image_path=image_path,

                audio_path=audio_path,

                source="WORKER",

                worker_id=worker_id,

                remarks=remarks,

            )

            log_request(
                request_id,
                "AI analysis completed.",
            )

            # ===============================================
            # Create Incident
            # ===============================================

            incident = incident_service.create(

                db=db,

                telemetry=device,

                ai_result=ai_result,

            )

            log_request(
                request_id,
                f"Incident {incident.incident_id} created.",
            )

            # ===============================================
            # Execute Actions
            # ===============================================

            self.action_executor.execute(

                db=db,

                incident=incident,

            )

            # ===============================================
            # Send Notification
            # ===============================================

            notification_service.send(

                db=db,

                incident=incident,

            )

            log_request(
                request_id,
                "Worker report completed.",
            )

            return {

                "success": True,

                "incident_id": incident.incident_id,

                "risk_level": incident.risk_level.value,

                "summary": incident.summary,

                "notification_sent": True,

            }

        except Exception as e:

            log_error(
                request_id,
                str(e),
            )

            raise


report_service = ReportService()