"""
Incident Service

Business logic for AI-generated incidents.
Supports both Arduino-generated and Worker-generated incidents.
"""

from uuid import uuid4

from sqlalchemy.orm import Session

from app.enums import (
    DeviceType,
    IncidentSource,
    IncidentStatus,
    RiskLevel,
)

from app.models.incident import Incident

from app.repositories.incident_repository import (
    incident_repository,
)

from app.services.action_log_service import (
    action_log_service,
)

from app.utils.logger import (
    log_request,
    log_error,
)


class IncidentService:

    def __init__(self):

        self.repository = incident_repository

    # ==========================================================
    # Create Incident
    # ==========================================================

    def create(
        self,
        db: Session,
        telemetry,
        ai_result: dict,
        source: IncidentSource = IncidentSource.ARDUINO,
        worker_id: str | None = None,
        remarks: str | None = None,
        device_type: DeviceType = DeviceType.ARDUINO,
    ) -> Incident:

        request_id = ai_result.get(
            "request_id",
            f"REQ-{uuid4().hex[:8].upper()}",
        )

        try:

            log_request(
                request_id,
                "Creating incident.",
            )

            incident = Incident(

                # ==================================================
                # IDs
                # ==================================================

                incident_id=f"INC-{uuid4().hex[:8].upper()}",

                request_id=request_id,

                # ==================================================
                # Device
                # ==================================================

                device_id=telemetry.device_id,

                device_type=device_type,

                # ==================================================
                # Source
                # ==================================================

                source=source,

                worker_id=worker_id,

                remarks=remarks,

                # ==================================================
                # AI Decision
                # ==================================================

                risk_level=RiskLevel(
                    ai_result.get(
                        "risk_level",
                        "LOW",
                    )
                ),

                confidence_score=ai_result.get(
                    "confidence_score",
                    0.0,
                ),

                summary=ai_result.get(
                    "summary",
                    "No summary available.",
                ),

                ai_reasoning=ai_result.get(
                    "reasoning",
                    "",
                ),

                recommended_actions=ai_result.get(
                    "recommended_actions",
                    [],
                ),

                # ==================================================
                # Evidence
                # ==================================================

                image_path=ai_result.get(
                    "image_path",
                ),

                audio_path=ai_result.get(
                    "audio_path",
                ),

                has_image=(
                    ai_result.get("image_path")
                    is not None
                ),

                has_audio=(
                    ai_result.get("audio_path")
                    is not None
                ),

                # ==================================================
                # AI Metadata
                # ==================================================

                ai_model=ai_result.get(
                    "model",
                ),

                processing_time_ms=ai_result.get(
                    "processing_time_ms",
                ),

                # ==================================================
                # Telemetry Snapshot
                # ==================================================

                sensor_snapshot={

                    "temperature": getattr(
                        telemetry,
                        "temperature",
                        None,
                    ),

                    "humidity": getattr(
                        telemetry,
                        "humidity",
                        None,
                    ),

                    "gas_level": getattr(
                        telemetry,
                        "gas_level",
                        None,
                    ),

                    "smoke_detected": getattr(
                        telemetry,
                        "smoke_detected",
                        False,
                    ),

                    "battery_level": getattr(
                        telemetry,
                        "battery_level",
                        None,
                    ),

                },

                # ==================================================
                # Status
                # ==================================================

                status=IncidentStatus.ACTIVE,

            )

            incident = self.repository.create(
                db,
                incident,
            )

            # ==================================================
            # Action Log
            # ==================================================

            action_log_service.incident_created(

                db=db,

                request_id=request_id,

                incident_id=incident.id,

                device_id=incident.device_id,

            )

            log_request(

                request_id,

                f"Incident {incident.incident_id} created successfully.",

            )

            return incident

        except Exception as e:

            log_error(
                request_id,
                str(e),
            )

            raise

    # ==========================================================
    # Get All Incidents
    # ==========================================================

    def get_all(
        self,
        db: Session,
    ):

        return self.repository.get_all(
            db,
        )

    # ==========================================================
    # Get Active Incidents
    # ==========================================================

    def get_active(
        self,
        db: Session,
    ):

        return self.repository.get_active_incidents(
            db,
        )

    # ==========================================================
    # Get Incident By ID
    # ==========================================================

    def get_by_id(
        self,
        db: Session,
        incident_id: str,
    ):

        return self.repository.get_by_incident_id(
            db,
            incident_id,
        )

    # ==========================================================
    # Get By Request ID
    # ==========================================================

    def get_by_request_id(
        self,
        db: Session,
        request_id: str,
    ):

        return self.repository.get_by_request_id(
            db,
            request_id,
        )

    # ==========================================================
    # Get Device Incidents
    # ==========================================================

    def get_by_device(
        self,
        db: Session,
        device_id: str,
        limit: int = 100,
    ):

        return self.repository.get_by_device(
            db,
            device_id,
            limit,
        )

    # ==========================================================
    # Resolve Incident
    # ==========================================================

    def resolve(
        self,
        db: Session,
        incident_id: str,
    ):

        incident = self.repository.get_by_incident_id(
            db,
            incident_id,
        )

        if incident is None:

            return None

        incident = self.repository.resolve(
            db,
            incident,
        )

        action_log_service.incident_resolved(

            db=db,

            request_id=incident.request_id,

            incident_id=incident.id,

            device_id=incident.device_id,

        )

        log_request(

            incident.request_id,

            f"Incident {incident.incident_id} resolved.",

        )

        return incident

    # ==========================================================
    # Delete Incident
    # ==========================================================

    def delete(
        self,
        db: Session,
        incident_id: str,
    ):

        incident = self.repository.get_by_incident_id(
            db,
            incident_id,
        )

        if incident is None:

            return False

        self.repository.delete(
            db,
            incident,
        )

        log_request(

            incident.request_id,

            f"Incident {incident.incident_id} deleted.",

        )

        return True


incident_service = IncidentService()