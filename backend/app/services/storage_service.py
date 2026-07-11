"""
Storage Service

Responsible for storing uploaded images
and audio files on disk.

Directory Structure
-------------------

uploads/
    images/
    audio/
"""

from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile


class StorageService:

    def __init__(self):

        self.base_path = Path("uploads")

        self.image_path = self.base_path / "images"

        self.audio_path = self.base_path / "audio"

        self.image_path.mkdir(
            parents=True,
            exist_ok=True,
        )

        self.audio_path.mkdir(
            parents=True,
            exist_ok=True,
        )

    # =====================================================
    # Save Image
    # =====================================================

    def save_image(
        self,
        image: UploadFile,
    ) -> str:

        extension = Path(image.filename).suffix

        filename = f"{uuid4().hex}{extension}"

        filepath = self.image_path / filename

        with open(filepath, "wb") as file:

            file.write(image.file.read())

        return str(filepath)

    # =====================================================
    # Save Audio
    # =====================================================

    def save_audio(
        self,
        audio: UploadFile,
    ) -> str:

        extension = Path(audio.filename).suffix

        filename = f"{uuid4().hex}{extension}"

        filepath = self.audio_path / filename

        with open(filepath, "wb") as file:

            file.write(audio.file.read())

        return str(filepath)

    # =====================================================
    # Delete File
    # =====================================================

    def delete_file(
        self,
        filepath: str,
    ):

        path = Path(filepath)

        if path.exists():

            path.unlink()

    # =====================================================
    # File Exists
    # =====================================================

    def exists(
        self,
        filepath: str,
    ) -> bool:

        return Path(filepath).exists()


storage_service = StorageService()