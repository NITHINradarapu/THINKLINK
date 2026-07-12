import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/theme';
import * as Haptics from 'expo-haptics';
import SensorCard from '../components/SensorCard';
import SupervisorBanner from '../components/SupervisorBanner';
import { Ionicons } from '@expo/vector-icons';

import { useTelemetry } from '../context/TelemetryContext';

export default function DashboardScreen() {
  const { connections, sensorData, aiStatus, analyzeWithAI, backendConnected } = useTelemetry();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const startAnalysis = async () => {
    if (!backendConnected) {
      setScanError('Backend not connected. Start the FastAPI server and set the correct IP in Settings.');
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setIsScanning(true);
    setScanResult(null);
    setScanError(null);

    try {
      const telemetryPayload = JSON.stringify({
        device_id: "ARDUINO-01",
        temperature: sensorData.temperature,
        humidity: sensorData.humidity,
        gas_level: sensorData.gas,
        smoke_detected: sensorData.smoke_detected,
        flame_detected: sensorData.flame_detected,
        flame_intensity: sensorData.flame_intensity,
        flame_proximity: sensorData.flame_proximity,
        battery_level: sensorData.battery_level || 90,
        vibration: sensorData.vibration,
      });

      const result = await analyzeWithAI({ telemetry: telemetryPayload });
      setIsScanning(false);
      const aiResp = result?.ai_response;
      const summary = aiResp?.summary || result?.summary || result?.analysis || JSON.stringify(result, null, 2);
      const risk = aiResp?.overall_risk?.level || aiResp?.risk_level || 'UNKNOWN';
      const actions = aiResp?.recommended_actions || [];
      setScanResult(
        `[AI Agent] Risk: ${risk}\n${summary}` +
        (actions.length > 0 ? `\n\nActions:\n${actions.map((a: string, i: number) => `${i+1}. ${a}`).join('\n')}` : '')
      );
    } catch (err: any) {
      setIsScanning(false);
      setScanError(`AI analysis failed: ${err.message || 'Unknown error'}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={TYPOGRAPHY.h2}>THINKLINK CONTROL</Text>
          <Text style={TYPOGRAPHY.caption}>INDUSTRIAL AI ENVIRONMENT MONITOR</Text>
        </View>

        <SupervisorBanner status={aiStatus.status} latestEvent={aiStatus.latestEvent} />

        <Text style={styles.sectionTitle}>Edge Sensor Telemetry</Text>

        <SensorCard 
          title="Ambient Temperature"
          value={sensorData.temperature}
          unit="°C"
          icon="thermometer-outline"
          minVal={0}
          maxVal={80}
          warningLimit={45}
          dangerLimit={60}
        />

        <SensorCard 
          title="Hazardous Gas Concentration"
          value={sensorData.gas}
          unit="PPM"
          icon="flame-outline"
          minVal={0}
          maxVal={1000}
          warningLimit={300}
          dangerLimit={600}
        />

        <SensorCard 
          title="Equipment Vibration"
          value={sensorData.vibration}
          unit="G"
          icon="pulse-outline"
          minVal={0}
          maxVal={5}
          warningLimit={1.5}
          dangerLimit={3.0}
        />

        <SensorCard
          title="Ambient Humidity"
          value={sensorData.humidity}
          unit="%"
          icon="water-outline"
          minVal={0}
          maxVal={100}
          warningLimit={80}
          dangerLimit={95}
        />

        <SensorCard
          title="Battery Level"
          value={sensorData.battery_level}
          unit="%"
          icon="battery-half-outline"
          minVal={0}
          maxVal={100}
          warningLimit={25}
          dangerLimit={10}
        />

        {/* Smoke Detected Alert Card */}
        <View style={styles.smokeCard}>
          <View style={styles.smokeRow}>
            <Ionicons
              name={sensorData.smoke_detected ? 'warning' : 'checkmark-circle-outline'}
              size={22}
              color={sensorData.smoke_detected ? COLORS.danger : COLORS.success}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.smokeTitle}>Smoke / Fire Detection</Text>
              <Text style={[
                styles.smokeStatus,
                { color: sensorData.smoke_detected ? COLORS.danger : COLORS.success }
              ]}>
                {sensorData.smoke_detected ? '⚠ SMOKE DETECTED — EVACUATE' : '✓ CLEAR — No Smoke Detected'}
              </Text>
            </View>
            <View style={[
              styles.smokeBadge,
              { backgroundColor: sensorData.smoke_detected ? COLORS.dangerGlow : COLORS.successGlow,
                borderColor: sensorData.smoke_detected ? COLORS.danger : COLORS.success }
            ]}>
              <Text style={[
                styles.smokeBadgeText,
                { color: sensorData.smoke_detected ? COLORS.danger : COLORS.success }
              ]}>
                {sensorData.smoke_detected ? 'ALERT' : 'OK'}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Flame Sensor Card ─────────────────────────────────── */}
        <View style={[
          styles.smokeCard,
          sensorData.flame_detected && {
            borderColor: COLORS.danger,
            backgroundColor: COLORS.dangerGlow,
          }
        ]}>
          <View style={styles.smokeRow}>
            <Ionicons
              name={sensorData.flame_detected ? 'flame' : 'flame-outline'}
              size={22}
              color={sensorData.flame_detected ? COLORS.danger : COLORS.success}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.smokeTitle}>IR Flame Sensor (KY-026)</Text>
              <Text style={[
                styles.smokeStatus,
                { color: sensorData.flame_detected ? COLORS.danger : COLORS.success }
              ]}>
                {sensorData.flame_detected
                  ? `🔥 FLAME DETECTED — Intensity ${sensorData.flame_intensity}/1023`
                  : `✓ CLEAR — No Flame (intensity: ${sensorData.flame_intensity}/1023)`}
              </Text>
              {/* Intensity progress bar */}
              <View style={styles.flameBarBg}>
                <View style={[
                  styles.flameBarFill,
                  {
                    width: `${Math.min((sensorData.flame_intensity / 1023) * 100, 100)}%` as any,
                    backgroundColor: sensorData.flame_detected ? COLORS.danger : COLORS.success,
                  }
                ]} />
              </View>
              <Text style={styles.flameProximity}>
                Proximity: {(sensorData.flame_proximity * 100).toFixed(1)}%
              </Text>
            </View>
            <View style={[
              styles.smokeBadge,
              { backgroundColor: sensorData.flame_detected ? COLORS.dangerGlow : COLORS.successGlow,
                borderColor: sensorData.flame_detected ? COLORS.danger : COLORS.success }
            ]}>
              <Text style={[
                styles.smokeBadgeText,
                { color: sensorData.flame_detected ? COLORS.danger : COLORS.success }
              ]}>
                {sensorData.flame_detected ? 'ALARM' : 'SAFE'}
              </Text>
            </View>
          </View>
        </View>

        {/* Wow Factor: Meta AI Glasses vision link */}
        <Text style={styles.sectionTitle}>AI Diagnostics Console</Text>
        <View style={styles.glassesCard}>
          <View style={styles.glassesHeader}>
            <View style={styles.glassesBadge}>
              <Ionicons 
                name="glasses" 
                size={18} 
                color={connections.glasses ? COLORS.success : COLORS.textTertiary} 
              />
              <Text style={styles.glassesLabel}>VLM Camera Link</Text>
            </View>
            <View style={styles.apiModeRow}>
              <View style={[styles.apiModeBadge, { borderColor: backendConnected ? COLORS.success : COLORS.textTertiary }]}>
                <Text style={[styles.apiModeText, { color: backendConnected ? COLORS.success : COLORS.textTertiary }]}>
                  {backendConnected ? 'AI API' : 'MOCK'}
                </Text>
              </View>
              <View style={[styles.statusDot, { backgroundColor: connections.glasses ? COLORS.success : COLORS.danger }]} />
            </View>
          </View>

          {isScanning ? (
            <View style={styles.scanProgress}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={styles.scanText}>Sending telemetry to AI backend for multimodal analysis...</Text>
            </View>
          ) : scanResult ? (
            <View style={styles.resultContainer}>
              <View style={styles.terminalBox}>
                <Text style={styles.terminalPrompt}>$ ai_swarm_agent: </Text>
                <Text style={styles.terminalText}>{scanResult}</Text>
              </View>
              <TouchableOpacity style={styles.scanButton} onPress={startAnalysis}>
                <Text style={styles.scanButtonText}>RE-ANALYZE</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.initContainer}>
              <Text style={styles.initText}>
                {backendConnected
                  ? 'Backend connected. Run a live AI analysis using current Arduino telemetry data.'
                  : 'Backend offline. Connect to the FastAPI server in Settings to enable AI analysis.'
                }
              </Text>
              <TouchableOpacity
                style={[styles.scanButton, !backendConnected && styles.disabledButton]}
                onPress={startAnalysis}
                disabled={!backendConnected}
              >
                <Ionicons name="analytics-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.scanButtonText}>
                  {backendConnected ? 'RUN AI ANALYSIS' : 'BACKEND REQUIRED'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {scanError && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={14} color={COLORS.danger} />
              <Text style={styles.errorText}>{scanError}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.sm,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginTop: SPACING.sm,
  },
  smokeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  smokeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smokeTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  smokeStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  smokeBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  smokeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  glassesCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  glassesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  glassesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  glassesLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  apiModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  apiModeBadge: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  apiModeText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scanProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  scanText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  initContainer: {
    alignItems: 'center',
  },
  initText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  scanButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  disabledButton: {
    backgroundColor: COLORS.surfaceLight,
  },
  resultContainer: {
    width: '100%',
  },
  terminalBox: {
    backgroundColor: '#09090b',
    borderRadius: 8,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  terminalPrompt: {
    color: COLORS.primary,
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '600',
    marginBottom: 4,
  },
  terminalText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontFamily: 'monospace',
    lineHeight: 16,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dangerGlow,
    borderRadius: 6,
    padding: SPACING.sm,
    marginTop: SPACING.sm,
    gap: 6,
  },
  errorText: {
    fontSize: 11,
    color: COLORS.danger,
    flex: 1,
  },
  // Flame sensor intensity bar
  flameBarBg: {
    height: 5,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 3,
    marginTop: 6,
    overflow: 'hidden',
  },
  flameBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  flameProximity: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 3,
  },
});
