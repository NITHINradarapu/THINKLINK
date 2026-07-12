import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Platform, Vibration, Alert } from 'react-native';
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
  // Flame sensor (KY-026 / YG1006 IR)
  flame_detected: boolean;   // true when IR sensor detects flame
  flame_intensity: number;   // 0–1023 (higher = more intense / closer flame)
  flame_proximity: number;   // 0.0–1.0 convenience float
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
  submitReport: (params: { device_id: string; worker_id: string; remarks?: string; image: any; audio?: any }) => Promise<any>;
  getDeviceDetails: (id: string) => Promise<any>;
  getDeviceHistoryList: (id: string) => Promise<any>;
  askAI: (image: any, question: string) => Promise<any>;
}

const TelemetryContext = createContext<TelemetryContextProps | undefined>(undefined);

// Default REST API / WebSocket URL (FastAPI backend)
// Physical Android device over WiFi → use the PC's LAN IP (same as the Metro server's IP) on port 8000
// Android EMULATOR → 10.0.2.2 routes to host machine localhost
// iOS / Web → localhost
const DEFAULT_API_URL =
  Platform.OS === 'web'
    ? 'http://localhost:8000'
    : 'http://10.91.48.73:8000'; // PC LAN IP for physical mobile devices (iOS/Android) over Wi-Fi

// Helper to pre-populate mock historical telemetry data
const generateInitialHistory = (): HistoricalReading[] => {
  return [];
};

// ─── Polling interval (ms) ───────────────────────────────────
const DASHBOARD_POLL_INTERVAL = 10_000;  // 10s
const INCIDENTS_POLL_INTERVAL = 5_000;   // 5s
const NOTIFICATION_POLL_INTERVAL = 8_000; // 8s

const getWebSocketUrl = (httpUrl: string): string => {
  // Clean up metro port 8081 if accidentally supplied
  let safeUrl = httpUrl.trim();
  if (safeUrl.includes(':8081')) {
    safeUrl = safeUrl.replace(':8081', ':8000');
    console.warn(`[WebSocket] Corrected Metro port 8081 to backend port 8000: ${safeUrl}`);
  }
  const wsUrl = safeUrl.replace(/^http:/, 'ws:').replace(/^https:/, 'wss:');
  return `${wsUrl}/ws`;
};

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  // ── Connection URLs ─────────────────────────────────────
  const [serverIp, setServerIp] = useState<string>(DEFAULT_API_URL);
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
    flame_detected: false,
    flame_intensity: 0,
    flame_proximity: 0.0,
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
  const dismissedIncidentIdRef = useRef<string | null>(null);
  const lastNotificationTimeRef = useRef<number>(0);

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
            temperature:     data.temperature     ?? prev.temperature,
            gas:             data.gas ?? data.gas_level ?? prev.gas,
            vibration:       data.vibration       ?? prev.vibration,
            humidity:        data.humidity        ?? prev.humidity,
            smoke_detected:  data.smoke_detected  ?? prev.smoke_detected,
            battery_level:   data.battery_level   ?? prev.battery_level,
            flame_detected:  data.flame_detected  ?? prev.flame_detected,
            flame_intensity: data.flame_intensity ?? prev.flame_intensity,
            flame_proximity: data.flame_proximity ?? prev.flame_proximity,
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
            if (id.startsWith('test-')) {
              continue;
            }
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

      if (summary.status === 'fulfilled') {
        setBackendConnected(true);
      } else {
        setBackendConnected(false);
      }
    } catch (err) {
      console.log('[API] Dashboard refresh failed:', err);
      setBackendConnected(false);
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
          if (latestActive.id !== dismissedIncidentIdRef.current) {
            setActiveIncident(prev => {
              if (prev?.id === latestActive.id) return prev;
              return latestActive;
            });
            setAiStatus({ status: 'analyzing', latestEvent: `Active incident: ${latestActive.title}` });
          }
        } else {
          // No active incidents from backend
          // Only clear if we don't have a socket-pushed incident
          setActiveIncident(prev => {
            if (prev?._backend) {
              setAiStatus({ status: 'monitoring', latestEvent: 'All systems nominal.' });
              return null;
            }
            return prev;
          });
        }
      }
    } catch (err) {
      console.log('[API] Incidents refresh failed:', err);
    }
  }, []);

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

  // Fetch initial data once backend connects
  useEffect(() => {
    if (!backendConnected) return;

    // Initial fetch
    refreshDashboard();
    refreshIncidents();
    refreshNotifications();

    // Periodic polling while connected
    const dashboardTimer = setInterval(refreshDashboard, DASHBOARD_POLL_INTERVAL);
    const incidentTimer = setInterval(refreshIncidents, INCIDENTS_POLL_INTERVAL);
    const notifTimer = setInterval(refreshNotifications, NOTIFICATION_POLL_INTERVAL);

    return () => {
      clearInterval(dashboardTimer);
      clearInterval(incidentTimer);
      clearInterval(notifTimer);
    };
  }, [backendConnected, refreshDashboard, refreshIncidents, refreshNotifications]);

  // Reconnect checker: checks backend health periodically when offline
  useEffect(() => {
    if (backendConnected) return;

    // Run check immediately on disconnect/startup
    checkBackendHealth();

    const timer = setInterval(() => {
      checkBackendHealth();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [backendConnected, checkBackendHealth]);

  // Reset connection states when backend is offline
  useEffect(() => {
    if (!backendConnected) {
      setSocketConnected(false);
      setConnections({
        pc: false,
        arduino: false,
        glasses: false,
      });
      setAiStatus({
        status: 'monitoring',
        latestEvent: 'Backend offline. Reconnecting...',
      });
    }
  }, [backendConnected]);

  // ────────────────────────────────────────────────────────
  // 4. Action Handlers
  // ────────────────────────────────────────────────────────

  const updateApiBaseUrlHandler = useCallback((url: string) => {
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `http://${cleanUrl}`;
    }
    cleanUrl = cleanUrl.replace(/\/+$/, '');
    setApiBaseUrlState(cleanUrl);
    setApiBaseUrl(cleanUrl);
  }, []);

  const updateServerIp = useCallback((ip: string) => {
    // updateServerIp now just calls updateApiBaseUrl — Socket.IO server is removed
    updateApiBaseUrlHandler(ip);
  }, [updateApiBaseUrlHandler]);

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
    if (activeIncident) {
      dismissedIncidentIdRef.current = activeIncident.id;
    }
    setActiveIncident(null);
  }, [activeIncident]);

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
      throw err;
    }
  }, [refreshIncidents]);

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

  // Submit worker report
  const submitReport = useCallback(async (params: {
    device_id: string;
    worker_id: string;
    remarks?: string;
    image: any;
    audio?: any;
  }) => {
    try {
      setAiStatus({ status: 'analyzing', latestEvent: 'Submitting worker incident report...' });
      const result = await api.submitReport(params);
      setAiStatus({ status: 'resolved', latestEvent: 'Worker report processed successfully.' });
      await refreshIncidents();
      return result;
    } catch (err) {
      setAiStatus({ status: 'monitoring', latestEvent: 'Failed to submit worker report.' });
      throw err;
    }
  }, [refreshIncidents]);

  // Fetch single device details
  const getDeviceDetails = useCallback(async (id: string) => {
    return await api.getDevice(id);
  }, []);

  // Fetch device history list
  const getDeviceHistoryList = useCallback(async (id: string) => {
    return await api.getDeviceHistory(id);
  }, []);

  // Visual Q&A
  const askAI = useCallback(async (image: any, question: string) => {
    try {
      setAiStatus({ status: 'analyzing', latestEvent: 'Running Visual Q&A on Snapdragon NPU...' });
      const result = await api.askAI(image, question);
      setAiStatus({ status: 'resolved', latestEvent: 'Visual Q&A complete.' });
      return result;
    } catch (err) {
      setAiStatus({ status: 'monitoring', latestEvent: 'Visual Q&A failed.' });
      throw err;
    }
  }, []);

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
      submitReport,
      getDeviceDetails,
      getDeviceHistoryList,
      askAI,
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
