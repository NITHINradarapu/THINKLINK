"""
Incident Repository

Handles all database operations related to incidents.
"""

from sqlalchemy.orm import Session

from app.enums import IncidentStatus
from app.models.incident import Incident


class IncidentRepository:

    # ==========================================================
    # Create
    # ==========================================================

    def create(
        self,
        db: Session,
        incident: Incident,
    ) -> Incident:

        db.add(incident)

        db.commit()

        db.refresh(incident)

        return incident

    # ==========================================================
    # Get By Incident ID
    # ==========================================================

    def get_by_incident_id(
        self,
        db: Session,
        incident_id: str,
    ) -> Incident | None:

        return (

            db.query(Incident)

            .filter(
                Incident.incident_id == incident_id
            )

            .first()

        )

    # ==========================================================
    # Get By Request ID
    # ==========================================================

    def get_by_request_id(
        self,
        db: Session,
        request_id: str,
    ) -> Incident | None:

        return (

            db.query(Incident)

            .filter(
                Incident.request_id == request_id
            )

            .first()

        )

    # ==========================================================
    # Get Active Incidents
    # ==========================================================

    def get_active_incidents(
        self,
        db: Session,
    ) -> list[Incident]:

        return (

            db.query(Incident)

            .filter(
                Incident.status == IncidentStatus.ACTIVE
            )

            .order_by(
                Incident.created_at.desc()
            )

            .all()

        )

    # ==========================================================
    # Get All
    # ==========================================================

    def get_all(
        self,
        db: Session,
    ) -> list[Incident]:

        return (

            db.query(Incident)

            .order_by(
                Incident.created_at.desc()
            )

            .all()

        )

    # ==========================================================
    # Resolve Incident
    # ==========================================================

    def resolve(
        self,
        db: Session,
        incident: Incident,
    ) -> Incident:

        incident.status = IncidentStatus.RESOLVED

        db.commit()

        db.refresh(incident)

        return incident

    # ==========================================================
    # Update
    # ==========================================================

    def update(
        self,
        db: Session,
        incident: Incident,
    ) -> Incident:

        db.commit()

        db.refresh(incident)

        return incident

    # ==========================================================
    # Delete
    # ==========================================================

    def delete(
        self,
        db: Session,
        incident: Incident,
    ) -> None:

        db.delete(incident)

        db.commit()


incident_repository = IncidentRepository()