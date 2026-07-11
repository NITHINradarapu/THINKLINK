"""
AI Request / Response Schemas

Shared contract between Backend and AI Service.
"""

from pydantic import BaseModel, Field
from typing import Optional


# ==========================================================
# Telemetry
# ==========================================================

class TelemetryData(BaseModel):

    device_id: str

    temperature: float

    humidity: float

    gas_level: float

    smoke_detected: bool

    battery_level: int


# ==========================================================
# Metadata
# ==========================================================

class AIMetadata(BaseModel):

    timestamp: str

    request_id: str

    source: str = "backend"


# ==========================================================
# AI Response
# ==========================================================

class AIResponse(BaseModel):

    risk_level: str

    confidence: float

    summary: str

    reasoning: str

    recommended_actions: list[str]

    detections: dict = Field(default_factory=dict)

    metadata: Optional[dict] = None