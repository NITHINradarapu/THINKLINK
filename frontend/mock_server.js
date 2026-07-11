const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const PORT = 3000;

// Application State
let sensorData = {
  temperature: 25.0,
  gas: 120.0,
  vibration: 0.1,
};

let connections = {
  pc: true,
  arduino: true,
  glasses: true,
};

let aiStatus = 'monitoring'; // 'monitoring' | 'analyzing' | 'resolved'
let latestEvent = 'All systems nominal. Reading industrial environment telemetry...';

let actuators = {
  buzzer: false,
  led: true,
  relay: false,
};

// Simulation settings
let activeAnomaly = null; // 'gas-leak' | 'overheat' | 'vibration-fault' | null

// Periodic telemetry generator
setInterval(() => {
  if (activeAnomaly === 'gas-leak') {
    // Escalate gas concentration
    sensorData.gas = Math.min(1000, sensorData.gas + Math.random() * 40 + 20);
    sensorData.temperature += (Math.random() - 0.5) * 0.5;
    sensorData.vibration += (Math.random() - 0.5) * 0.02;
  } else if (activeAnomaly === 'overheat') {
    // Escalate temperature
    sensorData.temperature = Math.min(80, sensorData.temperature + Math.random() * 3 + 1);
    sensorData.gas += (Math.random() - 0.5) * 2;
    sensorData.vibration += (Math.random() - 0.5) * 0.1;
  } else if (activeAnomaly === 'vibration-fault') {
    // Escalate vibration
    sensorData.vibration = Math.min(5, sensorData.vibration + Math.random() * 0.3 + 0.1);
    sensorData.temperature += (Math.random() - 0.5) * 0.2;
    sensorData.gas += (Math.random() - 0.5) * 1;
  } else {
    // Random walk in normal bounds
    sensorData.temperature = Math.max(20, Math.min(35, sensorData.temperature + (Math.random() - 0.5) * 0.4));
    sensorData.gas = Math.max(50, Math.min(200, sensorData.gas + (Math.random() - 0.5) * 5));
    sensorData.vibration = Math.max(0.05, Math.min(0.2, sensorData.vibration + (Math.random() - 0.5) * 0.01));
  }

  // Ensure positive values
  sensorData.vibration = Math.max(0, sensorData.vibration);
  sensorData.gas = Math.max(0, sensorData.gas);

  // Broadcast data
  io.emit('telemetry', sensorData);
  io.emit('connections', connections);
  io.emit('ai_status', { status: aiStatus, latestEvent });
}, 1000);

// Helper to trigger incident report
function triggerIncidentReport(type) {
  let report = {};
  
  if (type === 'gas-leak') {
    report = {
      id: `INC-${Date.now()}`,
      title: 'CRITICAL GAS LEAK',
      riskLevel: 'HIGH',
      confidence: 94.2,
      rootCause: 'Rupture in Safety Valve B4 (Zone 2)',
      consensus: 'Safety Agent: Immediate evacuation of Zone 2 recommended.\nCompliance: Violation of OSHA Title 29 imminent if alarm persists.\nBoiler Agent: Valve pressure is dropping rapidly, recommend emergency fuel shutoff.',
      actions: [
        { id: 'act-1', text: 'Shut down gas valve B4 manually', done: false },
        { id: 'act-2', text: 'Evacuate Zone 2 and sound site horn', done: false },
        { id: 'act-3', text: 'Activate mechanical ventilation system', done: false }
      ],
      timestamp: new Date().toLocaleTimeString(),
    };
    aiStatus = 'analyzing';
    latestEvent = 'High gas levels detected in Zone 2. Run supervisor diagnosis...';
  } else if (type === 'overheat') {
    report = {
      id: `INC-${Date.now()}`,
      title: 'BOILER OVERHEAT WARNING',
      riskLevel: 'HIGH',
      confidence: 88.7,
      rootCause: 'Coolant circulation blockage in Line 3A',
      consensus: 'Safety Agent: Thermal limits exceeded on boiler shell. High burn hazard.\nTurbine Agent: Reduce feed rate. Close secondary valves.\nMaintenance: Inspect coolant lines for obstruction immediately.',
      actions: [
        { id: 'act-1', text: 'Trigger auxiliary coolant pump', done: false },
        { id: 'act-2', text: 'Reduce boiler fire rate by 50%', done: false },
        { id: 'act-3', text: 'Verify temperature dropdown on telemetry', done: false }
      ],
      timestamp: new Date().toLocaleTimeString(),
    };
    aiStatus = 'analyzing';
    latestEvent = 'Boiler core heat exceeding threshold. Generating consensus...';
  } else if (type === 'vibration-fault') {
    report = {
      id: `INC-${Date.now()}`,
      title: 'MECHANICAL VIBRATION FAULT',
      riskLevel: 'WARNING',
      confidence: 82.5,
      rootCause: 'Bearing wear on Turbine Shaft #1',
      consensus: 'Safety Agent: No immediate explosion hazard, but high probability of structural damage.\nTurbine Agent: Active turbine speed mismatch. Recommend speed reduction.\nMaintenance: Bearing lubricant injection required.',
      actions: [
        { id: 'act-1', text: 'Inject bearing lubricant remotely', done: false },
        { id: 'act-2', text: 'Reduce turbine RPM to 1200', done: false },
        { id: 'act-3', text: 'Schedule maintenance check within 24 hours', done: false }
      ],
      timestamp: new Date().toLocaleTimeString(),
    };
    aiStatus = 'analyzing';
    latestEvent = 'Vibration anomalies detected on Turbine #1. Running diagnostics...';
  }

  // Send incident details after a brief agent consensus delay
  setTimeout(() => {
    if (activeAnomaly === type) {
      io.emit('new_incident', report);
      latestEvent = `AI Supervisor consensus generated: ${report.title}. Risk: ${report.riskLevel}.`;
    }
  }, 3000);
}

// DevTools routing to quiet internal Chrome debugging warnings
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.setHeader('Content-Security-Policy', "default-src 'self' http://localhost:3000");
  res.json({});
});

// REST Endpoints for triggering states manually
app.get('/trigger/gas-leak', (req, res) => {
  activeAnomaly = 'gas-leak';
  actuators.buzzer = true; // Arduino automatically triggers local safety action!
  triggerIncidentReport('gas-leak');
  res.json({ message: 'Anomaly triggered: Gas Leak', state: sensorData });
});

app.get('/trigger/overheat', (req, res) => {
  activeAnomaly = 'overheat';
  triggerIncidentReport('overheat');
  res.json({ message: 'Anomaly triggered: Boiler Overheat', state: sensorData });
});

app.get('/trigger/vibration-fault', (req, res) => {
  activeAnomaly = 'vibration-fault';
  triggerIncidentReport('vibration-fault');
  res.json({ message: 'Anomaly triggered: Mechanical Vibration Fault', state: sensorData });
});

app.get('/trigger/reset', (req, res) => {
  activeAnomaly = null;
  aiStatus = 'resolved';
  latestEvent = 'Anomaly resolved. Resetting sensors to default baseline.';
  actuators.buzzer = false;
  actuators.relay = false;
  
  setTimeout(() => {
    aiStatus = 'monitoring';
    latestEvent = 'All systems nominal. Reading industrial environment telemetry...';
  }, 4000);

  res.json({ message: 'Anomaly reset', state: sensorData });
});

app.get('/status', (req, res) => {
  res.json({ sensorData, connections, aiStatus, latestEvent, actuators });
});

// Socket.io event listeners
io.on('connection', (socket) => {
  console.log(`Mobile app connected: ${socket.id}`);
  
  // Send current state on connection
  socket.emit('telemetry', sensorData);
  socket.emit('connections', connections);
  socket.emit('ai_status', { status: aiStatus, latestEvent });
  socket.emit('actuator_states', actuators);

  // Command handlers from mobile screen
  socket.on('control_actuator', (data) => {
    console.log(`Received command to override hardware:`, data);
    const { key, value } = data;
    if (key in actuators) {
      actuators[key] = value;
      // Broadcast updated actuator states
      io.emit('actuator_states', actuators);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Mobile app disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`   ThinkLink Snapdragon AI PC Mock Server running!`);
  console.log(`   Listening on port http://localhost:${PORT}`);
  console.log(`======================================================`);
  console.log(`\nCommands to trigger anomaly scenarios:`);
  console.log(`  - Gas Leak:        curl http://localhost:${PORT}/trigger/gas-leak`);
  console.log(`  - Boiler Overheat: curl http://localhost:${PORT}/trigger/overheat`);
  console.log(`  - Vibration Fault: curl http://localhost:${PORT}/trigger/vibration-fault`);
  console.log(`  - Reset System:    curl http://localhost:${PORT}/trigger/reset`);
  console.log(`======================================================\n`);
});
