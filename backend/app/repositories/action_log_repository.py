"""
Action Log Repository

Handles all database operations related to Action Logs.
"""

from sqlalchemy.orm import Session

from app.models import ActionLog


class ActionLogRepository:

    # ==========================================================
    # Create
    # ==========================================================

    def create(
        self,
        db: Session,
        action_log: ActionLog,
    ) -> ActionLog:

        db.add(action_log)

        db.commit()

        db.refresh(action_log)

        return action_log

    # ==========================================================
    # Get All
    # ==========================================================

    def get_all(
        self,
        db: Session,
    ) -> list[ActionLog]:

        return (

            db.query(ActionLog)

            .order_by(
                ActionLog.created_at.desc()
            )

            .all()

        )

    # ==========================================================
    # Get By Incident
    # ==========================================================

    def get_by_incident(
        self,
        db: Session,
        incident_id: int,
    ) -> list[ActionLog]:

        return (

            db.query(ActionLog)

            .filter(
                ActionLog.incident_id == incident_id
            )

            .order_by(
                ActionLog.created_at.asc()
            )

            .all()

        )

    # ==========================================================
    # Get By Request
    # ==========================================================

    def get_by_request(
        self,
        db: Session,
        request_id: str,
    ) -> list[ActionLog]:

        return (

            db.query(ActionLog)

            .filter(
                ActionLog.request_id == request_id
            )

            .order_by(
                ActionLog.created_at.asc()
            )

            .all()

        )

    # ==========================================================
    # Get By Device
    # ==========================================================

    def get_by_device(
        self,
        db: Session,
        device_id: str,
    ) -> list[ActionLog]:

        return (

            db.query(ActionLog)

            .filter(
                ActionLog.device_id == device_id
            )

            .order_by(
                ActionLog.created_at.desc()
            )

            .all()

        )

    # ==========================================================
    # Delete
    # ==========================================================

    def delete(
        self,
        db: Session,
        action_log: ActionLog,
    ):

        db.delete(action_log)

        db.commit()


action_log_repository = ActionLogRepository()