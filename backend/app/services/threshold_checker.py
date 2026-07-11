"""
Threshold Checker

Determines whether incoming telemetry exceeds
configured thresholds.
"""

from app.core.config import settings

from app.utils.logger import log_request


class ThresholdChecker:

    @staticmethod
    def check(sensor_data):
        """
        Evaluate telemetry against configured thresholds.

        Returns
        -------
        {
            "triggered": bool,
            "score": int,
            "reasons": list[str]
        }
        """

        # ======================================================
        # Support TelemetryRequest and dict
        # ======================================================

        if hasattr(sensor_data, "temperature"):

            temperature = sensor_data.temperature

            gas_level = sensor_data.gas_level

            smoke_detected = sensor_data.smoke_detected

            battery_level = sensor_data.battery_level

            device_id = sensor_data.device_id

        else:

            temperature = sensor_data.get(
                "temperature",
                0,
            )

            gas_level = sensor_data.get(
                "gas_level",
                0,
            )

            smoke_detected = sensor_data.get(
                "smoke_detected",
                False,
            )

            battery_level = sensor_data.get(
                "battery_level",
                100,
            )

            device_id = sensor_data.get(
                "device_id",
                "UNKNOWN",
            )

        request_id = f"TEL-{device_id}"

        reasons = []

        score = 0

        # ======================================================
        # Temperature
        # ======================================================

        if temperature >= settings.TEMP_THRESHOLD:

            reasons.append(
                "Temperature threshold exceeded"
            )

            score += 25

        # ======================================================
        # Gas
        # ======================================================

        if gas_level >= settings.GAS_THRESHOLD:

            reasons.append(
                "Gas threshold exceeded"
            )

            score += 40

        # ======================================================
        # Smoke
        # ======================================================

        if smoke_detected:

            reasons.append(
                "Smoke detected"
            )

            score += 50

        # ======================================================
        # Battery
        # ======================================================

        if battery_level <= settings.BATTERY_THRESHOLD:

            reasons.append(
                "Low battery"
            )

            score += 10

        log_request(
            request_id,
            f"Threshold score: {score}",
        )

        return {

            "triggered": score > 0,

            "score": min(score, 100),

            "reasons": reasons,

        }