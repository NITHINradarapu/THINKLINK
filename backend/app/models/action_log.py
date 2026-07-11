"""
Action Log Model

Stores every important backend action performed during
the lifecycle of a request.
"""

from sqlalchemy import (
    Enum,
    ForeignKey,
    Integer,
    String,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.database.base import Base
from app.enums import ActionLogType
from app.mixins import TimestampMixin


class ActionLog(TimestampMixin, Base):

    __tablename__ = "action_logs"

    # ==========================================================
    # Primary Key
    # ==========================================================

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        index=True,
    )

    # ==========================================================
    # Request Information
    # ==========================================================

    request_id: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )

    incident_id: Mapped[int | None] = mapped_column(
        ForeignKey("incident_reports.id"),
        nullable=True,
        index=True,
    )

    device_id: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        index=True,
    )

    # ==========================================================
    # Backend Action
    # ==========================================================

    action: Mapped[ActionLogType] = mapped_column(
        Enum(ActionLogType),
        nullable=False,
    )

    # ==========================================================
    # Status
    # ==========================================================

    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="SUCCESS",
    )

    # ==========================================================
    # Source
    # ==========================================================

    performed_by: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="SYSTEM",
    )

    # ==========================================================
    # Additional Information
    # ==========================================================

    message: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )