"""
Notification API
"""

from fastapi import APIRouter

from app.services.notification_service import notification_service

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.get("/latest")
def latest_notification():
    """
    Returns the latest notification.
    """

    return notification_service.get_latest()


@router.get("/")
def all_notifications():
    """
    Currently returns the latest notification.

    (Later we'll store notification history.)
    """

    latest = notification_service.get_latest()

    if latest is None:
        return []

    return [latest]