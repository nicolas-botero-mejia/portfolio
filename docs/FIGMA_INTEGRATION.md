# 🎨 Figma + MCP Integration Guide

**Design-to-Development Workflow Enhancement**

This document extends the Implementation Plan with Figma integration via Model Context Protocol (MCP).

---

## ⚠️ Status: Superseded for Current Project

**This guide describes a Figma-as-source-of-truth flow** (Figma variables → REST API → `src/tokens/` → code). **Our portfolio uses the opposite flow:** tokens live in code (`src/data/sources/primitiveTokens.ts`, `semanticTokens.ts`) and we **push** to Figma via the **Plugin API** (scripts run in the Figma plugin context, e.g. via Chrome DevTools MCP `evaluate_script`). The extraction script and `src/tokens/` layout in this doc were never implemented here.

**For current Figma + token work use:**
- **[docs/FIGMA_LEARNINGS.md](FIGMA_LEARNINGS.md)** — Runbook (“When Starting Figma Tasks”), token flow, component properties, variable bindings, API gotchas, community learnings.
- **ROADMAP.md** — Code-to-design (push tokens/components to Figma); design-to-code (extract script, import pipeline) as future work.

Keep this file as reference for an alternative (Figma-first, REST API) approach, or for Storybook/Chromatic workflow ideas. Do not follow its token extraction or file layout as the project’s current path.

---

## Integration Points

This guide should be integrated into the main Implementation Plan at the following locations:

### 1. Table of Contents - Add:
```markdown
3.5 [Figma + MCP Integration](#figma--mcp-integration)
```

### 2. Tool Stack Deep Dive - Insert Before "Tool 1: Storybook"

---

## 🔧 Tool 0: Figma + MCP (Design Foundation)

**What It Is:**
Figma is a collaborative design tool where you create your design system's source of truth. MCP (Model Context Protocol) provides programmatic access to Figma files, enabling automated design token extraction and component specification retrieval.

**Why We Need It:**

**Problem:** Design and code drift apart
```
Designer updates colors in Figma → Developer doesn't know →
Code uses old colors → Design system inconsistent → Manual sync required
```

**Solution:** Automated design token extraction
```
Designer updates Figma variables → Run npm script →
Tokens auto-update in code → Components automatically use new tokens →
Design and code stay in sync
```

**Business Value:**
- **Consistency:** Single source of truth for design decisions
- **Speed:** No manual token transcription
- **Collaboration:** Designers work in Figma, devs auto-sync
- **Documentation:** Visual reference always available
- **Client Showcase:** Professional design system process

**What to Automate:** ✅
1. **Design Tokens** (colors, spacing, typography, radii)
2. **Component Inventory** (list of components needed)
3. **Component Specifications** (measurements for reference)
4. **Visual Baselines** (export for Chromatic comparison)

**What NOT to Automate:** ❌
1. **Component Code** (generates poor HTML/accessibility)
2. **Full Design-to-Code** (maintenance nightmare)
3. **Interaction Logic** (Figma prototypes ≠ production code)

**When to Use:**
- Beginning of every project (design foundation)
- When updating design tokens
- For visual regression baseline creation
- Client presentations and documentation

**Cost:**
- Figma: Free for individuals, $12/user/month for teams
- MCP: Free and open source
- ROI: Saves 5-10 hours/month in manual token updates

---

## 🎨 Figma Workflow Integration

### Design → Token → Component → Test Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    FIGMA (Source of Truth)                   │
│  • Create components with all variants                       │
│  • Define design tokens (colors, spacing, typography)        │
│  • Use Figma variables for consistency                       │
│  • Export specifications and assets                          │
└────────────────┬────────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │   Figma MCP     │ ← Automated Extraction
        │   (npm script)  │
        └────────┬────────┘
                 │
        ┌────────▼────────────────────────┐
        │                                  │
    Design Tokens              Component Specs
    (Auto-generated)           (Reference Docs)
        │                                  │
        ▼                                  ▼
┌───────────────┐              ┌──────────────────┐
│ src/tokens/   │              │ Component Dev    │
│ ├─ colors.ts  │──────────→   │ • Use tokens     │
│ ├─ spacing.ts │              │ • Reference Figma│
│ ├─ typography │              │ • Add a11y       │
│ └─ index.ts   │              │ • Add logic      │
└───────────────┘              └─────────┬────────┘
                                         │
                                         ▼
                              ┌──────────────────┐
                              │   Storybook      │
                              │   • Build stories│
                              │   • Test variants│
                              │   • Check a11y   │
                              └─────────┬────────┘
                                        │
                                        ▼
                              ┌──────────────────┐
                              │   Chromatic      │
                              │ Compare with     │
                              │ Figma exports    │
                              └──────────────────┘
```

### Why This Approach Works

**1. Figma as Single Source of Truth**
- All design decisions documented
- Designers control visual language
- Automatic propagation to code

**2. Tokens Bridge Design & Development**
- Mathematical values (not magic numbers)
- Consistent across entire app
- Update once, change everywhere

**3. Manual Implementation for Quality**
- Proper semantic HTML
- Accessibility built in
- Interaction logic
- Performance optimized

**4. Visual Regression Ensures Parity**
- Chromatic compares implementation to design
- Pixel-perfect matching
- Catch drift automatically

---

## 🗺️ Phase 0: Design Foundation (Week 0)

**Objective:** Create design system in Figma and set up token extraction

**Prerequisites:**
- Figma account (free tier works)
- Basic understanding of design systems
- Access to brand colors/typography

### Step 0.1: Create Figma Design System

**What You'll Do:**
1. Create new Figma file: "Portfolio Design System"
2. Set up design tokens using Figma variables
3. Create component library
4. Document component variants

**Figma File Structure:**

```
📄 Portfolio Design System
├── 📑 Cover (overview & instructions)
├── 📑 Tokens
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Radii
├── 📑 Atoms
│   ├── Button (all variants)
│   ├── Input
│   └── Tag
├── 📑 Molecules
│   ├── Card
│   └── Navigation Item
├── 📑 Organisms
│   ├── Navigation
│   ├── Header
│   └── Footer
└── 📑 Templates
    ├── Home Page
    └── Case Study Page
```

**Setting Up Figma Variables:**

1. **Colors** - Create variable collection:
```
Color Variables
├── Primitives
│   ├── gray-50: #f9fafb
│   ├── gray-100: #f3f4f6
│   ├── gray-500: #6b7280
│   ├── gray-900: #111827
│   ├── blue-500: #3b82f6
│   └── red-500: #ef4444
└── Semantic
    ├── text-primary → gray-900
    ├── text-secondary → gray-500
    ├── background → white
    ├── primary → gray-900
    └── error → red-500
```

2. **Spacing** - Number variables:
```
Spacing
├── xs: 4
├── sm: 8
├── md: 16
├── lg: 24
├── xl: 32
└── 2xl: 48
```

3. **Typography** - Text styles:
```
Typography
├── Heading 1: Inter 48px Bold
├── Heading 2: Inter 36px Bold
├── Heading 3: Inter 24px Semibold
├── Body Large: Inter 18px Regular
├── Body: Inter 16px Regular
└── Body Small: Inter 14px Regular
```

**Component Creation Best Practices:**

1. **Use Auto Layout** (Figma's flexbox)
2. **Name layers semantically** (Button/Primary, not Rectangle 1)
3. **Create variants** for all states (default, hover, active, disabled)
4. **Document usage** in descriptions
5. **Use constraints** for responsive behavior

**Learning Resources:**
- Figma Variables: https://help.figma.com/hc/en-us/articles/15339657135383
- Design Systems in Figma: https://www.figma.com/best-practices/components-styles-and-shared-libraries/

### Step 0.2: Install Figma MCP Server

**What You'll Do:**
```bash
# MCP servers are configured in your MCP settings
# For now, we'll use the Figma REST API directly
npm install --save-dev dotenv
```

**Create Environment Variables:**

```bash
# .env.local
FIGMA_ACCESS_TOKEN=your-figma-personal-access-token
FIGMA_FILE_KEY=your-file-key-from-url
```

**Getting Your Figma Access Token:**
1. Go to Figma → Settings → Personal Access Tokens
2. Generate new token
3. Copy and save to `.env.local`

**Getting Your File Key:**
```
Figma URL: https://www.figma.com/file/ABC123DEF/Portfolio-Design-System
File Key: ABC123DEF (between /file/ and /Portfolio)
```

### Step 0.3: Create Token Extraction Script

**File: `scripts/extractFigmaTokens.js`**

```javascript
#!/usr/bin/env node

/**
 * Figma Design Token Extractor
 *
 * Extracts design tokens from Figma variables and generates
 * TypeScript files for use in components.
 *
 * Usage:
 *   node scripts/extractFigmaTokens.js
 *   npm run extract-tokens
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_TOKEN || !FILE_KEY) {
  console.error('❌ Missing FIGMA_ACCESS_TOKEN or FIGMA_FILE_KEY in .env.local');
  process.exit(1);
}

async function fetchFigmaVariables() {
  const url = `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`;

  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.statusText}`);
  }

  return response.json();
}

function rgbaToHex(rgba) {
  const r = Math.round(rgba.r * 255);
  const g = Math.round(rgba.g * 255);
  const b = Math.round(rgba.b * 255);
  const a = rgba.a;

  const hex = [r, g, b]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');

  return a < 1 ? `#${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}` : `#${hex}`;
}

async function extractTokens() {
  console.log('🎨 Extracting design tokens from Figma...\n');

  try {
    const data = await fetchFigmaVariables();

    const tokens = {
      colors: {},
      spacing: {},
      typography: {},
    };

    // Extract variables
    Object.values(data.meta.variables).forEach((variable) => {
      const name = variable.name.toLowerCase().replace(/\s+/g, '-');
      const value = Object.values(variable.valuesByMode)[0];

      if (variable.resolvedType === 'COLOR') {
        tokens.colors[name] = rgbaToHex(value);
      } else if (variable.resolvedType === 'FLOAT') {
        tokens.spacing[name] = `${value}px`;
      }
    });

    // Generate TypeScript files
    const tokensDir = path.join(process.cwd(), 'src/tokens');

    if (!fs.existsSync(tokensDir)) {
      fs.mkdirSync(tokensDir, { recursive: true });
    }

    // colors.ts
    fs.writeFileSync(
      path.join(tokensDir, 'colors.ts'),
      `/**
 * Color Tokens
 * Auto-generated from Figma
 * Do not edit manually - run 'npm run extract-tokens' to update
 */

export const colors = ${JSON.stringify(tokens.colors, null, 2)} as const;
`
    );

    // spacing.ts
    fs.writeFileSync(
      path.join(tokensDir, 'spacing.ts'),
      `/**
 * Spacing Tokens
 * Auto-generated from Figma
 * Do not edit manually - run 'npm run extract-tokens' to update
 */

export const spacing = ${JSON.stringify(tokens.spacing, null, 2)} as const;
`
    );

    // index.ts
    fs.writeFileSync(
      path.join(tokensDir, 'index.ts'),
      `export { colors } from './colors';
export { spacing } from './spacing';

export const tokens = {
  colors,
  spacing,
} as const;
`
    );

    console.log('✅ Tokens extracted successfully!\n');
    console.log(`📊 Summary:`);
    console.log(`   Colors: ${Object.keys(tokens.colors).length}`);
    console.log(`   Spacing: ${Object.keys(tokens.spacing).length}`);
    console.log(`\n📁 Files created:`);
    console.log(`   src/tokens/colors.ts`);
    console.log(`   src/tokens/spacing.ts`);
    console.log(`   src/tokens/index.ts`);
    console.log('');
  } catch (error) {
    console.error('❌ Error extracting tokens:', error.message);
    process.exit(1);
  }
}

extractTokens();
```

**Add NPM Script:**

```json
// package.json
{
  "scripts": {
    "extract-tokens": "node scripts/extractFigmaTokens.js"
  }
}
```

### Step 0.4: Extract and Use Tokens

**Run Extraction:**

```bash
npm run extract-tokens
```

**Output:**
```
🎨 Extracting design tokens from Figma...

✅ Tokens extracted successfully!

📊 Summary:
   Colors: 12
   Spacing: 6

📁 Files created:
   src/tokens/colors.ts
   src/tokens/spacing.ts
   src/tokens/index.ts
```

**Generated Files:**

```typescript
// src/tokens/colors.ts
/**
 * Color Tokens
 * Auto-generated from Figma
 * Do not edit manually - run 'npm run extract-tokens' to update
 */

export const colors = {
  "gray-50": "#f9fafb",
  "gray-100": "#f3f4f6",
  "gray-500": "#6b7280",
  "gray-900": "#111827",
  "blue-500": "#3b82f6",
  "primary": "#111827",
} as const;
```

```typescript
// src/tokens/spacing.ts
/**
 * Spacing Tokens
 * Auto-generated from Figma
 * Do not edit manually - run 'npm run extract-tokens' to update
 */

export const spacing = {
  "xs": "4px",
  "sm": "8px",
  "md": "16px",
  "lg": "24px",
  "xl": "32px",
} as const;
```

**Use in Components:**

```typescript
// src/components/atoms/Button/Button.tsx
import { colors, spacing } from '@/tokens';

export const Button = ({ children, variant = 'primary' }) => {
  return (
    <button
      style={{
        backgroundColor: colors.primary,
        padding: `${spacing.sm} ${spacing.md}`,
        borderRadius: spacing.xs,
      }}
    >
      {children}
    </button>
  );
};
```

**Or with Tailwind Config:**

```javascript
// tailwind.config.js
import { colors, spacing } from './src/tokens';

export default {
  theme: {
    extend: {
      colors,
      spacing,
    },
  },
};
```

Now use in components:
```typescript
<button className="bg-primary px-md py-sm rounded-xs">
  Click me
</button>
```

### Step 0.5: Document Tokens in Storybook

**File: `src/tokens/tokens.stories.mdx`**

```mdx
import { Meta, ColorPalette, ColorItem, Typeset } from '@storybook/blocks';
import { colors, spacing } from './index';

<Meta title="Design System/Tokens" />

# Design Tokens

Design tokens extracted from Figma. These are the foundation of our design system.

## Colors

<ColorPalette>
  <ColorItem
    title="Primary"
    subtitle="Main brand color"
    colors={{ Primary: colors.primary }}
  />
  <ColorItem
    title="Grays"
    subtitle="Neutral colors"
    colors={{
      '50': colors['gray-50'],
      '100': colors['gray-100'],
      '500': colors['gray-500'],
      '900': colors['gray-900'],
    }}
  />
</ColorPalette>

## Spacing

| Token | Value |
|-------|-------|
| xs | {spacing.xs} |
| sm | {spacing.sm} |
| md | {spacing.md} |
| lg | {spacing.lg} |
| xl | {spacing.xl} |

## Usage

```typescript
import { colors, spacing } from '@/tokens';

// In styles
style={{ backgroundColor: colors.primary }}

// In Tailwind
className="bg-primary px-md"
```

## Updating Tokens

To update tokens from Figma:

1. Update variables in Figma
2. Run `npm run extract-tokens`
3. Commit changes

All components using tokens will automatically update!
```

**Learning Checkpoint:**

By end of Phase 0, you should have:
- ✓ Figma design system created
- ✓ Design tokens defined as Figma variables
- ✓ Token extraction script working
- ✓ Tokens available in code
- ✓ Tokens documented in Storybook

---

## 🔄 Workflow Updates

### Updated Development Workflow

**Before (Manual Token Management):**
```
Designer: "Use color #3b82f6"
Developer: *manually copies to CSS*
Designer changes color to #2563eb
Developer: *doesn't know, uses old color*
Result: Inconsistency
```

**After (Automated Token Sync):**
```
Designer: Updates Figma variable
Developer: Runs npm run extract-tokens
Tokens auto-update
Components automatically use new color
Result: Always in sync
```

### Token Update Process

**When designer updates Figma:**

1. **Designer Action:**
   - Updates color/spacing in Figma variables
   - Notifies team via Slack/comment

2. **Developer Action:**
   ```bash
   npm run extract-tokens
   git add src/tokens/
   git commit -m "Update design tokens from Figma"
   git push
   ```

3. **Automatic Results:**
   - All components using tokens update
   - Chromatic catches visual changes
   - PR shows exact visual diff
   - Designer approves changes

### CI/CD Integration

**Add to GitHub Actions:**

```yaml
# .github/workflows/tokens.yml
name: Check Design Tokens

on:
  schedule:
    - cron: '0 9 * * *'  # Daily at 9am
  workflow_dispatch:  # Manual trigger

jobs:
  check-tokens:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Extract tokens from Figma
        env:
          FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
          FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
        run: npm run extract-tokens

      - name: Check for changes
        run: |
          if git diff --quiet src/tokens/; then
            echo "No token changes"
          else
            echo "Token changes detected!"
            git diff src/tokens/
          fi

      - name: Create PR if changes
        if: github.event_name == 'schedule'
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: 'Update design tokens from Figma'
          title: 'Design tokens updated'
          body: |
            Design tokens have been updated from Figma.

            Please review the changes and ensure they look correct.
          branch: update-design-tokens
```

**This automates:**
- Daily token sync check
- Automatic PR creation if Figma updated
- Visual diff in Chromatic
- Designer can review and approve

---

## 📊 Metrics Enhancement

### Additional Metrics with Figma

**Design-Code Parity:**
```
Token Coverage: 100% (all Figma variables extracted)
Component Parity: 85% (17/20 Figma components implemented)
Visual Accuracy: 98% (Chromatic similarity score)
Token Drift: 0 days (last sync: today)
```

**Tracking Script:**

```javascript
// scripts/checkDesignParity.js
async function checkParity() {
  const figmaComponents = await getFigmaComponents();
  const codeComponents = getCodeComponents();

  const implemented = figmaComponents.filter(fc =>
    codeComponents.some(cc => cc.name === fc.name)
  );

  const coverage = (implemented.length / figmaComponents.length) * 100;

  console.log(`Component Parity: ${coverage.toFixed(1)}%`);
  console.log(`Implemented: ${implemented.length}/${figmaComponents.length}`);

  return coverage;
}
```

---

## 🎯 Success Criteria for Figma Integration

By end of Figma integration, you should have:

**Infrastructure:**
- ✓ Figma design system with variables
- ✓ Token extraction script working
- ✓ Tokens imported in code
- ✓ CI/CD checking for token updates
- ✓ Storybook documenting tokens

**Workflow:**
- ✓ Designer updates Figma → Developer syncs → Automatic propagation
- ✓ Visual regression catches design drift
- ✓ Single source of truth maintained

**Knowledge:**
- ✓ Understand design tokens concept
- ✓ Can extract tokens from Figma
- ✓ Can use tokens in components
- ✓ Can explain workflow to clients

**Business Value:**
- ✓ Professional design system showcase
- ✓ Designer-developer collaboration streamlined
- ✓ Consistent visual language guaranteed
- ✓ 5-10 hours/month saved on token updates

---

## 📚 Learning Resources

### Figma
- Design Variables: https://help.figma.com/hc/en-us/articles/15339657135383
- Component Best Practices: https://www.figma.com/best-practices/components-styles-and-shared-libraries/
- Figma REST API: https://www.figma.com/developers/api

### Design Tokens
- Design Tokens Format: https://tr.designtokens.org/format/
- Token Naming: https://www.lightningdesignsystem.com/design-tokens/
- Style Dictionary: https://amzn.github.io/style-dictionary/

### MCP
- Model Context Protocol: https://modelcontextprotocol.io/
- MCP Servers: https://github.com/modelcontextprotocol/servers

---

## ⚠️ Important Notes

### What This Is NOT

**This is not full design-to-code automation.** You still manually implement components. Figma provides:
1. Design tokens (automated)
2. Visual specifications (reference)
3. Component inventory (checklist)

**Why manual implementation is better:**
- Proper semantic HTML
- Accessibility built in
- Performance optimized
- Interaction logic
- Edge case handling

### When to Sync Tokens

**Sync frequently:**
- Before starting new component
- When designer updates variables
- Weekly as maintenance
- Before major releases

**Don't sync:**
- In the middle of feature work (creates conflicts)
- Without reviewing changes first
- If Figma file has errors

### Troubleshooting

**Token extraction fails:**
```bash
# Check environment variables
echo $FIGMA_ACCESS_TOKEN  # Should show token
echo $FIGMA_FILE_KEY      # Should show file key

# Test Figma API directly
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/$FIGMA_FILE_KEY/variables/local"
```

**Tokens not updating in components:**
- Rebuild: `npm run build`
- Clear cache: `rm -rf .next`
- Check imports: `import { colors } from '@/tokens'`

**Visual regression shows differences:**
- Expected if tokens changed
- Review in Chromatic
- Accept if intentional
- Reject if accidental

---

## 🚀 Next Steps

After completing Figma integration:

1. **Proceed to Phase 1** - Implement components using tokens
2. **Reference Figma** - Use measurements and specifications
3. **Compare visually** - Chromatic vs Figma exports
4. **Iterate** - Achieve pixel-perfect parity

The foundation is now set for a professional, scalable design system!

