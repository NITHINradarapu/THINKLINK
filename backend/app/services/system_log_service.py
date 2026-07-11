"""
System Log Service
"""

from sqlalchemy.orm import Session

from app.enums import LogLevel
from app.models import SystemLog

from app.repositories.system_log_repository import (
    system_log_repository,
)


class SystemLogService:

    # ==========================================================
    # Generic Logger
    # ==========================================================

    def log(
        self,
        db: Session,
        level: LogLevel,
        module: str,
        message: str,
        request_id: str | None = None,
    ):

        log = SystemLog(

            level=level,

            module=module,

            request_id=request_id,

            message=message,

        )

        return system_log_repository.create(

            db,

            log,

        )

    # ==========================================================
    # INFO
    # ==========================================================

    def info(
        self,
        db,
        module,
        message,
        request_id=None,
    ):

        return self.log(

            db,

            LogLevel.INFO,

            module,

            message,

            request_id,

        )

    # ==========================================================
    # WARNING
    # ==========================================================

    def warning(
        self,
        db,
        module,
        message,
        request_id=None,
    ):

        return self.log(

            db,

            LogLevel.WARNING,

            module,

            message,

            request_id,

        )

    # ==========================================================
    # ERROR
    # ==========================================================

    def error(
        self,
        db,
        module,
        message,
        request_id=None,
    ):

        return self.log(

            db,

            LogLevel.ERROR,

            module,

            message,

            request_id,

        )

    # ==========================================================
    # CRITICAL
    # ==========================================================

    def critical(
        self,
        db,
        module,
        message,
        request_id=None,
    ):

        return self.log(

            db,

            LogLevel.CRITICAL,

            module,

            message,

            request_id,

        )


system_log_service = SystemLogService()