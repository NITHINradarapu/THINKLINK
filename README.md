# ThinkLink — Snapdragon Edge Industrial Safety Monitor

> **Hackathon Project** — Built for the Qualcomm Snapdragon AI PC Hackathon

ThinkLink is a real-time industrial safety monitoring system that bridges a **Snapdragon AI PC**, **Arduino Uno Q sensor node**, and a **React Native mobile app** through a FastAPI WebSocket backend.

---

## 📁 Repository Structure

```
THINKLINK/
├── frontend/        # React Native (Expo) mobile app
└── backend/         # FastAPI Python backend
```

---

## 🚀 Quick Start

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
cp .env.example .env        # Edit with your settings
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend
```bash
cd frontend
npm install
npm run start               # Expo dev server
```

Scan the QR code with **Expo Go** on your phone, or press `w` to open in browser.

---

## 🏗️ Architecture

```
Arduino Uno Q (Sensors)
       │  HTTP POST /telemetry/
       ▼
FastAPI Backend (:8000)
   ├── REST API  (incidents, dashboard, metrics)
   ├── WebSocket (/ws) ──────────────── Real-time push to mobile
   └── AI Pipeline (Ollama LLM)  ──── Risk analysis & incident generation
       │
       ▼
React Native App (Expo)
   ├── Home Dashboard     — system health, device status
   ├── Sensors            — live telemetry (temp, gas, vibration)
   ├── Analytics          — historical graphs
   ├── Incidents          — AI-generated hazard log
   └── Controls           — actuator commands (buzzer, LED, relay)
```

---

## 🔌 Arduino Uno Q Integration

Connect a **DHT22** (temp/humidity), **MQ-2** (gas/smoke), and **SW-420** (vibration) to the Arduino. The sketch at `backend/arduino/ThinkLink_ArduinoUnoQ.ino` sends sensor readings to the backend every 3 seconds over WiFi.

See [`arduino_integration_guide.md`](./backend/arduino_integration_guide.md) for full wiring instructions.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | React Native + Expo |
| Backend | FastAPI (Python) |
| Real-time | Native WebSocket |
| Database | SQLite (via SQLAlchemy) |
| AI | Ollama (local LLM) |
| Sensor Node | Arduino Uno Q (Qualcomm QCC743) |

---

## ⚙️ Environment Variables

Copy `backend/.env.example` to `backend/.env` and configure:

```env
DATABASE_URL=sqlite:///./thinklink.db
AI_SERVICE_URL=http://localhost:11434/api/generate
TEMP_THRESHOLD=80.0
GAS_THRESHOLD=300.0
```

---

## 📄 License

MIT — built for educational and hackathon purposes.
