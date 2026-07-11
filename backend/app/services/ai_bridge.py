"""
AI Bridge

Communicates with the local AI service (Ollama)
and always returns a normalized decision.
"""

import json
import requests

from app.config.settings import settings


class AIBridge:

    def __init__(self):
        self.url = settings.ai_service_url

    def _build_prompt(self, sensor_data: dict) -> str:
        """
        Build a structured prompt for the LLM.
        """

        return f"""
You are an industrial safety AI.

Analyze the following telemetry.

Telemetry:
{json.dumps(sensor_data, indent=2)}

Return ONLY valid JSON.

Schema:

{{
    "risk_level":"LOW|MEDIUM|HIGH|CRITICAL",
    "confidence":95,
    "summary":"Short summary",
    "reasoning":"Why you reached this conclusion",
    "recommended_actions":[
        "activate_buzzer",
        "notify_mobile"
    ]
}}
"""

    def _extract_json(self, text: str) -> dict:
        """
        Extract JSON from raw LLM output.
        """

        text = text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        elif text.startswith("```"):
            text = text.replace("```", "").strip()

        return json.loads(text)

    def analyze(self, sensor_data: dict) -> dict:
        """
        Analyze telemetry using the AI model.
        """

        prompt = self._build_prompt(sensor_data)

        payload = {
            "prompt": prompt
        }

        try:

            response = requests.post(
                self.url,
                json=payload,
                timeout=60,
            )

            response.raise_for_status()

            data = response.json()

            if "response" in data:
                result = self._extract_json(
                    data["response"]
                )
            else:
                result = data

            return {
                "risk_level": result.get("risk_level", "LOW"),
                "confidence": result.get("confidence", 0),
                "summary": result.get(
                    "summary",
                    "No summary provided.",
                ),
                "reasoning": result.get(
                    "reasoning",
                    "",
                ),
                "recommended_actions": result.get(
                    "recommended_actions",
                    [],
                ),
            }

        except Exception as e:

            return {
                "risk_level": "HIGH",
                "confidence": 0,
                "summary": "AI service unavailable",
                "reasoning": str(e),
                "recommended_actions": [
                    "notify_mobile"
                ],
            }


ai_bridge = AIBridge()