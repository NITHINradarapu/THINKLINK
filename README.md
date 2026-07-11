# ThinkLink — Snapdragon Edge Industrial Safety Monitor

> **Hackathon Project** — Built for the Qualcomm Snapdragon AI PC Hackathon

ThinkLink is an advanced, offline-first real-time industrial safety monitoring system that bridges a **Snapdragon AI PC** (running a local multi-agent swarm), **IoT sensors (or simulated sensor nodes)**, and a **React Native mobile app** via a FastAPI WebSocket backend.

---

## 🌟 Key Features

* **Multi-Agent Swarm**: Features a 3-stage collaborative agent pipeline running locally on Phi-3, Faster-Whisper, and BLIP:
  * **Input Agent**: Multimodal parser supporting **Telemetry** (IoT JSON), **Audio** (voice transcripts via Whisper), **Images** (machine photos via BLIP), or **Combined Sensor Fusion**.
  * **Supervisor Agent**: Domain router classifying safety anomalies into Lithography, Deposition, Quality, or Packaging departments.
  * **Domain Experts**: Contextual RAG diagnostic agents querying local ChromaDB vector databases for manuals and safety specifications, returning structured incident JSON.
* **Offline-First & Local AI**: Designed for secure factory networks with local execution of Phi-3-mini on Snapdragon CPU using ONNX Runtime GenAI, local Faster-Whisper, and local BLIP, with automatic fallback to Ollama services.
* **Real-time Telemetry Pipeline**: Continuous ingestion of machine sensor data (temperature, gas levels, vibration, humidity), automatic threshold alerts, and real-time push to the mobile dashboard via WebSockets.
* **Network Diagnoser**: Auto-detects local network configurations to easily pair mobile devices to the host PC backend.
* **Simulators**: Interactive test scripts to stream nominal telemetry or inject hazard anomalies (e.g. gas leak, overheating) to validate the pipeline.

---

## 📁 Repository Structure

```
THINKLINK/
├── backend/                  # FastAPI Python backend & AI engines
│   ├── app/                  # Main application package
│   │   ├── agents/           # Multi-Agent Swarm (master orchestrator)
│   │   ├── api/              # FastAPI Router endpoints
│   │   ├── services/         # Telemetry pipeline & orchestrator services
│   │   └── database/         # SQLite DB schemas and initializations
│   ├── get_ip.py             # Network helper to configure mobile API base
│   ├── simulate_sensors.py   # Continuous telemetry simulator (with periodic anomalies)
│   └── thinklink_knowledge/  # ChromaDB persistent vector database directory
├── frontend/                 # React Native (Expo) mobile app
│   ├── src/screens/          # App views (Dashboard, Settings, Incidents)
│   └── src/context/          # Telemetry Context for WebSocket status updates
└── send_test_data.py         # Static simulation script for API flow checks
```

---

## 🚀 Quick Start

### 1. Backend Setup

Ensure you have Python 3.10+ installed.

```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows PowerShell
pip install -r requirements.txt
cp .env.example .env        # Configure thresholds and AI URL
```

#### Running the Backend
Start the FastAPI server:
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

### 2. Network Configuration & Device Pairing

Since the React Native app runs on a mobile device, it needs to connect to the PC running the backend. 
Run the ThinkLink Network Diagnoser script to find the correct IP address:

```bash
cd backend
python get_ip.py
```

This will print the host PC's recommended local Wi-Fi IP address. Copy the recommended URL (e.g., `http://192.168.1.100:8000`) and paste it into the **Settings Screen** of your mobile application to pair them immediately.

---

### 3. Frontend Setup

Ensure you have Node.js installed.

```bash
cd frontend
npm install
npm run start               # Launch Expo Dev Server
```

Scan the printed QR code with **Expo Go** on your iOS/Android phone, or press `w` to open the app in a web browser.

---

### 4. Telemetry Simulation

To feed live sensor data and test the AI pipeline without physical hardware:

* **Live Streaming Simulator**: Streams telemetry packets every 3 seconds and triggers a critical gas/smoke anomaly every 10th packet to invoke the AI Swarm:
  ```bash
  cd backend
  python simulate_sensors.py
  ```

* **Step-by-Step Scenario Script**: Sends static steps (Nominal -> Overheating -> Critical Gas -> Normal Reset) to verify threshold transitions:
  ```bash
  python send_test_data.py
  ```

---

## 🏗️ System Architecture

```
                                  ┌─────────────────────────────┐
                                  │   Multi-Modal Worker Inputs │
                                  │  (Telemetry, Voice, Photo)  │
                                  └──────────────┬──────────────┘
                                                 │
                                                 ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Snapdragon AI PC (FastAPI Backend)                                                      │
│                                                                                         │
│   ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│   │ ThinkLink Multi-Agent Swarm (Phi-3 Engine / Ollama Fallback)                    │   │
│   │                                                                                 │   │
│   │  [Input Agent] ──► [Supervisor Agent] ──► [Domain Expert Agent] (RAG)           │   │
│   │  (Translate)        (Score & Route)       ┌────────────────────────┐            │   │
│   │                                           │  ChromaDB Vector DB    │            │   │
│   │                                           │ (Litho, Depo, Quality, │            │   │
│   │                                           │  Packaging manuals)    │            │   │
│   │                                           └────────────────────────┘            │   │
│   └───────────────────────────────────────┬─────────────────────────────────────────┘   │
│                                           │ Produces Structured Diagnostic JSON         │
│                                           ▼                                             │
│   ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│   │ Telemetry Pipeline & WebSocket Manager                                          │   │
│   └───────────────────────────────────────┬─────────────────────────────────────────┘   │
└───────────────────────────────────────────┼─────────────────────────────────────────────┘
                                            │ Real-time WebSocket Frame Push
                                            ▼
                                  ┌───────────────────┐
                                  │ React Native App  │
                                  │ (Dashboard/Alerts)│
                                  └───────────────────┘
```

---

## 🤖 Swarm Agents

1. **Input Translation Agent**: Standardizes raw telemetry, audio voice transcripts (via Faster-Whisper), or device photos (via BLIP) into a unified semantic factory alert string.
2. **Supervisor Agent**: A high-speed router. Analyzes the alert using a keyword scoring matrix mapping to factory domains, falling back to a zero-shot LLM classification.
3. **Domain Experts (RAG)**: Four specialized agents (`LITHOGRAPHY`, `DEPOSITION`, `QUALITY`, `PACKAGING`) that fetch matching operating procedures from ChromaDB, synthesize telemetry with context, and output structured diagnostic JSON.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Mobile App** | React Native + Expo | Cross-platform dashboard & controls |
| **Backend** | FastAPI (Python) | High-performance API and WebSocket server |
| **Real-time** | WebSocket | Live telemetry & notification dispatch |
| **Database** | SQLite + SQLAlchemy | Persistent incident log and system audits |
| **LLM Engine** | Phi-3-mini-cpu (ONNX Runtime GenAI) | 3-stage local orchestrator and reasoner |
| **Audio Model** | Faster-Whisper (`base.en`) | High-speed local voice memo transcription |
| **Vision Model** | Salesforce BLIP Base | Under-1GB local image captioner for defect photos |
| **Vector DB** | ChromaDB | Local knowledge storage for semiconductor procedures |

---

## ⚙️ Environment Variables

Configure the backend behavior by editing `backend/.env`:

```env
DATABASE_URL=sqlite:///./thinklink.db
AI_SERVICE_URL=http://localhost:11434/api/generate  # Fallback Ollama service URL
TEMP_THRESHOLD=80.0                                 # High temperature alarm limit (°C)
GAS_THRESHOLD=300.0                                 # Hazardous gas level limit (PPM)
VIBRATION_THRESHOLD=0.5                             # Mechanical vibration alarm limit (G-force)
```

---

## 📄 License

MIT — built for educational and hackathon purposes.
