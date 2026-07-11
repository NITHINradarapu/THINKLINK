"""
Action Executor

Executes AI recommended actions.

Each action is mapped to a handler function.
"""

from collections.abc import Callable

from sqlalchemy.orm import Session

from app.models import Incident
from app.services.logging_service import logger


class ActionExecutor:

    def __init__(self):

        self._handlers: dict[str, Callable] = {}

    # ==========================================================
    # Register Handler
    # ==========================================================

    def register(
        self,
        action: str,
        handler: Callable,
    ) -> None:

        self._handlers[action] = handler

    # ==========================================================
    # Execute All Actions
    # ==========================================================

    def execute(
        self,
        db: Session,
        incident: Incident,
    ):

        executed = []
        failed = []

        logger.info(
            f"Executing actions for incident {incident.incident_id}"
        )

        for action in incident.recommended_actions:

            handler = self._handlers.get(action)

            if handler is None:

                failed.append(action)

                logger.warning(
                    f"No handler registered for '{action}'"
                )

                continue

            try:

                handler(
                    db=db,
                    incident=incident,
                )

                executed.append(action)

                logger.info(
                    f"Action executed successfully: {action}"
                )

            except Exception as e:

                failed.append(action)

                logger.error(
                    f"Action '{action}' failed: {str(e)}"
                )

        return {
            "executed": executed,
            "failed": failed,
        }


action_executor = ActionExecutor()


# ==========================================================
# Default Handlers
# ==========================================================

from app.services.notification_service import notification_service

action_executor.register(
    "notify_mobile",
    notification_service.send,
)

# Future handlers
#
# action_executor.register(
#     "activate_buzzer",
#     arduino_service.activate_buzzer,
# )
#
# action_executor.register(
#     "activate_led",
#     arduino_service.activate_led,
# )
#
# action_executor.register(
#     "activate_relay",
#     arduino_service.activate_relay,
# )
#
# action_executor.register(
#     "notify_glasses",
#     glasses_service.send,
# )