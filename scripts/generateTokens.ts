#!/usr/bin/env npx tsx
/**
 * Generate tokens.generated.css from sources/tokens.ts.
 * Outputs @theme block (light default) + @theme dark: overrides for Tailwind v4.
 * Run: npm run tokens:generate
 */

import * as fs from 'fs';
import * as path from 'path';
import { getTokensForCSS } from '../src/data/resolvers/tokens';

function generateCSS(): string {
  const { default: defaultTokens, dark: darkTokens } = getTokensForCSS();
  const lines: string[] = [
    '/* Generated from src/data/sources/tokens.ts - do not edit manually */',
    '/* Run: npm run tokens:generate */',
    '',
    '@theme {',
  ];

  for (const [key, value] of Object.entries(defaultTokens.colors)) {
    const varName = `--color-${key.replace(/\./g, '-')}`;
    lines.push(`  ${varName}: ${value};`);
  }

  for (const [key, value] of Object.entries(defaultTokens.spacing)) {
    lines.push(`  --spacing-${key}: ${value}px;`);
  }

  for (const [key, value] of Object.entries(defaultTokens.typography.fontSize)) {
    lines.push(`  --text-${key.replace(/\./g, '-')}: ${value}px;`);
  }
  for (const [key, value] of Object.entries(defaultTokens.typography.fontWeight)) {
    lines.push(`  --font-weight-${key}: ${value};`);
  }

  for (const [key, value] of Object.entries(defaultTokens.radii)) {
    const varName = `--radius-${key.replace(/\./g, '-')}`;
    lines.push(`  ${varName}: ${value}px;`);
  }

  for (const [key, value] of Object.entries(defaultTokens.border)) {
    lines.push(`  --border-${key}: ${value}px;`);
  }

  lines.push('}');

  // Dark theme overrides (semantic colors only)
  if (Object.keys(darkTokens.colors).length > 0) {
    lines.push('');
    lines.push('@theme dark: {');
    for (const [key, value] of Object.entries(darkTokens.colors)) {
      const varName = `--color-${key.replace(/\./g, '-')}`;
      lines.push(`  ${varName}: ${value};`);
    }
    lines.push('}');
  }

  return lines.join('\n');
}

const outDir = path.join(process.cwd(), 'src', 'app');
const outPath = path.join(outDir, 'tokens.generated.css');
const css = generateCSS();

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, css, 'utf8');

console.log('Generated:', outPath);
