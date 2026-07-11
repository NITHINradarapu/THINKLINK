"""
AI Gateway

Communicates with the external AI service.
"""

import json

import requests

from app.services.storage_service import storage_service
from app.utils.logger import (
    logger,
    log_error,
    log_request,
)


class AIGateway:

    def __init__(self):

        # TODO:
        # Move to .env later
        self.ai_url = "http://localhost:9000/analyze"

        self.timeout = 60

    # ======================================================
    # Send Request To AI
    # ======================================================

    def analyze(
        self,
        request_data: dict,
    ) -> dict:

        request_id = request_data["request_id"]

        files = {}

        data = {}

        image_path = None

        audio_path = None

        try:

            log_request(
                request_id,
                "Preparing AI request.",
            )

            # ==================================================
            # Metadata
            # ==================================================

            data["request_id"] = request_data["request_id"]

            data["timestamp"] = request_data["timestamp"]

            data["device_id"] = request_data["device_id"]

            # ==================================================
            # Telemetry
            # ==================================================

            if request_data["telemetry"] is not None:

                data["telemetry"] = json.dumps(
                    request_data["telemetry"]
                )

            # ==================================================
            # Image
            # ==================================================

            if request_data["image"] is not None:

                image_path = request_data["image"]["filepath"]

                files["image"] = open(
                    image_path,
                    "rb",
                )

            # ==================================================
            # Audio
            # ==================================================

            if request_data["audio"] is not None:

                audio_path = request_data["audio"]["filepath"]

                files["audio"] = open(
                    audio_path,
                    "rb",
                )

            log_request(
                request_id,
                "Sending request to AI service.",
            )

            response = requests.post(
                self.ai_url,
                data=data,
                files=files,
                timeout=self.timeout,
            )

            response.raise_for_status()

            log_request(
                request_id,
                "AI response received successfully.",
            )

            return response.json()

        except requests.Timeout:

            log_error(
                request_id,
                "AI request timed out.",
            )

            return {
                "success": False,
                "request_id": request_id,
                "status": "AI_TIMEOUT",
                "message": "AI service timed out.",
            }

        except requests.ConnectionError:

            log_error(
                request_id,
                "Unable to connect to AI service.",
            )

            return {
                "success": False,
                "request_id": request_id,
                "status": "AI_UNAVAILABLE",
                "message": "Unable to connect to AI service.",
            }

        except Exception as e:

            logger.exception(e)

            return {
                "success": False,
                "request_id": request_id,
                "status": "AI_ERROR",
                "message": str(e),
            }

        finally:

            # ==========================================
            # Close Open Files
            # ==========================================

            for file in files.values():

                try:
                    file.close()
                except Exception:
                    pass

            # ==========================================
            # Delete Temporary Image
            # ==========================================

            if image_path:

                storage_service.delete_file(
                    image_path,
                    request_id,
                )

            # ==========================================
            # Delete Temporary Audio
            # ==========================================

            if audio_path:

                storage_service.delete_file(
                    audio_path,
                    request_id,
                )

            log_request(
                request_id,
                "AI Gateway completed.",
            )


ai_gateway = AIGateway()