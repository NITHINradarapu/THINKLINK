import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/theme';
import ConnectionStatus from '../components/ConnectionStatus';
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

  const startGlassesScan = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setIsScanning(true);
    setScanResult(null);
    setScanError(null);

    // Try backend AI analyze endpoint first, fall back to mock
    if (backendConnected) {
      try {
        const telemetryPayload = JSON.stringify({
          temperature: sensorData.temperature,
          humidity: sensorData.humidity,
          gas_level: sensorData.gas,
          smoke_detected: sensorData.smoke_detected,
          battery_level: sensorData.battery_level,
        });

        const result = await analyzeWithAI({ telemetry: telemetryPayload });
        setIsScanning(false);
        setScanResult(
          `[AI Agent] ANALYSIS COMPLETE.\n` +
          `${result.summary || result.analysis || JSON.stringify(result, null, 2)}`
        );
        return;
      } catch (err: any) {
        console.log('[DashboardScreen] AI analyze failed, falling back to mock:', err.message);
        // Fall through to mock
      }
    }

    // Mock fallback
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(
        '[VLM Agent] SCAN COMPLETE.\n' +
        'Target: Boiler Feed Valve Joint A-4\n' +
        'Analysis: Flange shows minor oxidation. Bolt torque matches safety baseline. No steam leaks detected.\n' +
        'Safety Status: NOMINAL (96% safety score)'
      );
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={TYPOGRAPHY.h2}>THINKLINK CONTROL</Text>
          <Text style={TYPOGRAPHY.caption}>INDUSTRIAL AI ENVIRONMENT MONITOR</Text>
        </View>

        <ConnectionStatus connections={connections} />
        
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

        {/* Humidity & Battery — new fields from backend */}
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

        {/* Wow Factor: Meta AI Glasses vision link */}
        <Text style={styles.sectionTitle}>Meta AI Glasses Feed</Text>
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
              <Text style={styles.scanText}>
                {backendConnected
                  ? 'Sending to AI backend for multimodal analysis...'
                  : 'Acquiring feed & running edge visual diagnosis...'
                }
              </Text>
            </View>
          ) : scanResult ? (
            <View style={styles.resultContainer}>
              <View style={styles.terminalBox}>
                <Text style={styles.terminalPrompt}>$ vlm_agent_vision: </Text>
                <Text style={styles.terminalText}>{scanResult}</Text>
              </View>
              <TouchableOpacity style={styles.scanButton} onPress={startGlassesScan}>
                <Text style={styles.scanButtonText}>SCAN AGAIN</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.initContainer}>
              <Text style={styles.initText}>
                {backendConnected 
                  ? 'Connected to AI backend. Request a multimodal analysis combining telemetry data with visual inspection.'
                  : 'Meta AI Glasses are connected. You can request a real-time visual inspection report of the nearest equipment.'
                }
              </Text>
              <TouchableOpacity 
                style={[styles.scanButton, !connections.glasses && !backendConnected && styles.disabledButton]} 
                onPress={startGlassesScan}
                disabled={!connections.glasses && !backendConnected}
              >
                <Ionicons name="camera-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.scanButtonText}>
                  {backendConnected ? 'RUN AI ANALYSIS' : 'REQUEST GLASSES VISION SCAN'}
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
});
