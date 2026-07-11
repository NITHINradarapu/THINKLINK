export const COLORS = {
  background: '#121214',
  surface: '#1C1C1E',
  surfaceLight: '#2C2C2E',
  border: '#3A3A3C',
  
  // Brand color (Qualcomm Snapdragon Orange / Safety Industrial Orange)
  primary: '#FF6B00',
  primaryDark: '#D45900',
  primaryLight: '#FFA366',
  
  // UI States
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textTertiary: '#71717A',
  
  // Statuses
  success: '#00E676', // Safety Green
  warning: '#FFD600', // Warning Yellow
  danger: '#FF1744',  // Emergency Red
  info: '#00E5FF',    // Cyan Info
  
  // Transparent variants for highlights/glows
  primaryGlow: 'rgba(255, 107, 0, 0.15)',
  successGlow: 'rgba(0, 230, 118, 0.15)',
  warningGlow: 'rgba(255, 214, 0, 0.15)',
  dangerGlow: 'rgba(255, 23, 68, 0.15)',
  infoGlow: 'rgba(0, 229, 255, 0.15)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: COLORS.textPrimary,
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    color: COLORS.textPrimary,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: COLORS.textPrimary,
  },
  body: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  bodySecondary: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  caption: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  mono: {
    fontSize: 12,
    fontFamily: 'Platform-Mono', // Fallback to system monospace
  },
};
