import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';
import { useTelemetry, IncidentReport } from '../context/TelemetryContext';
import * as Haptics from 'expo-haptics';

// Enable layout animations for expanding items on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function IncidentsScreen() {
  const {
    activeIncident,
    historicalIncidents,
    toggleActionItem,
    serverIp,
    backendConnected,
    resolveIncidentById,
    refreshIncidents,
  } = useTelemetry();

  const [expandedIncidentId, setExpandedIncidentId] = useState<string | null>(null);
  const [resolving, setResolving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Refresh incidents on mount
  useEffect(() => {
    refreshIncidents().catch(() => {});
  }, [refreshIncidents]);

  // Pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshIncidents();
    } catch {}
    setRefreshing(false);
  };

  const toggleExpand = (id: string) => {
    Haptics.selectionAsync().catch(() => {});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIncidentId(expandedIncidentId === id ? null : id);
  };

  const handleResolve = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setResolving(true);
    try {
      // Try backend API first (using the backend incident ID)
      if (backendConnected && activeIncident?._backend?.incident_id) {
        await resolveIncidentById(activeIncident._backend.incident_id);
      } else {
        // Fallback to mock server reset
        await fetch(`${serverIp}/trigger/reset`);
      }
    } catch (e) {
      console.error('Failed to resolve incident:', e);
    } finally {
      setResolving(false);
    }
  };

  // Render individual expert chat bubbles
  const renderAgentConsensus = (consensusText: string) => {
    const agents = consensusText.split('\n');
    return (
      <View style={styles.agentContainer}>
        <Text style={styles.subsectionTitle}>Expert Agent Deliberation</Text>
        {agents.map((agentLine, index) => {
          const colonIndex = agentLine.indexOf(':');
          if (colonIndex === -1) {
            // If no colon found, display as a general analysis block
            if (agentLine.trim()) {
              return (
                <View key={index} style={styles.agentBubble}>
                  <View style={[styles.agentAvatar, { backgroundColor: COLORS.primary + '20' }]}>
                    <Ionicons name="analytics-outline" size={18} color={COLORS.primary} />
                  </View>
                  <View style={styles.agentTextContainer}>
                    <Text style={[styles.agentNameText, { color: COLORS.primary }]}>AI Analysis</Text>
                    <Text style={styles.agentMessageText}>{agentLine.trim()}</Text>
                  </View>
                </View>
              );
            }
            return null;
          }
          
          const agentName = agentLine.substring(0, colonIndex).trim();
          const agentMessage = agentLine.substring(colonIndex + 1).trim();

          // Determine avatar icon and color based on name
          let agentIcon: keyof typeof Ionicons.glyphMap = 'help-circle-outline';
          let iconColor = COLORS.primary;

          if (agentName.toLowerCase().includes('safety')) {
            agentIcon = 'shield-outline';
            iconColor = COLORS.danger;
          } else if (agentName.toLowerCase().includes('boiler') || agentName.toLowerCase().includes('turbine') || agentName.toLowerCase().includes('equipment')) {
            agentIcon = 'construct-outline';
            iconColor = COLORS.info;
          } else if (agentName.toLowerCase().includes('compliance')) {
            agentIcon = 'document-text-outline';
            iconColor = COLORS.warning;
          } else if (agentName.toLowerCase().includes('maintenance')) {
            agentIcon = 'calendar-outline';
            iconColor = COLORS.success;
          }

          return (
            <View key={index} style={styles.agentBubble}>
              <View style={[styles.agentAvatar, { backgroundColor: iconColor + '20' }]}>
                <Ionicons name={agentIcon} size={18} color={iconColor} />
              </View>
              <View style={styles.agentTextContainer}>
                <Text style={[styles.agentNameText, { color: iconColor }]}>{agentName}</Text>
                <Text style={styles.agentMessageText}>{agentMessage}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

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
        
        {/* ACTIVE INCIDENT SECTION */}
        {activeIncident ? (
          <View style={[styles.card, styles.activeIncidentCard]}>
            <View style={styles.activeHeader}>
              <View style={styles.hazardBadge}>
                <Ionicons name="warning-outline" size={16} color={COLORS.danger} />
                <Text style={styles.hazardText}>CRITICAL INCIDENT ACTIVE</Text>
              </View>
              <Text style={TYPOGRAPHY.caption}>{activeIncident.timestamp}</Text>
            </View>

            <Text style={styles.incidentTitle}>{activeIncident.title}</Text>

            {/* Backend metadata badges */}
            <View style={styles.metaRow}>
              <View style={styles.metaBadge}>
                <Text style={styles.metaLabel}>RISK: </Text>
                <Text style={[styles.metaVal, { color: COLORS.danger }]}>{activeIncident.riskLevel}</Text>
              </View>
              <View style={styles.metaBadge}>
                <Text style={styles.metaLabel}>CONFIDENCE: </Text>
                <Text style={[styles.metaVal, { color: COLORS.success }]}>{activeIncident.confidence.toFixed(0)}%</Text>
              </View>
            </View>

            {/* Show backend-specific fields if available */}
            {activeIncident._backend && (
              <View style={styles.backendMetaRow}>
                <View style={styles.metaBadge}>
                  <Text style={styles.metaLabel}>DEVICE: </Text>
                  <Text style={[styles.metaVal, { color: COLORS.info }]}>{activeIncident._backend.device_id}</Text>
                </View>
                <View style={styles.metaBadge}>
                  <Text style={styles.metaLabel}>TYPE: </Text>
                  <Text style={[styles.metaVal, { color: COLORS.info }]}>{activeIncident._backend.device_type}</Text>
                </View>
              </View>
            )}

            <View style={styles.divider} />

            {/* Root Cause */}
            <Text style={styles.subsectionTitle}>Root Cause Analysis</Text>
            <View style={styles.analysisBox}>
              <Text style={styles.analysisText}>{activeIncident.rootCause}</Text>
            </View>

            {/* Sensor Snapshot (from backend) */}
            {activeIncident._backend?.sensor_snapshot && Object.keys(activeIncident._backend.sensor_snapshot).length > 0 && (
              <>
                <Text style={styles.subsectionTitle}>Sensor Snapshot at Incident</Text>
                <View style={styles.snapshotContainer}>
                  {Object.entries(activeIncident._backend.sensor_snapshot).map(([key, value]) => (
                    <View key={key} style={styles.snapshotItem}>
                      <Text style={styles.snapshotKey}>{key.replace(/_/g, ' ').toUpperCase()}</Text>
                      <Text style={styles.snapshotValue}>{typeof value === 'number' ? value.toFixed(2) : String(value)}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* Multi-Agent consensus display */}
            {renderAgentConsensus(activeIncident.consensus)}

            {/* Operator Checklist */}
            <Text style={styles.subsectionTitle}>Recommended Actions Checklist</Text>
            <View style={styles.checklistContainer}>
              {activeIncident.actions.map((act) => (
                <TouchableOpacity 
                  key={act.id} 
                  style={styles.checkRow} 
                  onPress={() => {
                    Haptics.selectionAsync().catch(() => {});
                    toggleActionItem(act.id);
                  }}
                >
                  <View style={[styles.checkBox, act.done && styles.checkBoxChecked]}>
                    {act.done && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                  </View>
                  <Text style={[styles.checkText, act.done && styles.checkTextDone]}>
                    {act.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.resolveButton} 
              onPress={handleResolve}
              disabled={resolving}
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.resolveText}>{resolving ? 'RESOLVING...' : 'ACKNOWLEDGE & RESOLVE'}</Text>
            </TouchableOpacity>

          </View>
        ) : (
          /* SYSTEM NOMINAL PANEL */
          <View style={[styles.card, styles.nominalCard]}>
            <View style={styles.nominalGlow}>
              <Ionicons name="shield-checkmark" size={56} color={COLORS.success} />
            </View>
            <Text style={styles.nominalTitle}>System Status Nominal</Text>
            <Text style={styles.nominalDesc}>
              {backendConnected
                ? 'Backend API is monitoring sensor telemetry in real-time. No abnormalities have been flagged.'
                : 'Snapdragon AI PC is continuously monitoring sensor telemetry. No abnormalities have been flagged.'
              }
            </Text>
          </View>
        )}

        {/* HISTORICAL INCIDENTS */}
        <View style={styles.historyHeaderRow}>
          <Text style={styles.historyHeader}>Incident History Log</Text>
          {backendConnected && (
            <View style={styles.apiBadge}>
              <Text style={styles.apiBadgeText}>FROM API</Text>
            </View>
          )}
        </View>
        
        {historicalIncidents.length === 0 ? (
          <View style={styles.emptyHistory}>
            <Ionicons name="folder-open-outline" size={28} color={COLORS.textTertiary} />
            <Text style={styles.emptyHistoryText}>No incidents recorded in this session</Text>
          </View>
        ) : (
          historicalIncidents.map((incident) => {
            const isExpanded = expandedIncidentId === incident.id;
            const isActive = activeIncident?.id === incident.id;
            const backendStatus = incident._backend?.status;
            const isResolved = backendStatus === 'resolved' || (!isActive);
            
            return (
              <View 
                key={incident.id} 
                style={[
                  styles.historyCard, 
                  isActive && { borderColor: COLORS.danger, borderLeftColor: COLORS.danger }
                ]}
              >
                <TouchableOpacity 
                  style={styles.historySummary} 
                  onPress={() => toggleExpand(incident.id)}
                >
                  <View style={styles.historyMain}>
                    <Text style={styles.historyTitle}>{incident.title}</Text>
                    <View style={styles.historyMeta}>
                      <Text style={styles.historyTime}>{incident.timestamp}</Text>
                      <View style={[
                        styles.historyStatusDot, 
                        { backgroundColor: isActive ? COLORS.danger : COLORS.success }
                      ]} />
                      <Text style={[
                        styles.historyStatusText, 
                        { color: isActive ? COLORS.danger : COLORS.success }
                      ]}>
                        {isActive ? 'ACTIVE' : (backendStatus?.toUpperCase() || 'RESOLVED')}
                      </Text>
                    </View>
                  </View>
                  <Ionicons 
                    name={isExpanded ? 'chevron-up' : 'chevron-down'} 
                    size={20} 
                    color={COLORS.textSecondary} 
                  />
                </TouchableOpacity>

                {/* Collapsible Details */}
                {isExpanded && (
                  <View style={styles.historyDetails}>
                    <View style={styles.divider} />

                    {/* Backend device info */}
                    {incident._backend && (
                      <View style={styles.expandedMetaRow}>
                        <Text style={styles.expandedLabel}>Device: </Text>
                        <Text style={styles.expandedMetaValue}>{incident._backend.device_id} ({incident._backend.device_type})</Text>
                      </View>
                    )}

                    <Text style={styles.expandedLabel}>Root Cause:</Text>
                    <Text style={styles.expandedText}>{incident.rootCause}</Text>
                    
                    <Text style={[styles.expandedLabel, { marginTop: SPACING.sm }]}>AI Agent Findings:</Text>
                    <Text style={styles.expandedText} numberOfLines={4}>{incident.consensus}</Text>

                    <View style={[styles.metaBadge, { marginTop: SPACING.sm, width: 140 }]}>
                      <Text style={styles.metaLabel}>Confidence: </Text>
                      <Text style={[styles.metaVal, { color: COLORS.success }]}>{incident.confidence.toFixed(1)}%</Text>
                    </View>

                    {/* Recommended actions list */}
                    {incident.actions.length > 0 && (
                      <View style={styles.expandedActionsContainer}>
                        <Text style={[styles.expandedLabel, { marginTop: SPACING.sm }]}>Recommended Actions:</Text>
                        {incident.actions.map((act, i) => (
                          <Text key={act.id} style={styles.expandedActionItem}>• {act.text}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            );
          })
        )}

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
    borderRadius: 16,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  nominalCard: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  nominalGlow: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.successGlow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  nominalTitle: {
    ...TYPOGRAPHY.h2,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  nominalDesc: {
    ...TYPOGRAPHY.bodySecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
    lineHeight: 20,
  },
  activeIncidentCard: {
    borderColor: COLORS.danger,
    borderWidth: 1.5,
  },
  activeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  hazardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dangerGlow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  hazardText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.danger,
  },
  incidentTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  metaRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  backendMetaRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  metaBadge: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metaLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  metaVal: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  analysisBox: {
    backgroundColor: '#09090b',
    borderRadius: 8,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  analysisText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  snapshotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  snapshotItem: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 6,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: '30%',
    flexGrow: 1,
  },
  snapshotKey: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  snapshotValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  agentContainer: {
    marginBottom: SPACING.md,
  },
  agentBubble: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 10,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  agentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  agentTextContainer: {
    flex: 1,
  },
  agentNameText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  agentMessageText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    marginTop: 2,
    lineHeight: 16,
  },
  checklistContainer: {
    marginBottom: SPACING.lg,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    paddingVertical: 4,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.textSecondary,
    marginRight: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkText: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  checkTextDone: {
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
  },
  resolveButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resolveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  historyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  historyHeader: {
    ...TYPOGRAPHY.h3,
    fontWeight: 'bold',
  },
  apiBadge: {
    backgroundColor: COLORS.successGlow,
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  apiBadgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  emptyHistory: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  emptyHistoryText: {
    ...TYPOGRAPHY.bodySecondary,
    color: COLORS.textTertiary,
    marginTop: SPACING.sm,
  },
  historyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  historySummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
  },
  historyMain: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  historyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  historyTime: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginRight: SPACING.sm,
  },
  historyStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  historyStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  historyDetails: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  expandedLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  expandedText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    lineHeight: 16,
  },
  expandedMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  expandedMetaValue: {
    fontSize: 11,
    color: COLORS.info,
    fontWeight: '600',
  },
  expandedActionsContainer: {
    marginTop: SPACING.xs,
  },
  expandedActionItem: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginLeft: SPACING.sm,
  },
});
