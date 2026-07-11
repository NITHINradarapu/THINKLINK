"""
Incident Schemas
"""

from datetime import datetime

from pydantic import BaseModel


class IncidentResponse(BaseModel):

    incident_id: str

    device_id: str

    device_type: str

    risk_level: str

    summary: str

    ai_reasoning: str

    confidence_score: float

    recommended_actions: list[str]

    sensor_snapshot: dict

    status: str

    created_at: datetime

    class Config:
        from_attributes = True


class ResolveIncidentRequest(BaseModel):

    status: str = "RESOLVED"