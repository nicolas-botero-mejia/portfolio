/**
 * Token transformation - outputs for different consumers (Figma, CSS).
 * Fully dynamic: walks the source structure; no hardcoded palette or component names.
 */

import type { TokenCollection } from '../sources/tokens';
import { colors, semanticColors, spacing, typography, radii, border } from '../sources/tokens';

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

export function getTokensForFigma(): TokenCollection {
  const colorSources = { ...colors, ...semanticColors };
  const colorVars = flattenObject<string>(colorSources, '', { separator: '/' });
  const figmaColors: Record<string, string> = {};
  for (const [k, v] of Object.entries(colorVars)) {
    figmaColors[toFigmaPath(k)] = v;
  }

  const spacingFlat = flattenObject<number>(spacing, '', { separator: '-' });
  const typographyFlat = {
    ...flattenObject<number>(typography.fontSize, '', { separator: '-' }),
    ...flattenObject<number>(typography.fontWeight, '', { separator: '-' }),
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
  };
  radii: Record<string, number>;
  border: Record<string, number>;
}

export function getTokensForCSS(): CSSTokens {
  const colorSources = { ...colors, ...semanticColors };
  const colorVars = flattenObject<string>(colorSources, '', { separator: '-' });

  const spacingFlat = flattenObject<number>(spacing, '', { separator: '-' });
  const radiiFlat = flattenObject<number>(radii, '', { separator: '-' });
  const borderFlat = flattenObject<number>(border, '', { separator: '-', stripKeys: ['width'] });

  return {
    colors: Object.fromEntries(Object.entries(colorVars).map(([k, v]) => [toCssPath(k), v])),
    // Preserve dots in spacing keys (e.g. 2.5) for Tailwind v4 --spacing-2.5 compatibility
    spacing: { ...spacingFlat },
    typography: {
      fontSize: flattenObject<number>(typography.fontSize, '', { separator: '-' }),
      fontWeight: flattenObject<number>(typography.fontWeight, '', { separator: '-' }),
    },
    radii: Object.fromEntries(Object.entries(radiiFlat).map(([k, v]) => [toCssPath(k), v])),
    border: Object.fromEntries(Object.entries(borderFlat).map(([k, v]) => [toCssPath(k), v])),
  };
}
