"""
Worker Report Schemas

Used when a worker manually reports
an unsafe machine condition.
"""

from pydantic import BaseModel


class ReportResponse(BaseModel):
    success: bool
    incident_id: str
    risk_level: str
    summary: str
    notification_sent: bool