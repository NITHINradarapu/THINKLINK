import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

export interface ConnectionState {
  pc: boolean;
  arduino: boolean;
  glasses: boolean;
}

interface ConnectionStatusProps {
  connections: ConnectionState;
  backendConnected?: boolean;
}

export default function ConnectionStatus({ connections, backendConnected }: ConnectionStatusProps) {
  const devices = [
    { key: 'pc', label: 'Snapdragon AI PC', connected: connections.pc, icon: 'desktop-outline' as const },
    { key: 'arduino', label: 'Arduino UNO Q', connected: connections.arduino, icon: 'hardware-chip-outline' as const },
    { key: 'glasses', label: 'Meta AI Glasses', connected: connections.glasses, icon: 'glasses-outline' as const },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Connected Devices</Text>
        {backendConnected !== undefined && (
          <View style={[styles.sourceBadge, { borderColor: backendConnected ? COLORS.success : COLORS.textTertiary }]}>
            <View style={[styles.sourceDot, { backgroundColor: backendConnected ? COLORS.success : COLORS.textTertiary }]} />
            <Text style={[styles.sourceText, { color: backendConnected ? COLORS.success : COLORS.textTertiary }]}>
              {backendConnected ? 'API' : 'LOCAL'}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.deviceRow}>
        {devices.map((device) => (
          <View key={device.key} style={styles.deviceBadge}>
            <View style={styles.iconWrapper}>
              <Ionicons 
                name={device.icon} 
                size={18} 
                color={device.connected ? COLORS.success : COLORS.textTertiary} 
              />
            </View>
            <View style={styles.textWrapper}>
              <Text numberOfLines={1} style={styles.deviceLabel}>{device.label}</Text>
              <View style={styles.statusRow}>
                <View 
                  style={[
                    styles.statusDot, 
                    { backgroundColor: device.connected ? COLORS.success : COLORS.danger }
                  ]} 
                />
                <Text style={[
                  styles.statusText, 
                  { color: device.connected ? COLORS.success : COLORS.textTertiary }
                ]}>
                  {device.connected ? 'ONLINE' : 'OFFLINE'}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.caption,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  sourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    gap: 3,
  },
  sourceDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  sourceText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.xs,
  },
  deviceBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconWrapper: {
    marginRight: 6,
    marginLeft: 4,
  },
  textWrapper: {
    flex: 1,
  },
  deviceLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  statusRow: {
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
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
