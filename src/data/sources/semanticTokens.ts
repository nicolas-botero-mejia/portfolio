/**
 * Semantic tokens - role-based mappings to primitives.
 * Light/dark themes define how primitives map to UI roles.
 */

import { colors } from './primitiveTokens';

// =============================================================================
// SEMANTIC THEME TYPE (Structure shared by light/dark)
// =============================================================================

export type SemanticTheme = {
  background: {
    primary: string;
    subtle: string;
    surface: string;
    muted: string;
  };
  content: {
    primary: string;
    secondary: string;
    muted: string;
    inverted: string;
  };
  border: {
    subtle: string;
    default: string;
    strong: string;
  };
  action: {
    primary: {
      bg: string;
      text: string;
      hover: string;
      active: string;
      disabled: { bg: string; text: string };
    };
    secondary: {
      bg: string;
      text: string;
      border: string;
      hover: string;
      active: string;
      disabled: { border: string; text: string };
    };
    ghost: {
      text: string;
      hover: string;
      active: string;
      disabled: string;
    };
  };
  status: {
    success: { bg: string; text: string; border: string };
    warning: { bg: string; text: string; border: string };
    neutral: { bg: string; text: string; border: string };
  };
};

// =============================================================================
// THEMES (Semantic colors per theme)
// =============================================================================

export const themes = {
  light: {
    background: {
      primary: colors.gray[900],
      subtle: colors.gray[100],
      surface: colors.white,
      muted: colors.gray[50],
    },
    content: {
      primary: colors.gray[900],
      secondary: colors.gray[700],
      muted: colors.gray[600],
      inverted: colors.white,
    },
    border: {
      subtle: colors.gray[100],
      default: colors.gray[200],
      strong: colors.gray[300],
    },
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
    status: {
      success: { bg: colors.green[50], text: colors.green[800], border: colors.green[200] },
      warning: { bg: colors.amber[50], text: colors.amber[800], border: colors.amber[200] },
      neutral: { bg: colors.gray[50], text: colors.gray[600], border: colors.gray[100] },
    },
  } satisfies SemanticTheme,
  dark: {
    background: {
      primary: colors.gray[100],
      subtle: colors.gray[800],
      surface: colors.gray[900],
      muted: colors.gray[800],
    },
    content: {
      primary: colors.white,
      secondary: colors.gray[300],
      muted: colors.gray[400],
      inverted: colors.gray[900],
    },
    border: {
      subtle: colors.gray[800],
      default: colors.gray[700],
      strong: colors.gray[600],
    },
    action: {
      primary: {
        bg: colors.white,
        text: colors.gray[900],
        hover: colors.gray[100],
        active: colors.gray[200],
        disabled: { bg: colors.gray[700], text: colors.gray[500] },
      },
      secondary: {
        bg: colors.gray[800],
        text: colors.white,
        border: colors.gray[600],
        hover: colors.gray[700],
        active: colors.gray[600],
        disabled: { border: colors.gray[800], text: colors.gray[500] },
      },
      ghost: {
        text: colors.gray[300],
        hover: colors.gray[800],
        active: colors.gray[700],
        disabled: colors.gray[500],
      },
    },
    status: {
      success: { bg: colors.green[950], text: colors.green[300], border: colors.green[800] },
      warning: { bg: colors.amber[950], text: colors.amber[300], border: colors.amber[800] },
      neutral: { bg: colors.gray[800], text: colors.gray[400], border: colors.gray[700] },
    },
  } satisfies SemanticTheme,
} as const;

/** Default semantic colors (light theme). Kept for backward compatibility. */
export const semanticColors = themes.light;
