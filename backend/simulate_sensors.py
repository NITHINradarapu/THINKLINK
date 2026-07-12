import time
import requests
import random

# BACKEND_URL = "http://10.91.48.73:8000/telemetry/"
BACKEND_URL = "http://localhost:8000/telemetry/"

print("="*60)
print("       THINKLINK LIVE HARDWARE SENSOR SIMULATOR")
print("="*60)
print(f"Streaming real-time telemetry packets to:")
print(f"  {BACKEND_URL}")
print("Press Ctrl+C to stop.\n")

# Normal nominal baseline
temp = 25.0
gas = 120.0
humidity = 50.0

try:
    step = 0
    while True:
        step += 1
        
        # Small nominal fluctuations
        temp_reading = max(20.0, min(35.0, temp + random.uniform(-0.5, 0.5)))
        gas_reading = max(50.0, min(180.0, gas + random.uniform(-5.0, 5.0)))
        smoke_reading = False
        
        # Every 10th reading (30 seconds), trigger a critical anomaly to automatically invoke the AI Swarm!
        if step % 10 == 0:
            print("\n[!!] [Simulation] Triggering CRITICAL GAS & SMOKE Anomaly!")
            gas_reading = 650.0
            smoke_reading = True
            temp_reading = 82.4
        
        payload = {
            "device_id": "TEST-ARDUINO-01",
            "temperature": round(temp_reading, 2),
            "humidity": round(humidity, 2),
            "gas_level": round(gas_reading, 2),
            "smoke_detected": smoke_reading,
            "battery_level": 95
        }
        
        try:
            r = requests.post(BACKEND_URL, json=payload, timeout=45)
            response_data = r.json()
            
            # Print status log
            status_desc = "AI Swarm Invoked!" if response_data.get("ai_triggered") else "Nominal"
            print(f"[{time.strftime('%H:%M:%S')}] Send OK -> Temp: {payload['temperature']}°C, Gas: {payload['gas_level']} PPM, Smoke: {payload['smoke_detected']} | Pipeline State: {status_desc}")
            
        except Exception as e:
            print(f"[{time.strftime('%H:%M:%S')}] Connection failed (Is your backend uvicorn server running?): {e}")
            
        time.sleep(3)
except KeyboardInterrupt:
    print("\nSimulator stopped.")
