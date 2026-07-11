"""
Device Status Model
Stores the latest status of each connected device.
"""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Device(Base):
    __tablename__ = "device_status"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    device_id: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    device_type: Mapped[str] = mapped_column(String(50), nullable=False)

    temperature: Mapped[float] = mapped_column(Float, default=0.0)

    gas_level: Mapped[float] = mapped_column(Float, default=0.0)

    smoke_detected: Mapped[bool] = mapped_column(Boolean, default=False)

    humidity: Mapped[float] = mapped_column(Float, default=0.0)

    battery_level: Mapped[int] = mapped_column(Integer, default=100)

    is_online: Mapped[bool] = mapped_column(Boolean, default=True)

    last_seen: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )