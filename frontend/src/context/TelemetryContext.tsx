import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import { api, setApiBaseUrl, getApiBaseUrl, mapIncidentResponseToReport, ApiError } from '../services/api';
import type { IncidentResponse, DashboardSummary, DashboardStatistics, RiskDistribution, NotificationPayload } from '../services/types';

// ─── Frontend Data Interfaces ────────────────────────────────

export interface TelemetryData {
  temperature: number;
  gas: number;
  vibration: number;
  humidity: number;
  smoke_detected: boolean;
  battery_level: number;
}

export interface HistoricalReading {
  timestamp: string;
  temperature: number;
  gas: number;
  vibration: number;
}

export interface ConnectionState {
  pc: boolean;
  arduino: boolean;
  glasses: boolean;
}

export interface AIStatus {
  status: 'monitoring' | 'analyzing' | 'resolved';
  latestEvent: string;
}

export interface ActuatorState {
  buzzer: boolean;
  led: boolean;
  relay: boolean;
}

export interface IncidentReport {
  id: string;
  title: string;
  riskLevel: 'HIGH' | 'WARNING' | 'INFO';
  confidence: number;
  rootCause: string;
  consensus: string;
  actions: { id: string; text: string; done: boolean }[];
  timestamp: string;
  // Backend-specific fields (available when fetched from REST API)
  _backend?: {
    incident_id: string;
    device_id: string;
    device_type: string;
    status: string;
    sensor_snapshot: Record<string, any>;
    created_at: string;
  };
}

interface TelemetryContextProps {
  // Connection state
  socketConnected: boolean;
  backendConnected: boolean;
  serverIp: string;
  apiBaseUrl: string;
  connections: ConnectionState;

  // Sensor data
  sensorData: TelemetryData;
  telemetryHistory: HistoricalReading[];

  // AI & Status
  aiStatus: AIStatus;
  actuators: ActuatorState;

  // Incidents
  activeIncident: IncidentReport | null;
  historicalIncidents: IncidentReport[];

  // Dashboard data from backend
  dashboardSummary: DashboardSummary | null;
  dashboardStatistics: DashboardStatistics | null;
  riskDistribution: RiskDistribution | null;
  latestNotification: NotificationPayload | null;

  // Onboarding
  showOnboarding: boolean;
  setShowOnboarding: (val: boolean) => void;

  // Actions
  updateServerIp: (ip: string) => void;
  updateApiBaseUrl: (url: string) => void;
  triggerActuator: (key: keyof ActuatorState, value: boolean) => void;
  toggleActionItem: (actionId: string) => void;
  clearActiveIncident: () => void;

  // Backend API actions
  refreshIncidents: () => Promise<void>;
  refreshDashboard: () => Promise<void>;
  resolveIncidentById: (incidentId: string) => Promise<void>;
  checkBackendHealth: () => Promise<boolean>;
  analyzeWithAI: (params: { telemetry?: string; image?: any; audio?: any }) => Promise<any>;
}

const TelemetryContext = createContext<TelemetryContextProps | undefined>(undefined);

// Default Socket.IO URL (mock server)
const DEFAULT_SOCKET_IP = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
// Default REST API URL (FastAPI backend)
const DEFAULT_API_URL = Platform.OS === 'android' ? 'http://10.91.62.164:8000' : 'http://localhost:8000';

// Helper to pre-populate mock historical telemetry data
const generateInitialHistory = (): HistoricalReading[] => {
  const history: HistoricalReading[] = [];
  const now = new Date();
  for (let i = 19; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3000);
    history.push({
      timestamp: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      temperature: 23.5 + Math.random() * 1.5,
      gas: 110.0 + Math.random() * 15,
      vibration: 0.08 + Math.random() * 0.04,
    });
  }
  return history;
};

// ─── Polling interval (ms) ───────────────────────────────────
const DASHBOARD_POLL_INTERVAL = 10_000;  // 10s
const INCIDENTS_POLL_INTERVAL = 5_000;   // 5s
const NOTIFICATION_POLL_INTERVAL = 8_000; // 8s

const getWebSocketUrl = (httpUrl: string): string => {
  let wsUrl = httpUrl.replace(/^http:/, 'ws:').replace(/^https:/, 'wss:');
  return `${wsUrl}/ws`;
};

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  // ── Connection URLs ─────────────────────────────────────
  const [serverIp, setServerIp] = useState<string>(DEFAULT_SOCKET_IP);
  const [apiBaseUrl, setApiBaseUrlState] = useState<string>(DEFAULT_API_URL);

  // ── Connection states ───────────────────────────────────
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [backendConnected, setBackendConnected] = useState<boolean>(false);

  const [connections, setConnections] = useState<ConnectionState>({
    pc: false,
    arduino: false,
    glasses: false,
  });

  // ── Sensor data ─────────────────────────────────────────
  const [sensorData, setSensorData] = useState<TelemetryData>({
    temperature: 0.0,
    gas: 0.0,
    vibration: 0.0,
    humidity: 0.0,
    smoke_detected: false,
    battery_level: 0,
  });

  const [telemetryHistory, setTelemetryHistory] = useState<HistoricalReading[]>(generateInitialHistory);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);

  // ── AI status ───────────────────────────────────────────
  const [aiStatus, setAiStatus] = useState<AIStatus>({
    status: 'monitoring',
    latestEvent: 'Connecting to backend...',
  });

  // ── Actuators ───────────────────────────────────────────
  const [actuators, setActuators] = useState<ActuatorState>({
    buzzer: false,
    led: false,
    relay: false,
  });

  // ── Incidents ───────────────────────────────────────────
  const [activeIncident, setActiveIncident] = useState<IncidentReport | null>(null);
  const [historicalIncidents, setHistoricalIncidents] = useState<IncidentReport[]>([]);

  // ── Dashboard data from backend ─────────────────────────
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary | null>(null);
  const [dashboardStatistics, setDashboardStatistics] = useState<DashboardStatistics | null>(null);
  const [riskDistribution, setRiskDistribution] = useState<RiskDistribution | null>(null);
  const [latestNotification, setLatestNotification] = useState<NotificationPayload | null>(null);

  const wsRef = useRef<WebSocket | null>(null);

  // ────────────────────────────────────────────────────────
  // 1. Native WebSocket connection (real-time telemetry channel)
  // ────────────────────────────────────────────────────────
  useEffect(() => {
    const wsUrl = getWebSocketUrl(apiBaseUrl);
    console.log(`[WebSocket] Connecting to: ${wsUrl}`);

    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('[WebSocket] Connected to ThinkLink server');
      setSocketConnected(true);
      setConnections(prev => ({ ...prev, pc: true }));
    };

    ws.onclose = () => {
      console.log('[WebSocket] Disconnected');
      setSocketConnected(false);
      setConnections({ pc: false, arduino: false, glasses: false });
      setAiStatus({
        status: 'monitoring',
        latestEvent: 'WebSocket connection lost.',
      });
    };

    ws.onerror = (error) => {
      console.log('[WebSocket] Connection error:', error);
      setSocketConnected(false);
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const { type, data } = payload;

        if (type === 'telemetry') {
          setSensorData(prev => ({
            temperature: data.temperature ?? prev.temperature,
            gas: data.gas ?? data.gas_level ?? prev.gas,
            vibration: data.vibration ?? prev.vibration,
            humidity: data.humidity ?? prev.humidity,
            smoke_detected: data.smoke_detected ?? prev.smoke_detected,
            battery_level: data.battery_level ?? prev.battery_level,
          }));
          setTelemetryHistory(prev => {
            const newReading: HistoricalReading = {
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              temperature: data.temperature ?? 0,
              gas: data.gas ?? data.gas_level ?? 0,
              vibration: data.vibration ?? 0,
            };
            const updated = [...prev, newReading];
            return updated.length > 20 ? updated.slice(updated.length - 20) : updated;
          });
        } else if (type === 'connections') {
          setConnections(data);
        } else if (type === 'ai_status') {
          setAiStatus(data);
        } else if (type === 'actuator_states') {
          setActuators(data);
        } else if (type === 'new_incident') {
          let report: IncidentReport;
          if (data.incident_id) {
            report = mapIncidentResponseToReport(data as IncidentResponse);
          } else {
            report = data as IncidentReport;
          }
          setActiveIncident(report);
          setHistoricalIncidents(prev => {
            if (prev.some(item => item.id === report.id)) return prev;
            return [report, ...prev];
          });
        }
      } catch (err) {
        console.error('[WebSocket] Error parsing message:', err);
      }
    };

    return () => {
      ws.close();
    };
  }, [apiBaseUrl]);

  // ────────────────────────────────────────────────────────
  // 2. Backend health check on startup / URL change
  // ────────────────────────────────────────────────────────
  const checkBackendHealth = useCallback(async (): Promise<boolean> => {
    try {
      const result = await api.health();
      console.log('[API] Backend health check OK:', result);
      setBackendConnected(true);
      return true;
    } catch (err) {
      console.log('[API] Backend health check FAILED:', err);
      setBackendConnected(false);
      return false;
    }
  }, []);

  useEffect(() => {
    setApiBaseUrl(apiBaseUrl);
    checkBackendHealth();
  }, [apiBaseUrl, checkBackendHealth]);

  // ────────────────────────────────────────────────────────
  // 3. REST API Polling — Dashboard & Incidents
  // ────────────────────────────────────────────────────────

  // Dashboard polling
  const refreshDashboard = useCallback(async () => {
    try {
      const [summary, statistics, risk, devices] = await Promise.allSettled([
        api.getDashboardSummary(),
        api.getDashboardStatistics(),
        api.getRiskDistribution(),
        api.getDashboardDevices(),
      ]);

      if (summary.status === 'fulfilled') {
        setDashboardSummary(summary.value);
      }
      if (statistics.status === 'fulfilled') {
        setDashboardStatistics(statistics.value);
      }
      if (risk.status === 'fulfilled') {
        setRiskDistribution(risk.value);
      }
      if (devices.status === 'fulfilled' && Array.isArray(devices.value)) {
        // Map backend device status to connection state
        const deviceList = devices.value;
        setConnections(prev => {
          const newConnections = { ...prev };
          for (const device of deviceList) {
            const id = device.device_id?.toLowerCase() || '';
            const isOnline = device.status === 'online' || device.status === 'active';
            if (id.includes('arduino')) {
              newConnections.arduino = isOnline;
            } else if (id.includes('glasses') || id.includes('meta')) {
              newConnections.glasses = isOnline;
            } else if (id.includes('pc') || id.includes('snapdragon')) {
              newConnections.pc = isOnline;
            }
          }
          return newConnections;
        });
      }

      setBackendConnected(true);
    } catch (err) {
      console.log('[API] Dashboard refresh failed:', err);
      // Don't set backendConnected false on polling failure — it might be transient
    }
  }, []);

  // Incidents polling
  const refreshIncidents = useCallback(async () => {
    try {
      const [allIncidents, activeIncidents] = await Promise.allSettled([
        api.getIncidents(),
        api.getActiveIncidents(),
      ]);

      if (allIncidents.status === 'fulfilled' && Array.isArray(allIncidents.value)) {
        const mapped = allIncidents.value.map(mapIncidentResponseToReport);
        setHistoricalIncidents(mapped);
      }

      if (activeIncidents.status === 'fulfilled' && Array.isArray(activeIncidents.value)) {
        if (activeIncidents.value.length > 0) {
          const latestActive = mapIncidentResponseToReport(activeIncidents.value[0]);
          setActiveIncident(latestActive);
          setAiStatus({ status: 'analyzing', latestEvent: `Active incident: ${latestActive.title}` });
        } else {
          // No active incidents from backend
          // Only clear if we don't have a socket-pushed incident
          if (activeIncident?._backend) {
            setActiveIncident(null);
            setAiStatus({ status: 'monitoring', latestEvent: 'All systems nominal.' });
          }
        }
      }
    } catch (err) {
      console.log('[API] Incidents refresh failed:', err);
    }
  }, [activeIncident]);

  // Notification polling
  const refreshNotifications = useCallback(async () => {
    try {
      const notification = await api.getLatestNotification();
      if (notification) {
        setLatestNotification(notification);
      }
    } catch (err) {
      // Silently ignore — notifications are optional
    }
  }, []);

  // Start polling timers when backend is connected
  useEffect(() => {
    if (!backendConnected) return;

    // Initial fetch
    refreshDashboard();
    refreshIncidents();
    refreshNotifications();

    const dashboardTimer = setInterval(refreshDashboard, DASHBOARD_POLL_INTERVAL);
    const incidentsTimer = setInterval(refreshIncidents, INCIDENTS_POLL_INTERVAL);
    const notificationTimer = setInterval(refreshNotifications, NOTIFICATION_POLL_INTERVAL);

    return () => {
      clearInterval(dashboardTimer);
      clearInterval(incidentsTimer);
      clearInterval(notificationTimer);
    };
  }, [backendConnected, refreshDashboard, refreshIncidents, refreshNotifications]);

  // ────────────────────────────────────────────────────────
  // 4. Action Handlers
  // ────────────────────────────────────────────────────────

  const updateServerIp = useCallback((ip: string) => {
    let cleanIp = ip.trim();
    if (!cleanIp.startsWith('http://') && !cleanIp.startsWith('https://')) {
      cleanIp = `http://${cleanIp}`;
    }
    setServerIp(cleanIp);
  }, []);

  const updateApiBaseUrlHandler = useCallback((url: string) => {
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `http://${cleanUrl}`;
    }
    cleanUrl = cleanUrl.replace(/\/+$/, '');
    setApiBaseUrlState(cleanUrl);
    setApiBaseUrl(cleanUrl);
  }, []);

  const triggerActuator = useCallback((key: keyof ActuatorState, value: boolean) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'control_actuator',
          data: { key, value },
        })
      );
    }
  }, []);

  const toggleActionItem = useCallback((actionId: string) => {
    setActiveIncident(prev => {
      if (!prev) return null;
      return {
        ...prev,
        actions: prev.actions.map(act =>
          act.id === actionId ? { ...act, done: !act.done } : act
        )
      };
    });
  }, []);

  const clearActiveIncident = useCallback(() => {
    setActiveIncident(null);
  }, []);

  // Resolve incident via backend API
  const resolveIncidentById = useCallback(async (incidentId: string) => {
    try {
      await api.resolveIncident(incidentId);
      setActiveIncident(null);
      setAiStatus({ status: 'resolved', latestEvent: 'Incident resolved successfully.' });
      // Refresh incidents to get updated list
      await refreshIncidents();
      // Reset AI status after a delay
      setTimeout(() => {
        setAiStatus({ status: 'monitoring', latestEvent: 'All systems nominal. Monitoring environment...' });
      }, 4000);
    } catch (err) {
      console.error('[API] Failed to resolve incident:', err);
      // Fallback: try the mock server reset endpoint
      try {
        await fetch(`${serverIp}/trigger/reset`);
        setActiveIncident(null);
        setAiStatus({ status: 'resolved', latestEvent: 'Incident resolved (via mock server).' });
      } catch {
        throw err; // Re-throw original error
      }
    }
  }, [serverIp, refreshIncidents]);

  // AI multimodal analysis
  const analyzeWithAI = useCallback(async (params: { telemetry?: string; image?: any; audio?: any }) => {
    try {
      setAiStatus({ status: 'analyzing', latestEvent: 'Running multimodal AI analysis...' });
      const result = await api.analyzeMultimodal(params);
      setAiStatus({ status: 'resolved', latestEvent: 'AI analysis complete.' });
      // Refresh incidents in case analysis created one
      await refreshIncidents();
      return result;
    } catch (err) {
      setAiStatus({ status: 'monitoring', latestEvent: 'AI analysis failed. Resuming monitoring...' });
      throw err;
    }
  }, [refreshIncidents]);

  // ────────────────────────────────────────────────────────
  // 5. Provide Context
  // ────────────────────────────────────────────────────────

  return (
    <TelemetryContext.Provider value={{
      socketConnected,
      backendConnected,
      serverIp,
      apiBaseUrl,
      connections,
      sensorData,
      telemetryHistory,
      aiStatus,
      actuators,
      activeIncident,
      historicalIncidents,
      dashboardSummary,
      dashboardStatistics,
      riskDistribution,
      latestNotification,
      showOnboarding,
      setShowOnboarding,
      updateServerIp,
      updateApiBaseUrl: updateApiBaseUrlHandler,
      triggerActuator,
      toggleActionItem,
      clearActiveIncident,
      refreshIncidents,
      refreshDashboard,
      resolveIncidentById,
      checkBackendHealth,
      analyzeWithAI,
    }}>
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (context === undefined) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
}
