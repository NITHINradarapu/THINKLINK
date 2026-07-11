"""
ThinkLink Integration Test Suite
Tests all backend REST endpoints, WebSocket connection and actuator round-trip.
"""
import json
import urllib.request
import urllib.error
import asyncio
import sys

BASE = "http://127.0.0.1:8000"
WS_URL = "ws://127.0.0.1:8000/ws"

PASS = 0
FAIL = 0

def test(name, ok, detail=""):
    global PASS, FAIL
    if ok:
        PASS += 1
        print(f"  [PASS] {name}")
    else:
        FAIL += 1
        print(f"  [FAIL] {name}  -> {detail}")

def http_get(path, timeout=5):
    url = BASE + path
    req = urllib.request.Request(url, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as res:
            body = json.loads(res.read().decode())
            return res.status, body
    except urllib.error.HTTPError as e:
        return e.code, {}
    except Exception as e:
        return 0, str(e)

def http_post(path, payload, timeout=5):
    url = BASE + path
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, method="POST",
                                  headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as res:
            body = json.loads(res.read().decode())
            return res.status, body
    except urllib.error.HTTPError as e:
        body = {}
        try:
            body = json.loads(e.read().decode())
        except Exception:
            pass
        return e.code, body
    except Exception as e:
        return 0, str(e)

# ──────────────────────────────────────────────────────────
print("\n========================================")
print("   ThinkLink REST API Tests")
print("========================================")

# Root
status, body = http_get("/")
test("GET /  (root)", status == 200, f"status={status}")
print(f"        Response: {json.dumps(body, indent=8)[:120]}")

# Health
status, body = http_get("/health/")
test("GET /health/", status == 200, f"status={status}")
backend_up = body.get("backend", {}).get("status") == "UP"
db_up = body.get("database", {}).get("status") == "UP"
test("  backend.status=UP", backend_up)
test("  database.status=UP", db_up)

# Incidents
status, body = http_get("/incidents/")
test("GET /incidents/", status == 200, f"status={status}")
test("  returns a list", isinstance(body, list), f"got {type(body).__name__}")

status, body = http_get("/incidents/active")
test("GET /incidents/active", status == 200, f"status={status}")

# Dashboard
status, body = http_get("/dashboard/summary")
test("GET /dashboard/summary", status == 200, f"status={status}")

status, body = http_get("/dashboard/statistics")
test("GET /dashboard/statistics", status == 200, f"status={status}")

status, body = http_get("/dashboard/devices")
test("GET /dashboard/devices", status == 200, f"status={status}")

# Notifications
status, body = http_get("/notifications/latest")
test("GET /notifications/latest", status == 200, f"status={status}")

# Metrics
status, body = http_get("/metrics/")
test("GET /metrics/", status == 200, f"status={status}")

# Telemetry - normal reading (should NOT trigger AI)
status, body = http_post("/telemetry/", {
    "device_id": "TEST-ARDUINO-01",
    "temperature": 25.0,
    "humidity": 50.0,
    "gas_level": 100.0,
    "smoke_detected": False,
    "battery_level": 90
}, timeout=5)
test("POST /telemetry/ (normal reading)", status == 200, f"status={status} body={body}")
test("  success=True", body.get("success") is True, f"body={body}")
test("  ai_triggered=False", body.get("ai_triggered") is False, f"body={body}")

# ──────────────────────────────────────────────────────────
print("\n========================================")
print("   ThinkLink WebSocket Tests")
print("========================================")

try:
    import websockets

    async def test_websocket():
        try:
            async with websockets.connect(WS_URL, open_timeout=5) as ws:
                test("WebSocket connect to /ws", True)

                # Should receive 3 initial state messages
                for i in range(3):
                    msg = await asyncio.wait_for(ws.recv(), timeout=3)
                    data = json.loads(msg)
                    t = data.get("type", "?")
                    test(f"  Initial state message {i+1}: type={t}", t in ("connections","actuator_states","ai_status"), f"type={t}")

                # Send actuator control command
                cmd = json.dumps({"type": "control_actuator", "data": {"key": "buzzer", "value": True}})
                await ws.send(cmd)

                # Should get broadcast back
                reply = await asyncio.wait_for(ws.recv(), timeout=3)
                data = json.loads(reply)
                test("WebSocket actuator round-trip", data.get("type") == "actuator_states", f"type={data.get('type')}")
                test("  buzzer=True in reply", data.get("data", {}).get("buzzer") is True, f"data={data}")
        except Exception as e:
            test("WebSocket test", False, str(e))

    asyncio.run(test_websocket())

except ImportError:
    print("  [SKIP] websockets library not installed. Run: pip install websockets")

# ──────────────────────────────────────────────────────────
print("\n========================================")
print(f"  TOTAL: {PASS} passed,  {FAIL} failed")
print("========================================\n")
sys.exit(0 if FAIL == 0 else 1)
