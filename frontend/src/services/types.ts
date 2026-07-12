/**
 * Backend API TypeScript types — mirrors the OpenAPI schema exactly.
 * These are the raw shapes the backend sends/receives.
 */

// ─── Telemetry ───────────────────────────────────────────────

/** POST /telemetry/ — request body */
export interface TelemetryRequest {
  device_id: string;
  temperature: number;
  humidity: number;
  gas_level: number;
  smoke_detected: boolean;
  battery_level: number; // 0–100
  vibration?: number;    // optional – 0.0 to 1.0+
}

/** POST /telemetry/ — response body */
export interface TelemetryResponse {
  success: boolean;
  ai_triggered: boolean;
  risk_level: string;
  message: string;
}

// ─── AI Analyze ──────────────────────────────────────────────

/** POST /ai/analyze — multipart form fields */
export interface AIAnalyzeRequest {
  telemetry?: string | null;
  image?: File | Blob | null;
  audio?: File | Blob | null;
}

/** POST /ai/analyze — response (schema unspecified, using flexible type) */
export interface AIAnalyzeResponse {
  [key: string]: any;
}

// ─── Incidents ───────────────────────────────────────────────

/** GET /incidents/, GET /incidents/active, GET /incidents/{id} */
export interface IncidentResponse {
  incident_id: string;
  device_id: string;
  device_type: string;
  risk_level: string;
  summary: string;
  ai_reasoning: string;
  confidence_score: number;
  recommended_actions: string[];
  sensor_snapshot: Record<string, any>;
  status: string;
  created_at: string; // ISO 8601 datetime
}

// ─── Dashboard ───────────────────────────────────────────────

/** GET /dashboard/summary — response (schema unspecified) */
export interface DashboardSummary {
  total_devices?: number;
  active_devices?: number;
  total_incidents?: number;
  active_incidents?: number;
  system_health?: number;
  risk_level?: string;
  [key: string]: any;
}

/** GET /dashboard/statistics — response (schema unspecified) */
export interface DashboardStatistics {
  total_readings?: number;
  average_temperature?: number;
  average_humidity?: number;
  average_gas_level?: number;
  incidents_today?: number;
  incidents_this_week?: number;
  [key: string]: any;
}

/** GET /dashboard/recent-incidents — response (schema unspecified) */
export type DashboardRecentIncidents = IncidentResponse[];

/** GET /dashboard/devices — response (schema unspecified) */
export interface DashboardDevice {
  device_id: string;
  device_type?: string;
  status?: string;
  last_seen?: string;
  battery_level?: number;
  [key: string]: any;
}

/** GET /dashboard/risk-distribution — response (schema unspecified) */
export interface RiskDistribution {
  high?: number;
  medium?: number;
  low?: number;
  critical?: number;
  [key: string]: any;
}

// ─── Devices ─────────────────────────────────────────────────

/** GET /devices/, GET /devices/{id} — response (schema unspecified) */
export interface DeviceInfo {
  device_id: string;
  device_type?: string;
  status?: string;
  last_seen?: string;
  latest_telemetry?: {
    temperature?: number;
    humidity?: number;
    gas_level?: number;
    smoke_detected?: boolean;
    battery_level?: number;
  };
  [key: string]: any;
}

/** GET /devices/{id}/history — response (schema unspecified) */
export interface DeviceHistoryEntry {
  timestamp: string;
  temperature?: number;
  humidity?: number;
  gas_level?: number;
  smoke_detected?: boolean;
  battery_level?: number;
  [key: string]: any;
}

// ─── Notifications ───────────────────────────────────────────

/** GET /notifications/latest, GET /notifications/ */
export interface NotificationPayload {
  id?: string;
  type?: string;
  title?: string;
  message?: string;
  risk_level?: string;
  created_at?: string;
  [key: string]: any;
}

// ─── Health ──────────────────────────────────────────────────

/** GET /health/ */
export interface HealthResponse {
  status?: string;
  [key: string]: any;
}

// ─── Monitor ─────────────────────────────────────────────────

/** POST /monitor/check */
export interface MonitorCheckResponse {
  [key: string]: any;
}

// ─── Metrics ─────────────────────────────────────────────────

/** GET /metrics/ */
export interface MetricsResponse {
  [key: string]: any;
}

// ─── Validation Error (from FastAPI) ─────────────────────────

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: any;
  ctx?: Record<string, any>;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

// ─── Worker Report ───────────────────────────────────────────

export interface ReportResponse {
  success: boolean;
  incident_id: string;
  risk_level: string;
  summary: string;
  notification_sent: boolean;
}

// ─── Visual Q&A ───────────────────────────────────────────────

export interface AskAIResponse {
  success: boolean;
  answer: string;
  caption: string;
  question: string;
}


