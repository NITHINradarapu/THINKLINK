"""
Voice Service

Handles audio uploads and communicates with
the Speech AI through the AI Gateway.
"""

from fastapi import UploadFile

from app.services.ai_gateway import ai_gateway
from app.services.upload_service import upload_service


class VoiceService:

    async def analyze(
        self,
        device_id: str,
        audio: UploadFile,
    ):
        """
        Voice Processing Pipeline

        Upload
            ↓
        Validate
            ↓
        Save
            ↓
        Speech AI
            ↓
        Return AI Result
        """

        upload = await upload_service.save_audio(
            audio
        )

        ai_result = ai_gateway.voice_analysis(
            audio_path=upload["path"],
            device_id=device_id,
        )

        return {

            "success": ai_result.get(
                "success",
                False,
            ),

            "device_id": device_id,

            "audio_id": upload["audio_id"],

            "filename": upload["filename"],

            "audio_path": upload["path"],

            "audio_size": upload["size"],

            "ai_result": ai_result,

        }


voice_service = VoiceService()