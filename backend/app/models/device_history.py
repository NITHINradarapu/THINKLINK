"""
Device History Model

Stores every telemetry packet received from devices.
"""

from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    Integer,
    String,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.database.base import Base


class DeviceHistory(Base):

    __tablename__ = "device_history"

    # ======================================================
    # Primary Key
    # ======================================================

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        index=True,
    )

    # ======================================================
    # Device Information
    # ======================================================

    device_id: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    # ======================================================
    # Sensor Data
    # ======================================================

    temperature: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    humidity: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    gas_level: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    smoke_detected: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
    )

    battery_level: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    # ======================================================
    # Timestamp
    # ======================================================

    recorded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )