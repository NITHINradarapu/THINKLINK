"""
Database initialization.
Creates all database tables.
"""

from app.database.base import Base
from app.database.session import engine

# Import all models so SQLAlchemy registers them
from app.models import (
    ActionLog,
    Device,
    DeviceHistory,
    Incident,
    SystemLog,
)


def init_database() -> None:
    """
    Create all database tables.
    """
    Base.metadata.create_all(bind=engine)