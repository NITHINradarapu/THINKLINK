"""
System Log Model

Stores backend runtime events.
"""

from sqlalchemy import (
    Enum,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.database.base import Base
from app.enums import LogLevel
from app.mixins import TimestampMixin


class SystemLog(TimestampMixin, Base):

    __tablename__ = "system_logs"

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
    # Log Level
    # ==========================================================

    level: Mapped[LogLevel] = mapped_column(
        Enum(LogLevel),
        nullable=False,
    )

    # ==========================================================
    # Module
    # ==========================================================

    module: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    # ==========================================================
    # Request
    # ==========================================================

    request_id: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
        index=True,
    )

    # ==========================================================
    # Message
    # ==========================================================

    message: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )