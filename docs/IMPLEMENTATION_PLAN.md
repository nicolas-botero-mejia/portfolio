# 🎓 Comprehensive Testing & Design System Infrastructure Plan

**A Step-by-Step Learning Journey for Building Scalable Component Architecture**

---

## 📚 Table of Contents

1. [Philosophy & Foundation](#philosophy--foundation)
2. [Architecture Overview](#architecture-overview)
3. [Tool Stack Deep Dive](#tool-stack-deep-dive)
4. [Implementation Roadmap](#implementation-roadmap)
5. [Component Structure Principles](#component-structure-principles)
6. [Metrics & Measurement Strategy](#metrics--measurement-strategy)
7. [Business Value & ROI](#business-value--roi)
8. [Scaling Patterns](#scaling-patterns)

---

## 🧠 Philosophy & Foundation

### Why Are We Building This?

**The Problem:**
- Components are built in isolation without documentation
- No way to test components independently from pages
- Accessibility issues discovered too late (in production)
- Visual regressions slip through reviews
- No visibility into which components are actually used
- Hard to onboard new developers
- Difficult to showcase your design system to clients

**The Solution:**
A comprehensive testing and documentation infrastructure that:
1. **Documents** - Every component is catalogued with examples
2. **Tests** - Automated checks catch bugs before deployment
3. **Measures** - Track component usage, performance, accessibility
4. **Showcases** - Public Storybook demonstrates your process
5. **Scales** - Patterns work for 10 or 1000 components

### Core Principles

1. **Component-First Thinking**
   - Build in isolation, compose into pages
   - Each component is self-contained
   - Props define the API contract

2. **Documentation as Code**
   - Stories are living documentation
   - Examples show real usage
   - Always up-to-date (can't drift)

3. **Shift-Left Testing**
   - Catch issues early (design → dev → QA → prod)
   - Automated checks in CI/CD
   - Fast feedback loops

4. **Data-Driven Decisions**
   - Measure everything
   - Track trends over time
   - Justify technical decisions with metrics

---

## 🏗️ Architecture Overview

### The Ecosystem

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR PORTFOLIO SITE                       │
│                    (Production Next.js)                      │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ Deploy
                            │
┌─────────────────────────────────────────────────────────────┐
│                     CI/CD PIPELINE                           │
│  ┌──────────────┬──────────────┬──────────────┬────────────┐│
│  │  Build Test  │ Visual Test  │ E2E Test     │ Lighthouse ││
│  │  (Vitest)    │ (Chromatic)  │ (Playwright) │ (Perf)     ││
│  └──────────────┴──────────────┴──────────────┴────────────┘│
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ Commit
                            │
┌─────────────────────────────────────────────────────────────┐
│                  DEVELOPMENT ENVIRONMENT                     │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              STORYBOOK (Component Workshop)            │ │
│  │  - Component isolation                                 │ │
│  │  - Interactive testing                                 │ │
│  │  - Accessibility checks                                │ │
│  │  - Design token docs                                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              COMPONENT LIBRARY                         │ │
│  │  /components                                           │ │
│  │    ├── /atoms       (Button, Input, Tag)              │ │
│  │    ├── /molecules   (Card, SearchBox)                 │ │
│  │    ├── /organisms   (Navigation, Header)              │ │
│  │    └── /templates   (PageLayout)                      │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              TESTING LAYER                             │ │
│  │  - Unit tests (Vitest)                                │ │
│  │  - Component tests (Storybook interactions)           │ │
│  │  - E2E tests (Playwright)                             │ │
│  │  - Visual tests (Chromatic)                           │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              METRICS & ANALYTICS                       │ │
│  │  - Component coverage tracking                         │ │
│  │  - Bundle size monitoring                              │ │
│  │  - Performance metrics                                 │ │
│  │  - Accessibility scores                                │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### How Components Flow

```
Design → Storybook → Component → Page → Production
  ↓         ↓           ↓          ↓         ↓
Token    Document    Test      Compose   Monitor
```

**Example: Building a Button**

1. **Design Phase** - Define in design tokens (colors, sizes, variants)
2. **Storybook Phase** - Build in isolation with all variants
3. **Component Phase** - Implement with TypeScript, tests, accessibility
4. **Page Phase** - Compose into real pages
5. **Production Phase** - Monitor usage, performance, errors

---

## 🔧 Tool Stack Deep Dive

### Tool 1: Storybook

**What It Is:**
A development environment for UI components. Think of it as a workshop where you build and test components in isolation.

**Why We Need It:**

**Problem:** Building components inside pages is slow and complex
```typescript
// Without Storybook: To test a Button
// 1. Navigate to page in browser
// 2. Find button on page
// 3. Change props in code
// 4. Refresh browser
// 5. Repeat 50 times
```

**Solution:** Build components in isolation
```typescript
// With Storybook: To test a Button
// 1. Open Storybook
// 2. See all button variants instantly
// 3. Interactive props panel
// 4. Hot reload
```

**Business Value:**
- **Speed:** 10x faster component development
- **Quality:** Catch edge cases (disabled states, long text, etc.)
- **Communication:** Designers/PMs can review components before integration
- **Documentation:** Automatic component catalog

**When to Use:**
- Every component that renders UI
- Design system documentation
- Visual regression testing
- Accessibility audits

**Scalability:**
- Works for 1 or 1000 components
- Standard across React ecosystem
- Used by Airbnb, GitHub, Shopify, etc.

---

### Tool 2: Chromatic

**What It Is:**
Visual regression testing platform. Takes screenshots of your Storybook stories and compares them across commits.

**Why We Need It:**

**Problem:** Visual bugs slip through code review
```
PR: "Changed button padding from 12px to 16px"
Reality: Accidentally broke navbar layout on mobile
```

**Solution:** Automated screenshot comparison
```
Before: [Screenshot]
After:  [Screenshot]
Diff:   [Highlighted changes]
```

**Business Value:**
- **Confidence:** Deploy knowing UI hasn't broken
- **Time Savings:** No manual visual QA
- **Documentation:** History of UI changes
- **Collaboration:** Designers can approve visual changes

**Metrics You'll Get:**
- Number of visual changes per PR
- Components affected by changes
- Approval rate (what % of changes are accepted)

**Cost:**
- Free for open source
- $149/month for private repos (5,000 snapshots)
- ROI: Prevents 1 production bug = pays for itself

---

### Tool 3: Playwright

**What It Is:**
End-to-end testing framework. Automates browser interactions to test user flows.

**Why We Need It:**

**Problem:** User flows break without notice
```
Scenario: User tries to view locked case study
Reality: Password form works locally, breaks in production
Detection: Client reports it 2 days later
```

**Solution:** Automated E2E tests
```typescript
test('user can unlock case study', async ({ page }) => {
  await page.goto('/ocean');
  await expect(page.getByText('Password Protected')).toBeVisible();
  await page.getByLabel('Password').fill('test123');
  await page.getByRole('button', { name: 'Unlock' }).click();
  await expect(page.getByText('Ocean — Scaling a CPaaS')).toBeVisible();
});
```

**Business Value:**
- **Reliability:** Critical flows never break
- **Speed:** Automated tests run in 2 minutes vs 20 minutes manual
- **Coverage:** Test scenarios humans forget
- **Confidence:** Deploy at 5pm on Friday

**What to Test:**
- Critical user journeys (password flow, navigation)
- Form submissions
- Error states
- Cross-browser compatibility

**Scalability:**
- Start with 5-10 critical tests
- Grow to 100+ as site grows
- Parallelization: runs fast even with many tests

---

### Tool 4: Lighthouse CI

**What It Is:**
Automated performance, accessibility, SEO auditing in CI/CD.

**Why We Need It:**

**Problem:** Performance degrades over time
```
Week 1: Lighthouse score 95
Week 10: Lighthouse score 65
Cause: Gradually added heavy dependencies
Detection: Too late, users already complaining
```

**Solution:** Automated audits on every PR
```
PR #123: Performance score dropped from 95 → 85
Cause: Added 500kb analytics library
Action: Block merge until optimized
```

**Business Value:**
- **SEO:** Better scores = higher rankings
- **Conversions:** Fast sites convert better (1s delay = 7% conversion loss)
- **Compliance:** Accessibility audits catch legal issues
- **Monitoring:** Catch regressions before production

**Metrics You'll Track:**
- Performance score (target: >90)
- Accessibility score (target: 100)
- SEO score (target: 100)
- Best practices (target: 100)
- First Contentful Paint (target: <1.8s)
- Time to Interactive (target: <3.9s)

---

### Tool 5: Bundle Analyzer

**What It Is:**
Visualizes JavaScript bundle size and composition.

**Why We Need It:**

**Problem:** Don't know what's making bundle large
```
bundle.js: 2.5MB
Question: What's in there?
Answer: No idea
```

**Solution:** Interactive treemap visualization
```
Total: 2.5MB
├── node_modules (2.0MB)
│   ├── framer-motion (500KB) ← Maybe remove?
│   ├── lodash (300KB) ← Use lodash-es?
│   └── moment (200KB) ← Replace with date-fns?
└── app code (500KB)
```

**Business Value:**
- **Performance:** Smaller bundles = faster load
- **Cost:** Less bandwidth costs
- **User Experience:** Mobile users on slow connections
- **Optimization:** Data-driven decisions on dependencies

**Optimization Workflow:**
1. Analyze bundle
2. Identify heavy dependencies
3. Research alternatives (bundlephobia.com)
4. Replace or code-split
5. Measure improvement

---

### Tool 6: Vitest (Unit Testing)

**What It Is:**
Fast unit testing framework for JavaScript/TypeScript.

**Why We Need It:**

**Problem:** Unsure if code works
```typescript
// Is this function correct?
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}
// How do you know?
```

**Solution:** Automated tests
```typescript
describe('hashPassword', () => {
  it('should hash password correctly', () => {
    const hash = hashPassword('test123');
    expect(hash).toBe('ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae');
  });

  it('should produce consistent hashes', () => {
    expect(hashPassword('test')).toBe(hashPassword('test'));
  });

  it('should produce different hashes for different inputs', () => {
    expect(hashPassword('test1')).not.toBe(hashPassword('test2'));
  });
});
```

**Business Value:**
- **Confidence:** Code works as expected
- **Refactoring:** Change code safely
- **Documentation:** Tests show how to use functions
- **Onboarding:** New devs understand code via tests

**What to Test:**
- Business logic functions
- Utility functions
- Data transformations
- Edge cases

---

## 🗺️ Implementation Roadmap

### Phase 1: Foundation (Week 1) - Storybook Setup

**Objective:** Get Storybook running with your first component

#### Step 1.1: Install Storybook

**What You'll Do:**
```bash
npx storybook@latest init
```

**What Happens:**
- Detects Next.js
- Installs dependencies
- Creates `.storybook/` config
- Creates example stories
- Adds npm scripts

**Understanding the Files:**

```
.storybook/
├── main.ts          # Storybook configuration
│                    # - Which addons to use
│                    # - How to find stories
│                    # - Webpack/Vite config
│
└── preview.ts       # Global decorators and parameters
                     # - Wrap all stories in providers
                     # - Set default viewport
                     # - Configure themes
```

**Configuration Explained:**

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  // Where to find story files
  stories: [
    '../src/**/*.mdx',           // Documentation pages
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',  // Component stories
  ],

  // Which addons to enable
  addons: [
    '@storybook/addon-essentials',  // Core addons (docs, controls, actions)
    '@storybook/addon-interactions', // Test user interactions
    '@storybook/addon-a11y',        // Accessibility testing
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
};

export default config;
```

**Why Each Addon:**

1. **addon-essentials** - Bundle of core tools:
   - `docs`: Auto-generate documentation
   - `controls`: Interactive prop editing
   - `actions`: Log user interactions
   - `viewport`: Test different screen sizes
   - `backgrounds`: Test on different backgrounds

2. **addon-interactions** - Test user flows in Storybook:
   - Click buttons
   - Fill forms
   - Assert outcomes
   - Visual regression testing

3. **addon-a11y** - Accessibility auditing:
   - WCAG compliance checks
   - Color contrast analysis
   - Keyboard navigation testing
   - Screen reader compatibility

#### Step 1.2: Write Your First Story

**Component: Navigation**

**File: `src/components/layout/Navigation.stories.tsx`**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import Navigation from './Navigation';

/**
 * Navigation component displays the main site navigation
 * with dropdown menus for case studies.
 *
 * ## When to Use
 * - Main site header
 * - Desktop and mobile layouts
 *
 * ## Accessibility
 * - Keyboard navigable
 * - Screen reader friendly
 * - Focus management
 */
const meta = {
  title: 'Layout/Navigation',        // Storybook sidebar location
  component: Navigation,              // Component to render
  parameters: {
    layout: 'fullscreen',             // Remove padding
    docs: {
      description: {
        component: 'Main navigation with case study dropdown',
      },
    },
  },
  tags: ['autodocs'],                 // Auto-generate docs page
  argTypes: {
    // Define prop controls (if Navigation had props)
    // variant: {
    //   control: 'select',
    //   options: ['default', 'transparent'],
    // },
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default navigation state with all case studies
 */
export const Default: Story = {
  args: {
    caseStudies: [
      {
        slug: 'ocean',
        frontmatter: {
          company: 'Ocean',
          type: 'SaaS Product Design',
          title: 'Ocean — Scaling a CPaaS Platform',
          description: 'Led design of global CPaaS platform',
          role: 'Lead Product Designer',
          year: '2021-24',
          duration: '3 years',
          featured: true,
          heroImage: '/images/hero.png',
          tags: ['SaaS', 'enterprise'],
          seo: {
            metaTitle: 'Ocean Case Study',
            metaDescription: 'CPaaS platform design',
            keywords: ['saas', 'design'],
          },
        },
      },
      // ... more case studies
    ],
  },
};

/**
 * Navigation with no case studies (edge case)
 */
export const Empty: Story = {
  args: {
    caseStudies: [],
  },
};

/**
 * Navigation with many case studies (stress test)
 */
export const ManyItems: Story = {
  args: {
    caseStudies: Array.from({ length: 20 }, (_, i) => ({
      slug: `case-study-${i}`,
      frontmatter: {
        company: `Company ${i}`,
        type: 'Design',
        title: `Case Study ${i}`,
        description: `Description ${i}`,
        role: 'Designer',
        year: '2024',
        duration: '1 year',
        featured: false,
        heroImage: '/hero.png',
        tags: ['tag'],
        seo: {
          metaTitle: 'Title',
          metaDescription: 'Description',
          keywords: ['keyword'],
        },
      },
    })),
  },
};

/**
 * Mobile viewport test
 */
export const Mobile: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * With interaction testing
 */
export const WithInteractions: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simulate user clicking "Work" dropdown
    const workButton = canvas.getByText('Work');
    await userEvent.click(workButton);

    // Assert dropdown is visible
    await expect(canvas.getByText('Ocean')).toBeInTheDocument();
  },
};
```

**Understanding Story Structure:**

1. **Meta Object** - Component configuration
   - `title`: Where it appears in sidebar
   - `component`: React component to render
   - `parameters`: Storybook-specific settings
   - `argTypes`: Prop control definitions

2. **Story Objects** - Specific component states
   - `args`: Props to pass to component
   - `parameters`: Override meta parameters
   - `play`: Interaction tests

3. **Story Naming Convention:**
   - `Default`: Most common use case
   - `[Variant]`: Different visual states
   - `[EdgeCase]`: Error states, empty states
   - `[Platform]`: Mobile, tablet, desktop

#### Step 1.3: Run Storybook

```bash
npm run storybook
```

**What You'll See:**
```
╭─────────────────────────────────────────────────────╮
│                                                     │
│   Storybook 8.0.0 for nextjs started               │
│   6.0 s for preview                                │
│                                                     │
│    Local:            http://localhost:6006/        │
│    On your network:  http://192.168.1.5:6006/      │
│                                                     │
╰─────────────────────────────────────────────────────╯
```

**Exploring Storybook UI:**

```
┌─────────────────────────────────────────────────────────────┐
│ 🎨 Storybook                                    [⚙️] [👤] │
├───────────────┬─────────────────────────────────────────────┤
│ 📁 Layout     │                                             │
│  └ Navigation │         [Your Component Renders Here]       │
│     • Default │                                             │
│     • Empty   │                                             │
│     • Mobile  │                                             │
│               │                                             │
│ 📁 Components │                                             │
│  └ Button     │                                             │
│               │                                             │
├───────────────┴─────────────────────────────────────────────┤
│ [Canvas] [Docs] [Accessibility] [Interactions]              │
│                                                              │
│ Controls:                                                    │
│  caseStudies: [Array] ▼                                     │
│                                                              │
│ Actions:                                                     │
│  onClick → clicked                                          │
│                                                              │
│ Accessibility:                                               │
│  ✓ 0 violations                                             │
└──────────────────────────────────────────────────────────────┘
```

**Tabs Explained:**

1. **Canvas** - Interactive component view
   - See component with current props
   - Use Controls to change props
   - Interact with component

2. **Docs** - Auto-generated documentation
   - Component description
   - Props table
   - All stories displayed

3. **Accessibility** - a11y audit results
   - WCAG violations
   - Color contrast issues
   - Keyboard navigation problems

4. **Interactions** - Test playback
   - See interaction tests run
   - Debug test failures

#### Step 1.4: Create More Stories

**Goal:** Document all existing components

**Components to Document:**
1. `Navigation` ✓ (done above)
2. `ServerPasswordPrompt`
3. `Header`
4. `Footer` (if exists)

**Exercise: Write ServerPasswordPrompt Story**

```typescript
// src/components/ServerPasswordPrompt.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ServerPasswordPrompt from './ServerPasswordPrompt';

const meta = {
  title: 'Components/ServerPasswordPrompt',
  component: ServerPasswordPrompt,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ServerPasswordPrompt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slug: 'ocean',
    caseStudyTitle: 'Ocean — Scaling a CPaaS Platform',
  },
};

export const WithError: Story = {
  args: {
    slug: 'ocean',
    caseStudyTitle: 'Ocean — Scaling a CPaaS Platform',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Enter wrong password
    await userEvent.type(canvas.getByLabelText('Password'), 'wrongpassword');
    await userEvent.click(canvas.getByRole('button', { name: 'Unlock' }));

    // Assert error appears
    await expect(canvas.getByText(/incorrect password/i)).toBeInTheDocument();
  },
};

export const LongTitle: Story = {
  args: {
    slug: 'test',
    caseStudyTitle: 'A Very Long Case Study Title That Tests How The Layout Handles Excessive Text Content',
  },
};

export const Mobile: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
```

**Learning Checkpoint:**

By end of Phase 1, you should understand:
- ✓ What Storybook is and why it's valuable
- ✓ How to write basic stories
- ✓ How to use Controls to test props
- ✓ How to test interactions with play functions
- ✓ How to check accessibility with addon-a11y

---

### Phase 2: Visual Testing (Week 2) - Chromatic Setup

**Objective:** Catch visual regressions automatically

#### Step 2.1: Create Chromatic Account

**What You'll Do:**
1. Go to https://www.chromatic.com/
2. Sign in with GitHub
3. Create new project
4. Link to your repository

**What You'll Get:**
- Project token (keep secret!)
- Visual baseline (first set of screenshots)
- PR integration

#### Step 2.2: Install Chromatic CLI

```bash
npm install --save-dev chromatic
```

**Add Script:**

```json
// package.json
{
  "scripts": {
    "chromatic": "chromatic --exit-zero-on-changes"
  }
}
```

**Flags Explained:**
- `--exit-zero-on-changes`: Don't fail CI on visual changes (you'll review them)
- `--auto-accept-changes`: Auto-accept changes on main branch

#### Step 2.3: Run First Build

```bash
npx chromatic --project-token=YOUR_TOKEN
```

**What Happens:**
1. Builds Storybook
2. Uploads to Chromatic
3. Takes screenshots of all stories
4. Creates baseline

**Output:**
```
✔ Storybook built in 45 seconds
✔ Published 12 stories
✔ Captured 24 snapshots (desktop + mobile)
✔ Baseline created

View build: https://www.chromatic.com/builds?appId=...
```

#### Step 2.4: Test Visual Regression

**Make a Visual Change:**

```typescript
// src/components/ServerPasswordPrompt.tsx
// Change button color
<button className="bg-blue-900">  // Changed from bg-gray-900
  Unlock Case Study
</button>
```

**Run Chromatic Again:**

```bash
npm run chromatic
```

**What You'll See:**
```
✔ Build complete
⚠ 2 visual changes detected

Changes:
  ServerPasswordPrompt/Default
  ServerPasswordPrompt/Mobile

Review: https://www.chromatic.com/builds?appId=...
```

**In Chromatic UI:**
```
┌────────────────────────────────────────────────┐
│ Before          │ After          │ Diff        │
│                 │                │             │
│ [Gray Button]   │ [Blue Button]  │ [Highlight] │
│                 │                │             │
└────────────────────────────────────────────────┘

[Accept] [Reject]
```

**Decision Points:**
- **Accept**: Intentional change, update baseline
- **Reject**: Unintentional bug, fix code

**Understanding Visual Diff:**
- **Green pixels**: Added elements
- **Red pixels**: Removed elements
- **Yellow pixels**: Changed elements

#### Step 2.5: CI/CD Integration

**Add to GitHub Actions:**

```yaml
# .github/workflows/chromatic.yml
name: Visual Regression Tests

on:
  push:
    branches: ['**']
  pull_request:

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Required for Chromatic

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          exitZeroOnChanges: true
```

**Learning Checkpoint:**

By end of Phase 2, you should understand:
- ✓ How visual regression testing works
- ✓ How to review visual changes
- ✓ When to accept vs reject changes
- ✓ How to integrate with CI/CD
- ✓ How to prevent visual bugs in production

---

### Phase 3: E2E Testing (Week 2) - Playwright Setup

**Objective:** Test critical user flows automatically

#### Step 3.1: Install Playwright

```bash
npm init playwright@latest
```

**What You'll Be Asked:**
```
? Do you want to use TypeScript or JavaScript? › TypeScript
? Where to put your end-to-end tests? › tests
? Add a GitHub Actions workflow? › yes
? Install Playwright browsers? › yes
```

**What Gets Created:**

```
tests/
├── example.spec.ts       # Example test (delete this)
└── password-flow.spec.ts # Your test (create this)

playwright.config.ts      # Playwright configuration
```

#### Step 3.2: Configure Playwright

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Where to find test files
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Parallel workers
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: 'html',

  // Shared settings for all tests
  use: {
    // Base URL for page.goto('/')
    baseURL: 'http://localhost:3000',

    // Collect trace on failure for debugging
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',
  },

  // Test on multiple browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Start dev server before tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Configuration Explained:**

1. **testDir** - Where test files live
2. **fullyParallel** - Run all tests at once (faster)
3. **retries** - Retry flaky tests (only in CI)
4. **workers** - How many parallel instances
5. **reporter** - How to display results ('html', 'junit', 'json')
6. **use.baseURL** - Default URL for tests
7. **use.trace** - Debug tool (DOM snapshots, network, console)
8. **projects** - Different browsers/devices to test
9. **webServer** - Auto-start dev server before tests

#### Step 3.3: Write Password Flow Test

```typescript
// tests/password-flow.spec.ts
import { test, expect } from '@playwright/test';

/**
 * Password Protection E2E Tests
 *
 * Tests the complete password protection flow:
 * 1. User visits locked case study
 * 2. Sees password prompt
 * 3. Enters password
 * 4. Views content
 */

test.describe('Password Protection', () => {

  test.beforeEach(async ({ page }) => {
    // Setup: Navigate to locked case study
    await page.goto('/ocean');
  });

  test('should show password prompt for locked case study', async ({ page }) => {
    // Arrange: Page loaded (done in beforeEach)

    // Act: (no action, just check initial state)

    // Assert: Password prompt is visible
    await expect(page.getByRole('heading', { name: 'Password Protected' })).toBeVisible();
    await expect(page.getByText('This case study requires a password')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unlock Case Study' })).toBeVisible();
  });

  test('should show error for incorrect password', async ({ page }) => {
    // Arrange: Password prompt visible

    // Act: Enter wrong password and submit
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Unlock Case Study' }).click();

    // Assert: Error message appears
    await expect(page.getByText(/incorrect password/i)).toBeVisible();

    // Assert: Still on password prompt (not unlocked)
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('should unlock case study with correct password', async ({ page }) => {
    // Arrange: Password prompt visible

    // Act: Enter correct password and submit
    await page.getByLabel('Password').fill('test123');
    await page.getByRole('button', { name: 'Unlock Case Study' }).click();

    // Assert: Content is now visible
    await expect(page.getByRole('heading', { name: /Ocean/i })).toBeVisible();
    await expect(page.getByText(/300M\+ messages/i)).toBeVisible();

    // Assert: Password prompt is gone
    await expect(page.getByLabel('Password')).not.toBeVisible();
  });

  test('should remember authentication after unlock', async ({ page }) => {
    // Arrange: Unlock case study
    await page.getByLabel('Password').fill('test123');
    await page.getByRole('button', { name: 'Unlock Case Study' }).click();
    await expect(page.getByRole('heading', { name: /Ocean/i })).toBeVisible();

    // Act: Navigate away and back
    await page.goto('/');
    await page.goto('/ocean');

    // Assert: Still authenticated (no password prompt)
    await expect(page.getByRole('heading', { name: /Ocean/i })).toBeVisible();
    await expect(page.getByLabel('Password')).not.toBeVisible();
  });

  test('should be accessible via keyboard', async ({ page }) => {
    // Arrange: Focus on password input
    await page.getByLabel('Password').focus();

    // Act: Type password and press Enter
    await page.keyboard.type('test123');
    await page.keyboard.press('Enter');

    // Assert: Form submits and unlocks
    await expect(page.getByRole('heading', { name: /Ocean/i })).toBeVisible();
  });

  test('should handle long passwords', async ({ page }) => {
    // Arrange & Act: Enter very long password
    const longPassword = 'a'.repeat(1000);
    await page.getByLabel('Password').fill(longPassword);
    await page.getByRole('button', { name: 'Unlock Case Study' }).click();

    // Assert: Should handle gracefully (not crash)
    await expect(page.getByText(/incorrect password/i)).toBeVisible();
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Arrange: Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Act: Complete password flow on mobile
    await page.getByLabel('Password').fill('test123');
    await page.getByRole('button', { name: 'Unlock Case Study' }).click();

    // Assert: Works on mobile
    await expect(page.getByRole('heading', { name: /Ocean/i })).toBeVisible();
  });
});

test.describe('Navigation', () => {

  test('should navigate to case studies from dropdown', async ({ page }) => {
    // Arrange: Go to homepage
    await page.goto('/');

    // Act: Click Work dropdown
    await page.getByRole('button', { name: 'Work' }).click();

    // Act: Click Ocean case study
    await page.getByRole('link', { name: /Ocean/i }).click();

    // Assert: Navigated to case study
    await expect(page).toHaveURL(/\/ocean/);
  });

  test('should return to portfolio from case study', async ({ page }) => {
    // Arrange: On case study page
    await page.goto('/ocean');

    // Act: Click back to portfolio
    await page.getByRole('link', { name: /Back to portfolio/i }).click();

    // Assert: Back on homepage at work section
    await expect(page).toHaveURL(/#work/);
  });
});
```

**Test Structure Explained:**

1. **describe** - Group related tests
2. **beforeEach** - Setup before each test
3. **test** - Individual test case
4. **Arrange-Act-Assert** - Test structure pattern
   - **Arrange**: Set up test conditions
   - **Act**: Perform action
   - **Assert**: Verify outcome

**Playwright Locators:**

```typescript
// Role-based (preferred - most accessible)
page.getByRole('button', { name: 'Submit' })

// Label-based (good for forms)
page.getByLabel('Password')

// Text-based (good for content)
page.getByText('Welcome')

// Test ID (fallback for complex cases)
page.getByTestId('custom-element')
```

**Why Role-Based is Best:**
- Enforces accessibility (elements must have proper roles)
- More resilient to UI changes
- Self-documenting tests

#### Step 3.4: Run Tests

```bash
# Run all tests
npx playwright test

# Run specific test
npx playwright test password-flow

# Run in UI mode (debugging)
npx playwright test --ui

# Run with browser visible
npx playwright test --headed

# Generate report
npx playwright show-report
```

**Output:**
```
Running 7 tests using 2 workers

  ✓ [chromium] › password-flow.spec.ts:10:5 › should show password prompt
  ✓ [chromium] › password-flow.spec.ts:20:5 › should show error for incorrect
  ✓ [chromium] › password-flow.spec.ts:35:5 › should unlock with correct password
  ✓ [chromium] › password-flow.spec.ts:50:5 › should remember authentication
  ✓ [chromium] › password-flow.spec.ts:65:5 › should be accessible via keyboard
  ✓ [chromium] › password-flow.spec.ts:78:5 › should handle long passwords
  ✓ [chromium] › password-flow.spec.ts:92:5 › should work on mobile

  7 passed (15.3s)
```

#### Step 3.5: Debug Failed Tests

**Playwright Inspector:**

```bash
npx playwright test --debug
```

**What You See:**
```
┌─────────────────────────────────────────────────────────────┐
│ Playwright Inspector                                        │
├─────────────────────────────────────────────────────────────┤
│ [Browser Window]                                            │
│                                                              │
│ [Your Page Being Tested]                                    │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Test Code:                                                   │
│ > await page.getByLabel('Password').fill('test123')         │
│   await page.getByRole('button').click()                    │
│                                                              │
│ [▶ Continue] [Step Over] [Step Into] [Resume]              │
├─────────────────────────────────────────────────────────────┤
│ Locator:                                                     │
│ [input[aria-label="Password"]]                              │
│                                                              │
│ [Pick Locator]                                              │
└─────────────────────────────────────────────────────────────┘
```

**Trace Viewer:**

```bash
npx playwright show-trace trace.zip
```

**What You See:**
```
Timeline: [=====|=====|=====|=====]
          page  click  wait  assert

DOM Snapshot: <fully interactive>
Network: [All requests]
Console: [All logs]
```

**Learning Checkpoint:**

By end of Phase 3, you should understand:
- ✓ How E2E testing works
- ✓ How to write test scenarios
- ✓ How to use Playwright locators
- ✓ How to debug failed tests
- ✓ How to test on different browsers/devices

---

### Phase 4: Performance & Quality (Week 3)

**Objective:** Monitor performance and bundle size

#### Step 4.1: Lighthouse CI Setup

```bash
npm install --save-dev @lhci/cli
```

**Create Config:**

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      // Which URLs to test
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/ocean',
        'http://localhost:3000/sainapsis',
      ],

      // How many times to test (median of 3)
      numberOfRuns: 3,

      // Start dev server
      startServerCommand: 'npm run build && npm run start',
      startServerReadyPattern: 'ready',
    },

    assert: {
      // Fail if scores drop below thresholds
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],

        // Specific metrics
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'interactive': ['error', { maxNumericValue: 3500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
      },
    },

    upload: {
      // Save reports to temporary storage
      target: 'temporary-public-storage',
    },
  },
};
```

**Understanding Lighthouse Metrics:**

1. **Performance Score (0-100)**
   - Weighted average of metrics
   - Target: >90

2. **Core Web Vitals:**
   - **FCP** (First Contentful Paint): <1.8s
     - When first content appears
   - **LCP** (Largest Contentful Paint): <2.5s
     - When main content loads
   - **CLS** (Cumulative Layout Shift): <0.1
     - Visual stability (no jumping elements)
   - **TBT** (Total Blocking Time): <200ms
     - How long page is unresponsive
   - **TTI** (Time to Interactive): <3.9s
     - When page is fully interactive

3. **Accessibility Score (0-100)**
   - WCAG 2.1 compliance
   - Target: 100

4. **SEO Score (0-100)**
   - Meta tags, crawlability
   - Target: 100

**Run Lighthouse CI:**

```bash
npx lhci autorun
```

**Output:**
```
Collecting lighthouse results... ✓

URL: http://localhost:3000/
  Performance:      95
  Accessibility:    100
  Best Practices:   92
  SEO:              100

Metrics:
  First Contentful Paint: 1.2s
  Largest Contentful Paint: 1.8s
  Total Blocking Time: 150ms
  Cumulative Layout Shift: 0.05
  Speed Index: 2.1s

View full report: https://storage.googleapis.com/...
```

**CI Integration:**

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Run Lighthouse CI
        run: npm run lighthouse

      - name: Upload results
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-results
          path: .lighthouseci/
```

#### Step 4.2: Bundle Analyzer Setup

```bash
npm install --save-dev @next/bundle-analyzer
```

**Configure:**

```javascript
// next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  // Your Next.js config
});
```

**Add Script:**

```json
// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build"
  }
}
```

**Run Analyzer:**

```bash
npm run analyze
```

**What Opens:**
```
Browser opens with interactive treemap:

┌─────────────────────────────────────────────────────────┐
│ Total Bundle Size: 487 KB                               │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────┐  ┌──────────┐  ┌───────────┐ │
│  │   node_modules      │  │   app    │  │  shared   │ │
│  │       350KB         │  │   100KB  │  │   37KB    │ │
│  │                     │  │          │  │           │ │
│  │ ┌────────┐ ┌─────┐ │  │          │  │           │ │
│  │ │react   │ │next │ │  │          │  │           │ │
│  │ │ 150KB  │ │120KB│ │  │          │  │           │ │
│  │ └────────┘ └─────┘ │  │          │  │           │ │
│  └─────────────────────┘  └──────────┘  └───────────┘ │
│                                                          │
└─────────────────────────────────────────────────────────┘

Click boxes to drill down
Hover to see sizes
```

**How to Use:**

1. **Identify Large Dependencies**
   - Click into node_modules
   - Look for heavy packages
   - Check if they're needed

2. **Check for Duplicates**
   - Multiple versions of same package
   - Can optimize with npm dedupe

3. **Analyze Code-Splitting**
   - Each route should be separate chunk
   - Shared code in common chunk
   - Lazy-load heavy components

**Optimization Workflow:**

```typescript
// Before: Import entire library (100KB)
import _ from 'lodash';

// After: Import only what you need (5KB)
import debounce from 'lodash/debounce';
```

```typescript
// Before: Import heavy component in every page
import AnimatedHero from '@/components/AnimatedHero';

// After: Lazy load on-demand
const AnimatedHero = dynamic(() => import('@/components/AnimatedHero'), {
  loading: () => <div>Loading...</div>,
});
```

**Learning Checkpoint:**

By end of Phase 4, you should understand:
- ✓ How to measure performance
- ✓ What Core Web Vitals mean
- ✓ How to analyze bundle size
- ✓ How to optimize dependencies
- ✓ How to set performance budgets

---

### Phase 5: Agent System (Week 4) - Automated Quality Validation

**Objective:** Implement AI-powered agents to validate portfolio quality from multiple perspectives

#### Why Agents?

Traditional testing validates *technical correctness*:
- "Does this button work?" ✓
- "Is this accessible?" ✓
- "Is it performant?" ✓

Agent system validates *subjective quality*:
- "Would a recruiter be impressed?" 🤔
- "Does this demonstrate Staff-level thinking?" 🤔
- "Would a client trust me with their project?" 🤔

**The Problem:**
- You can't interview yourself
- Friends/mentors have limited time
- Real feedback comes too late (after job applications)
- No systematic way to improve portfolio

**The Solution:**
AI agents that simulate different evaluator perspectives:
- 👔 Recruiter Agent - "Would I interview this candidate?"
- 👨‍💼 Design Director - "Does this show strategic thinking?"
- 💼 Potential Client - "Can I trust them with my project?"
- ♿ Accessibility Advocate - "Is this truly inclusive?"
- 🏛️ Architecture Guardian - "Is the code well-organized?"
- 🎨 Design System Enforcer - "Are tokens used consistently?"
- ⚡ Performance Watchdog - "Is this optimized?"
- 🎯 Design-Code Parity - "Does code match design?"

#### Step 5.1: Agent Framework Setup

**Install Dependencies:**

```bash
npm install --save-dev @anthropic-ai/sdk tsx
```

**Why These Tools:**
- **@anthropic-ai/sdk**: Claude API for AI analysis
- **tsx**: TypeScript execution for agent scripts

**Create Base Agent Framework:**

```bash
mkdir -p scripts/agents
mkdir -p reports
```

**File: `scripts/agents/base-agent.ts`**

```typescript
import Anthropic from '@anthropic-ai/sdk';

export interface Violation {
  severity: 'critical' | 'warning' | 'info';
  message: string;
  location?: string;
  suggestion?: string;
}

export interface AgentReport {
  agentName: string;
  agentType: 'external' | 'internal';
  score: number; // 0-100
  timestamp: string;
  violations: Violation[];
  strengths: string[];
  improvements: string[];
  summary: string;
}

export abstract class Agent {
  protected anthropic: Anthropic;

  abstract name: string;
  abstract type: 'external' | 'internal';

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  abstract run(): Promise<AgentReport>;

  protected calculateScore(
    totalChecks: number,
    passedChecks: number,
    violations: Violation[]
  ): number {
    // Base score from passed checks
    let score = (passedChecks / totalChecks) * 100;

    // Deduct for violations
    violations.forEach((v) => {
      if (v.severity === 'critical') score -= 10;
      if (v.severity === 'warning') score -= 3;
      if (v.severity === 'info') score -= 1;
    });

    // Clamp between 0-100
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  protected async analyzeWithClaude(
    prompt: string,
    content: string
  ): Promise<string> {
    const message = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `${prompt}\n\n${content}`,
      }],
    });

    return message.content[0].type === 'text'
      ? message.content[0].text
      : '';
  }
}
```

**Understanding the Framework:**

1. **AgentReport Interface**: Standard format for all agents
   - `score`: 0-100 numeric grade
   - `violations`: Things that are wrong
   - `strengths`: What's working well
   - `improvements`: Actionable suggestions

2. **Base Agent Class**: Shared logic
   - `calculateScore()`: Consistent scoring algorithm
   - `analyzeWithClaude()`: AI analysis wrapper

3. **Abstract Methods**: Each agent implements
   - `name`: Agent identifier
   - `type`: External (user-facing) or internal (code quality)
   - `run()`: Main validation logic

#### Step 5.2: Implement Your First Agent (Recruiter)

**Why Start Here:**
- Most valuable for job search
- Uses content extraction (builds on Playwright)
- Provides actionable hiring feedback

**File: `scripts/agents/recruiter-agent.ts`**

```typescript
import { Agent, AgentReport, Violation } from './base-agent';
import { chromium } from 'playwright';
import * as fs from 'fs/promises';

export class RecruiterAgent extends Agent {
  name = 'Recruiter/Hiring Manager';
  type: 'external' | 'internal' = 'external';

  async run(): Promise<AgentReport> {
    const violations: Violation[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];

    // 1. Extract portfolio content
    const content = await this.extractContent();

    // 2. Analyze with Claude (recruiter perspective)
    const analysis = await this.analyzeWithClaude(
      `You are an experienced tech recruiter evaluating a Staff/Lead Product Designer portfolio.

      Assess the portfolio on:
      1. Clear value proposition (within 5 seconds, do I know what they do?)
      2. Quantified impact (metrics, business outcomes, not just deliverables)
      3. Leadership signals (team collaboration, mentorship, strategy)
      4. Case study structure (problem, process, outcome, reflection)
      5. Hiring signals (availability, location, contact info)
      6. Visual quality (professional, polished, attention to detail)
      7. Technical depth (system thinking, trade-offs, scale considerations)

      Rate each 0-10, provide specific feedback for each.
      Format as JSON with structure:
      {
        "scores": { "valueProposition": 8, ... },
        "strengths": ["strength 1", "strength 2"],
        "improvements": ["improvement 1", "improvement 2"],
        "summary": "Overall assessment"
      }`,
      content
    );

    // 3. Parse analysis
    const result = JSON.parse(analysis);

    // 4. Calculate score
    const avgScore = Object.values(result.scores).reduce((a: number, b: number) => a + b, 0) /
                     Object.values(result.scores).length;
    const score = Math.round(avgScore * 10); // Convert 0-10 to 0-100

    // 5. Generate violations from low scores
    Object.entries(result.scores).forEach(([category, score]) => {
      if ((score as number) < 7) {
        violations.push({
          severity: 'warning',
          message: `${category} score is ${score}/10 - below target`,
          suggestion: result.improvements.find((i: string) =>
            i.toLowerCase().includes(category.toLowerCase())
          ),
        });
      }
    });

    return {
      agentName: this.name,
      agentType: this.type,
      score,
      timestamp: new Date().toISOString(),
      violations,
      strengths: result.strengths,
      improvements: result.improvements,
      summary: result.summary,
    };
  }

  private async extractContent(): Promise<string> {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    let content = '';

    // Extract homepage
    await page.goto('http://localhost:3000');
    content += '=== HOMEPAGE ===\n';
    content += await page.locator('main').textContent();

    // Extract case studies
    const caseStudies = await page.locator('[href^="/"][href$="ocean"]').all();
    for (const link of caseStudies.slice(0, 2)) {
      const href = await link.getAttribute('href');
      if (href) {
        await page.goto(`http://localhost:3000${href}`);
        content += `\n\n=== CASE STUDY: ${href} ===\n`;
        content += await page.locator('article').textContent();
      }
    }

    await browser.close();
    return content;
  }
}
```

**Run the Agent:**

```bash
# Add script to package.json
"agents:recruiter": "tsx scripts/agents/recruiter-agent.ts"

# Run it
npm run agents:recruiter

# View report
cat reports/agent-reports.json
```

**Example Output:**

```json
{
  "agentName": "Recruiter/Hiring Manager",
  "agentType": "external",
  "score": 87,
  "timestamp": "2024-01-15T10:30:00Z",
  "violations": [
    {
      "severity": "warning",
      "message": "quantifiedImpact score is 6/10 - below target",
      "suggestion": "Add more specific metrics: revenue impact, user growth %, time saved"
    }
  ],
  "strengths": [
    "Clear value proposition immediately visible",
    "Professional visual design and attention to detail",
    "Case studies show strategic thinking"
  ],
  "improvements": [
    "Add quantified business impact metrics to case studies",
    "Include availability/location info above the fold",
    "Add testimonials or references from past collaborators"
  ],
  "summary": "Strong portfolio with excellent visual design and clear narrative. To reach Staff+ level, emphasize business impact with specific metrics and demonstrate cross-functional leadership."
}
```

#### Step 5.3: CI/CD Integration

**Objective:** Agents run automatically on every PR

**File: `.github/workflows/agent-review.yml`**

```yaml
name: Agent Portfolio Review

on:
  pull_request:
    branches: [main]

jobs:
  agent-review:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Start server
        run: |
          npm run start &
          npx wait-on http://localhost:3000

      - name: Run agents
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: npm run agents:run

      - name: Comment PR with results
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const reports = JSON.parse(
              fs.readFileSync('reports/agent-reports.json', 'utf8')
            );

            const avgScore = Math.round(
              reports.reduce((sum, r) => sum + r.score, 0) / reports.length
            );

            let comment = '## 🤖 Agent Portfolio Review\n\n';
            comment += `**Overall Score:** ${avgScore}/100\n\n`;
            comment += '### Agent Scores:\n';

            reports.forEach(r => {
              const emoji = r.score >= 90 ? '🟢' : r.score >= 70 ? '🟡' : '🔴';
              comment += `${emoji} **${r.agentName}**: ${r.score}/100\n`;
            });

            comment += '\n### Top Improvements:\n';
            const allImprovements = reports.flatMap(r => r.improvements).slice(0, 5);
            allImprovements.forEach(i => comment += `- ${i}\n`);

            comment += '\n[View Full Report](...)';

            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: comment
            });

      - name: Upload reports
        uses: actions/upload-artifact@v4
        with:
          name: agent-reports
          path: reports/
```

**What Happens:**
1. PR is created
2. GitHub Actions builds your site
3. Agents analyze the portfolio
4. Results are commented on PR
5. You get immediate feedback before merging

#### Step 5.4: Implement Remaining Agents (Summary)

**Quick Implementation Guide:**

**5A. Accessibility Agent**
- Uses: `@axe-core/playwright`
- Checks: WCAG 2.1 compliance, keyboard nav, screen readers
- Integration: Extends Playwright tests from Phase 3

**5B. Performance Agent**
- Uses: Lighthouse CI (already set up)
- Checks: Core Web Vitals, bundle size, optimization opportunities
- Integration: Reads Lighthouse reports

**5C. Architecture Guardian**
- Uses: Node.js `fs` module
- Checks: Atomic Design structure, naming conventions, file organization
- Integration: Static analysis of codebase

**5D. Design System Enforcer**
- Uses: TypeScript AST parsing
- Checks: Token usage, no magic numbers, consistent patterns
- Integration: Analyzes component code

**5E. Design Director Agent**
- Uses: Claude API + Chromatic
- Checks: Design thinking, strategic impact, visual quality
- Integration: Analyzes case study content

**5F. Client Agent**
- Uses: Playwright simulations
- Checks: Value proposition, trust signals, conversion path
- Integration: Simulates potential client journey

**5G. Design-Code Parity Agent** (optional if not using Figma)
- Uses: Static analysis of components
- Checks: Component consistency, reusability, modularity
- Integration: Compares component structure

**Full implementation details:** See `docs/AGENT_SYSTEM.md`

#### Step 5.5: Weekly Health Checks

**File: `.github/workflows/weekly-health.yml`**

```yaml
name: Weekly Portfolio Health Check

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9am
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - run: npm ci
      - run: npm run build
      - run: npm run start &
      - run: npm run agents:run

      - name: Create issue if score drops
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const reports = JSON.parse(
              fs.readFileSync('reports/agent-reports.json')
            );
            const avgScore = Math.round(
              reports.reduce((sum, r) => sum + r.score, 0) / reports.length
            );

            if (avgScore < 85) {
              await github.rest.issues.create({
                owner: context.repo.owner,
                repo: context.repo.repo,
                title: `⚠️ Portfolio Quality Alert: Score ${avgScore}/100`,
                body: `Weekly health check shows quality drop.\n\n[See reports](...)`
              });
            }
```

**What This Does:**
- Runs agents every Monday automatically
- Creates GitHub issue if quality drops below 85/100
- Tracks trends over time
- Proactive quality monitoring

#### Step 5.6: Pre-Deploy Validation Gate

**File: `.github/workflows/pre-deploy.yml`**

```yaml
name: Pre-Deploy Validation

on:
  push:
    branches: [main]

jobs:
  validate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - run: npm ci
      - run: npm run build
      - run: npm run start &

      - name: Run critical agents
        run: npm run agents:run
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}

      - name: Check quality threshold
        run: |
          node -e "
            const fs = require('fs');
            const reports = JSON.parse(fs.readFileSync('reports/agent-reports.json'));
            const avgScore = Math.round(
              reports.reduce((sum, r) => sum + r.score, 0) / reports.length
            );

            if (avgScore < 85) {
              console.error('Portfolio quality below deployment threshold');
              process.exit(1);
            }
            console.log('✅ Quality check passed - deploying');
          "

      - name: Deploy to Vercel
        if: success()
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

**What This Does:**
- Runs before every production deploy
- Blocks deployment if quality score < 85/100
- Ensures only high-quality updates go live
- Prevents you from shipping subpar work

**Learning Checkpoint:**

By end of Phase 5, you should understand:
- ✓ How to use AI for subjective evaluation
- ✓ Multi-perspective portfolio validation
- ✓ Automated quality gates in CI/CD
- ✓ Interpreting and acting on agent feedback
- ✓ Systematic portfolio improvement process
- ✓ How to explain this system to employers/clients

**Why This Matters:**

Traditional portfolio: "I hope this is good enough 🤞"

With agent system: "My portfolio scores 92/100 across 8 validation perspectives, with systematic quality gates ensuring professional standards."

**Staff+ level differentiator.**

---

## 📊 Component Structure Principles

### Atomic Design Methodology

**Hierarchy:**

```
Atoms → Molecules → Organisms → Templates → Pages
```

**Example from Your Portfolio:**

```
Atoms (smallest units)
├── Button
├── Input
├── Tag
└── Link

Molecules (combinations of atoms)
├── SearchBox (Input + Button)
├── TagCloud (multiple Tags)
└── SocialLinks (multiple Links)

Organisms (complex components)
├── Navigation (Logo + Links + Dropdown)
├── CaseStudyCard (Image + Tags + Text + Button)
└── PasswordPrompt (Form + Input + Button + Error)

Templates (page layouts)
├── DefaultLayout (Header + Content + Footer)
└── CaseStudyLayout (Header + Hero + Article + Footer)

Pages (specific instances)
├── HomePage (DefaultLayout + specific content)
└── CaseStudyPage (CaseStudyLayout + MDX content)
```

### Component File Structure

**Standard Pattern:**

```
src/components/
├── atoms/
│   └── Button/
│       ├── Button.tsx            # Component
│       ├── Button.stories.tsx    # Storybook stories
│       ├── Button.test.tsx       # Unit tests
│       ├── Button.module.css     # Styles (if needed)
│       └── index.ts              # Export
│
├── molecules/
│   └── CaseStudyCard/
│       ├── CaseStudyCard.tsx
│       ├── CaseStudyCard.stories.tsx
│       ├── CaseStudyCard.test.tsx
│       └── index.ts
│
└── organisms/
    └── Navigation/
        ├── Navigation.tsx
        ├── Navigation.stories.tsx
        ├── Navigation.test.tsx
        └── index.ts
```

### Component Template

```typescript
// src/components/atoms/Button/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button variants using CVA (Class Variance Authority)
 */
const buttonVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900',
        secondary: 'border border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-gray-900',
        ghost: 'text-gray-900 hover:bg-gray-100 focus:ring-gray-900',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/**
 * Button Props
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Loading state */
  isLoading?: boolean;
  /** Icon before text */
  leftIcon?: React.ReactNode;
  /** Icon after text */
  rightIcon?: React.ReactNode;
}

/**
 * Button Component
 *
 * A flexible button component with multiple variants and sizes.
 *
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="secondary" leftIcon={<Icon />}>With icon</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

**Component Best Practices:**

1. **TypeScript** - Full type safety
2. **forwardRef** - Allows parent to access DOM node
3. **displayName** - Helps with debugging
4. **Variants** - CVA for style variations
5. **Props Interface** - Extends HTML attributes
6. **Documentation** - JSDoc comments
7. **Accessibility** - Proper ARIA, keyboard support
8. **Composition** - leftIcon/rightIcon slots

### Story Template

```typescript
// src/components/atoms/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A flexible button component with multiple variants and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary variant - main call-to-action
 */
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

/**
 * Secondary variant - secondary actions
 */
export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

/**
 * Ghost variant - tertiary actions
 */
export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
};

/**
 * Danger variant - destructive actions
 */
export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    children: 'Button',
    size: 'sm',
  },
};

/**
 * Medium size (default)
 */
export const Medium: Story = {
  args: {
    children: 'Button',
    size: 'md',
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    children: 'Button',
    size: 'lg',
  },
};

/**
 * With loading state
 */
export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

/**
 * With left icon
 */
export const WithLeftIcon: Story = {
  args: {
    children: 'Download',
    leftIcon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
};

/**
 * With right icon
 */
export const WithRightIcon: Story = {
  args: {
    children: 'Next',
    rightIcon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
  },
};

/**
 * Long text (edge case)
 */
export const LongText: Story = {
  args: {
    children: 'This is a button with very long text that tests overflow behavior',
    variant: 'primary',
  },
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex gap-2">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex gap-2">
        <Button isLoading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
};
```

**Learning Checkpoint:**

By understanding component structure, you should know:
- ✓ How to organize components by complexity
- ✓ How to structure component files
- ✓ How to use variants for flexibility
- ✓ How to write comprehensive stories
- ✓ How to document component APIs

---

## 📈 Metrics & Measurement Strategy

### Component Coverage Tracking

**Create Coverage Script:**

```javascript
// scripts/componentCoverage.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Component Coverage Calculator
 *
 * Tracks which components have Storybook stories
 * Helps identify gaps in documentation
 */

// Find all components
const componentFiles = glob.sync('src/components/**/*.tsx', {
  ignore: [
    '**/*.stories.tsx',
    '**/*.test.tsx',
    '**/index.tsx',
  ],
});

// Find all stories
const storyFiles = glob.sync('src/components/**/*.stories.tsx');

// Extract component names from stories
const componentsWithStories = new Set(
  storyFiles.map((file) => {
    const match = file.match(/([^/]+)\.stories\.tsx$/);
    return match ? match[1] : null;
  }).filter(Boolean)
);

// Calculate coverage
const totalComponents = componentFiles.length;
const coveredComponents = componentFiles.filter((file) => {
  const componentName = path.basename(file, '.tsx');
  return componentsWithStories.has(componentName);
}).length;

const coveragePercent = ((coveredComponents / totalComponents) * 100).toFixed(1);

// Find uncovered components
const uncoveredComponents = componentFiles
  .filter((file) => {
    const componentName = path.basename(file, '.tsx');
    return !componentsWithStories.has(componentName);
  })
  .map((file) => path.relative(process.cwd(), file));

// Generate report
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 Component Coverage Report');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log(`Total Components:    ${totalComponents}`);
console.log(`Covered Components:  ${coveredComponents}`);
console.log(`Coverage:            ${coveragePercent}%`);
console.log('');

if (uncoveredComponents.length > 0) {
  console.log('❌ Components without stories:');
  console.log('');
  uncoveredComponents.forEach((file) => {
    console.log(`  - ${file}`);
  });
  console.log('');
}

// Save to JSON
const report = {
  timestamp: new Date().toISOString(),
  totalComponents,
  coveredComponents,
  coveragePercent: parseFloat(coveragePercent),
  uncoveredComponents,
};

fs.writeFileSync(
  'coverage/component-coverage.json',
  JSON.stringify(report, null, 2)
);

console.log('✓ Report saved to coverage/component-coverage.json');
console.log('');

// Exit with error if coverage below threshold
const threshold = 80;
if (parseFloat(coveragePercent) < threshold) {
  console.log(`⚠️  Coverage ${coveragePercent}% is below threshold ${threshold}%`);
  process.exit(1);
}
```

**Add to package.json:**

```json
{
  "scripts": {
    "coverage:components": "node scripts/componentCoverage.js"
  }
}
```

**Run Coverage:**

```bash
npm run coverage:components
```

**Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Component Coverage Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Components:    15
Covered Components:  12
Coverage:            80.0%

❌ Components without stories:

  - src/components/molecules/SearchBox.tsx
  - src/components/atoms/Input.tsx
  - src/components/atoms/Tag.tsx

✓ Report saved to coverage/component-coverage.json
```

### Dashboard Creation

**Create Metrics Dashboard:**

```typescript
// src/app/metrics/page.tsx
import { promises as fs } from 'fs';
import path from 'path';

interface CoverageReport {
  timestamp: string;
  totalComponents: number;
  coveredComponents: number;
  coveragePercent: number;
  uncoveredComponents: string[];
}

export default async function MetricsPage() {
  // Read coverage report
  const coverageFile = await fs.readFile(
    path.join(process.cwd(), 'coverage/component-coverage.json'),
    'utf-8'
  );
  const coverage: CoverageReport = JSON.parse(coverageFile);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold">Metrics Dashboard</h1>

        {/* Component Coverage */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">Component Coverage</h2>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Coverage</span>
              <span className="text-sm font-bold">{coverage.coveragePercent}%</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${coverage.coveragePercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="text-3xl font-bold text-gray-900">
                {coverage.totalComponents}
              </div>
              <div className="text-sm text-gray-600">Total Components</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-3xl font-bold text-green-600">
                {coverage.coveredComponents}
              </div>
              <div className="text-sm text-gray-600">With Stories</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded">
              <div className="text-3xl font-bold text-red-600">
                {coverage.uncoveredComponents.length}
              </div>
              <div className="text-sm text-gray-600">Without Stories</div>
            </div>
          </div>

          {coverage.uncoveredComponents.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Missing Stories</h3>
              <ul className="space-y-1">
                {coverage.uncoveredComponents.map((component) => (
                  <li key={component} className="text-sm text-gray-600">
                    • {component}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 text-xs text-gray-500">
            Last updated: {new Date(coverage.timestamp).toLocaleString()}
          </div>
        </div>

        {/* Add more metric cards here */}
      </div>
    </div>
  );
}
```

### Tracking Over Time

**Store Historical Data:**

```javascript
// scripts/trackMetrics.js
const fs = require('fs');
const path = require('path');

// Read current report
const currentReport = require('../coverage/component-coverage.json');

// Read historical data
const historyFile = path.join(__dirname, '../coverage/history.json');
let history = [];

if (fs.existsSync(historyFile)) {
  history = JSON.parse(fs.readFileSync(historyFile, 'utf-8'));
}

// Add current report to history
history.push({
  date: currentReport.timestamp,
  coverage: currentReport.coveragePercent,
  totalComponents: currentReport.totalComponents,
  coveredComponents: currentReport.coveredComponents,
});

// Keep last 30 days
const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
history = history.filter((entry) => new Date(entry.date) > thirtyDaysAgo);

// Save history
fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

console.log('✓ Metrics tracked');
```

**Visualize Trends:**

```typescript
// Add to metrics dashboard
<div className="mb-8 rounded-lg bg-white p-6 shadow">
  <h2 className="mb-4 text-2xl font-semibold">Coverage Trend</h2>
  <LineChart
    data={history}
    xAxis="date"
    yAxis="coverage"
    target={80}
  />
</div>
```

---

## 💼 Business Value & ROI

### Cost-Benefit Analysis

**Initial Investment:**
```
Setup Time:          12-15 hours
Learning Curve:      20 hours
Ongoing Maintenance: 1 hour/week
```

**Annual Value Generated:**

| Benefit | Time Saved | Value |
|---------|------------|-------|
| Catch bugs before production | 5 bugs/year × 4 hours each | 20 hours |
| Faster component development | 30 min/component × 50 components | 25 hours |
| Automated visual regression | Manual QA time 2 hours/week | 104 hours |
| Performance monitoring | 1 incident prevented | 8 hours |
| Accessibility compliance | Avoid legal issues | Priceless |
| Agent portfolio validation | Pre-interview optimization | 40 hours |
| Automated multi-perspective review | Replaces mentor/peer reviews | 30 hours |
| Client demonstrations | Wins 1 extra client | $50k+ |

**Total Time Saved: ~227 hours/year**

At $100/hour consulting rate: **$22,700 value**

**Plus Agent-Specific Benefits:**

| Agent Benefit | Annual Impact |
|---------------|---------------|
| Portfolio optimization before job applications | $8,000 (higher interview rate) |
| Catch portfolio issues pre-interview | $5,000 (avoid missed opportunities) |
| Client confidence through systematic quality | $10,000 (better client conversion) |
| Reduce manual portfolio review cycles | $4,000 (time saved) |
| **Total Agent Value** | **$27,000/year** |

**Combined Total Value: $49,700/year**

**ROI: 147x return on investment**

### Client Value Proposition

**For Potential Clients:**

"Here's my Storybook → https://storybook.yourdomain.com

You can see:
- Every component I've built
- How I think about design systems
- My attention to detail
- Accessibility commitment
- Reusable patterns you'd get"

**Competitive Advantage:**
- Most designers don't have this level of documentation
- Shows systematic thinking
- Demonstrates technical capability
- Builds trust through transparency

---

## 🚀 Scaling Patterns

### From Portfolio to Enterprise

**Small Project (Your Portfolio):**
```
10 components
3 pages
1 developer
Simple CI/CD
```

**Medium Project:**
```
50 components
20 pages
3-5 developers
Full CI/CD with tests
Component versioning
```

**Enterprise Project:**
```
200+ components
100+ pages
20+ developers
Advanced CI/CD
Design tokens
Multiple brands
Cross-platform (web, mobile)
```

**Patterns That Scale:**

1. **Component Library as Package**
```
@yourcompany/design-system
├── components/
├── tokens/
└── utils/
```

2. **Monorepo Structure**
```
packages/
├── web-app/
├── mobile-app/
└── design-system/
```

3. **Token-Driven Design**
```typescript
// tokens/colors.ts
export const colors = {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',
    900: '#1e3a8a',
  },
};

// Component uses tokens
<Button style={{ backgroundColor: colors.primary[500] }} />
```

4. **Automated Publishing**
```yaml
# .github/workflows/publish.yml
- name: Publish to npm
  run: npm publish
  if: github.ref == 'refs/heads/main'
```

---

## 📚 Learning Resources

### Storybook
- Official Docs: https://storybook.js.org/docs
- Tutorial: https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/
- YouTube: "Storybook Tutorials" by Fireship

### Playwright
- Official Docs: https://playwright.dev/
- Best Practices: https://playwright.dev/docs/best-practices
- Course: "End-to-End Testing with Playwright" on Test Automation University

### Web Performance
- web.dev/metrics: https://web.dev/metrics/
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Core Web Vitals: https://web.dev/vitals/

### Component Design
- Atomic Design: https://bradfrost.com/blog/post/atomic-web-design/
- Component-Driven: https://componentdriven.org/
- Design Systems Handbook: https://www.designbetter.co/design-systems-handbook

---

## ✅ Success Criteria

By the end of this implementation, you should have:

**Infrastructure:**
- ✓ Storybook running with all components documented
- ✓ Chromatic catching visual regressions
- ✓ Playwright testing critical user flows
- ✓ Lighthouse CI monitoring performance
- ✓ Bundle analyzer showing optimization opportunities
- ✓ **Agent system validating portfolio quality**
- ✓ **CI/CD pipelines running automated reviews**
- ✓ **Pre-deploy quality gates active**

**Metrics:**
- ✓ 80%+ component coverage
- ✓ 90+ performance score
- ✓ 100 accessibility score
- ✓ 0 visual regressions
- ✓ All E2E tests passing
- ✓ **85+ overall agent score (across 8 perspectives)**
- ✓ **All external agents >80/100**
- ✓ **All internal agents >85/100**

**Knowledge:**
- ✓ Understand each tool's purpose
- ✓ Can write stories independently
- ✓ Can debug failed tests
- ✓ Can interpret metrics
- ✓ Can explain value to clients
- ✓ **Can interpret agent feedback**
- ✓ **Understand multi-perspective validation**
- ✓ **Can optimize portfolio systematically**

**Portfolio:**
- ✓ Public Storybook as showcase
- ✓ Documented design system
- ✓ Proven quality process
- ✓ Competitive advantage
- ✓ **AI-validated portfolio quality**
- ✓ **Data-driven improvement cycle**
- ✓ **Staff+ level differentiation**

---

## 🎯 Next Steps

Ready to start implementation?

1. **Choose Starting Point**
   - Phase 1: Storybook foundation (recommended)
   - Phase 2: Visual testing
   - Phase 3: E2E testing
   - Phase 4: Performance monitoring
   - Phase 5: Agent system (AI-powered validation)

2. **Set Timeline**
   - Week 1: Storybook setup
   - Week 2: Chromatic + Playwright
   - Week 3: Lighthouse + optimization
   - Week 4: Agent system + quality gates
   - Week 5: Polish + documentation

3. **Track Progress**
   - Use TodoWrite tool for tasks
   - Commit after each phase
   - Document learnings
   - Share with me for review
   - Monitor agent scores for improvement

**Ready to begin? Let me know which phase to start with!**

**For agent system details:** See `docs/AGENT_SYSTEM.md` for complete implementation guide.
