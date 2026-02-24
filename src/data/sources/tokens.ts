/**
 * Design tokens barrel - re-exports primitives and semantics.
 * Import from here for backward compatibility.
 */

export {
  colors,
  spacing,
  typography,
  radii,
  leading,
  tracking,
  shadow,
} from './primitiveTokens';
export type { TokenCollection } from './primitiveTokens';

export { themes, semanticColors } from './semanticTokens';
export type { SemanticTheme } from './semanticTokens';
