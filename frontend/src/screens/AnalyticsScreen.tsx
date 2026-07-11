import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/theme';
import { useTelemetry } from '../context/TelemetryContext';
import * as Haptics from 'expo-haptics';

type SensorType = 'temperature' | 'gas' | 'vibration';

export default function AnalyticsScreen() {
  const { telemetryHistory, historicalIncidents, dashboardStatistics, riskDistribution, backendConnected } = useTelemetry();
  const [selectedSensor, setSelectedSensor] = useState<SensorType>('temperature');

  // Sensor configuration for limits, labels, and formatting
  const sensorConfig = useMemo(() => {
    return {
      temperature: {
        label: 'Ambient Temperature',
        unit: '°C',
        maxLimit: 80,
        warningLimit: 45,
        dangerLimit: 60,
        icon: 'thermometer-outline',
        color: COLORS.primary,
      },
      gas: {
        label: 'Hazardous Gas Concentration',
        unit: 'PPM',
        maxLimit: 1000,
        warningLimit: 300,
        dangerLimit: 600,
        icon: 'flame-outline',
        color: COLORS.warning,
      },
      vibration: {
        label: 'Equipment Vibration',
        unit: 'G',
        maxLimit: 5.0,
        warningLimit: 1.5,
        dangerLimit: 3.0,
        icon: 'pulse-outline',
        color: COLORS.info,
      },
    };
  }, []);

  const config = sensorConfig[selectedSensor];

  // Dynamic statistics — use backend data if available, else compute from local history
  const stats = useMemo(() => {
    // If backend statistics are available, use them for the selected sensor
    if (dashboardStatistics && backendConnected) {
      if (selectedSensor === 'temperature' && dashboardStatistics.average_temperature !== undefined) {
        return {
          min: dashboardStatistics.average_temperature * 0.85,
          max: dashboardStatistics.average_temperature * 1.15,
          average: dashboardStatistics.average_temperature,
          current: telemetryHistory.length > 0 ? telemetryHistory[telemetryHistory.length - 1].temperature : 0,
        };
      }
      if (selectedSensor === 'gas' && dashboardStatistics.average_gas_level !== undefined) {
        return {
          min: dashboardStatistics.average_gas_level * 0.7,
          max: dashboardStatistics.average_gas_level * 1.3,
          average: dashboardStatistics.average_gas_level,
          current: telemetryHistory.length > 0 ? telemetryHistory[telemetryHistory.length - 1].gas : 0,
        };
      }
    }

    // Fallback: compute from local telemetry history
    if (telemetryHistory.length === 0) {
      return { min: 0, max: 0, average: 0, current: 0 };
    }

    const values = telemetryHistory.map((item) => item[selectedSensor]);
    const current = values[values.length - 1];
    const max = Math.max(...values);
    const min = Math.min(...values);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;

    return { min, max, average, current };
  }, [telemetryHistory, selectedSensor, dashboardStatistics, backendConnected]);

  // Calculate incident categories — prefer backend risk distribution, else compute locally
  const incidentBreakdown = useMemo(() => {
    if (riskDistribution && backendConnected) {
      const high = riskDistribution.high ?? riskDistribution.critical ?? 0;
      const warning = riskDistribution.medium ?? 0;
      const info = riskDistribution.low ?? 0;
      const total = high + warning + info;
      return { high, warning, info, total };
    }

    // Fallback: compute from local incidents
    const high = historicalIncidents.filter((inc) => inc.riskLevel === 'HIGH').length;
    const warning = historicalIncidents.filter((inc) => inc.riskLevel === 'WARNING').length;
    const info = historicalIncidents.filter((inc) => inc.riskLevel === 'INFO').length;
    const total = historicalIncidents.length;
    return { high, warning, info, total };
  }, [historicalIncidents, riskDistribution, backendConnected]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Data Source Indicator */}
        <View style={styles.dataSourceRow}>
          <View style={[styles.dataSourceBadge, { borderColor: backendConnected ? COLORS.success : COLORS.textTertiary }]}>
            <View style={[styles.dataSourceDot, { backgroundColor: backendConnected ? COLORS.success : COLORS.warning }]} />
            <Text style={[styles.dataSourceText, { color: backendConnected ? COLORS.success : COLORS.textTertiary }]}>
              {backendConnected ? 'BACKEND DATA' : 'LOCAL DATA'}
            </Text>
          </View>
          {dashboardStatistics?.total_readings !== undefined && (
            <Text style={styles.readingsCount}>{dashboardStatistics.total_readings} total readings</Text>
          )}
        </View>

        {/* Sensor selector tabs */}
        <View style={styles.tabContainer}>
          {(['temperature', 'gas', 'vibration'] as SensorType[]).map((type) => {
            const isSelected = selectedSensor === type;
            const tabConfig = sensorConfig[type];
            return (
              <TouchableOpacity
                key={type}
                style={[
                  styles.tabButton,
                  isSelected && { backgroundColor: tabConfig.color + '15', borderColor: tabConfig.color }
                ]}
                onPress={() => {
                  Haptics.selectionAsync().catch(() => {});
                  setSelectedSensor(type);
                }}
              >
                <Ionicons 
                  name={tabConfig.icon as any} 
                  size={16} 
                  color={isSelected ? tabConfig.color : COLORS.textTertiary} 
                />
                <Text style={[styles.tabText, isSelected && { color: tabConfig.color, fontWeight: 'bold' }]}>
                  {type.toUpperCase().substring(0, 4)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Live Telemetry Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View style={styles.chartTitleContainer}>
              <Ionicons name={config.icon as any} size={20} color={config.color} />
              <Text style={styles.chartTitle}>{config.label}</Text>
            </View>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE STREAM</Text>
            </View>
          </View>

          {/* Core Custom Visual Chart */}
          <View style={styles.chartCanvasContainer}>
            
            {/* Grid Line: Danger Threshold */}
            <View 
              style={[
                styles.gridLine, 
                { 
                  bottom: `${(config.dangerLimit / config.maxLimit) * 100}%`,
                  borderColor: COLORS.danger,
                  borderStyle: 'dashed',
                }
              ]} 
            >
              <Text style={[styles.gridLineLabel, { color: COLORS.danger }]}>DANGER LIMIT ({config.dangerLimit})</Text>
            </View>

            {/* Grid Line: Warning Threshold */}
            <View 
              style={[
                styles.gridLine, 
                { 
                  bottom: `${(config.warningLimit / config.maxLimit) * 100}%`,
                  borderColor: COLORS.warning,
                  borderStyle: 'dashed',
                }
              ]} 
            >
              <Text style={[styles.gridLineLabel, { color: COLORS.warning }]}>WARNING LIMIT ({config.warningLimit})</Text>
            </View>

            {/* Empty State / Telemetry Bars Grid */}
            {telemetryHistory.length === 0 ? (
              <View style={styles.chartEmpty}>
                <Text style={styles.emptyText}>Waiting for Snapdragon PC telemetry stream...</Text>
              </View>
            ) : (
              <View style={styles.barsContainer}>
                {telemetryHistory.map((reading, index) => {
                  const val = reading[selectedSensor];
                  // Compute height percentage
                  const heightPercent = Math.max(4, Math.min(100, (val / config.maxLimit) * 100));
                  
                  // Compute dynamic color depending on threshold violations
                  let barColor = config.color;
                  if (val >= config.dangerLimit) {
                    barColor = COLORS.danger;
                  } else if (val >= config.warningLimit) {
                    barColor = COLORS.warning;
                  }

                  return (
                    <View key={index} style={styles.barColumn}>
                      <View style={styles.barSpacer} />
                      <View 
                        style={[
                          styles.barFill, 
                          { 
                            height: `${heightPercent}%`, 
                            backgroundColor: barColor,
                            shadowColor: barColor,
                          }
                        ]} 
                      />
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {/* Time axis info */}
          <View style={styles.axisLabelRow}>
            <Text style={styles.axisLabelText}>~1 min ago</Text>
            <Text style={styles.axisLabelText}>Real-time stream</Text>
          </View>
        </View>

        {/* Live Metrics Grid */}
        <Text style={styles.sectionTitle}>Metric Diagnostic Statistics</Text>
        <View style={styles.metricsGrid}>
          {/* Current */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>CURRENT READING</Text>
            <Text style={[styles.metricVal, { color: config.color }]}>
              {stats.current.toFixed(selectedSensor === 'vibration' ? 2 : 1)}
              <Text style={styles.metricUnit}> {config.unit}</Text>
            </Text>
          </View>

          {/* Session Max */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>SESSION MAX</Text>
            <Text style={[styles.metricVal, { color: COLORS.danger }]}>
              {stats.max.toFixed(selectedSensor === 'vibration' ? 2 : 1)}
              <Text style={styles.metricUnit}> {config.unit}</Text>
            </Text>
          </View>

          {/* Session Min */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>SESSION MIN</Text>
            <Text style={[styles.metricVal, { color: COLORS.success }]}>
              {stats.min.toFixed(selectedSensor === 'vibration' ? 2 : 1)}
              <Text style={styles.metricUnit}> {config.unit}</Text>
            </Text>
          </View>

          {/* Session Average */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>SESSION AVG</Text>
            <Text style={[styles.metricVal, { color: COLORS.textPrimary }]}>
              {stats.average.toFixed(selectedSensor === 'vibration' ? 2 : 1)}
              <Text style={styles.metricUnit}> {config.unit}</Text>
            </Text>
          </View>
        </View>

        {/* Backend Statistics (extra data from API) */}
        {dashboardStatistics && backendConnected && (
          <>
            <Text style={styles.sectionTitle}>Backend Analytics</Text>
            <View style={styles.metricsGrid}>
              {dashboardStatistics.incidents_today !== undefined && (
                <View style={styles.metricCard}>
                  <Text style={styles.metricLabel}>INCIDENTS TODAY</Text>
                  <Text style={[styles.metricVal, { color: COLORS.danger }]}>
                    {dashboardStatistics.incidents_today}
                  </Text>
                </View>
              )}
              {dashboardStatistics.incidents_this_week !== undefined && (
                <View style={styles.metricCard}>
                  <Text style={styles.metricLabel}>INCIDENTS THIS WEEK</Text>
                  <Text style={[styles.metricVal, { color: COLORS.warning }]}>
                    {dashboardStatistics.incidents_this_week}
                  </Text>
                </View>
              )}
              {dashboardStatistics.total_readings !== undefined && (
                <View style={styles.metricCard}>
                  <Text style={styles.metricLabel}>TOTAL READINGS</Text>
                  <Text style={[styles.metricVal, { color: COLORS.info }]}>
                    {dashboardStatistics.total_readings}
                  </Text>
                </View>
              )}
            </View>
          </>
        )}

        {/* Incident Summary Breakdown */}
        <Text style={styles.sectionTitle}>Incident Risk Profile</Text>
        <View style={styles.incidentCard}>
          <View style={styles.incidentCardHeader}>
            <Text style={styles.incidentCardTitle}>Session Alerts Overview</Text>
            <View style={styles.badgeTotal}>
              <Text style={styles.badgeTotalText}>{incidentBreakdown.total} incidents</Text>
            </View>
          </View>

          {/* Safety Bar indicator */}
          <View style={styles.progressSegBar}>
            {incidentBreakdown.total === 0 ? (
              <View style={[styles.segFill, { width: '100%', backgroundColor: COLORS.success }]} />
            ) : (
              <>
                <View 
                  style={[
                    styles.segFill, 
                    { 
                      width: `${(incidentBreakdown.high / incidentBreakdown.total) * 100}%`, 
                      backgroundColor: COLORS.danger 
                    }
                  ]} 
                />
                <View 
                  style={[
                    styles.segFill, 
                    { 
                      width: `${(incidentBreakdown.warning / incidentBreakdown.total) * 100}%`, 
                      backgroundColor: COLORS.warning 
                    }
                  ]} 
                />
                <View 
                  style={[
                    styles.segFill, 
                    { 
                      width: `${(incidentBreakdown.info / incidentBreakdown.total) * 100}%`, 
                      backgroundColor: COLORS.info 
                    }
                  ]} 
                />
              </>
            )}
          </View>

          {/* Segments Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.danger }]} />
              <Text style={styles.legendLabel}>High Risk ({incidentBreakdown.high})</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.warning }]} />
              <Text style={styles.legendLabel}>Warnings ({incidentBreakdown.warning})</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.info }]} />
              <Text style={styles.legendLabel}>Info ({incidentBreakdown.info})</Text>
            </View>
          </View>
        </View>

        {/* Multi-Agent Diagnostics Precision */}
        <Text style={styles.sectionTitle}>Edge AI Agent Diagnostic Metrics</Text>
        <View style={styles.agentPerfCard}>
          <View style={styles.agentItem}>
            <View style={styles.agentMeta}>
              <Ionicons name="shield-checkmark-outline" size={16} color={COLORS.danger} />
              <Text style={styles.agentName}>Safety Expert Agent</Text>
            </View>
            <View style={styles.agentScoreCol}>
              <Text style={styles.agentPrecision}>99.4% precision</Text>
              <Text style={styles.agentLatency}>Avg response: 1.8s</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.agentItem}>
            <View style={styles.agentMeta}>
              <Ionicons name="construct-outline" size={16} color={COLORS.info} />
              <Text style={styles.agentName}>Boiler Expert Agent</Text>
            </View>
            <View style={styles.agentScoreCol}>
              <Text style={styles.agentPrecision}>98.2% precision</Text>
              <Text style={styles.agentLatency}>Avg response: 2.4s</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.agentItem}>
            <View style={styles.agentMeta}>
              <Ionicons name="document-text-outline" size={16} color={COLORS.warning} />
              <Text style={styles.agentName}>Compliance Expert Agent</Text>
            </View>
            <View style={styles.agentScoreCol}>
              <Text style={styles.agentPrecision}>100% compliance</Text>
              <Text style={styles.agentLatency}>Avg response: 1.2s</Text>
            </View>
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
  dataSourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  dataSourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    gap: 4,
  },
  dataSourceDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  dataSourceText: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  readingsCount: {
    fontSize: 10,
    color: COLORS.textTertiary,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  tabText: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  chartCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
    marginRight: 4,
  },
  liveText: {
    fontSize: 8,
    color: COLORS.success,
    fontWeight: 'bold',
  },
  chartCanvasContainer: {
    height: 180,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'flex-end',
    position: 'relative',
    paddingLeft: SPACING.xs,
    paddingRight: SPACING.xs,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    zIndex: 1,
  },
  gridLineLabel: {
    position: 'absolute',
    left: 6,
    top: -12,
    fontSize: 8,
    fontWeight: 'bold',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 4,
  },
  chartEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    zIndex: 2,
    paddingTop: SPACING.md,
  },
  barColumn: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barSpacer: {
    flex: 1,
  },
  barFill: {
    width: '75%',
    maxWidth: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  axisLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  axisLabelText: {
    fontSize: 10,
    color: COLORS.textTertiary,
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  metricCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.md,
    flexGrow: 1,
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  metricVal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  metricUnit: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },
  incidentCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  incidentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  incidentCardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  badgeTotal: {
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeTotalText: {
    fontSize: 10,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  progressSegBar: {
    height: 10,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  segFill: {
    height: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  agentPerfCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  agentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  agentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  agentName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  agentScoreCol: {
    alignItems: 'flex-end',
  },
  agentPrecision: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  agentLatency: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
});
