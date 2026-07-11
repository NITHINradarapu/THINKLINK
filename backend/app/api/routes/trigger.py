"""
Simulation Trigger API Router
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.telemetry import TelemetryRequest
from app.services.gateway_service import gateway_service
from app.services.telemetry_pipeline import telemetry_pipeline
from app.services.websocket_manager import websocket_manager
from app.services.supervisor_ai import supervisor_ai
from app.services.incident_service import incident_service
from app.services.device_service import device_service
from app.enums import IncidentSource, RiskLevel

router = APIRouter(
    prefix="/trigger",
    tags=["Simulation Triggers"],
)

class MockTelemetry:
    def __init__(self, device_id: str, temperature: float, humidity: float, gas_level: float, smoke_detected: bool, battery_level: int):
        self.device_id = device_id
        self.temperature = temperature
        self.humidity = humidity
        self.gas_level = gas_level
        self.smoke_detected = smoke_detected
        self.battery_level = battery_level

@router.get("/gas-leak")
async def trigger_gas_leak(db: Session = Depends(get_db)):
    """
    Simulates a high hazardous gas leak.
    """
    telemetry = TelemetryRequest(
        device_id="TEST-ARDUINO-01",
        temperature=27.5,
        humidity=48.0,
        gas_level=380.0,  # Exceeds GAS_THRESHOLD
        smoke_detected=True,
        battery_level=95
    )
    # Normalize & run pipeline
    telemetry = gateway_service.process(telemetry)
    result = await telemetry_pipeline.process(db=db, telemetry=telemetry)
    return {
        "success": True,
        "message": "Gas leak triggered successfully",
        "pipeline_result": result
    }

@router.get("/overheat")
async def trigger_overheat(db: Session = Depends(get_db)):
    """
    Simulates a machine overheat.
    """
    telemetry = TelemetryRequest(
        device_id="TEST-ARDUINO-01",
        temperature=85.0,  # Exceeds TEMP_THRESHOLD
        humidity=30.0,
        gas_level=120.0,
        smoke_detected=False,
        battery_level=92
    )
    # Normalize & run pipeline
    telemetry = gateway_service.process(telemetry)
    result = await telemetry_pipeline.process(db=db, telemetry=telemetry)
    return {
        "success": True,
        "message": "Overheat triggered successfully",
        "pipeline_result": result
    }

@router.get("/vibration-fault")
async def trigger_vibration_fault(db: Session = Depends(get_db)):
    """
    Simulates a mechanical vibration anomaly.
    Uses AI supervisor manually since vibration is not in the base TelemetryRequest.
    """
    # 1. Update/Ensure device exists
    mock_tel = MockTelemetry("TEST-ARDUINO-01", 32.5, 45.0, 110.0, False, 88)
    device_service.process_telemetry(db, mock_tel)

    # 2. Run supervisor AI reasoning
    ai_result = supervisor_ai.analyze(
        telemetry={
            "device_id": "TEST-ARDUINO-01",
            "temperature": 32.5,
            "humidity": 45.0,
            "gas_level": 110.0,
            "smoke_detected": False,
            "battery_level": 88,
        },
        source="SYSTEM",
        remarks="Vibration level warning: Turbine bearing wear detected"
    )

    # 3. Create incident record
    incident = incident_service.create(
        db=db,
        telemetry=mock_tel,
        ai_result=ai_result,
        source=IncidentSource.ARDUINO
    )

    # 4. Broadcast the new incident via WS
    incident_dict = {
        "incident_id": incident.incident_id,
        "device_id": incident.device_id,
        "device_type": incident.device_type.value if hasattr(incident.device_type, "value") else incident.device_type,
        "risk_level": incident.risk_level.value if hasattr(incident.risk_level, "value") else incident.risk_level,
        "summary": incident.summary,
        "ai_reasoning": incident.ai_reasoning,
        "confidence_score": incident.confidence_score,
        "recommended_actions": incident.recommended_actions,
        "sensor_snapshot": incident.sensor_snapshot,
        "status": incident.status.value if hasattr(incident.status, "value") else incident.status,
        "created_at": incident.created_at.isoformat() if hasattr(incident.created_at, "isoformat") else incident.created_at
    }
    await websocket_manager.broadcast_incident(incident_dict)
    await websocket_manager.broadcast_ai_status("analyzing", f"Active incident: {incident.summary}")

    return {
        "success": True,
        "message": "Vibration fault triggered successfully",
        "incident_id": incident.incident_id,
        "ai_reasoning": incident.ai_reasoning
    }

@router.get("/reset")
async def trigger_reset(db: Session = Depends(get_db)):
    """
    Resets the environment back to nominal status.
    Resolves all active incidents and resets actuator overrides.
    """
    # 1. Resolve all active incidents in DB
    active_incidents = incident_service.get_active(db)
    for incident in active_incidents:
        incident_service.resolve(db, incident.incident_id)

    # 2. Reset actuators
    websocket_manager.actuators = {
        "buzzer": False,
        "led": True,
        "relay": False,
    }
    await websocket_manager.broadcast({
        "type": "actuator_states",
        "data": websocket_manager.actuators
    })

    # 3. Reset AI status
    await websocket_manager.broadcast_ai_status(
        "monitoring",
        "All systems nominal. Monitoring environment..."
    )

    # 4. Reset telemetry inputs to baseline
    baseline_telemetry = TelemetryRequest(
        device_id="TEST-ARDUINO-01",
        temperature=23.5,
        humidity=48.0,
        gas_level=110.0,
        smoke_detected=False,
        battery_level=98
    )
    # Process baseline to normalize DB values
    device_service.process_telemetry(db, baseline_telemetry)

    # Broadcast baseline values
    await websocket_manager.broadcast_telemetry({
        "temperature": 23.5,
        "humidity": 48.0,
        "gas": 110.0,
        "smoke_detected": False,
        "battery_level": 98,
        "vibration": 0.05
    })

    return {
        "success": True,
        "message": "System status reset to nominal successfully"
    }
