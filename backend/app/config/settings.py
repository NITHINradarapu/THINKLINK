from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # ==========================================================
    # Application
    # ==========================================================

    app_name: str
    app_version: str
    environment: str
    debug: bool

    # ==========================================================
    # Server
    # ==========================================================

    host: str
    port: int

    # ==========================================================
    # Database
    # ==========================================================

    database_url: str

    # ==========================================================
    # AI
    # ==========================================================

    ai_service_url: str

    ai_analyze_endpoint: str

    ai_health_endpoint: str

    ai_timeout: int

    ai_cooldown_seconds: int

    # ==========================================================
    # Uploads
    # ==========================================================

    upload_directory: str

    max_image_size_mb: int

    max_audio_size_mb: int

    # ==========================================================
    # Thresholds
    # ==========================================================

    temp_threshold: int

    gas_threshold: int

    smoke_threshold: int

    humidity_threshold: int

    battery_threshold: int

    # ==========================================================
    # Polling
    # ==========================================================

    poll_interval: int

    # ==========================================================
    # Logging
    # ==========================================================

    log_level: str

    # ==========================================================
    # Security
    # ==========================================================

    secret_key: str

    model_config = SettingsConfigDict(

        env_file=".env",

        case_sensitive=False,

        extra="ignore",

    )


settings = Settings()