<p align="center">
  <img src="https://img.shields.io/badge/Snapdragon-FF6B00?style=for-the-badge&logo=qualcomm&logoColor=white" alt="Snapdragon"/>
  <img src="https://img.shields.io/badge/Expo_SDK_54-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/>
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.IO"/>
</p>

# 🔗 ThinkLink — Snapdragon Edge Control Portal

**ThinkLink** is a real-time industrial safety monitoring and control application built with React Native (Expo). It serves as the mobile command interface for operators to monitor IoT sensor telemetry streamed from a **Qualcomm Snapdragon AI PC**, receive AI-generated incident reports driven by a multi-agent supervisor system, and remotely control industrial actuators — all from the palm of their hand.

> Built for the **Qualcomm Snapdragon Hackathon** — demonstrating Edge AI-powered industrial safety using on-device inference, real-time IoT telemetry, and Vision-Language Model integration via Meta AI Smart Glasses.

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [App Screens](#-app-screens)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Mock Server & Anomaly Simulation](#-mock-server--anomaly-simulation)
- [Configuration](#-configuration)
- [License](#-license)

---

## 🔍 Problem Statement

Industrial environments such as boiler rooms, chemical plants, and manufacturing floors are prone to hazardous events — gas leaks, overheating machinery, and mechanical faults. Traditional SCADA systems are rigid, desktop-bound, and lack intelligent anomaly reasoning. Operators need a **mobile-first, AI-augmented control portal** that provides:

- Real-time sensor visibility on the move
- Automated hazard detection with root-cause analysis
- Remote actuator control for emergency response
- Visual inspection capabilities via smart glasses

---

## 💡 Solution Overview

ThinkLink bridges the gap between **edge AI inference** (running on a Snapdragon AI PC) and the **mobile operator experience**. The system pipeline works as follows:

```
Arduino Sensors ──► Snapdragon AI PC ──► ThinkLink Mobile App
   (IoT Data)        (Edge Inference)      (Operator Portal)
                          │
                    Meta AI Glasses
                   (VLM Inspection)
```

1. **Arduino** collects environmental telemetry (temperature, gas, vibration) and sends it to the Snapdragon AI PC via serial.
2. **Snapdragon AI PC** runs edge-level AI agents (Safety Agent, Maintenance Agent, Compliance Agent) that monitor sensor streams, detect anomalies, and produce consensus-based incident reports.
3. **ThinkLink Mobile App** connects to the AI PC over WebSocket (Socket.IO), renders real-time dashboards, surfaces emergency alerts, and allows operators to toggle actuators (buzzers, LEDs, isolation relays).
4. **Meta AI Smart Glasses** provide a camera feed for Vision-Language Model (VLM) based visual inspections of valves, joints, and equipment.

---

## ✨ Key Features

### 🏠 Home Dashboard
- System health score with animated status indicator (Nominal / Warning / Critical)
- Live sensor ticker showing temperature, gas, and vibration readings
- Device connectivity status for AI PC, Arduino, and Smart Glasses
- AI Supervisor status with terminal-style event log
- Quick-navigation cards to all app sections

### 📊 Real-Time Sensor Telemetry
- Live-updating sensor cards for temperature (°C), gas concentration (PPM), and vibration (G-force)
- Rolling 20-point historical chart rendered with a custom bar-graph visualization
- Color-coded status indicators: green (normal), yellow (warning), red (danger)
- Connection status banner showing PC, Arduino, and glasses link state

### 📈 Analytics
- Interactive sensor selector to toggle between temperature, gas, and vibration views
- Statistical breakdown: current, average, min, max, and standard deviation
- Trend bar chart with warning/danger threshold lines
- Alert distribution timeline and incident severity breakdown
- Historical incident log correlated with telemetry data

### 🚨 Emergency Incident System
- **Full-screen emergency modal** with flashing hazard animation on critical events
- AI-generated incident reports with:
  - Risk level classification (HIGH / WARNING / INFO)
  - Confidence score from the multi-agent consensus
  - Probable root cause identification
  - Multi-agent consensus breakdown (Safety Agent, Compliance Agent, Maintenance Agent)
  - Actionable checklist with toggleable items
- One-tap "Resolve" action that resets the system via the AI PC

### 🎛️ Remote Actuator Controls
- Toggle switches for **Alarm Buzzer**, **Status LED**, and **Isolation Relay**
- Confirmation dialog for high-risk relay activation (machinery shutdown)
- Haptic feedback on all control interactions
- Real-time sync of actuator states from the server

### ⚙️ Settings & Configuration
- Configurable server IP address to connect to any Snapdragon AI PC on the network
- Quick-connect presets for common development targets (localhost, LAN IP, emulator)
- Live connection status indicator
- Reset to defaults and onboarding replay

### 🎬 Onboarding
- Animated multi-slide onboarding flow introducing all system capabilities
- Covers: IoT telemetry, VLM camera link, and multi-agent consensus features

---

## 🏗 System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    ThinkLink Mobile App                   │
│                  (React Native / Expo)                    │
│                                                          │
│  ┌────────────┐ ┌────────────┐ ┌────────────────────┐   │
│  │ HomeScreen │ │ Dashboard  │ │  AnalyticsScreen   │   │
│  │            │ │  Screen    │ │                    │   │
│  └────────────┘ └────────────┘ └────────────────────┘   │
│  ┌────────────┐ ┌────────────┐ ┌────────────────────┐   │
│  │ Incidents  │ │  Controls  │ │  SettingsScreen    │   │
│  │  Screen    │ │  Screen    │ │                    │   │
│  └────────────┘ └────────────┘ └────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │           TelemetryContext (State Manager)        │   │
│  │      Socket.IO Client  ←→  WebSocket Connection  │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────┬───────────────────────────────┘
                           │  WebSocket (Socket.IO)
                           ▼
┌──────────────────────────────────────────────────────────┐
│              Snapdragon AI PC (Edge Server)               │
│                                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐   │
│  │ Safety Agent│  │Turbine Agent │  │Compliance Agt │   │
│  └─────────────┘  └──────────────┘  └───────────────┘   │
│            │              │                │              │
│            ▼              ▼                ▼              │
│       ┌─────────────────────────────────────────┐        │
│       │       AI Supervisor (Consensus)          │        │
│       └─────────────────────────────────────────┘        │
│                          │                               │
│    ┌─────────────────────┴─────────────────────┐         │
│    ▼                                           ▼         │
│  Arduino (Serial)                    Meta AI Glasses     │
│  • Temperature Sensor                • VLM Camera Feed   │
│  • Gas Sensor (MQ-2)                 • Visual Inspection │
│  • Vibration Sensor                                      │
│  • Buzzer / LED / Relay                                  │
└──────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Mobile Framework** | React Native 0.81.5 via Expo SDK 54 |
| **Language** | TypeScript 6.0 |
| **Navigation** | React Navigation 7 (Bottom Tabs) |
| **Real-Time Comms** | Socket.IO Client 4.8 |
| **Haptic Feedback** | expo-haptics |
| **Icons** | @expo/vector-icons (Ionicons) |
| **State Management** | React Context API (TelemetryContext) |
| **Mock Server** | Express 5 + Socket.IO Server |
| **Edge AI Runtime** | Qualcomm Snapdragon AI PC (production) |

---

## 📱 App Screens

| Screen | Description |
|---|---|
| **Onboarding** | Animated intro slides explaining system capabilities |
| **Home** | Central dashboard with health score, live ticker, and quick nav |
| **Sensors** | Real-time sensor cards with rolling historical chart |
| **Analytics** | Statistical analysis, trend charts, and alert distribution |
| **Incidents** | AI-generated incident reports with multi-agent consensus |
| **Controls** | Remote actuator toggles (buzzer, LED, relay) with haptics |
| **Settings** | Server IP configuration and connection management |

---

## 📂 Project Structure

```
THINKLINK_FRONTEND/
├── App.tsx                           # Root component (providers + navigator)
├── index.ts                          # Expo entry point
├── app.json                          # Expo configuration
├── package.json                      # Dependencies and scripts
├── mock_server.js                    # Development mock server with anomaly simulation
├── tsconfig.json                     # TypeScript configuration
├── assets/                           # App icons and splash images
│
└── src/
    ├── components/
    │   ├── ConnectionStatus.tsx       # Device connectivity status banner
    │   ├── EmergencyModal.tsx         # Full-screen hazard alert modal
    │   ├── SensorCard.tsx             # Individual sensor display card
    │   └── SupervisorBanner.tsx       # AI supervisor status + terminal log
    │
    ├── context/
    │   └── TelemetryContext.tsx       # Global state: socket, sensors, incidents, actuators
    │
    ├── navigation/
    │   └── AppNavigator.tsx           # Bottom tab navigator with all screen routes
    │
    ├── screens/
    │   ├── HomeScreen.tsx             # Main dashboard with health score
    │   ├── DashboardScreen.tsx        # Live sensor telemetry view
    │   ├── AnalyticsScreen.tsx        # Statistical analysis and charts
    │   ├── IncidentsScreen.tsx        # Incident reports and action checklists
    │   ├── ControlsScreen.tsx         # Remote actuator control panel
    │   ├── SettingsScreen.tsx         # Server IP and connection settings
    │   └── OnboardingScreen.tsx       # First-launch onboarding flow
    │
    └── theme/
        └── theme.ts                  # Design tokens: colors, spacing, typography
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**
- **Expo CLI** (`npx expo`)
- **Android/iOS device** or emulator for testing

### Installation

```bash
# Clone the repository
git clone https://github.com/NITHINradarapu/THINKLINK_FRONTEND.git
cd THINKLINK_FRONTEND

# Install dependencies
npm install
```

### Running the App

```bash
# Start the Expo development server
npx expo start

# Run on specific platforms
npm run android    # Android device/emulator
npm run ios        # iOS Simulator (macOS only)
npm run web        # Web browser
```

### Running the Mock Server

The included mock server simulates the Snapdragon AI PC backend, generating fake telemetry data and supporting anomaly triggers for development:

```bash
# Start the mock server (runs on port 3000)
node mock_server.js
```

> **Note:** The app will automatically connect to `localhost:3000` on iOS/web or `10.0.2.2:3000` on Android emulators. You can change this in the Settings screen.

---

## 🧪 Mock Server & Anomaly Simulation

The mock server provides REST endpoints to simulate industrial anomaly scenarios:

| Endpoint | Description |
|---|---|
| `GET /trigger/gas-leak` | Simulates escalating gas concentration with a critical incident report |
| `GET /trigger/overheat` | Simulates boiler overheating with rising temperature |
| `GET /trigger/vibration-fault` | Simulates mechanical vibration fault on turbine bearings |
| `GET /trigger/reset` | Resolves active anomaly and resets sensors to baseline |
| `GET /status` | Returns current system state (sensors, connections, AI status) |

### Example Usage

```bash
# Trigger a gas leak scenario
curl http://localhost:3000/trigger/gas-leak

# Watch the emergency modal appear on the app, then resolve it
curl http://localhost:3000/trigger/reset
```

When an anomaly is triggered:
1. Sensor values begin escalating in real-time
2. After a 3-second "AI consensus" delay, an incident report is broadcast
3. The app displays a full-screen emergency modal with flashing hazard animation
4. The operator can view the detailed report, check off safety actions, and resolve the incident

---

## ⚙️ Configuration

### Server IP

By default, the app connects to:
- **Android Emulator:** `http://10.0.2.2:3000`
- **iOS Simulator / Web:** `http://localhost:3000`

To connect to a physical Snapdragon AI PC or a remote server, navigate to the **Settings** screen and enter the target IP address (e.g., `http://192.168.1.100:3000`).

### Theme Customization

The app's visual design is centralized in [`src/theme/theme.ts`](src/theme/theme.ts). Modify the `COLORS`, `SPACING`, and `TYPOGRAPHY` exports to customize the look and feel:

```typescript
export const COLORS = {
  background: '#121214',     // App background
  surface: '#1C1C1E',        // Card surfaces
  primary: '#FF6B00',        // Brand accent (Snapdragon Orange)
  success: '#00E676',        // Safety green
  warning: '#FFD600',        // Warning yellow
  danger: '#FF1744',         // Emergency red
  // ...
};
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <b>ThinkLink</b> — Bringing Edge AI intelligence to industrial safety, one operator at a time.
  <br/>
  Built with ❤️ for the <b>Qualcomm Snapdragon Hackathon</b>
</p>
