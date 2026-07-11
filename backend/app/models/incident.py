"""
Incident Model

Stores AI-generated incident reports from
both Arduino devices and manual worker reports.
"""

from datetime import datetime, timezone
from typing import Any

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    Float,
    Integer,
    JSON,
    String,
    Text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.database.base import Base
from app.enums import (
    DeviceType,
    IncidentStatus,
    IncidentSource,
    RiskLevel,
)


class Incident(Base):

    __tablename__ = "incident_reports"

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
    # IDs
    # ==========================================================

    incident_id: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    request_id: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    # ==========================================================
    # Device
    # ==========================================================

    device_id: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    device_type: Mapped[DeviceType] = mapped_column(
        Enum(DeviceType),
        nullable=False,
    )

    # ==========================================================
    # Incident Source
    # ==========================================================

    source: Mapped[IncidentSource] = mapped_column(
        Enum(IncidentSource),
        default=IncidentSource.ARDUINO,
        nullable=False,
        index=True,
    )

    worker_id: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
        index=True,
    )

    remarks: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    # ==========================================================
    # AI Decision
    # ==========================================================

    risk_level: Mapped[RiskLevel] = mapped_column(
        Enum(RiskLevel),
        nullable=False,
        index=True,
    )

    confidence_score: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )

    summary: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    ai_reasoning: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    recommended_actions: Mapped[list[str]] = mapped_column(
        JSON,
        default=list,
        nullable=False,
    )

    # ==========================================================
    # Evidence
    # ==========================================================

    image_path: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    audio_path: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    has_image: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    has_audio: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    # ==========================================================
    # AI Metadata
    # ==========================================================

    ai_model: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    processing_time_ms: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    # ==========================================================
    # Telemetry Snapshot
    # ==========================================================

    sensor_snapshot: Mapped[dict[str, Any]] = mapped_column(
        JSON,
        default=dict,
        nullable=False,
    )

    # ==========================================================
    # Lifecycle
    # ==========================================================

    status: Mapped[IncidentStatus] = mapped_column(
        Enum(IncidentStatus),
        default=IncidentStatus.ACTIVE,
        nullable=False,
        index=True,
    )

    resolved_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    # ==========================================================
    # Metadata
    # ==========================================================

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )