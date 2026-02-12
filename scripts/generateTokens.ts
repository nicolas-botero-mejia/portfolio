#!/usr/bin/env npx tsx
/**
 * Generate tokens.generated.css from sources/tokens.ts.
 * Run: npm run tokens:generate
 *
 * Single source of truth - no manual duplication.
 */

import * as fs from 'fs';
import * as path from 'path';
import { getTokensForCSS } from '../src/data/resolvers/tokens';

function generateCSS(): string {
  const tokens = getTokensForCSS();
  const lines: string[] = [
    '/* Generated from src/data/sources/tokens.ts - do not edit manually */',
    '/* Run: npm run tokens:generate */',
    '',
    ':root {',
  ];

  for (const [key, value] of Object.entries(tokens.colors)) {
    const varName = `--color-${key.replace(/\./g, '-')}`;
    lines.push(`  ${varName}: ${value};`);
  }

  for (const [key, value] of Object.entries(tokens.spacing)) {
    const varName = `--spacing-${key.replace(/\./g, '-')}`;
    lines.push(`  ${varName}: ${value}px;`);
  }

  for (const [key, value] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`  --font-size-${key.replace(/\./g, '-')}: ${value}px;`);
  }
  for (const [key, value] of Object.entries(tokens.typography.fontWeight)) {
    lines.push(`  --font-weight-${key}: ${value};`);
  }

  for (const [key, value] of Object.entries(tokens.radii)) {
    const varName = `--radius-${key.replace(/\./g, '-')}`;
    lines.push(`  ${varName}: ${value}px;`);
  }

  for (const [key, value] of Object.entries(tokens.border)) {
    const varName = `--border-${key}`;
    lines.push(`  ${varName}: ${value}px;`);
  }

  lines.push('}');
  return lines.join('\n');
}

const outDir = path.join(process.cwd(), 'src', 'app');
const outPath = path.join(outDir, 'tokens.generated.css');
const css = generateCSS();

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, css, 'utf8');

console.log('Generated:', outPath);
