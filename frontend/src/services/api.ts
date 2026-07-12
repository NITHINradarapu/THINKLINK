/**
 * ThinkLink API Service
 *
 * Centralised HTTP client for every backend endpoint.
 * All methods are typed against the schemas in ./types.ts.
 *
 * Usage:
 *   import { api, setApiBaseUrl } from '../services/api';
 *   const incidents = await api.getIncidents();
 */

import { Platform } from 'react-native';
import type {
  TelemetryRequest,
  TelemetryResponse,
  AIAnalyzeResponse,
  IncidentResponse,
  DashboardSummary,
  DashboardStatistics,
  DashboardDevice,
  RiskDistribution,
  DeviceInfo,
  DeviceHistoryEntry,
  NotificationPayload,
  HealthResponse,
  MonitorCheckResponse,
  MetricsResponse,
  ReportResponse,
  AskAIResponse,
} from './types';

// ─── Base URL Management ─────────────────────────────────────

const DEFAULT_API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.91.48.73:8000'  // PC LAN IP for physical Android devices over WiFi
    : 'http://localhost:8000'; // iOS / Web

let _baseUrl: string = DEFAULT_API_BASE_URL;

/** Update the base URL at runtime (called from Settings screen). */
export function setApiBaseUrl(url: string): void {
  let cleaned = url.trim();
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = `http://${cleaned}`;
  }
  // Strip trailing slash
  _baseUrl = cleaned.replace(/\/+$/, '');
}

/** Get the current base URL. */
export function getApiBaseUrl(): string {
  return _baseUrl;
}

// ─── Generic Fetch Helpers ───────────────────────────────────

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  timeoutMs?: number;
  isFormData?: boolean;
}

class ApiError extends Error {
  status: number;
  body: any;

  constructor(message: string, status: number, body?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

async function request<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    timeoutMs = 10_000,
    isFormData = false,
  } = opts;

  const url = `${_baseUrl}${path}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const fetchHeaders: Record<string, string> = { ...headers };
    let fetchBody: any = undefined;

    if (body !== undefined) {
      if (isFormData) {
        // Let the browser/RN set the multipart boundary automatically
        fetchBody = body;
      } else {
        fetchHeaders['Content-Type'] = 'application/json';
        fetchBody = JSON.stringify(body);
      }
    }

    const response = await fetch(url, {
      method,
      headers: fetchHeaders,
      body: fetchBody,
      signal: controller.signal,
    });

    if (!response.ok) {
      let errorBody: any;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text().catch(() => null);
      }
      throw new ApiError(
        `API ${method} ${path} returned ${response.status}`,
        response.status,
        errorBody,
      );
    }

    // Some endpoints may return empty 200
    const text = await response.text();
    if (!text) return {} as T;
    return JSON.parse(text) as T;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new ApiError(`API ${method} ${path} timed out after ${timeoutMs}ms`, 0);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Endpoint Methods ────────────────────────────────────────

export const api = {
  // ── Health ──────────────────────────────────────────────
  health: () => request<HealthResponse>('/health/'),

  root: () => request<any>('/'),

  // ── Telemetry ───────────────────────────────────────────
  sendTelemetry: (data: TelemetryRequest) =>
    request<TelemetryResponse>('/telemetry/', {
      method: 'POST',
      body: data,
    }),

  // ── AI Analyze (multipart) ─────────────────────────────
  analyzeMultimodal: async (params: {
    telemetry?: string;
    image?: any; // File / Blob / uri object
    audio?: any;
  }): Promise<AIAnalyzeResponse> => {
    const formData = new FormData();

    if (params.telemetry) {
      formData.append('telemetry', params.telemetry);
    }
    if (params.image) {
      formData.append('image', params.image);
    }
    if (params.audio) {
      formData.append('audio', params.audio);
    }

    return request<AIAnalyzeResponse>('/ai/analyze', {
      method: 'POST',
      body: formData,
      isFormData: true,
      timeoutMs: 30_000, // AI analysis can be slow
    });
  },

  // ── Worker Report ────────────────────────────────────────
  submitReport: async (params: {
    device_id: string;
    worker_id: string;
    remarks?: string;
    image: any;
    audio?: any;
  }): Promise<ReportResponse> => {
    const formData = new FormData();
    formData.append('device_id', params.device_id);
    formData.append('worker_id', params.worker_id);
    if (params.remarks) {
      formData.append('remarks', params.remarks);
    }
    if (params.image) {
      formData.append('image', params.image);
    }
    if (params.audio) {
      formData.append('audio', params.audio);
    }

    return request<ReportResponse>('/report/', {
      method: 'POST',
      body: formData,
      isFormData: true,
      timeoutMs: 30_000,
    });
  },

  // ── Incidents ───────────────────────────────────────────
  getIncidents: () => request<IncidentResponse[]>('/incidents/'),

  getActiveIncidents: () => request<IncidentResponse[]>('/incidents/active'),

  getIncident: (id: string) =>
    request<IncidentResponse>(`/incidents/${encodeURIComponent(id)}`),

  resolveIncident: (id: string) =>
    request<any>(`/incidents/${encodeURIComponent(id)}/resolve`, {
      method: 'PATCH',
    }),

  // ── Dashboard ───────────────────────────────────────────
  getDashboardSummary: () => request<DashboardSummary>('/dashboard/summary'),

  getDashboardStatistics: () =>
    request<DashboardStatistics>('/dashboard/statistics'),

  getRecentIncidents: () =>
    request<IncidentResponse[]>('/dashboard/recent-incidents'),

  getDashboardDevices: () =>
    request<DashboardDevice[]>('/dashboard/devices'),

  getRiskDistribution: () =>
    request<RiskDistribution>('/dashboard/risk-distribution'),

  // ── Devices ─────────────────────────────────────────────
  getDevices: () => request<DeviceInfo[]>('/devices/'),

  getDevice: (id: string) =>
    request<DeviceInfo>(`/devices/${encodeURIComponent(id)}`),

  getDeviceHistory: async (id: string): Promise<DeviceHistoryEntry[]> => {
    const result = await request<any>(
      `/devices/${encodeURIComponent(id)}/history`,
    );
    // Backend returns array directly; guard against legacy wrapped response
    if (Array.isArray(result)) return result as DeviceHistoryEntry[];
    if (result && Array.isArray(result.history)) return result.history as DeviceHistoryEntry[];
    return [];
  },

  // ── Notifications ───────────────────────────────────────
  getLatestNotification: () =>
    request<NotificationPayload>('/notifications/latest'),

  getAllNotifications: () =>
    request<NotificationPayload[]>('/notifications/'),

  // ── Monitor ─────────────────────────────────────────────
  checkDevices: () =>
    request<MonitorCheckResponse>('/monitor/check', { method: 'POST' }),

  // ── Metrics ─────────────────────────────────────────────
  getMetrics: () => request<MetricsResponse>('/metrics/'),

  // ── Visual Q&A ──────────────────────────────────────────
  askAI: async (image: any, question: string): Promise<AskAIResponse> => {
    const formData = new FormData();
    formData.append('question', question);
    formData.append('image', image);

    return request<AskAIResponse>('/ai/ask', {
      method: 'POST',
      body: formData,
      isFormData: true,
      timeoutMs: 30_000,
    });
  },

  // ── Database ────────────────────────────────────────────
  clearDatabase: () =>
    request<any>('/database/clear', {
      method: 'POST',
    }),
};

// ─── Data Mapping Utilities ──────────────────────────────────

/**
 * Transform a backend IncidentResponse into the shape consumed by
 * the frontend IncidentReport interface in TelemetryContext.
 */
export function mapIncidentResponseToReport(inc: IncidentResponse) {
  return {
    id: inc.incident_id,
    title: inc.summary,
    riskLevel: inc.risk_level.toUpperCase() as 'HIGH' | 'WARNING' | 'INFO',
    confidence: inc.confidence_score, // backend sends 0–100 directly
    rootCause: inc.ai_reasoning,
    consensus: inc.ai_reasoning, // Backend merges this into ai_reasoning
    actions: inc.recommended_actions.map((text, index) => ({
      id: `act-${index}`,
      text,
      done: false,
    })),
    timestamp: new Date(inc.created_at).toLocaleTimeString(),
    // Preserve backend-specific fields for detail views
    _backend: {
      incident_id: inc.incident_id,
      device_id: inc.device_id,
      device_type: inc.device_type,
      status: inc.status,
      sensor_snapshot: inc.sensor_snapshot,
      created_at: inc.created_at,
    },
  };
}

export { ApiError };
