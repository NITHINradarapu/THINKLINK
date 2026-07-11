"""
Device State Manager

Maintains the latest runtime state of connected devices.

Responsibilities

✔ Latest State
✔ Rolling History
✔ Device Health
✔ Online Status
✔ Risk Level
"""

from collections import deque
from datetime import datetime
from typing import Any
from app.core.config import settings


class StateManager:

    def __init__(self):

        self._device_states: dict[str, dict[str, Any]] = {}

        self._history: dict[str, deque] = {}

    # =====================================================
    # Update
    # =====================================================

    def update(
        self,
        device_id: str,
        telemetry,
    ):

        history = self._history.setdefault(
            device_id,
            deque(maxlen=20),
        )

        snapshot = {
            "timestamp": datetime.utcnow(),
            "temperature": telemetry.temperature,
            "humidity": telemetry.humidity,
            "gas_level": telemetry.gas_level,
            "smoke_detected": telemetry.smoke_detected,
            "battery_level": telemetry.battery_level,
        }

        history.append(snapshot)

        self._device_states[device_id] = {

            "device_id": telemetry.device_id,

            "temperature": telemetry.temperature,

            "humidity": telemetry.humidity,

            "gas_level": telemetry.gas_level,

            "smoke_detected": telemetry.smoke_detected,

            "battery_level": telemetry.battery_level,

            "last_seen": datetime.utcnow(),

            "health": self.calculate_health(
                telemetry
            ),

            "history_count": len(history),

            "history": list(history),

        }

    # =====================================================
    # Health
    # =====================================================

    def calculate_health(
        self,
        telemetry,
    ):

        if telemetry.smoke_detected:
            return "CRITICAL"

        if telemetry.gas_level >= settings.GAS_THRESHOLD:
            return "CRITICAL"

        if telemetry.temperature >= settings.TEMP_THRESHOLD:
            return "WARNING"

        if telemetry.battery_level <= settings.BATTERY_THRESHOLD:
            return "LOW BATTERY"

        return "HEALTHY"

    # =====================================================
    # Latest
    # =====================================================

    def get(
        self,
        device_id,
    ):

        return self._device_states.get(device_id)

    # =====================================================
    # History
    # =====================================================

    def get_history(
        self,
        device_id,
    ):

        return list(
            self._history.get(
                device_id,
                [],
            )
        )

    # =====================================================
    # All Devices
    # =====================================================

    def get_all(self):

        return self._device_states

    # =====================================================
    # Statistics
    # =====================================================

    def statistics(self):

        devices = len(
            self._device_states
        )

        healthy = 0

        warning = 0

        critical = 0

        for state in self._device_states.values():

            if state["health"] == "HEALTHY":
                healthy += 1

            elif state["health"] == "WARNING":
                warning += 1

            else:
                critical += 1

        return {

            "devices": devices,

            "healthy": healthy,

            "warning": warning,

            "critical": critical,

        }

    # =====================================================
    # Remove
    # =====================================================

    def remove(
        self,
        device_id,
    ):

        self._device_states.pop(
            device_id,
            None,
        )

        self._history.pop(
            device_id,
            None,
        )


state_manager = StateManager()