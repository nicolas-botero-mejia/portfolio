/**
 * Design tokens - single source of truth for colors, spacing, typography, radii, and borders.
 * Used by Tailwind/CSS and can be pushed to Figma for design-dev consistency.
 *
 * Values based on Tailwind default palette and current component usage.
 */

// =============================================================================
// COLORS (hex values for CSS and Figma)
// =============================================================================

/** Primitive color scales - raw palette values */
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
    200: '#bbf7d0',
    800: '#166534',
  },
  amber: {
    50: '#fffbeb',
    200: '#fde68a',
    800: '#92400e',
  },
  white: '#ffffff',
} as const;

/** Semantic colors - mapped to usage */
export const semanticColors = {
  badge: {
    default: {
      bg: colors.gray[100],
      text: colors.gray[700],
      border: colors.gray[200],
    },
    success: {
      bg: colors.green[50],
      text: colors.green[800],
      border: colors.green[200],
    },
    warning: {
      bg: colors.amber[50],
      text: colors.amber[800],
      border: colors.amber[200],
    },
    neutral: {
      bg: colors.gray[50],
      text: colors.gray[600],
      border: colors.gray[100],
    },
  },
  button: {
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
  surface: {
    background: colors.white,
    foreground: colors.gray[900],
  },
} as const;

// =============================================================================
// SPACING (px values)
// =============================================================================

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  2.5: 10,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

// =============================================================================
// TYPOGRAPHY
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
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// =============================================================================
// RADII (px values)
// =============================================================================

export const radii = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
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
// EXPORTS FOR FIGMA (flat structure for push script)
// =============================================================================

export type TokenCollection = {
  colors: Record<string, string>;
  spacing: Record<string, number>;
  typography: Record<string, number>;
  radii: Record<string, number>;
  border: Record<string, number>;
};

/** Flat token structure for Figma variable creation */
export function getTokensForFigma(): TokenCollection {
  const colorVars: Record<string, string> = {};
  const addColor = (path: string, hex: string) => {
    colorVars[path] = hex;
  };

  Object.entries(colors.gray).forEach(([k, v]) => addColor(`gray/${k}`, v));
  Object.entries(colors.green).forEach(([k, v]) => addColor(`green/${k}`, v));
  Object.entries(colors.amber).forEach(([k, v]) => addColor(`amber/${k}`, v));
  addColor('white', colors.white);

  Object.entries(semanticColors.badge).forEach(([variant, v]) => {
    addColor(`badge/${variant}/bg`, v.bg);
    addColor(`badge/${variant}/text`, v.text);
    addColor(`badge/${variant}/border`, v.border);
  });

  return {
    colors: colorVars,
    spacing: { ...spacing },
    typography: {
      ...typography.fontSize,
      ...typography.fontWeight,
    },
    radii: { ...radii },
    border: { ...border.width },
  };
}
