import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Animated, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/theme';
import { useTelemetry } from '../context/TelemetryContext';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const {
    connections,
    sensorData,
    aiStatus,
    activeIncident,
    historicalIncidents,
    backendConnected,
    socketConnected,
    dashboardSummary,
    latestNotification,
    refreshDashboard,
    refreshIncidents,
  } = useTelemetry();

  const [refreshing, setRefreshing] = React.useState(false);

  // Animation for pulsing glow
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refreshDashboard(), refreshIncidents()]);
    } catch {}
    setRefreshing(false);
  };

  // Calculate System Health Score — prefer backend data, fallback to local logic
  let healthScore = dashboardSummary?.system_health ?? 98;
  let statusText = 'SYSTEM NOMINAL';
  let statusColor = COLORS.success;
  let statusGlow = COLORS.successGlow;

  if (activeIncident) {
    if (activeIncident.riskLevel === 'HIGH') {
      healthScore = dashboardSummary?.system_health ?? 42;
      statusText = 'CRITICAL ALARM ACTIVE';
      statusColor = COLORS.danger;
      statusGlow = COLORS.dangerGlow;
    } else if (activeIncident.riskLevel === 'WARNING') {
      healthScore = dashboardSummary?.system_health ?? 74;
      statusText = 'WARNING DETECTED';
      statusColor = COLORS.warning;
      statusGlow = COLORS.warningGlow;
    } else {
      healthScore = dashboardSummary?.system_health ?? 88;
      statusText = 'ADVISORY ACTIVE';
      statusColor = COLORS.info;
      statusGlow = COLORS.infoGlow;
    }
  } else if (dashboardSummary?.risk_level) {
    const backendRisk = dashboardSummary.risk_level.toUpperCase();
    if (backendRisk === 'HIGH' || backendRisk === 'CRITICAL') {
      statusText = 'HIGH RISK DETECTED';
      statusColor = COLORS.danger;
      statusGlow = COLORS.dangerGlow;
    } else if (backendRisk === 'MEDIUM' || backendRisk === 'WARNING') {
      statusText = 'WARNING LEVEL';
      statusColor = COLORS.warning;
      statusGlow = COLORS.warningGlow;
    }
  }

  // Count active device links
  const activeCount = Object.values(connections).filter(Boolean).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        
        {/* Futuristic Welcome Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>INDUSTRIAL MONITOR</Text>
            <Text style={TYPOGRAPHY.h1}>THINKLINK PORTAL</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsHeaderBtn} 
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              navigation.navigate('Settings');
            }}
          >
            <Ionicons name="settings-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Backend Connection Status Badge */}
        <View style={styles.connectionBadgeRow}>
          <View style={[styles.connectionBadge, { borderColor: backendConnected ? COLORS.success : COLORS.textTertiary }]}>
            <View style={[styles.connectionDot, { backgroundColor: backendConnected ? COLORS.success : COLORS.danger }]} />
            <Text style={[styles.connectionBadgeText, { color: backendConnected ? COLORS.success : COLORS.textTertiary }]}>
              API {backendConnected ? 'ONLINE' : 'OFFLINE'}
            </Text>
          </View>
          <View style={[styles.connectionBadge, { borderColor: socketConnected ? COLORS.success : COLORS.textTertiary }]}>
            <View style={[styles.connectionDot, { backgroundColor: socketConnected ? COLORS.success : COLORS.danger }]} />
            <Text style={[styles.connectionBadgeText, { color: socketConnected ? COLORS.success : COLORS.textTertiary }]}>
              SOCKET {socketConnected ? 'LIVE' : 'OFFLINE'}
            </Text>
          </View>
        </View>

        {/* Hero Health Gauge */}
        <View style={[styles.heroCard, { borderColor: statusColor + '40' }]}>
          <View style={styles.heroLayout}>
            {/* Custom Circular Status Indicator */}
            <View style={styles.dialContainer}>
              <View style={[styles.dialGlow, { backgroundColor: statusGlow }]} />
              <Animated.View 
                style={[
                  styles.dialPulseCircle, 
                  { 
                    borderColor: statusColor,
                    opacity: pulseAnim,
                    transform: [{ scale: pulseAnim.interpolate({
                      inputRange: [0.4, 1.0],
                      outputRange: [0.95, 1.15],
                    }) }]
                  }
                ]} 
              />
              <View style={[styles.dialInner, { borderColor: statusColor }]}>
                <Text style={[styles.dialNumber, { color: statusColor }]}>{Math.round(healthScore)}%</Text>
                <Text style={styles.dialLabel}>HEALTH</Text>
              </View>
            </View>

            {/* Status Information */}
            <View style={styles.statusInfo}>
              <View style={[styles.statusBadge, { backgroundColor: statusColor + '15', borderColor: statusColor }]}>
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                <Text style={[styles.statusBadgeText, { color: statusColor }]}>{statusText}</Text>
              </View>
              
              <Text style={styles.statusDescription}>
                {activeIncident 
                  ? `AI supervisor flagged high safety risk: "${activeIncident.title}". Inspect root cause in Logs.` 
                  : dashboardSummary 
                    ? `Backend monitoring ${dashboardSummary.total_devices ?? 0} devices. ${dashboardSummary.active_incidents ?? 0} active incidents.`
                    : 'Snapdragon AI agent cluster is analyzing edge telemetry. All industrial systems are operating within safe safety bounds.'
                }
              </Text>
            </View>
          </View>
        </View>

        {/* Latest Notification Banner */}
        {latestNotification && latestNotification.message && (
          <View style={styles.notificationBanner}>
            <Ionicons name="notifications-outline" size={16} color={COLORS.info} />
            <Text style={styles.notificationText} numberOfLines={2}>{latestNotification.message}</Text>
          </View>
        )}

        {/* Live Network Sync Grid */}
        <Text style={styles.sectionTitle}>Edge Link Registry</Text>
        <View style={styles.linkGrid}>
          {/* AI PC Card */}
          <View style={styles.linkCard}>
            <View style={[styles.linkIconBg, { backgroundColor: connections.pc ? COLORS.primary + '15' : COLORS.surfaceLight }]}>
              <Ionicons name="desktop-outline" size={20} color={connections.pc ? COLORS.primary : COLORS.textTertiary} />
            </View>
            <Text style={styles.linkLabel}>Snapdragon AI PC</Text>
            <View style={styles.linkStatusRow}>
              <View style={[styles.dotSmall, { backgroundColor: connections.pc ? COLORS.success : COLORS.danger }]} />
              <Text style={[styles.linkStatusText, { color: connections.pc ? COLORS.success : COLORS.danger }]}>
                {connections.pc ? 'Syncing' : 'Offline'}
              </Text>
            </View>
          </View>

          {/* Arduino Card */}
          <View style={styles.linkCard}>
            <View style={[styles.linkIconBg, { backgroundColor: connections.arduino ? COLORS.success + '15' : COLORS.surfaceLight }]}>
              <Ionicons name="hardware-chip-outline" size={20} color={connections.arduino ? COLORS.success : COLORS.textTertiary} />
            </View>
            <Text style={styles.linkLabel}>Arduino Uno Q</Text>
            <View style={styles.linkStatusRow}>
              <View style={[styles.dotSmall, { backgroundColor: connections.arduino ? COLORS.success : COLORS.danger }]} />
              <Text style={[styles.linkStatusText, { color: connections.arduino ? COLORS.success : COLORS.danger }]}>
                {connections.arduino ? 'Syncing' : 'Offline'}
              </Text>
            </View>
          </View>

          {/* Smart Glasses Card */}
          <View style={styles.linkCard}>
            <View style={[styles.linkIconBg, { backgroundColor: connections.glasses ? COLORS.info + '15' : COLORS.surfaceLight }]}>
              <Ionicons name="glasses-outline" size={20} color={connections.glasses ? COLORS.info : COLORS.textTertiary} />
            </View>
            <Text style={styles.linkLabel}>Meta AI Glasses</Text>
            <View style={styles.linkStatusRow}>
              <View style={[styles.dotSmall, { backgroundColor: connections.glasses ? COLORS.success : COLORS.danger }]} />
              <Text style={[styles.linkStatusText, { color: connections.glasses ? COLORS.success : COLORS.danger }]}>
                {connections.glasses ? 'Syncing' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>

        {/* Live Telemetry Glance */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Environmental Telemetry</Text>
          <TouchableOpacity onPress={() => {
            Haptics.selectionAsync().catch(() => {});
            navigation.navigate('Sensors');
          }}>
            <Text style={styles.sectionActionText}>VIEW DETAILS →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sensorGrid}>
          {/* Temperature */}
          <View style={styles.sensorMiniCard}>
            <View style={styles.sensorMiniHeader}>
              <Ionicons name="thermometer-outline" size={16} color={COLORS.primary} />
              <Text style={styles.sensorMiniTitle}>TEMP</Text>
            </View>
            <Text style={styles.sensorMiniVal}>{sensorData.temperature.toFixed(1)}°C</Text>
            <View style={styles.sensorProgressBarBg}>
              <View 
                style={[
                  styles.sensorProgressBar, 
                  { 
                    width: `${Math.min(100, (sensorData.temperature / 80) * 100)}%`,
                    backgroundColor: sensorData.temperature > 45 ? COLORS.danger : COLORS.primary 
                  }
                ]} 
              />
            </View>
          </View>

          {/* Gas */}
          <View style={styles.sensorMiniCard}>
            <View style={styles.sensorMiniHeader}>
              <Ionicons name="flame-outline" size={16} color={COLORS.warning} />
              <Text style={styles.sensorMiniTitle}>GAS</Text>
            </View>
            <Text style={styles.sensorMiniVal}>{sensorData.gas.toFixed(0)} PPM</Text>
            <View style={styles.sensorProgressBarBg}>
              <View 
                style={[
                  styles.sensorProgressBar, 
                  { 
                    width: `${Math.min(100, (sensorData.gas / 1000) * 100)}%`,
                    backgroundColor: sensorData.gas > 300 ? COLORS.danger : COLORS.warning 
                  }
                ]} 
              />
            </View>
          </View>

          {/* Vibration */}
          <View style={styles.sensorMiniCard}>
            <View style={styles.sensorMiniHeader}>
              <Ionicons name="pulse-outline" size={16} color={COLORS.info} />
              <Text style={styles.sensorMiniTitle}>VIB</Text>
            </View>
            <Text style={styles.sensorMiniVal}>{sensorData.vibration.toFixed(2)} G</Text>
            <View style={styles.sensorProgressBarBg}>
              <View 
                style={[
                  styles.sensorProgressBar, 
                  { 
                    width: `${Math.min(100, (sensorData.vibration / 5) * 100)}%`,
                    backgroundColor: sensorData.vibration > 1.5 ? COLORS.danger : COLORS.info 
                  }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Quick Launch Panel */}
        <Text style={styles.sectionTitle}>Operator Command Deck</Text>
        <View style={styles.quickLaunchContainer}>
          <TouchableOpacity 
            style={styles.launchCard}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              navigation.navigate('Analytics');
            }}
          >
            <View style={[styles.launchIconWrapper, { backgroundColor: COLORS.info + '15' }]}>
              <Ionicons name="bar-chart-outline" size={24} color={COLORS.info} />
            </View>
            <Text style={styles.launchTitle}>Analytics Trends</Text>
            <Text style={styles.launchDesc}>Review sensor logs & custom chart data</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.launchCard}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              navigation.navigate('Controls');
            }}
          >
            <View style={[styles.launchIconWrapper, { backgroundColor: COLORS.primary + '15' }]}>
              <Ionicons name="options-outline" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.launchTitle}>Hardware Overrides</Text>
            <Text style={styles.launchDesc}>Actuate relays, alarm buzzers, & LEDs</Text>
          </TouchableOpacity>
        </View>

        {/* Edge Console Logs */}
        <Text style={styles.sectionTitle}>Edge AI Event Console</Text>
        <View style={styles.consoleCard}>
          <View style={styles.consoleHeader}>
            <Text style={styles.consoleHeaderTitle}>$ snapdragon_agent_log</Text>
            <View style={styles.greenPulse} />
          </View>
          <View style={styles.consoleBody}>
            <Text style={styles.consolePrompt}>[INFO] {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</Text>
            <Text style={styles.consoleText}>{aiStatus.latestEvent}</Text>
            <Text style={styles.consoleSecLine}>- Active connections: {activeCount}/3. Sensor feeds scanning...</Text>
            <Text style={styles.consoleSecLine}>- Total incidents resolved in session: {historicalIncidents.length}</Text>
            <Text style={styles.consoleSecLine}>- Backend API: {backendConnected ? '✓ connected' : '✗ disconnected'}</Text>
          </View>
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
    paddingBottom: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  settingsHeaderBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionBadgeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  connectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    gap: 4,
  },
  connectionDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  connectionBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  heroCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderRadius: 18,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  heroLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  dialContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialGlow: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    filter: 'blur(10px)',
    opacity: 0.6,
  },
  dialPulseCircle: {
    position: 'absolute',
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2,
  },
  dialInner: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: COLORS.surface,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dialLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.textTertiary,
  },
  statusInfo: {
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  statusDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  notificationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.infoGlow,
    borderWidth: 1,
    borderColor: COLORS.info,
    borderRadius: 8,
    padding: SPACING.sm,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  notificationText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.info,
    fontWeight: '500',
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionActionText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  linkGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  linkCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  linkIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  linkLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  linkStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotSmall: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 4,
  },
  linkStatusText: {
    fontSize: 9,
    fontWeight: '600',
  },
  sensorGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  sensorMiniCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.sm,
  },
  sensorMiniHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  sensorMiniTitle: {
    fontSize: 9,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  sensorMiniVal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  sensorProgressBarBg: {
    height: 3,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  sensorProgressBar: {
    height: '100%',
    borderRadius: 1.5,
  },
  quickLaunchContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  launchCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: SPACING.md,
  },
  launchIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  launchTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  launchDesc: {
    fontSize: 10,
    color: COLORS.textSecondary,
    lineHeight: 14,
  },
  consoleCard: {
    backgroundColor: '#09090b',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  consoleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  consoleHeaderTitle: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.textSecondary,
  },
  greenPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
  },
  consoleBody: {
    padding: SPACING.sm,
  },
  consolePrompt: {
    color: COLORS.primary,
    fontSize: 10,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  consoleText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontFamily: 'monospace',
    lineHeight: 15,
  },
  consoleSecLine: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontFamily: 'monospace',
    marginTop: 4,
  },
});
