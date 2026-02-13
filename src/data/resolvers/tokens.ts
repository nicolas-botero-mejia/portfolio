/**
 * Token transformation - outputs for different consumers (Figma, CSS).
 * Fully dynamic: walks the source structure; no hardcoded palette or component names.
 */

import type { TokenCollection } from '../sources/tokens';
import { colors, themes, spacing, typography, radii, border } from '../sources/tokens';

type FlattenOptions = {
  separator: string;
  /** Key to strip from path (e.g. "width" for border.width.x → border-x) */
  stripKeys?: string[];
};

function flattenObject<T>(
  obj: object,
  prefix = '',
  options: FlattenOptions
): Record<string, T> {
  const result: Record<string, T> = {};
  const { separator, stripKeys = [] } = options;

  for (const [key, value] of Object.entries(obj)) {
    if (stripKeys.includes(key)) {
      Object.assign(result, flattenObject(value as object, prefix, options));
      continue;
    }
    const path = prefix ? `${prefix}${separator}${key}` : key;

    if (typeof value === 'string' && value.startsWith('#')) {
      (result as Record<string, string>)[path] = value;
    } else if (typeof value === 'string') {
      (result as Record<string, string>)[path] = value;
    } else if (typeof value === 'number') {
      (result as Record<string, number>)[path] = value;
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as object, path, options));
    }
  }
  return result;
}

function toCssPath(key: string): string {
  return key.replace(/\./g, '-');
}

function toFigmaPath(key: string): string {
  return key.replace(/-/g, '/');
}

/**
 * Figma uses single font family names (e.g. "Inter"); our source tokens use CSS font stacks.
 * This map translates source keys to Figma-compatible values. Update when adding new fontFamily tokens.
 * Validation below ensures every fontFamily key has a mapping.
 */
const FIGMA_FONT_FAMILY_MAP: Record<string, string> = {
  sans: 'Inter',
  mono: 'SF Mono',
};

function getFontFamilyForFigma(): Record<string, string> {
  const source = flattenObject<string>(typography.fontFamily, '', { separator: '-' });
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(source)) {
    const baseKey = key.replace(/^fontFamily-/, '');
    if (!(baseKey in FIGMA_FONT_FAMILY_MAP)) {
      console.warn(
        `[tokens] FIGMA_FONT_FAMILY_MAP missing key "${baseKey}". ` +
          `Add a Figma mapping for fontFamily.${baseKey} to avoid render issues.`
      );
    }
    result[key] = FIGMA_FONT_FAMILY_MAP[baseKey] ?? value;
  }
  return result;
}

export function getTokensForFigma(): TokenCollection {
  const colorSources = { ...colors, ...themes.light };
  const colorVars = flattenObject<string>(colorSources, '', { separator: '/' });
  const figmaColors: Record<string, string> = {};
  for (const [k, v] of Object.entries(colorVars)) {
    figmaColors[toFigmaPath(k)] = v;
  }

  const spacingFlat = flattenObject<number>(spacing, '', { separator: '-' });
  const typographyFlat = {
    ...flattenObject<number>(typography.fontSize, '', { separator: '-' }),
    ...flattenObject<number>(typography.fontWeight, '', { separator: '-' }),
    ...getFontFamilyForFigma(),
  };
  const radiiFlat = flattenObject<number>(radii, '', { separator: '-' });
  const borderFlat = flattenObject<number>(border, '', { separator: '-', stripKeys: ['width'] });

  return {
    colors: figmaColors,
    spacing: spacingFlat,
    typography: typographyFlat,
    radii: radiiFlat,
    border: borderFlat,
  };
}

export interface CSSTokens {
  colors: Record<string, string>;
  spacing: Record<string, number>;
  typography: {
    fontSize: Record<string, number>;
    fontWeight: Record<string, number>;
    fontFamily: Record<string, string>;
  };
  radii: Record<string, number>;
  border: Record<string, number>;
}

export interface CSSThemeOutput {
  default: CSSTokens;
  dark: { colors: Record<string, string> };
}

export function getTokensForCSS(): CSSThemeOutput {
  const defaultColorSources = { ...colors, ...themes.light };
  const defaultColorVars = flattenObject<string>(defaultColorSources, '', { separator: '-' });
  const darkSemanticFlat = flattenObject<string>(themes.dark, '', { separator: '-' });
  const darkColorVars = Object.fromEntries(
    Object.entries(darkSemanticFlat).map(([k, v]) => [toCssPath(k), v])
  );

  const spacingFlat = flattenObject<number>(spacing, '', { separator: '-' });
  const radiiFlat = flattenObject<number>(radii, '', { separator: '-' });
  const borderFlat = flattenObject<number>(border, '', { separator: '-', stripKeys: ['width'] });

  return {
    default: {
      colors: Object.fromEntries(
        Object.entries(defaultColorVars).map(([k, v]) => [toCssPath(k), v])
      ),
      spacing: { ...spacingFlat },
      typography: {
        fontSize: flattenObject<number>(typography.fontSize, '', { separator: '-' }),
        fontWeight: flattenObject<number>(typography.fontWeight, '', { separator: '-' }),
        fontFamily: Object.fromEntries(
          Object.entries(flattenObject<string>(typography.fontFamily, '', { separator: '-' })).map(
            ([k, v]) => [toCssPath(k), v]
          )
        ),
      },
      radii: Object.fromEntries(Object.entries(radiiFlat).map(([k, v]) => [toCssPath(k), v])),
      border: Object.fromEntries(Object.entries(borderFlat).map(([k, v]) => [toCssPath(k), v])),
    },
    dark: {
      colors: darkColorVars,
    },
  };
}
