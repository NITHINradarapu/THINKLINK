"""
Master Orchestrator Service Singleton

Manages the lifecycle and lazy loading of the MasterOrchestrator swarm.
"""

from app.utils.logger import logger
from app.agents.master_orchestrator import MasterOrchestrator

_orchestrator = None

def get_master_orchestrator() -> MasterOrchestrator:
    """
    Get or lazily initialize the MasterOrchestrator swarm.
    """
    global _orchestrator
    if _orchestrator is None:
        logger.info("Initializing MasterOrchestrator swarm (lazily)...")
        try:
            _orchestrator = MasterOrchestrator()
            logger.info("MasterOrchestrator swarm initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to initialize MasterOrchestrator: {e}")
            raise e
    return _orchestrator

def init_master_orchestrator():
    """
    Explicit initialization (can be called on startup).
    """
    get_master_orchestrator()
