"""
Upload Service

Validates uploaded images and audio
before saving them to storage.
"""

from fastapi import HTTPException, UploadFile

from app.core.config import settings


class UploadService:

    IMAGE_EXTENSIONS = {

        ".jpg",

        ".jpeg",

        ".png",

        ".webp",

    }

    AUDIO_EXTENSIONS = {

        ".wav",

        ".mp3",

        ".m4a",

        ".aac",

    }

    # =====================================================
    # Validate Image
    # =====================================================

    def validate_image(
        self,
        image: UploadFile,
    ):

        if image is None:

            raise HTTPException(

                status_code=400,

                detail="Image is required.",

            )

        extension = image.filename.lower().split(".")[-1]

        extension = "." + extension

        if extension not in self.IMAGE_EXTENSIONS:

            raise HTTPException(

                status_code=400,

                detail=f"Unsupported image format: {extension}",

            )

        image.file.seek(0, 2)

        size = image.file.tell()

        image.file.seek(0)

        max_size = settings.MAX_IMAGE_SIZE_MB * 1024 * 1024

        if size > max_size:

            raise HTTPException(

                status_code=400,

                detail=f"Image exceeds {settings.MAX_IMAGE_SIZE_MB} MB.",

            )

    # =====================================================
    # Validate Audio
    # =====================================================

    def validate_audio(
        self,
        audio: UploadFile | None,
    ):

        if audio is None:

            return

        extension = audio.filename.lower().split(".")[-1]

        extension = "." + extension

        if extension not in self.AUDIO_EXTENSIONS:

            raise HTTPException(

                status_code=400,

                detail=f"Unsupported audio format: {extension}",

            )

        audio.file.seek(0, 2)

        size = audio.file.tell()

        audio.file.seek(0)

        max_size = settings.MAX_AUDIO_SIZE_MB * 1024 * 1024

        if size > max_size:

            raise HTTPException(

                status_code=400,

                detail=f"Audio exceeds {settings.MAX_AUDIO_SIZE_MB} MB.",

            )

    # =====================================================
    # Validate Both
    # =====================================================

    def validate(

        self,

        image: UploadFile,

        audio: UploadFile | None,

    ):

        self.validate_image(image)

        self.validate_audio(audio)


upload_service = UploadService()