import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/theme';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onFinish: () => void;
}

export default function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Animation refs for smooth transitions
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const slides = [
    {
      title: 'Welcome to ThinkLink',
      subtitle: 'SNAPDRAGON EDGE CONTROL PORTAL',
      desc: 'Seamlessly interface with Snapdragon AI PCs to monitor industrial environments and run edge-level diagnostics.',
      icon: 'cube-outline' as const,
      accentColor: COLORS.primary,
      accentGlow: COLORS.primaryGlow,
    },
    {
      title: 'Sensors & Actuators',
      subtitle: 'REAL-TIME IOT TELEMETRY',
      desc: 'Track ambient temperature, hazardous gas concentrations, and mechanical vibration. Remotely actuate alarm buzzers or emergency isolation relays.',
      icon: 'hardware-chip-outline' as const,
      accentColor: COLORS.info,
      accentGlow: 'rgba(0, 229, 255, 0.15)',
    },
    {
      title: 'VLM Camera Link',
      subtitle: 'META AI SMART GLASSES',
      desc: 'Request visual inspection reports from nearest technician smart glasses. Edge Vision-Language Models perform automated valve and Joint diagnosis.',
      icon: 'glasses-outline' as const,
      accentColor: COLORS.success,
      accentGlow: COLORS.successGlow,
    },
    {
      title: 'Multi-Agent Consensus',
      subtitle: 'INTELLIGENT SUPERVISOR ALERTS',
      desc: 'Edge AI Safety and Maintenance agents deliberate root causes during anomalies and guide operators with checklists.',
      icon: 'shield-checkmark-outline' as const,
      accentColor: COLORS.warning,
      accentGlow: COLORS.warningGlow,
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      Haptics.selectionAsync().catch(() => {});
      // Smooth slide transition
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -50, duration: 150, useNativeDriver: true }),
      ]).start(() => {
        setCurrentSlide(currentSlide + 1);
        slideAnim.setValue(50);
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start();
      });
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      onFinish();
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      Haptics.selectionAsync().catch(() => {});
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 50, duration: 150, useNativeDriver: true }),
      ]).start(() => {
        setCurrentSlide(currentSlide - 1);
        slideAnim.setValue(-50);
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start();
      });
    }
  };

  const activeSlide = slides[currentSlide];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background Accent Glow */}
      <View style={[styles.backgroundGlow, { backgroundColor: activeSlide.accentColor }]} />

      <View style={styles.header}>
        <Text style={styles.headerLogo}>THINKLINK</Text>
        {currentSlide < slides.length - 1 && (
          <TouchableOpacity onPress={onFinish}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Slide Content */}
      <Animated.View 
        style={[
          styles.slideContainer, 
          { 
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <View style={[styles.iconWrapper, { backgroundColor: activeSlide.accentColor + '15', borderColor: activeSlide.accentColor }]}>
          <Ionicons name={activeSlide.icon} size={64} color={activeSlide.accentColor} />
        </View>

        <Text style={[styles.subtitle, { color: activeSlide.accentColor }]}>{activeSlide.subtitle}</Text>
        <Text style={styles.title}>{activeSlide.title}</Text>
        <Text style={styles.desc}>{activeSlide.desc}</Text>
      </Animated.View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        {/* Slide Indicators (Dots) */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.dot, 
                currentSlide === index ? [styles.dotActive, { backgroundColor: activeSlide.accentColor }] : styles.dotInactive
              ]} 
            />
          ))}
        </View>

        {/* Buttons Row */}
        <View style={styles.buttonRow}>
          {currentSlide > 0 ? (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back-outline" size={18} color={COLORS.textSecondary} style={{ marginRight: 4 }} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.backPlaceholder} />
          )}

          <TouchableOpacity 
            style={[styles.nextButton, { backgroundColor: activeSlide.accentColor }]} 
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentSlide === slides.length - 1 ? 'GET STARTED' : 'NEXT'}
            </Text>
            {currentSlide < slides.length - 1 && (
              <Ionicons name="arrow-forward-outline" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundGlow: {
    position: 'absolute',
    top: -150,
    alignSelf: 'center',
    width: 400,
    height: 400,
    borderRadius: 200,
    filter: 'blur(100px)',
    opacity: 0.12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  headerLogo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },
  skipText: {
    fontSize: 13,
    color: COLORS.textTertiary,
    fontWeight: '600',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    textAlign: 'center',
  },
  iconWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: SPACING.lg,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotInactive: {
    width: 6,
    backgroundColor: COLORS.surfaceLight,
  },
  dotActive: {
    width: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backPlaceholder: {
    width: 80,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: SPACING.sm,
  },
  backButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  nextButton: {
    height: 48,
    borderRadius: 24,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
