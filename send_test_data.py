import urllib.request
import json
import time
import sys

URL = "http://localhost:8000/telemetry/"

def send_data(payload):
    req = urllib.request.Request(
        URL,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode('utf-8'))
            print(f"Sent: Temp={payload.get('temperature')}°C, Gas={payload.get('gas_level')} ppm. Response Success={res.get('success')}, Risk={res.get('risk_level')}, Message={res.get('message')}")
    except Exception as e:
        print(f"Failed to send data: {e}", file=sys.stderr)

if __name__ == "__main__":
    print("ThinkLink Simulation Test Script")
    print("================================")
    print("This script will send a sequence of telemetry data to your backend.")
    print("Open http://localhost:8082 in your browser to see the live updates.\n")
    
    # 1. Nominal Safe Telemetry
    print("Step 1: Sending nominal telemetry (All Systems Safe)...")
    safe_payload = {
        "device_id": "ARDUINO-01",
        "temperature": 24.5,
        "humidity": 48.0,
        "gas_level": 110.0,
        "smoke_detected": False,
        "battery_level": 98,
        "vibration": 0.05
    }
    send_data(safe_payload)
    time.sleep(4)

    # 2. Temperature Spike (Warning)
    print("\nStep 2: Simulating temperature spike (Overheat)...")
    overheat_payload = {
        "device_id": "ARDUINO-01",
        "temperature": 86.4,
        "humidity": 30.0,
        "gas_level": 120.0,
        "smoke_detected": False,
        "battery_level": 95,
        "vibration": 0.08
    }
    send_data(overheat_payload)
    time.sleep(6)

    # 3. Gas Leak & Smoke Hazard (Danger)
    print("\nStep 3: Simulating gas leak + smoke hazard (Critical)...")
    gas_payload = {
        "device_id": "ARDUINO-01",
        "temperature": 32.1,
        "humidity": 55.0,
        "gas_level": 420.0,
        "smoke_detected": True,
        "battery_level": 90,
        "vibration": 0.06
    }
    send_data(gas_payload)
    time.sleep(6)

    # 4. Reset to nominal
    print("\nStep 4: Resetting system to normal...")
    reset_payload = {
        "device_id": "ARDUINO-01",
        "temperature": 23.5,
        "humidity": 48.0,
        "gas_level": 110.0,
        "smoke_detected": False,
        "battery_level": 98,
        "vibration": 0.05
    }
    send_data(reset_payload)
    
    print("\nTest completed successfully!")
