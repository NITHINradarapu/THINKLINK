"""
Telemetry Request & Response Schemas
"""

from pydantic import BaseModel, Field, model_validator
from typing import Optional


class TelemetryRequest(BaseModel):
    """
    Incoming telemetry from Arduino.
    """

    device_id: str = Field(
        ...,
        examples=["ARDUINO-01"],
    )

    temperature: float = Field(
        ...,
        examples=[36.5],
    )

    humidity: float = Field(
        default=50.0,
        examples=[58.2],
    )

    gas_level: float = Field(
        default=120.0,
        examples=[120],
    )

    smoke_detected: bool = Field(
        default=False,
        examples=[False],
    )

    battery_level: int = Field(
        default=100,
        ge=0,
        le=100,
        examples=[95],
    )

    vibration: Optional[float] = Field(
        default=0.0,
        examples=[0.05],
    )

    flame_detected: Optional[bool] = Field(
        default=False,
        examples=[False],
    )

    flame_intensity: Optional[int] = Field(
        default=0,
        examples=[0],
    )

    flame_proximity: Optional[float] = Field(
        default=0.0,
        examples=[0.0],
    )

    @model_validator(mode='before')
    @classmethod
    def check_aliases_and_defaults(cls, data):
        if isinstance(data, dict):
            # Translate 'gas' to 'gas_level' if provided
            if "gas" in data and "gas_level" not in data:
                data["gas_level"] = data["gas"]
            # Default missing fields to prevent validation failures
            if "humidity" not in data:
                data["humidity"] = 50.0
            if "smoke_detected" not in data:
                data["smoke_detected"] = data.get("gas_level", 0.0) > 300.0
            if data.get("flame_detected", False) or data.get("flame", False):
                data["smoke_detected"] = True
            if "battery_level" not in data:
                data["battery_level"] = 100
        return data


class TelemetryResponse(BaseModel):
    """
    Response returned after processing telemetry.
    """

    success: bool

    ai_triggered: bool

    risk_level: str

    message: str