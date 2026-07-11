"""
Multimodal Builder

Creates a standardized multimodal request for the AI Gateway.
"""

from datetime import datetime, timezone
from uuid import uuid4

from app.schemas.telemetry import TelemetryRequest


class MultimodalBuilder:
    def build(
        self,
        telemetry: TelemetryRequest | None = None,
        image: dict | None = None,
        audio: dict | None = None,
    ) -> dict:

        request = {
            "request_id": f"REQ-{uuid4().hex[:8].upper()}",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "device_id": None,
            "telemetry": None,
            "image": None,
            "audio": None,
        }

        if telemetry is not None:
            request["device_id"] = telemetry.device_id
            request["telemetry"] = telemetry.model_dump()

        if image is not None:
            request["image"] = image

        if audio is not None:
            request["audio"] = audio

        return request


multimodal_builder = MultimodalBuilder()