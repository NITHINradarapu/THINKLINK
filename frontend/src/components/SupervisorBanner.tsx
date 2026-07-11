import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

interface SupervisorBannerProps {
  status: 'monitoring' | 'analyzing' | 'resolved';
  latestEvent: string;
}

export default function SupervisorBanner({ status, latestEvent }: SupervisorBannerProps) {
  let statusColor = COLORS.primary;
  let statusText = 'MONITORING ENVIRONMENT';
  let iconName: keyof typeof Ionicons.glyphMap = 'shield-checkmark-outline';

  if (status === 'analyzing') {
    statusColor = COLORS.warning;
    statusText = 'ANOMALY DETECTED - EVALUATING';
    iconName = 'analytics-outline';
  } else if (status === 'resolved') {
    statusColor = COLORS.success;
    statusText = 'SYSTEM ANOMALY RESOLVED';
    iconName = 'checkmark-circle-outline';
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusGroup}>
          <Ionicons name={iconName} size={18} color={statusColor} />
          <Text style={[styles.statusTitle, { color: statusColor }]}>{statusText}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>EDGE AI</Text>
        </View>
      </View>

      <View style={styles.console}>
        <View style={styles.consoleLine}>
          <Text style={styles.prompt}>$ supervisor_agent: </Text>
          <Text style={styles.terminalText}>{latestEvent}</Text>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: COLORS.primaryGlow,
    borderColor: COLORS.primary,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  console: {
    backgroundColor: '#09090b',
    borderRadius: 6,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  consoleLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  prompt: {
    color: COLORS.primary,
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  terminalText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontFamily: 'monospace',
    flex: 1,
  },
});
