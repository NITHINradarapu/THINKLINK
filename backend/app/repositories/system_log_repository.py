"""
System Log Repository
"""

from sqlalchemy.orm import Session

from app.models import SystemLog


class SystemLogRepository:

    # ==========================================================
    # Create
    # ==========================================================

    def create(
        self,
        db: Session,
        log: SystemLog,
    ):

        db.add(log)

        db.commit()

        db.refresh(log)

        return log

    # ==========================================================
    # Get All
    # ==========================================================

    def get_all(
        self,
        db: Session,
    ):

        return (

            db.query(SystemLog)

            .order_by(
                SystemLog.created_at.desc()
            )

            .all()

        )

    # ==========================================================
    # Get By Level
    # ==========================================================

    def get_by_level(
        self,
        db: Session,
        level,
    ):

        return (

            db.query(SystemLog)

            .filter(
                SystemLog.level == level
            )

            .order_by(
                SystemLog.created_at.desc()
            )

            .all()

        )

    # ==========================================================
    # Get By Module
    # ==========================================================

    def get_by_module(
        self,
        db: Session,
        module: str,
    ):

        return (

            db.query(SystemLog)

            .filter(
                SystemLog.module == module
            )

            .order_by(
                SystemLog.created_at.desc()
            )

            .all()

        )


system_log_repository = SystemLogRepository()