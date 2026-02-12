/**
 * Design tokens - aligned with Tailwind's structure.
 * Single source of truth for colors, spacing, typography, radii, borders.
 * Hex values for Figma compatibility; Tailwind @theme consumes these.
 */

// =============================================================================
// COLORS (Tailwind v3 hex palette - full scales)
// =============================================================================

export const colors = {
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  white: '#ffffff',
  black: '#000000',
} as const;

// =============================================================================
// SEMANTIC COLORS (Role-based)
// Components map to roles; no component names in this layer.
// =============================================================================

export const semanticColors = {
  /** Page, card, and surface backgrounds */
  background: {
    primary: colors.gray[900],
    subtle: colors.gray[100],
    surface: colors.white,
    muted: colors.gray[50],
  },
  /** Foreground/text colors */
  content: {
    primary: colors.gray[900],
    secondary: colors.gray[700],
    muted: colors.gray[600],
    inverted: colors.white,
  },
  /** Border colors */
  border: {
    subtle: colors.gray[100],
    default: colors.gray[200],
    strong: colors.gray[300],
  },
  /** CTA / button actions */
  action: {
    primary: {
      bg: colors.gray[900],
      text: colors.white,
      hover: colors.gray[800],
      active: colors.gray[950],
      disabled: { bg: colors.gray[300], text: colors.gray[500] },
    },
    secondary: {
      bg: colors.white,
      text: colors.gray[900],
      border: colors.gray[300],
      hover: colors.gray[50],
      active: colors.gray[100],
      disabled: { border: colors.gray[200], text: colors.gray[400] },
    },
    ghost: {
      text: colors.gray[700],
      hover: colors.gray[100],
      active: colors.gray[200],
      disabled: colors.gray[400],
    },
  },
  /** Status indicators (badges, alerts) */
  status: {
    success: { bg: colors.green[50], text: colors.green[800], border: colors.green[200] },
    warning: { bg: colors.amber[50], text: colors.amber[800], border: colors.amber[200] },
    neutral: { bg: colors.gray[50], text: colors.gray[600], border: colors.gray[100] },
  },
} as const;

// =============================================================================
// SPACING (Tailwind scale: 1 unit = 4px)
// =============================================================================

export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
} as const;

// =============================================================================
// TYPOGRAPHY (Tailwind font size scale)
// =============================================================================

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// =============================================================================
// RADII (Tailwind scale)
// =============================================================================

export const radii = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
} as const;

// =============================================================================
// BORDERS
// =============================================================================

export const border = {
  width: {
    default: 1,
    thick: 2,
  },
} as const;

// =============================================================================
// TYPES
// =============================================================================

export type TokenCollection = {
  colors: Record<string, string>;
  spacing: Record<string, number>;
  typography: Record<string, number>;
  radii: Record<string, number>;
  border: Record<string, number>;
};
