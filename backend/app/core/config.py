"""
ThinkLink Configuration

Loads all configuration from .env
"""

from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)


class Settings(BaseSettings):

    # ======================================================
    # Application
    # ======================================================

    APP_NAME: str

    APP_VERSION: str

    ENVIRONMENT: str

    DEBUG: bool

    HOST: str

    PORT: int

    # ======================================================
    # Database
    # ======================================================

    DATABASE_URL: str

    # ======================================================
    # AI
    # ======================================================

    AI_SERVICE_URL: str

    AI_ANALYZE_ENDPOINT: str

    AI_HEALTH_ENDPOINT: str

    AI_TIMEOUT: int

    # ======================================================
    # Uploads
    # ======================================================

    UPLOAD_DIRECTORY: str

    MAX_IMAGE_SIZE_MB: int

    MAX_AUDIO_SIZE_MB: int

    # ======================================================
    # Thresholds
    # ======================================================

    TEMP_THRESHOLD: float

    GAS_THRESHOLD: float

    HUMIDITY_THRESHOLD: float

    BATTERY_THRESHOLD: int

    # ======================================================
    # Logger
    # ======================================================

    LOG_LEVEL: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()