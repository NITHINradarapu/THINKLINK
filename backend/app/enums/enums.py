"""
Application Enums
ThinkLink Backend
"""

from enum import Enum


# ==========================================================
# Device Types
# ==========================================================

class DeviceType(str, Enum):
    ARDUINO = "ARDUINO"
    MOBILE = "MOBILE"
    META_GLASSES = "META_GLASSES"


# ==========================================================
# Incident Source
# ==========================================================

class IncidentSource(str, Enum):
    ARDUINO = "ARDUINO"
    WORKER = "WORKER"


# ==========================================================
# Risk Levels
# ==========================================================

class RiskLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


# ==========================================================
# Incident Status
# ==========================================================

class IncidentStatus(str, Enum):
    ACTIVE = "ACTIVE"
    ACKNOWLEDGED = "ACKNOWLEDGED"
    RESOLVED = "RESOLVED"
    CLOSED = "CLOSED"


# ==========================================================
# Hardware / AI Actions
# ==========================================================

class ActionType(str, Enum):
    NOTIFY_MOBILE = "notify_mobile"
    ACTIVATE_BUZZER = "activate_buzzer"
    ACTIVATE_LED = "activate_led"
    VOICE_ALERT = "voice_alert"
    SAVE_INCIDENT = "save_incident"
    EMERGENCY_STOP = "emergency_stop"
    CALL_SUPERVISOR = "call_supervisor"


# ==========================================================
# Backend Action Logs
# ==========================================================

class ActionLogType(str, Enum):

    AI_TRIGGERED = "AI_TRIGGERED"

    AI_COMPLETED = "AI_COMPLETED"

    INCIDENT_CREATED = "INCIDENT_CREATED"

    INCIDENT_RESOLVED = "INCIDENT_RESOLVED"

    NOTIFICATION_SENT = "NOTIFICATION_SENT"

    NOTIFICATION_FAILED = "NOTIFICATION_FAILED"

    DEVICE_REGISTERED = "DEVICE_REGISTERED"

    DEVICE_UPDATED = "DEVICE_UPDATED"

    DEVICE_ONLINE = "DEVICE_ONLINE"

    DEVICE_OFFLINE = "DEVICE_OFFLINE"

    TELEMETRY_RECEIVED = "TELEMETRY_RECEIVED"

    IMAGE_RECEIVED = "IMAGE_RECEIVED"

    AUDIO_RECEIVED = "AUDIO_RECEIVED"

    FILE_SAVED = "FILE_SAVED"

    AI_REQUEST_SENT = "AI_REQUEST_SENT"

    AI_RESPONSE_RECEIVED = "AI_RESPONSE_RECEIVED"


# ==========================================================
# System Log Levels
# ==========================================================

class LogLevel(str, Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"