"""
Incident API
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.incident import IncidentResponse
from app.services.incident_service import incident_service
from app.services.websocket_manager import websocket_manager

router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"],
)


# ==========================================================
# Get All Incidents
# ==========================================================

@router.get(
    "/",
    response_model=list[IncidentResponse],
)
def get_all_incidents(
    db: Session = Depends(get_db),
):
    return incident_service.get_all(db)


# ==========================================================
# Get Active Incidents
# ==========================================================

@router.get(
    "/active",
    response_model=list[IncidentResponse],
)
def get_active_incidents(
    db: Session = Depends(get_db),
):
    return incident_service.get_active(db)


# ==========================================================
# Get Incident By ID
# ==========================================================

@router.get(
    "/{incident_id}",
    response_model=IncidentResponse,
)
def get_incident(
    incident_id: str,
    db: Session = Depends(get_db),
):

    incident = incident_service.get_by_id(
        db,
        incident_id,
    )

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return incident


# ==========================================================
# Resolve Incident
# ==========================================================

@router.patch(
    "/{incident_id}/resolve",
)
async def resolve_incident(
    incident_id: str,
    db: Session = Depends(get_db),
):

    incident = incident_service.resolve(
        db,
        incident_id,
    )

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    try:
        await websocket_manager.broadcast_ai_status("resolved", "Incident resolved successfully.")
    except Exception:
        pass

    return {
        "success": True,
        "incident_id": incident.incident_id,
        "status": incident.status.value,
        "message": "Incident resolved successfully",
    }