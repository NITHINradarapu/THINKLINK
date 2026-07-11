import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Switch, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';
import { useTelemetry } from '../context/TelemetryContext';
import { api } from '../services/api';
import * as Haptics from 'expo-haptics';

export default function ControlsScreen() {
  const { actuators, triggerActuator, connections, backendConnected } = useTelemetry();
  const [checkingDevices, setCheckingDevices] = useState(false);
  const [monitorResult, setMonitorResult] = useState<string | null>(null);

  const handleToggle = (key: keyof typeof actuators, value: boolean) => {
    // Show a warning confirmation dialog before activating the high-risk relay
    if (key === 'relay' && value) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      Alert.alert(
        'Confirm Machinery Shutdown',
        'Warning: Toggling the isolation relay will immediately cut power to the main assembly turbine. Do you want to proceed?',
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          { 
            text: 'Confirm Shutdown', 
            onPress: () => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
              triggerActuator(key, value);
            }, 
            style: 'destructive' 
          }
        ]
      );
    } else {
      if (value) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      } else {
        Haptics.selectionAsync().catch(() => {});
      }
      triggerActuator(key, value);
    }
  };

  // Run backend device health check
  const handleDeviceCheck = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setCheckingDevices(true);
    setMonitorResult(null);
    try {
      const result = await api.checkDevices();
      setMonitorResult(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setMonitorResult(`Failed: ${err.message}`);
    } finally {
      setCheckingDevices(false);
    }
  };

  const actuatorCards = [
    {
      key: 'buzzer' as const,
      label: 'Local Buzzer Alarm',
      desc: 'Sounds a physical piezo buzzer on the Arduino UNO Q board to warn local field engineers.',
      iconOn: 'volume-high' as const,
      iconOff: 'volume-mute-outline' as const,
      danger: true,
    },
    {
      key: 'led' as const,
      label: 'Safety Status LED',
      desc: 'Controls the status indication LED color/state. Flashes red during anomalies, green when safe.',
      iconOn: 'bulb' as const,
      iconOff: 'bulb-outline' as const,
      danger: false,
    },
    {
      key: 'relay' as const,
      label: 'Emergency Isolation Relay',
      desc: 'Cuts mechanical power supply to turbine shaft #1 to prevent physical collision or fire spread.',
      iconOn: 'power' as const,
      iconOff: 'power-outline' as const,
      danger: true,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={TYPOGRAPHY.h2}>Remote Actuation</Text>
          <Text style={styles.headerDesc}>
            Manually override Arduino board outputs. Remote commands are routed through the Snapdragon AI PC.
          </Text>
        </View>

        {!connections.arduino && (
          <View style={styles.offlineAlert}>
            <Ionicons name="warning" size={20} color={COLORS.danger} />
            <Text style={styles.offlineText}>
              Arduino UNO Q is offline. Commands will be queued until the edge controller reconnects.
            </Text>
          </View>
        )}

        {actuatorCards.map((act) => {
          const isOn = actuators[act.key];
          const activeColor = act.danger ? COLORS.danger : COLORS.primary;
          
          return (
            <View key={act.key} style={[styles.card, isOn && { borderColor: activeColor }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconWrapper, { backgroundColor: isOn ? activeColor + '15' : COLORS.surfaceLight }]}>
                  <Ionicons 
                    name={isOn ? act.iconOn : act.iconOff} 
                    size={24} 
                    color={isOn ? activeColor : COLORS.textTertiary} 
                  />
                </View>
                
                <View style={styles.titleWrapper}>
                  <Text style={styles.cardTitle}>{act.label}</Text>
                  <View style={styles.badgeRow}>
                    <View style={[styles.statusDot, { backgroundColor: isOn ? activeColor : COLORS.textTertiary }]} />
                    <Text style={[styles.statusText, { color: isOn ? activeColor : COLORS.textTertiary }]}>
                      {isOn ? 'ACTIVE' : 'INACTIVE'}
                    </Text>
                  </View>
                </View>

                <Switch
                  trackColor={{ false: COLORS.surfaceLight, true: activeColor + '80' }}
                  thumbColor={isOn ? activeColor : COLORS.textSecondary}
                  ios_backgroundColor={COLORS.surfaceLight}
                  onValueChange={(val) => handleToggle(act.key, val)}
                  value={isOn}
                  disabled={!connections.pc} // Disable switches if server is offline
                />
              </View>

              <Text style={styles.cardDesc}>{act.desc}</Text>
            </View>
          );
        })}

        {/* Device Monitor Check — backend POST /monitor/check */}
        {backendConnected && (
          <>
            <Text style={styles.sectionTitle}>Backend Device Monitor</Text>
            <View style={styles.monitorCard}>
              <Text style={styles.monitorDesc}>
                Run a backend device health check to verify all registered IoT devices are responding.
              </Text>
              <TouchableOpacity 
                style={styles.monitorButton}
                onPress={handleDeviceCheck}
                disabled={checkingDevices}
              >
                {checkingDevices ? (
                  <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                  <Ionicons name="scan-outline" size={16} color={COLORS.primary} />
                )}
                <Text style={styles.monitorButtonText}>
                  {checkingDevices ? 'CHECKING...' : 'RUN DEVICE CHECK'}
                </Text>
              </TouchableOpacity>

              {monitorResult && (
                <View style={styles.monitorResultBox}>
                  <Text style={styles.monitorResultText}>{monitorResult}</Text>
                </View>
              )}
            </View>
          </>
        )}

        {/* Info panel */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.textSecondary} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            ThinkLink defaults to automated AI safety actuation. Manual controls act as secondary human overrides and will log incident records.
          </Text>
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
    marginBottom: SPACING.lg,
  },
  headerDesc: {
    ...TYPOGRAPHY.bodySecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  offlineAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dangerGlow,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 8,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  offlineText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.danger,
    fontWeight: '500',
    lineHeight: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  titleWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  cardDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    lineHeight: 18,
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
  monitorCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  monitorDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  monitorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    height: 42,
    backgroundColor: COLORS.primaryGlow,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
  },
  monitorButtonText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  monitorResultBox: {
    backgroundColor: '#09090b',
    borderRadius: 6,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: SPACING.md,
  },
  monitorResultText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.textPrimary,
    lineHeight: 14,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  infoIcon: {
    marginRight: SPACING.sm,
  },
  infoText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
});
