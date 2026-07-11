"""
Telemetry Request & Response Schemas
"""

from pydantic import BaseModel, Field


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
        ...,
        examples=[58.2],
    )

    gas_level: float = Field(
        ...,
        examples=[120],
    )

    smoke_detected: bool = Field(
        ...,
        examples=[False],
    )

    battery_level: int = Field(
        ...,
        ge=0,
        le=100,
        examples=[95],
    )


class TelemetryResponse(BaseModel):
    """
    Response returned after processing telemetry.
    """

    success: bool

    ai_triggered: bool

    risk_level: str

    message: str