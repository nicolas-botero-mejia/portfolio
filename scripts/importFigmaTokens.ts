/**
 * Import tokens from Figma.
 *
 * Flow:
 * 1. Run extract in Figma (plugin / evaluate_script) → outputs scripts/figma-export.json
 * 2. Run: npm run tokens:import
 * 3. Script reads JSON, maps to code structure, prompts for conflicts, writes figmaImport.ts
 *
 * See docs/FIGMA_LEARNINGS.md for full strategy and conflict rules.
 */

console.log('[tokens:import] Not yet implemented.');
console.log('Expected: 1) Extract from Figma → scripts/figma-export.json; 2) Run this script to merge.');
process.exit(0);
