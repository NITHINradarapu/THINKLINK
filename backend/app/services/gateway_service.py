"""
Gateway Service

Acts as the entry point for all telemetry.

Responsibilities
----------------
1. Validate telemetry
2. Normalize data
3. Forward to pipeline
"""

from app.schemas.telemetry import TelemetryRequest


class GatewayService:

    @staticmethod
    def process(
        telemetry: TelemetryRequest,
    ) -> TelemetryRequest:
        """
        Validate and normalize telemetry.
        """

        # =====================================================
        # Normalize
        # =====================================================

        telemetry.device_id = telemetry.device_id.strip().upper()

        telemetry.temperature = float(telemetry.temperature)

        telemetry.humidity = float(telemetry.humidity)

        telemetry.gas_level = float(telemetry.gas_level)

        telemetry.battery_level = int(telemetry.battery_level)

        # =====================================================
        # Validation
        # =====================================================

        if not (-40 <= telemetry.temperature <= 150):

            raise ValueError("Invalid temperature")

        if not (0 <= telemetry.humidity <= 100):

            raise ValueError("Invalid humidity")

        if telemetry.gas_level < 0:

            raise ValueError("Invalid gas level")

        if not (0 <= telemetry.battery_level <= 100):

            raise ValueError("Invalid battery level")

        # =====================================================
        # Return normalized telemetry
        # =====================================================

        return telemetry


gateway_service = GatewayService()