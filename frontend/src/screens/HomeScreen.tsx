import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Animated, RefreshControl, Modal, ActivityIndicator } from 'react-native';
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
    getDeviceDetails,
    getDeviceHistoryList,
  } = useTelemetry();

  const [refreshing, setRefreshing] = React.useState(false);

  // Device History Modal states
  const [isDeviceHistoryModalVisible, setIsDeviceHistoryModalVisible] = React.useState(false);
  const [deviceDetails, setDeviceDetails] = React.useState<any>(null);
  const [deviceHistory, setDeviceHistory] = React.useState<any[]>([]);
  const [loadingDeviceData, setLoadingDeviceData] = React.useState(false);

  const handleOpenDeviceHistory = async (deviceId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setIsDeviceHistoryModalVisible(true);
    setLoadingDeviceData(true);
    setDeviceDetails(null);
    setDeviceHistory([]);
    try {
      if (backendConnected) {
        const details = await getDeviceDetails(deviceId);
        const historyList = await getDeviceHistoryList(deviceId);
        // Override DB status with real-time serial connection status
        if (details) {
          details.status = connections.arduino ? 'online' : 'offline';
        }
        setDeviceDetails(details);
        setDeviceHistory(historyList);
      } else {
        // Fallback to current live sensor data (no mock logs)
        setDeviceDetails({
          device_id: deviceId,
          device_type: 'ARDUINO',
          status: connections.arduino ? 'online' : 'offline',
          last_seen: new Date().toISOString(),
          latest_telemetry: {
            temperature: sensorData.temperature,
            humidity: sensorData.humidity,
            gas_level: sensorData.gas,
            smoke_detected: sensorData.smoke_detected,
            battery_level: sensorData.battery_level || 100
          }
        });
        setDeviceHistory([]);
      }
    } catch (err) {
      console.error('Failed to load device data:', err);
    } finally {
      setLoadingDeviceData(false);
    }
  };

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

  // Calculate System Health — UP when safe/advisory/warning, DOWN when critical or offline
  let healthIsUp = true;
  let statusText = 'SYSTEM NOMINAL';
  let statusColor = COLORS.success;
  let statusGlow = COLORS.successGlow;

  if (activeIncident) {
    if (activeIncident.riskLevel === 'HIGH') {
      healthIsUp = false;
      statusText = 'CRITICAL ALARM ACTIVE';
      statusColor = COLORS.danger;
      statusGlow = COLORS.dangerGlow;
    } else if (activeIncident.riskLevel === 'WARNING') {
      healthIsUp = true;
      statusText = 'WARNING DETECTED';
      statusColor = COLORS.warning;
      statusGlow = COLORS.warningGlow;
    } else {
      healthIsUp = true;
      statusText = 'ADVISORY ACTIVE';
      statusColor = COLORS.info;
      statusGlow = COLORS.infoGlow;
    }
  } else if (dashboardSummary?.risk_level) {
    const backendRisk = dashboardSummary.risk_level.toUpperCase();
    if (backendRisk === 'HIGH' || backendRisk === 'CRITICAL') {
      healthIsUp = false;
      statusText = 'HIGH RISK DETECTED';
      statusColor = COLORS.danger;
      statusGlow = COLORS.dangerGlow;
    } else if (backendRisk === 'MEDIUM' || backendRisk === 'WARNING') {
      healthIsUp = true;
      statusText = 'WARNING LEVEL';
      statusColor = COLORS.warning;
      statusGlow = COLORS.warningGlow;
    }
  } else if (!backendConnected) {
    healthIsUp = false;
    statusText = 'BACKEND OFFLINE';
    statusColor = COLORS.danger;
    statusGlow = COLORS.dangerGlow;
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
                <Ionicons 
                  name={healthIsUp ? 'arrow-up' : 'arrow-down'} 
                  size={32} 
                  color={statusColor} 
                />
                <Text style={[styles.dialLabel, { color: statusColor, fontSize: 11, fontWeight: 'bold' }]}>
                  {healthIsUp ? 'UP' : 'DOWN'}
                </Text>
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
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Edge Link Registry</Text>
          <TouchableOpacity 
            style={styles.refreshBadgeBtn}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              onRefresh();
            }}
          >
            <Ionicons name="sync-outline" size={12} color={COLORS.primary} />
            <Text style={styles.refreshBadgeText}>SYNC NOW</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linkGrid}>
          {/* AI PC Card — use backendConnected as source of truth */}
          <View style={[styles.linkCard, backendConnected && { borderColor: COLORS.primary + '80' }]}>
            <View style={[styles.linkIconBg, { backgroundColor: backendConnected ? COLORS.primary + '15' : COLORS.surfaceLight }]}>
              <Ionicons name="desktop-outline" size={20} color={backendConnected ? COLORS.primary : COLORS.textTertiary} />
            </View>
            <Text style={styles.linkLabel}>Snapdragon AI PC</Text>
            <Text style={styles.linkSublabel}>{backendConnected ? 'Swarm Engine Active' : 'Disconnected'}</Text>
            <View style={styles.linkStatusRow}>
              <View style={[styles.dotSmall, { backgroundColor: backendConnected ? COLORS.success : COLORS.danger }]} />
              <Text style={[styles.linkStatusText, { color: backendConnected ? COLORS.success : COLORS.danger }]}>
                {backendConnected ? 'Syncing' : 'Offline'}
              </Text>
            </View>
          </View>

          {/* Arduino Card */}
          <TouchableOpacity 
            style={[styles.linkCard, connections.arduino && { borderColor: COLORS.success + '80' }]}
            onPress={() => handleOpenDeviceHistory('ARDUINO-01')}
          >
            <View style={[styles.linkIconBg, { backgroundColor: connections.arduino ? COLORS.success + '15' : COLORS.surfaceLight }]}>
              <Ionicons name="hardware-chip-outline" size={20} color={connections.arduino ? COLORS.success : COLORS.textTertiary} />
            </View>
            <Text style={styles.linkLabel}>Arduino Uno Q</Text>
            <Text style={styles.linkSublabel}>{connections.arduino ? 'COM3 Serial Link' : 'Disconnected'}</Text>
            <View style={styles.linkStatusRow}>
              <View style={[styles.dotSmall, { backgroundColor: connections.arduino ? COLORS.success : COLORS.danger }]} />
              <Text style={[styles.linkStatusText, { color: connections.arduino ? COLORS.success : COLORS.danger }]}>
                {connections.arduino ? 'Syncing' : 'Offline'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Smart Glasses Card */}
          <View style={[styles.linkCard, connections.glasses && { borderColor: COLORS.info + '80' }]}>
            <View style={[styles.linkIconBg, { backgroundColor: connections.glasses ? COLORS.info + '15' : COLORS.surfaceLight }]}>
              <Ionicons name="glasses-outline" size={20} color={connections.glasses ? COLORS.info : COLORS.textTertiary} />
            </View>
            <Text style={styles.linkLabel}>Meta AI Glasses</Text>
            <Text style={styles.linkSublabel}>{connections.glasses ? 'Audio/Vision Feed' : 'Disconnected'}</Text>
            <View style={styles.linkStatusRow}>
              <View style={[styles.dotSmall, { backgroundColor: connections.glasses ? COLORS.success : COLORS.danger }]} />
              <Text style={[styles.linkStatusText, { color: connections.glasses ? COLORS.success : COLORS.danger }]}>
                {connections.glasses ? 'Syncing' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>

        {/* Sensor Telemetry Quick Link */}
        <TouchableOpacity 
          style={styles.sensorQuickLink}
          onPress={() => {
            Haptics.selectionAsync().catch(() => {});
            navigation.navigate('Sensors');
          }}
        >
          <View style={styles.sensorQuickLinkRow}>
            <View style={[styles.launchIconWrapper, { backgroundColor: COLORS.success + '15' }]}>
              <Ionicons name="speedometer-outline" size={24} color={COLORS.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.launchTitle}>Live Sensor Telemetry</Text>
              <Text style={styles.launchDesc}>View real-time gauges for temperature, gas, vibration, humidity & smoke</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
          </View>
        </TouchableOpacity>

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

      {/* DEVICE HISTORY MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeviceHistoryModalVisible}
        onRequestClose={() => setIsDeviceHistoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Device Telemetry & Logs</Text>
              <TouchableOpacity
                onPress={() => {
                  Haptics.selectionAsync().catch(() => {});
                  setIsDeviceHistoryModalVisible(false);
                }}
              >
                <Ionicons name="close-circle-outline" size={24} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            {loadingDeviceData ? (
              <View style={styles.modalLoading}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.modalLoadingText}>Fetching device logs...</Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {deviceDetails && (
                  <View style={styles.deviceDetailsCard}>
                    <View style={styles.detailHeader}>
                      <Text style={styles.deviceName}>{deviceDetails.device_id}</Text>
                      <View style={[styles.statusBadge, { 
                        backgroundColor: deviceDetails.status === 'online' || deviceDetails.status === 'active' ? COLORS.successGlow : COLORS.dangerGlow,
                        borderColor: deviceDetails.status === 'online' || deviceDetails.status === 'active' ? COLORS.success : COLORS.danger
                      }]}>
                        <Text style={[styles.statusBadgeText, { 
                          color: deviceDetails.status === 'online' || deviceDetails.status === 'active' ? COLORS.success : COLORS.danger
                        }]}>
                          {(deviceDetails.status || 'ONLINE').toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.detailGrid}>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>TYPE</Text>
                        <Text style={styles.detailVal}>{deviceDetails.device_type || 'ARDUINO'}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>BATTERY</Text>
                        <Text style={styles.detailVal}>
                          {deviceDetails.latest_telemetry?.battery_level ?? deviceDetails.battery_level ?? 'N/A'}%
                        </Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>LAST SEEN</Text>
                        <Text style={styles.detailVal} numberOfLines={1}>
                          {deviceDetails.last_seen ? new Date(deviceDetails.last_seen).toLocaleTimeString() : 'Just now'}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                <Text style={styles.historyTitle}>Rolling Telemetry History</Text>
                
                {deviceHistory.length === 0 ? (
                  <View style={styles.emptyHistory}>
                    <Ionicons name="file-tray-outline" size={28} color={COLORS.textTertiary} />
                    <Text style={styles.emptyHistoryText}>No telemetry history available</Text>
                  </View>
                ) : (
                  deviceHistory.map((item, index) => (
                    <View key={index} style={styles.historyRow}>
                      <View style={styles.historyTimeCol}>
                        <Text style={styles.historyRowTime}>
                          {item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : 'N/A'}
                        </Text>
                      </View>
                      <View style={styles.historyDataCol}>
                        <View style={styles.dataBadge}>
                          <Text style={styles.dataLabel}>Temp: </Text>
                          <Text style={styles.dataValue}>{item.temperature?.toFixed(1) ?? 'N/A'}°C</Text>
                        </View>
                        <View style={styles.dataBadge}>
                          <Text style={styles.dataLabel}>Gas: </Text>
                          <Text style={styles.dataValue}>{item.gas_level?.toFixed(0) ?? item.gas ?? 'N/A'} PPM</Text>
                        </View>
                        <View style={styles.dataBadge}>
                          <Text style={styles.dataLabel}>Hum: </Text>
                          <Text style={styles.dataValue}>{item.humidity?.toFixed(0) ?? 'N/A'}%</Text>
                        </View>
                      </View>
                    </View>
                  ))
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sensorQuickLink: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  sensorQuickLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
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
    marginBottom: 2,
  },
  linkSublabel: {
    fontSize: 8,
    color: COLORS.textSecondary,
    marginBottom: 6,
    textAlign: 'center',
  },
  refreshBadgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  refreshBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.primary,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: SPACING.md,
  },
  modalContent: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  modalTitle: {
    ...TYPOGRAPHY.h3,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  modalLoading: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalLoadingText: {
    ...TYPOGRAPHY.bodySecondary,
    color: COLORS.textTertiary,
    marginTop: SPACING.sm,
  },
  deviceDetailsCard: {
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  deviceModalStatusBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  deviceModalStatusBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  detailGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 8,
    color: COLORS.textTertiary,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  detailVal: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  historyTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  emptyHistory: {
    alignItems: 'center',
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  emptyHistoryText: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 4,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  historyTimeCol: {
    width: 65,
  },
  historyRowTime: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  historyDataCol: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.xs,
    justifyContent: 'flex-end',
  },
  dataBadge: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dataLabel: {
    fontSize: 8,
    color: COLORS.textTertiary,
  },
  dataValue: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
});
