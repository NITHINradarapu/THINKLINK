"""
WebSocket Connection Manager
"""

import json
from fastapi import WebSocket


class WebSocketManager:

    def __init__(self):

        self.active_connections: list[WebSocket] = []

        self.actuators = {
            "buzzer": False,
            "led": True,
            "relay": False,
        }

        self.connections_status = {
            "pc": True,
            "arduino": True,
            "glasses": True,
        }

        self.ai_status = {
            "status": "monitoring",
            "latestEvent": "Connected to ThinkLink Python Edge Server.",
        }

    async def connect(self, websocket: WebSocket):

        await websocket.accept()

        self.active_connections.append(websocket)

        # Send initial state
        await self.send_initial_state(websocket)

    def disconnect(self, websocket: WebSocket):

        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_initial_state(self, websocket: WebSocket):

        try:

            await websocket.send_text(
                json.dumps(
                    {
                        "type": "connections",
                        "data": self.connections_status,
                    }
                )
            )

            await websocket.send_text(
                json.dumps(
                    {
                        "type": "actuator_states",
                        "data": self.actuators,
                    }
                )
            )

            await websocket.send_text(
                json.dumps(
                    {
                        "type": "ai_status",
                        "data": self.ai_status,
                    }
                )
            )

        except Exception:
            pass

    async def broadcast(self, message: dict):

        disconnected = []

        for connection in self.active_connections:

            try:

                await connection.send_text(json.dumps(message))

            except Exception:

                disconnected.append(connection)

        for conn in disconnected:
            self.disconnect(conn)

    async def handle_message(self, websocket: WebSocket, raw_message: str):

        try:

            payload = json.loads(raw_message)

            msg_type = payload.get("type")

            msg_data = payload.get("data", {})

            if msg_type == "control_actuator":

                key = msg_data.get("key")

                value = msg_data.get("value")

                if key in self.actuators:

                    self.actuators[key] = bool(value)

                    # Broadcast the new actuator states
                    await self.broadcast(
                        {
                            "type": "actuator_states",
                            "data": self.actuators,
                        }
                    )

        except Exception:
            pass

    async def broadcast_telemetry(self, sensor_data: dict):

        await self.broadcast(
            {
                "type": "telemetry",
                "data": sensor_data,
            }
        )

    async def broadcast_ai_status(self, status: str, latest_event: str):

        self.ai_status = {
            "status": status,
            "latestEvent": latest_event,
        }

        await self.broadcast(
            {
                "type": "ai_status",
                "data": self.ai_status,
            }
        )

    async def broadcast_incident(self, incident: dict):

        await self.broadcast(
            {
                "type": "new_incident",
                "data": incident,
            }
        )


websocket_manager = WebSocketManager()
