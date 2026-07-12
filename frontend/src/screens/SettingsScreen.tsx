import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/theme';
import { useTelemetry } from '../context/TelemetryContext';
import * as Haptics from 'expo-haptics';
import { api } from '../services/api';

export default function SettingsScreen() {
  const {
    apiBaseUrl,
    updateApiBaseUrl,
    socketConnected,
    backendConnected,
    setShowOnboarding,
    checkBackendHealth,
  } = useTelemetry();

  const [apiUrlInput, setApiUrlInput] = useState(apiBaseUrl);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [healthCheckResult, setHealthCheckResult] = useState<string | null>(null);

  // Save Backend API URL
  const handleSaveApiUrl = () => {
    Haptics.selectionAsync().catch(() => {});
    updateApiBaseUrl(apiUrlInput);
    Alert.alert('API URL Updated', `Backend API set to ${apiUrlInput}`);
  };

  // Backend health check
  const handleHealthCheck = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setLoadingAction('health');
    setHealthCheckResult(null);
    try {
      const healthy = await checkBackendHealth();
      setHealthCheckResult(healthy ? '✓ Backend is healthy and responding' : '✗ Backend is not responding');
    } catch {
      setHealthCheckResult('✗ Failed to reach backend');
    } finally {
      setLoadingAction(null);
    }
  };

  // Wipe backend database (Incidents, logs, and telemetry histories)
  const handleWipeDatabase = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    Alert.alert(
      'Wipe Database',
      'Are you absolutely sure you want to delete all incidents, action logs, and telemetry history? This action is irreversible.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Wipe Database',
          style: 'destructive',
          onPress: async () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
            setLoadingAction('wipe_db');
            try {
              const res = await api.clearDatabase();
              if (res.success) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
                Alert.alert('Database Wiped', 'All incidents and logs have been deleted successfully.');
              } else {
                Alert.alert('Error', res.message || 'Failed to wipe database.');
              }
            } catch (err: any) {
              Alert.alert('Connection Error', `Failed to contact backend to clear database: ${err.message}`);
            } finally {
              setLoadingAction(null);
            }
          }
        }
      ]
    );
  };

  // Helper to trigger backend states (demo simulation)
  const triggerSimulation = async (path: string, label: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setLoadingAction(label);
    try {
      const response = await fetch(`${apiBaseUrl}${path}`);
      const data = await response.json();
      console.log(`Simulation response:`, data);
      
      if (data.success) {
        const summary = data.pipeline_result?.ai_result?.summary || data.ai_reasoning || data.message || 'Simulation started';
        Alert.alert('Simulation Triggered', summary);
      } else {
        Alert.alert('Simulation Error', data.message || 'Backend failed to process the simulation request.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Connection Error', `Failed to send trigger to ${apiBaseUrl}${path}. Make sure the Snapdragon AI PC FastAPI server is running.`);
    } finally {
      setLoadingAction(null);
    }
  };

  const simulationCards = [
    { label: 'Critical Gas Leak', path: '/trigger/gas-leak', color: COLORS.danger, desc: 'Arduino buzzer alarms. AI Glasses seek camera feed, safety agent recommends evacuation.' },
    { label: 'Boiler Overheat Warning', path: '/trigger/overheat', color: COLORS.danger, desc: 'Boiler core temperature exceeds thermal limits. Maintenance and safety agent warning consensus.' },
    { label: 'Mechanical Vibration Fault', path: '/trigger/vibration-fault', color: COLORS.warning, desc: 'Turbine bearing wear. Vibration level warning. Maintenance agent recommends lubrication.' },
    { label: 'Reset System Status', path: '/trigger/reset', color: COLORS.success, desc: 'Resets all sensors and actuators back to nominal default baseline values.' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* ── Backend API Connection ───────────────────────── */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="cloud-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Backend API Connection</Text>
          </View>
          
          <View style={styles.statusRow}>
            <Text style={TYPOGRAPHY.bodySecondary}>Status: </Text>
            <View style={[styles.statusDot, { backgroundColor: backendConnected ? COLORS.success : COLORS.danger }]} />
            <Text style={[styles.statusText, { color: backendConnected ? COLORS.success : COLORS.danger }]}>
              {backendConnected ? 'CONNECTED' : 'DISCONNECTED'}
            </Text>
          </View>

          <Text style={styles.inputLabel}>Backend API Base URL</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              value={apiUrlInput}
              onChangeText={setApiUrlInput}
              placeholder="e.g. http://192.168.1.100:8000"
              placeholderTextColor={COLORS.textTertiary}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveApiUrl}>
              <Text style={styles.saveButtonText}>SET</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>
            This is the FastAPI backend URL where incident management, dashboard, and AI analysis APIs are hosted.
          </Text>

          {/* Health Check Button */}
          <TouchableOpacity 
            style={styles.healthCheckButton} 
            onPress={handleHealthCheck}
            disabled={loadingAction === 'health'}
          >
            {loadingAction === 'health' ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : (
              <Ionicons name="pulse-outline" size={16} color={COLORS.primary} />
            )}
            <Text style={styles.healthCheckText}>TEST CONNECTION</Text>
          </TouchableOpacity>

          {healthCheckResult && (
            <View style={[styles.healthResult, { 
              borderColor: healthCheckResult.startsWith('✓') ? COLORS.success : COLORS.danger,
              backgroundColor: healthCheckResult.startsWith('✓') ? COLORS.successGlow : COLORS.dangerGlow,
            }]}>
              <Text style={[styles.healthResultText, { 
                color: healthCheckResult.startsWith('✓') ? COLORS.success : COLORS.danger 
              }]}>
                {healthCheckResult}
              </Text>
            </View>
          )}
        </View>

        {/* ── Connection Architecture Info ──────────────────── */}
        <View style={styles.archCard}>
          <Text style={styles.archTitle}>Connection Architecture</Text>
          <View style={styles.archRow}>
            <View style={styles.archItem}>
              <Ionicons name="cloud" size={18} color={COLORS.primary} />
              <Text style={styles.archLabel}>REST API</Text>
              <Text style={styles.archDesc}>Dashboard, incidents, devices, AI analysis</Text>
            </View>
            <View style={styles.archDivider}>
              <Ionicons name="add" size={14} color={COLORS.textTertiary} />
            </View>
            <View style={styles.archItem}>
              <Ionicons name="git-network-outline" size={18} color={COLORS.success} />
              <Text style={styles.archLabel}>WebSocket</Text>
              <Text style={styles.archDesc}>Real-time telemetry, actuator control (port 8000)</Text>
            </View>
          </View>
        </View>

        {/* Onboarding Control Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>In-App Welcome Walkthrough</Text>
          <Text style={TYPOGRAPHY.bodySecondary}>
            View the onboarding slides that introduce the ThinkLink portal, edge sensors, and agent consensus deliberation.
          </Text>
          <TouchableOpacity 
            style={[styles.saveButton, { marginTop: SPACING.md, backgroundColor: COLORS.surfaceLight, borderWidth: 1, borderColor: COLORS.border }]} 
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
              setShowOnboarding(true);
            }}
          >
            <Text style={[styles.saveButtonText, { color: COLORS.textPrimary }]}>LAUNCH ONBOARDING SLIDES</Text>
          </TouchableOpacity>
        </View>

        {/* Database Management Card */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
            <Text style={styles.cardTitle}>Database Management</Text>
          </View>
          <Text style={TYPOGRAPHY.bodySecondary}>
            Wipe all stored telemetry records, incident reports, action logs, and device history from the Edge database.
          </Text>
          <TouchableOpacity 
            style={[styles.saveButton, { marginTop: SPACING.md, backgroundColor: COLORS.dangerGlow, borderWidth: 1, borderColor: COLORS.danger }]} 
            onPress={handleWipeDatabase}
            disabled={loadingAction !== null}
          >
            {loadingAction === 'wipe_db' ? (
              <ActivityIndicator size="small" color={COLORS.danger} />
            ) : (
              <Text style={[styles.saveButtonText, { color: COLORS.danger }]}>WIPE DATABASE</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Demo Controller Card */}
        <Text style={styles.sectionHeader}>Developer Demo Controller</Text>
        <Text style={styles.sectionDesc}>
          Use these triggers to simulate IoT sensor anomalies. The Snapdragon multi-agent system will generate reports in real time.
        </Text>

        {simulationCards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.simCard, { borderColor: card.color }]}
            onPress={() => triggerSimulation(card.path, card.label)}
            disabled={loadingAction !== null}
          >
            <View style={styles.simHeader}>
              <Text style={[styles.simTitle, { color: card.color }]}>{card.label}</Text>
              {loadingAction === card.label ? (
                <ActivityIndicator size="small" color={card.color} />
              ) : (
                <Text style={[styles.triggerText, { color: card.color }]}>TRIGGER →</Text>
              )}
            </View>
            <Text style={styles.simDesc}>{card.desc}</Text>
          </TouchableOpacity>
        ))}

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
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: SPACING.xs,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  inputLabel: {
    ...TYPOGRAPHY.caption,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
  },
  inputRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  textInput: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  saveButton: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  helperText: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.sm,
  },
  healthCheckButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    height: 40,
    backgroundColor: COLORS.primaryGlow,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    marginTop: SPACING.md,
  },
  healthCheckText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  healthResult: {
    borderWidth: 1,
    borderRadius: 6,
    padding: SPACING.sm,
    marginTop: SPACING.sm,
  },
  healthResultText: {
    fontSize: 12,
    fontWeight: '600',
  },
  archCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  archTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  archRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  archItem: {
    flex: 1,
    alignItems: 'center',
  },
  archLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  archDesc: {
    fontSize: 9,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 13,
  },
  archDivider: {
    width: 24,
    alignItems: 'center',
  },
  sectionHeader: {
    ...TYPOGRAPHY.h3,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  sectionDesc: {
    ...TYPOGRAPHY.bodySecondary,
    marginBottom: SPACING.md,
  },
  simCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderLeftWidth: 6,
    marginBottom: SPACING.md,
  },
  simHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  simTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  triggerText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  simDesc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
});
