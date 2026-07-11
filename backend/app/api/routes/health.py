"""
Health API
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.health_service import health_service

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get(
    "/",
    summary="Backend Health Status",
)
def health(
    db: Session = Depends(get_db),
):

    return health_service.get_health(db)