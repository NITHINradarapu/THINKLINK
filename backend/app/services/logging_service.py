"""
ThinkLink Logging Service
"""

import logging
from pathlib import Path

# Create logs folder automatically
Path("logs").mkdir(exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    handlers=[
        logging.FileHandler("logs/thinklink.log"),
        logging.StreamHandler(),
    ],
)

logger = logging.getLogger("thinklink")