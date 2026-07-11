"""
Vision Service

Handles image uploads and communicates with
the Vision AI through the AI Gateway.
"""

from fastapi import UploadFile

from app.services.ai_gateway import ai_gateway
from app.services.upload_service import upload_service


class VisionService:

    async def analyze(
        self,
        device_id: str,
        image: UploadFile,
    ):
        """
        Complete Vision Pipeline

        Upload
            ↓
        Validate
            ↓
        Save
            ↓
        Vision AI
            ↓
        Return AI Result
        """

        upload = await upload_service.save_image(
            image
        )

        ai_result = ai_gateway.vision_analysis(
            image_path=upload["path"],
            device_id=device_id,
        )

        return {

            "success": ai_result.get(
                "success",
                False,
            ),

            "device_id": device_id,

            "image_id": upload["image_id"],

            "filename": upload["filename"],

            "image_path": upload["path"],

            "image_size": upload["size"],

            "ai_result": ai_result,

        }


vision_service = VisionService()