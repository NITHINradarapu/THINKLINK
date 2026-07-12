import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';
import { useTelemetry } from '../context/TelemetryContext';

interface EmergencyModalProps {
  onViewReport: () => void;
}

export default function EmergencyModal({ onViewReport }: EmergencyModalProps) {
  const { activeIncident, clearActiveIncident } = useTelemetry();
  const flashAnim = useRef(new Animated.Value(0.15)).current;

  // Flash warning glow animation
  useEffect(() => {
    if (activeIncident) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(flashAnim, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(flashAnim, {
            toValue: 0.15,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      flashAnim.setValue(0.15);
    }
  }, [activeIncident, flashAnim]);

  // Only show emergency popup for HIGH risk — MEDIUM/INFO are logged silently in Incidents tab
  if (!activeIncident || activeIncident.riskLevel !== 'HIGH') return null;

  // Determine display values — handle both backend and mock formats
  const riskLevel = activeIncident.riskLevel || 'WARNING';
  const isHigh = riskLevel === 'HIGH';
  const title = activeIncident.title;
  const confidence = activeIncident.confidence;
  const rootCause = activeIncident.rootCause;
  const deviceId = activeIncident._backend?.device_id;
  const deviceType = activeIncident._backend?.device_type;

  return (
    <Modal
      transparent={true}
      visible={!!activeIncident}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Animated flashing background */}
        <Animated.View 
          style={[
            styles.flashBg, 
            { 
              opacity: flashAnim, 
              backgroundColor: isHigh ? COLORS.danger : COLORS.warning 
            }
          ]} 
        />
        
        <View style={styles.alertCard}>
          {/* Pulse Icon */}
          <View style={styles.iconContainer}>
            <Ionicons 
              name="warning" 
              size={48} 
              color={isHigh ? COLORS.danger : COLORS.warning} 
            />
          </View>
          
          <Text style={styles.alertHeader}>HAZARD DETECTED</Text>
          <Text style={styles.alertTitle}>{title}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>RISK LEVEL:</Text>
            <Text style={[styles.detailValue, { color: isHigh ? COLORS.danger : COLORS.warning, fontWeight: 'bold' }]}>
              {riskLevel}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>CONFIDENCE:</Text>
            <Text style={styles.detailValue}>{confidence.toFixed(1)}%</Text>
          </View>

          {/* Backend-specific device info */}
          {deviceId && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>DEVICE:</Text>
              <Text style={styles.detailValue}>{deviceId}{deviceType ? ` (${deviceType})` : ''}</Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>PROBABLE CAUSE:</Text>
            <Text style={styles.detailValue} numberOfLines={2}>{rootCause}</Text>
          </View>

          <Text style={styles.instruction}>
            {activeIncident._backend
              ? 'Backend AI system has flagged this incident. Review and take action immediately.'
              : 'Snapdragon AI PC has initiated Supervisor Analysis. Verify incident conditions immediately.'
            }
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.dismissButton} onPress={clearActiveIncident}>
              <Text style={styles.dismissButtonText}>DISMISS</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.actionButton, 
                { backgroundColor: isHigh ? COLORS.danger : COLORS.warning }
              ]} 
              onPress={() => {
                onViewReport();
              }}
            >
              <Text style={styles.actionButtonText}>VIEW REPORT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  flashBg: {
    ...StyleSheet.absoluteFillObject,
  },
  alertCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.58,
    shadowRadius: 16,
  },
  iconContainer: {
    marginBottom: SPACING.md,
  },
  alertHeader: {
    ...TYPOGRAPHY.caption,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: COLORS.textSecondary,
  },
  alertTitle: {
    ...TYPOGRAPHY.h2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    width: '100%',
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SPACING.sm,
  },
  detailLabel: {
    ...TYPOGRAPHY.caption,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  detailValue: {
    ...TYPOGRAPHY.bodySecondary,
    textAlign: 'right',
    maxWidth: '65%',
  },
  instruction: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    color: COLORS.textTertiary,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    lineHeight: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    width: '100%',
  },
  dismissButton: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissButtonText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  actionButton: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
