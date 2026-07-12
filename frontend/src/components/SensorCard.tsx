import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: keyof typeof Ionicons.glyphMap;
  minVal: number;
  maxVal: number;
  warningLimit: number;
  dangerLimit: number;
}

export default function SensorCard({
  title,
  value,
  unit,
  icon,
  minVal,
  maxVal,
  warningLimit,
  dangerLimit,
}: SensorCardProps) {
  // Determine safety status
  let status: 'safe' | 'warning' | 'danger' = 'safe';
  let statusText = 'NORMAL';
  let statusColor = COLORS.success;
  let statusGlow = COLORS.successGlow;

  const isInverted = title.toLowerCase().includes('battery');

  if (isInverted) {
    if (value <= dangerLimit) {
      status = 'danger';
      statusText = 'CRITICAL';
      statusColor = COLORS.danger;
      statusGlow = COLORS.dangerGlow;
    } else if (value <= warningLimit) {
      status = 'warning';
      statusText = 'WARNING';
      statusColor = COLORS.warning;
      statusGlow = COLORS.warningGlow;
    }
  } else {
    if (value >= dangerLimit) {
      status = 'danger';
      statusText = 'CRITICAL';
      statusColor = COLORS.danger;
      statusGlow = COLORS.dangerGlow;
    } else if (value >= warningLimit) {
      status = 'warning';
      statusText = 'WARNING';
      statusColor = COLORS.warning;
      statusGlow = COLORS.warningGlow;
    }
  }

  // Calculate percentage for progress bar
  const range = maxVal - minVal;
  const clampedValue = Math.max(minVal, Math.min(maxVal, value));
  const fillPercentage = ((clampedValue - minVal) / range) * 100;

  return (
    <View style={[styles.card, { borderColor: statusColor }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: statusGlow }]}>
          <Ionicons name={icon} size={24} color={statusColor} />
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusGlow, borderColor: statusColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.valueRow}>
        <Text style={styles.value}>{value.toFixed(1)}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      {/* Progress Bar Gauge */}
      <View style={styles.gaugeContainer}>
        <View style={styles.gaugeBg}>
          <View 
            style={[
              styles.gaugeFill, 
              { width: `${fillPercentage}%`, backgroundColor: statusColor }
            ]} 
          />
        </View>
        
        {/* Markers on the gauge */}
        <View style={styles.limitMarkers}>
          <Text style={styles.limitText}>{minVal.toFixed(0)}</Text>
          <Text style={styles.limitText}>{maxVal.toFixed(0)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.md,
    borderWidth: 1.5,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    padding: SPACING.sm,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    ...TYPOGRAPHY.bodySecondary,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.md,
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  unit: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  gaugeContainer: {
    width: '100%',
  },
  gaugeBg: {
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  gaugeFill: {
    height: '100%',
    borderRadius: 4,
  },
  limitMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  limitText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
  },
});
