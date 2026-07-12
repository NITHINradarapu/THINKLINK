"""
Cooldown Manager

Prevents repeated AI execution for the same device
within a configurable cooldown period.
"""

from datetime import datetime, timedelta
from app.config.settings import settings


class CooldownManager:

    def __init__(self, cooldown_seconds: int = 30):
        self.cooldown = timedelta(seconds=cooldown_seconds)
        self._last_trigger: dict[str, datetime] = {}

    # ======================================================
    # Primary API
    # ======================================================

    def can_trigger(self, device_id: str) -> bool:
        """
        Returns True if AI execution is allowed.
        """

        now = datetime.utcnow()

        last_time = self._last_trigger.get(device_id)

        if last_time is None:
            self._last_trigger[device_id] = now
            return True

        if now - last_time >= self.cooldown:
            self._last_trigger[device_id] = now
            return True

        return False

    # ======================================================
    # Backward Compatibility
    # ======================================================

    def should_trigger(self, device_id: str) -> bool:
        """
        Older method name.
        """

        return self.can_trigger(device_id)

    def reset(self, device_id: str) -> None:
        """
        Clears cooldown for a device.
        """

        self._last_trigger.pop(device_id, None)

    def remaining_seconds(self, device_id: str) -> int:
        """
        Returns remaining cooldown time.
        """

        last = self._last_trigger.get(device_id)

        if last is None:
            return 0

        remaining = self.cooldown - (datetime.utcnow() - last)

        return max(0, int(remaining.total_seconds()))


# Singleton
cooldown_manager = CooldownManager(cooldown_seconds=settings.ai_cooldown_seconds)