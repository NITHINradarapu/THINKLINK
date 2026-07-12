"""
Database API Route
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models import ActionLog, DeviceHistory, Incident, SystemLog, Device
from app.services.websocket_manager import websocket_manager

router = APIRouter(
    prefix="/database",
    tags=["Database"],
)


@router.post("/clear")
async def clear_database(db: Session = Depends(get_db)):
    """
    Clear all records from database tables: Incident Reports, Action Logs, Device Histories, System Logs, and registered Devices.
    Also resets WebSocket actuator states.
    """
    try:
        # Delete dependent rows first to prevent FK constraint issues
        db.query(ActionLog).delete()
        db.query(DeviceHistory).delete()
        db.query(Incident).delete()
        db.query(SystemLog).delete()
        db.query(Device).delete()
        db.commit()

        # Reset actuator states back to nominal defaults
        websocket_manager.actuators = {
            "buzzer": False,
            "led": True,
            "relay": False,
        }
        await websocket_manager.broadcast({
            "type": "actuator_states",
            "data": websocket_manager.actuators
        })

        # Reset AI status
        await websocket_manager.broadcast_ai_status(
            "monitoring",
            "All systems nominal. Database wiped."
        )

        return {
            "success": True,
            "message": "Database wiped successfully."
        }
    except Exception as e:
        db.rollback()
        return {
            "success": False,
            "message": f"Failed to clear database: {str(e)}"
        }
