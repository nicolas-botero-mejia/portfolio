/**
 * Token transformation - flat structure for Figma variable creation.
 */

import type { TokenCollection } from '../sources/tokens';
import {
  colors,
  semanticColors,
  spacing,
  typography,
  radii,
  border,
} from '../sources/tokens';

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
