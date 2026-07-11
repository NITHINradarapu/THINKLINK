"""
Dashboard API
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.dashboard_service import dashboard_service

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/summary")
def summary(
    db: Session = Depends(get_db),
):
    return dashboard_service.get_summary(db)


@router.get("/statistics")
def statistics(
    db: Session = Depends(get_db),
):
    return dashboard_service.get_statistics(db)


@router.get("/recent-incidents")
def recent_incidents(
    db: Session = Depends(get_db),
):
    return dashboard_service.get_recent_incidents(db)


@router.get("/devices")
def devices(
    db: Session = Depends(get_db),
):
    return dashboard_service.get_device_status(db)


@router.get("/risk-distribution")
def risk_distribution(
    db: Session = Depends(get_db),
):
    return dashboard_service.get_risk_distribution(db)