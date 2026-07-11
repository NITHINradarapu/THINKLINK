"""
ThinkLink Logger

Centralized logging configuration for the backend.
"""

import logging
import sys
from pathlib import Path

# ======================================================
# Create logs directory
# ======================================================

LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)

LOG_FILE = LOG_DIR / "thinklink.log"

# ======================================================
# Logger Configuration
# ======================================================

logger = logging.getLogger("ThinkLink")

logger.setLevel(logging.INFO)

# Prevent duplicate logs
logger.propagate = False

if not logger.handlers:

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"
    )

    # -------------------------------
    # Console Handler
    # -------------------------------

    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)

    # -------------------------------
    # File Handler
    # -------------------------------

    file_handler = logging.FileHandler(
        LOG_FILE,
        encoding="utf-8",
    )
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(formatter)

    logger.addHandler(console_handler)
    logger.addHandler(file_handler)


# ======================================================
# Helper Functions
# ======================================================

def log_request(request_id: str, message: str) -> None:
    """
    Log request-specific information.
    """
    logger.info(f"[{request_id}] {message}")


def log_warning(request_id: str, message: str) -> None:
    """
    Log request-specific warning.
    """
    logger.warning(f"[{request_id}] {message}")


def log_error(request_id: str, message: str) -> None:
    """
    Log request-specific error.
    """
    logger.error(f"[{request_id}] {message}")


def log_exception(request_id: str, exception: Exception) -> None:
    """
    Log request-specific exception with traceback.
    """
    logger.exception(
        f"[{request_id}] {str(exception)}"
    )