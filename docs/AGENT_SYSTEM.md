# 🤖 Portfolio Quality Agent System

**Automated Multi-Perspective Portfolio Review & Validation**

---

## 📚 Table of Contents

1. [Overview](#overview)
2. [Agent Architecture](#agent-architecture)
3. [The Eight Agents](#the-eight-agents)
4. [Implementation Guide](#implementation-guide)
5. [CI/CD Pipelines](#cicd-pipelines)
6. [Dashboard & Reporting](#dashboard--reporting)
7. [Integration with Existing Tools](#integration-with-existing-tools)

---

## 🎯 Overview

### The Problem

When building a portfolio for Staff/Lead Product Designer roles:
- No way to validate from recruiter's perspective
- Can't objectively evaluate case study quality
- Architecture drift goes unnoticed
- Design-code consistency is manual to check
- Accessibility issues discovered too late
- Performance regressions slip through

### The Solution

**Automated agent system** that reviews your portfolio from 8 different perspectives:
- **4 External Validators** (user experience: recruiters, design directors, clients, accessibility advocates)
- **4 Internal Validators** (code quality: architecture, design system, performance, parity)

### Why This Matters

**For Job Applications:**
- Get feedback before recruiters see your portfolio
- Optimize for what hiring managers actually look for
- Catch red flags early
- Improve quality score iteratively

**For Professional Growth:**
- Learn what makes excellent portfolios
- Systematic improvement process
- Data-driven optimization
- Measurable progress

**For Client Work:**
- Show systematic quality process
- Demonstrate attention to detail
- Prove professionalism
- Differentiate from competition

---

## 🏗️ Agent Architecture

### Two-Layer Validation System

```
┌─────────────────────────────────────────────────────────┐
│                 EXTERNAL VALIDATORS                      │
│              (User Experience Layer)                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Recruiter   │  │   Design     │  │   Client     │ │
│  │    Agent     │  │  Director    │  │    Agent     │ │
│  │              │  │   Agent      │  │              │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                          │
│  ┌──────────────┐                                       │
│  │Accessibility │                                       │
│  │   Advocate   │                                       │
│  │    Agent     │                                       │
│  └──────────────┘                                       │
│                                                          │
└────────────────────┬────────────────────────────────────┘
                     │
              Portfolio Website
                     │
┌────────────────────▼────────────────────────────────────┐
│                 INTERNAL VALIDATORS                      │
│               (Code Quality Layer)                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │Architecture  │  │Design System │  │ Performance  │ │
│  │  Guardian    │  │  Enforcer    │  │  Watchdog    │ │
│  │              │  │              │  │              │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                          │
│  ┌──────────────┐                                       │
│  │Design-Code   │                                       │
│  │    Parity    │                                       │
│  │    Agent     │                                       │
│  └──────────────┘                                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### How Agents Work

**Each agent:**
1. **Runs automated tests** (Playwright, Chromatic, static analysis)
2. **Analyzes with AI** (Claude for subjective evaluation)
3. **Generates report** (scores, strengths, improvements)
4. **Provides actionable feedback** (specific fixes)

**Tools Used:**
- **Playwright**: Simulate user behavior, extract content
- **Chromatic**: Visual regression, design parity
- **Claude API**: Subjective review (like a real human)
- **Node.js scripts**: Architecture, token analysis
- **Lighthouse**: Performance metrics
- **axe-core**: Accessibility audits

---

## 🤖 The Eight Agents

### External Validators (User-Facing Perspective)

#### 1. Recruiter/Hiring Manager Agent

**Persona:** Senior tech recruiter at FAANG company, reviewing 50+ portfolios/week

**What it checks:**
- ✓ Case study structure (problem → solution → results)
- ✓ Metrics and outcomes (quantified impact)
- ✓ Leadership signals (team collaboration, decision-making)
- ✓ Red flags (typos, broken links, unclear value)
- ✓ Portfolio best practices
- ✓ Hiring likelihood based on presentation

**Technology Stack:**
```typescript
Playwright: Extract case study content
Claude API: Analyze as recruiter would
Custom checks: Contact info, resume, broken links
```

**Sample Report:**
```
🎯 Recruiter Agent Report
Score: 87/100

✅ Strengths:
  • Clear metrics (300M+ messages, 16x productivity)
  • Strong leadership signals (Staff/Lead roles)
  • Problem-solution-results structure
  • Professional presentation

⚠️ Improvements:
  • Add "why" behind key decisions (4 instances)
  • Include team size/collaboration details
  • Add 1-2 failure stories (growth mindset)
  • Testimonials from stakeholders

📊 Hiring Likelihood: High
📝 Comparable to: Top 15% of portfolios
```

---

#### 2. Design Director Agent

**Persona:** VP of Design at tech unicorn, evaluating for Staff IC or Design Manager role

**What it checks:**
- ✓ Design thinking demonstrated
- ✓ Strategic impact (business outcomes)
- ✓ Process documentation (iterations, exploration)
- ✓ Visual design quality
- ✓ Systems thinking
- ✓ Stakeholder management

**Technology Stack:**
```typescript
Chromatic: Visual quality assessment
Playwright: Content extraction
Claude API: Evaluate design thinking depth
```

**Sample Report:**
```
🎨 Design Director Agent Report
Score: 92/100

✅ Strengths:
  • Exceptional systems thinking (16x metric)
  • Clear problem framing
  • Business impact well-documented
  • Strong visual presentation

⚠️ Improvements:
  • Show design exploration/iterations
  • Add competitive analysis section
  • Include stakeholder feedback loops
  • More "why" on design decisions

💼 Assessment: Staff Designer level
📚 Recommendation: Strong hire
```

---

#### 3. Potential Client Agent

**Persona:** VP of Product at B2B SaaS company, budget for contract designer

**What it checks:**
- ✓ Value proposition clarity (understand in 3 seconds)
- ✓ Relevant work examples
- ✓ Trust signals (testimonials, case results)
- ✓ Contact/CTA effectiveness
- ✓ Case study clarity
- ✓ Pricing/process transparency

**Technology Stack:**
```typescript
Playwright: Simulate client journey
Custom checks: Trust signals, CTAs
Claude API: Evaluate from client perspective
```

**Sample Report:**
```
💼 Client Agent Report
Score: 88/100

✅ Confidence Signals:
  • Value prop clear within 3s
  • Relevant case studies (SaaS, enterprise)
  • Strong metrics (credibility)
  • Easy contact process

⚠️ Improvements:
  • Add client testimonials
  • Show more visual "after" results
  • Include process/timeline info
  • Add pricing guidance

📈 Likelihood to Hire: High
💰 Perceived Value: $150-200/hr range
```

---

#### 4. Accessibility Advocate Agent

**Persona:** CPACC-certified accessibility specialist, WCAG 2.1 AA compliance focus

**What it checks:**
- ✓ WCAG 2.1 AA compliance
- ✓ Keyboard navigation
- ✓ Screen reader compatibility
- ✓ Color contrast
- ✓ Semantic HTML
- ✓ ARIA usage
- ✓ Focus management

**Technology Stack:**
```typescript
axe-core: Automated a11y testing
Playwright: Keyboard nav testing
Custom checks: Heading hierarchy, alt text
```

**Sample Report:**
```
♿ Accessibility Agent Report
Score: 95/100

✅ Strengths:
  • 0 critical violations
  • Full keyboard navigation
  • Semantic HTML structure
  • Color contrast passes

⚠️ Issues (5):
  • 2 images missing alt text
  • Skip link not present
  • Focus indicators weak (3 components)
  • One heading hierarchy skip (h2 → h4)

🎯 WCAG 2.1 AA: 95% compliant
📋 Legal Risk: Low
```

---

### Internal Validators (Code Quality Perspective)

#### 5. Architecture Guardian Agent

**Persona:** Principal Engineer, enforcing architectural standards

**What it checks:**
- ✓ Component organization (Atomic Design adherence)
- ✓ File structure consistency
- ✓ Naming conventions (PascalCase, kebab-case)
- ✓ Import patterns (no circular deps)
- ✓ Directory structure
- ✓ Code organization
- ✓ Storybook coverage

**Technology Stack:**
```typescript
Node.js: Static code analysis
glob: File pattern matching
Custom scripts: Architecture validation
```

**Sample Report:**
```
🏛️ Architecture Guardian Report
Score: 92/100

✅ Strengths:
  • Atomic Design structure (100%)
  • Consistent naming (98%)
  • 90% Storybook coverage
  • Clear separation of concerns

⚠️ Violations (8):
  • SearchBox.tsx: Missing story
  • Icon.tsx: Multiple components in one file
  • helpers.ts: Wrong directory (/utils → /lib)
  • Card.tsx: Circular dependency detected

📂 Architecture Health: Excellent
🎯 Scalability: Ready for 100+ components
```

---

#### 6. Design System Enforcer Agent

**Persona:** Design Systems Lead, ensuring token usage and consistency

**What it checks:**
- ✓ Token usage (no magic numbers)
- ✓ Component variants match Figma
- ✓ Design system adherence
- ✓ Hardcoded values
- ✓ Import consistency
- ✓ Style patterns

**Technology Stack:**
```typescript
Static analysis: Find magic numbers
AST parsing: Check token imports
Chromatic: Visual consistency
Figma API: Compare with design source
```

**Sample Report:**
```
🎨 Design System Enforcer Report
Score: 88/100

✅ Token Usage:
  • 85% components use tokens
  • 0 hardcoded colors
  • Spacing tokens consistent

⚠️ Violations (12):
  • Button.tsx:23 - "16px" (use spacing.md)
  • Card.tsx:45 - "#f3f4f6" (use colors.gray-100)
  • Input.tsx - Not importing tokens
  • Navigation.tsx:12 - "12px" (use spacing.sm)

🎯 Design System Adherence: Good
📊 Token Coverage: 85%
```

---

#### 7. Performance Watchdog Agent

**Persona:** Performance engineer, Core Web Vitals obsessed

**What it checks:**
- ✓ Bundle size budgets
- ✓ Lighthouse scores (all categories)
- ✓ Core Web Vitals (LCP, FID, CLS)
- ✓ Resource optimization
- ✓ Image optimization
- ✓ JavaScript execution time
- ✓ Render blocking resources

**Technology Stack:**
```typescript
Lighthouse CI: Performance metrics
Bundle analyzer: Size tracking
Playwright: Real user monitoring
```

**Sample Report:**
```
⚡ Performance Watchdog Report
Score: 93/100

✅ Core Web Vitals:
  • LCP: 1.8s (target: <2.5s) ✓
  • FID: 45ms (target: <100ms) ✓
  • CLS: 0.05 (target: <0.1) ✓
  • Performance: 95/100

⚠️ Warnings:
  • Bundle: 287KB (5% over 250KB budget)
  • 3 unoptimized images (120KB saved)
  • Lazy loading opportunity (case studies)
  • Font loading not optimized

📊 Lighthouse Scores:
  Performance: 95/100
  Accessibility: 98/100
  Best Practices: 92/100
  SEO: 100/100
```

---

#### 8. Design-Code Parity Agent

**Persona:** Design Ops engineer, maintaining Figma-code sync

**What it checks:**
- ✓ Figma components → code components
- ✓ Token coverage (100% extraction)
- ✓ Visual similarity (Chromatic)
- ✓ Component variant completeness
- ✓ Last sync timestamp
- ✓ Drift detection

**Technology Stack:**
```typescript
Figma API: Component inventory
Code analysis: Component extraction
Chromatic: Visual diff
Custom scripts: Parity calculation
```

**Sample Report:**
```
🎯 Design-Code Parity Report
Score: 87/100

✅ Token Sync:
  • Coverage: 100%
  • All Figma variables extracted
  • No drift detected
  • Last sync: 2 hours ago

⚠️ Component Parity: 85%
  • Implemented: 17/20
  • Missing: SearchBox, Dropdown, Tooltip
  • Extra: PasswordPrompt (not in Figma)
  • Outdated: Button (Figma updated yesterday)

📊 Visual Accuracy: 98%
  • Chromatic similarity excellent
  • 2 components need pixel adjustment

🔄 Sync Status: Good
```

---

## 🛠️ Implementation Guide

### Phase 1: Agent Framework (Week 1)

#### Step 1.1: Base Agent System

**File: `scripts/agents/base-agent.ts`**

```typescript
/**
 * Base Agent System
 *
 * Provides framework for creating portfolio validation agents
 */

export type AgentType = 'external' | 'internal';

export interface Violation {
  severity: 'critical' | 'warning' | 'info';
  location: string;
  message: string;
  suggestion?: string;
}

export interface AgentReport {
  agentName: string;
  agentType: AgentType;
  score: number; // 0-100
  strengths: string[];
  improvements: string[];
  violations: Violation[];
  metadata: {
    timestamp: Date;
    duration: number; // ms
    version: string;
  };
}

export abstract class Agent {
  abstract name: string;
  abstract type: AgentType;
  abstract description: string;

  /**
   * Run the agent and generate report
   */
  abstract run(): Promise<AgentReport>;

  /**
   * Calculate score based on violations and checks
   */
  protected calculateScore(
    totalChecks: number,
    passedChecks: number,
    violations: Violation[]
  ): number {
    // Start with pass rate
    let score = (passedChecks / totalChecks) * 100;

    // Deduct for violations
    violations.forEach((v) => {
      if (v.severity === 'critical') score -= 10;
      if (v.severity === 'warning') score -= 3;
      if (v.severity === 'info') score -= 1;
    });

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  /**
   * Format report for console output
   */
  protected formatReport(report: AgentReport): string {
    const icon = report.agentType === 'external' ? '👤' : '🔧';
    const scoreColor =
      report.score >= 90 ? '🟢' :
      report.score >= 70 ? '🟡' : '🔴';

    return `
${icon} ${report.agentName} Report
${'='.repeat(50)}

Score: ${scoreColor} ${report.score}/100

✅ Strengths (${report.strengths.length}):
${report.strengths.map(s => `  • ${s}`).join('\n')}

⚠️  Improvements (${report.improvements.length}):
${report.improvements.map(i => `  • ${i}`).join('\n')}

${report.violations.length > 0 ? `
❌ Violations (${report.violations.length}):
${report.violations.map(v => `  ${v.severity.toUpperCase()}: ${v.message}`).join('\n')}
` : ''}

Duration: ${report.metadata.duration}ms
Timestamp: ${report.metadata.timestamp.toISOString()}
`;
  }
}

/**
 * Agent Runner - Orchestrates all agents
 */
export class AgentRunner {
  private agents: Agent[] = [];

  register(agent: Agent): void {
    this.agents.push(agent);
  }

  async runAll(): Promise<AgentReport[]> {
    console.log(`🚀 Running ${this.agents.length} agents...\n`);

    const reports: AgentReport[] = [];

    for (const agent of this.agents) {
      console.log(`Running ${agent.name}...`);
      const startTime = Date.now();

      try {
        const report = await agent.run();
        const duration = Date.now() - startTime;
        report.metadata.duration = duration;

        reports.push(report);
        console.log(`✓ ${agent.name} complete (${duration}ms)\n`);
      } catch (error) {
        console.error(`✗ ${agent.name} failed:`, error);
      }
    }

    return reports;
  }

  async generateSummary(reports: AgentReport[]): Promise<string> {
    const totalScore = reports.reduce((sum, r) => sum + r.score, 0);
    const avgScore = Math.round(totalScore / reports.length);

    const externalReports = reports.filter(r => r.type === 'external');
    const internalReports = reports.filter(r => r.type === 'internal');

    const externalAvg = Math.round(
      externalReports.reduce((sum, r) => sum + r.score, 0) / externalReports.length
    );
    const internalAvg = Math.round(
      internalReports.reduce((sum, r) => sum + r.score, 0) / internalReports.length
    );

    return `
╔════════════════════════════════════════════════╗
║       PORTFOLIO QUALITY DASHBOARD              ║
╚════════════════════════════════════════════════╝

Overall Score: ${avgScore}/100

┌─ External Validators (User Experience) ────────┐
│ Average Score: ${externalAvg}/100                     │
│                                                 │
│ ${externalReports.map(r => `${r.agentName}: ${r.score}/100`).join('\n│ ')}
└─────────────────────────────────────────────────┘

┌─ Internal Validators (Code Quality) ───────────┐
│ Average Score: ${internalAvg}/100                     │
│                                                 │
│ ${internalReports.map(r => `${r.agentName}: ${r.score}/100`).join('\n│ ')}
└─────────────────────────────────────────────────┘

Generated: ${new Date().toISOString()}
`;
  }
}
```

#### Step 1.2: Implement First Agent (Recruiter)

**File: `scripts/agents/recruiter-agent.ts`**

```typescript
import { chromium } from 'playwright';
import Anthropic from '@anthropic-ai/sdk';
import { Agent, AgentReport, Violation } from './base-agent';

export class RecruiterAgent extends Agent {
  name = 'Recruiter/Hiring Manager';
  type = 'external' as const;
  description = 'Evaluates portfolio from tech recruiter perspective';

  private anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  async run(): Promise<AgentReport> {
    const startTime = Date.now();
    const violations: Violation[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Launch browser
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
      // Navigate to portfolio
      await page.goto('http://localhost:3000');

      // Check for essential elements
      const hasContactInfo = await this.checkContactInfo(page);
      const hasMetrics = await this.checkForMetrics(page);
      const hasCaseStudies = await this.checkCaseStudies(page);

      // Extract case study content
      await page.goto('http://localhost:3000/ocean');
      const caseStudyContent = await page.locator('article').textContent();

      // Analyze with Claude
      const claudeAnalysis = await this.analyzeWithClaude(caseStudyContent || '');

      // Compile violations
      if (!hasContactInfo) {
        violations.push({
          severity: 'critical',
          location: 'Homepage',
          message: 'Missing contact information',
          suggestion: 'Add email, LinkedIn, or contact form',
        });
      }

      if (!hasMetrics) {
        violations.push({
          severity: 'warning',
          location: 'Case studies',
          message: 'Limited quantified outcomes',
          suggestion: 'Add more metrics (%, $, time saved, etc.)',
        });
      }

      // Add Claude insights
      strengths.push(...claudeAnalysis.strengths);
      improvements.push(...claudeAnalysis.improvements);

      // Calculate score
      const totalChecks = 10;
      const passedChecks =
        (hasContactInfo ? 2 : 0) +
        (hasMetrics ? 3 : 0) +
        (hasCaseStudies ? 3 : 0) +
        (claudeAnalysis.score / 10); // Normalize Claude score

      const score = this.calculateScore(totalChecks, passedChecks, violations);

      return {
        agentName: this.name,
        agentType: this.type,
        score,
        strengths,
        improvements,
        violations,
        metadata: {
          timestamp: new Date(),
          duration: Date.now() - startTime,
          version: '1.0.0',
        },
      };
    } finally {
      await browser.close();
    }
  }

  private async checkContactInfo(page: any): Promise<boolean> {
    const hasEmail = await page.getByText(/email|contact/i).count() > 0;
    const hasLinkedIn = await page.getByText(/linkedin/i).count() > 0;
    return hasEmail || hasLinkedIn;
  }

  private async checkForMetrics(page: any): Promise<boolean> {
    // Look for percentage, multipliers, or dollar amounts
    const metricsCount = await page.getByText(/\d+(%|x|\$|K|M)/).count();
    return metricsCount >= 3;
  }

  private async checkCaseStudies(page: any): Promise<boolean> {
    const caseStudyLinks = await page.getByRole('link', { name: /ocean|sainapsis|aquads/i }).count();
    return caseStudyLinks >= 2;
  }

  private async analyzeWithClaude(content: string): Promise<{
    score: number;
    strengths: string[];
    improvements: string[];
  }> {
    const message = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `You are a senior tech recruiter at a FAANG company reviewing a design portfolio case study.

Evaluate this case study for:
1. Structure (problem, solution, results)
2. Impact (quantified outcomes)
3. Leadership signals
4. Red flags

Case study:
${content.slice(0, 4000)}

Respond in JSON format:
{
  "score": 0-100,
  "strengths": ["strength 1", "strength 2", ...],
  "improvements": ["improvement 1", "improvement 2", ...]
}`,
      }],
    });

    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    try {
      const parsed = JSON.parse(responseText);
      return parsed;
    } catch {
      return {
        score: 70,
        strengths: ['Case study present'],
        improvements: ['Could not parse Claude response'],
      };
    }
  }
}
```

#### Step 1.3: Create Runner Script

**File: `scripts/run-agents.ts`**

```typescript
#!/usr/bin/env node

import { AgentRunner } from './agents/base-agent';
import { RecruiterAgent } from './agents/recruiter-agent';
// Import other agents as implemented

async function main() {
  const runner = new AgentRunner();

  // Register agents
  runner.register(new RecruiterAgent());
  // runner.register(new DesignDirectorAgent());
  // runner.register(new ClientAgent());
  // etc...

  // Run all agents
  const reports = await runner.runAll();

  // Generate summary
  const summary = await runner.generateSummary(reports);
  console.log(summary);

  // Save reports
  const fs = require('fs');
  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync(
    'reports/agent-reports.json',
    JSON.stringify(reports, null, 2)
  );

  console.log('\n✓ Reports saved to reports/agent-reports.json');
}

main().catch(console.error);
```

**Add to package.json:**

```json
{
  "scripts": {
    "agents:run": "tsx scripts/run-agents.ts",
    "agents:recruiter": "tsx scripts/agents/recruiter-agent.ts"
  }
}
```

---

## 🔄 CI/CD Pipelines

### Pipeline 1: Pull Request Agent Review

**File: `.github/workflows/agent-review.yml`**

```yaml
name: Agent Review

on:
  pull_request:
    paths:
      - 'src/**'
      - 'content/**'
      - 'public/**'

jobs:
  agent-review:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Start dev server
        run: |
          npm run start &
          npx wait-on http://localhost:3000

      - name: Run agents
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: npm run agents:run

      - name: Upload reports
        uses: actions/upload-artifact@v4
        with:
          name: agent-reports
          path: reports/

      - name: Comment on PR
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

            const scoreEmoji = avgScore >= 90 ? '🟢' : avgScore >= 70 ? '🟡' : '🔴';

            const comment = `
## ${scoreEmoji} Agent Review Results

**Overall Score: ${avgScore}/100**

### External Validators (User Experience)
${reports.filter(r => r.agentType === 'external').map(r =>
  `- **${r.agentName}**: ${r.score}/100`
).join('\n')}

### Internal Validators (Code Quality)
${reports.filter(r => r.agentType === 'internal').map(r =>
  `- **${r.agentName}**: ${r.score}/100`
).join('\n')}

<details>
<summary>📊 Detailed Reports</summary>

${reports.map(r => `
### ${r.agentName}

**Score:** ${r.score}/100

**Strengths:**
${r.strengths.map(s => `- ${s}`).join('\n')}

**Improvements:**
${r.improvements.map(i => `- ${i}`).join('\n')}

${r.violations.length > 0 ? `**Violations:**
${r.violations.map(v => `- ${v.severity.toUpperCase()}: ${v.message}`).join('\n')}` : ''}
`).join('\n---\n')}

</details>

[View full reports](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})
            `;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

### Pipeline 2: Weekly Portfolio Health Check

**File: `.github/workflows/weekly-health.yml`**

```yaml
name: Weekly Portfolio Health

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
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build and start
        run: |
          npm run build
          npm run start &
          npx wait-on http://localhost:3000

      - name: Run all agents
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
          FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
        run: npm run agents:run

      - name: Generate trend report
        run: node scripts/generate-trend-report.js

      - name: Upload reports
        uses: actions/upload-artifact@v4
        with:
          name: weekly-health-report
          path: reports/

      - name: Send notification
        if: always()
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 465
          username: ${{ secrets.MAIL_USERNAME }}
          password: ${{ secrets.MAIL_PASSWORD }}
          subject: Weekly Portfolio Health Report
          body: file://reports/summary.txt
          to: your-email@example.com
          from: Portfolio Bot
          attachments: reports/agent-reports.pdf
```

### Pipeline 3: Pre-Deploy Validation

**File: `.github/workflows/pre-deploy.yml`**

```yaml
name: Pre-Deploy Validation

on:
  push:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build production
        run: npm run build

      - name: Start production server
        run: |
          npm run start &
          npx wait-on http://localhost:3000

      - name: Run critical agents only
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          npm run agents:accessibility
          npm run agents:performance
          npm run agents:architecture

      - name: Fail if score below threshold
        run: |
          node -e "
            const reports = require('./reports/agent-reports.json');
            const scores = reports.map(r => r.score);
            const avgScore = scores.reduce((a,b) => a+b) / scores.length;
            if (avgScore < 85) {
              console.error('❌ Portfolio quality below threshold');
              process.exit(1);
            }
            console.log('✓ Quality check passed');
          "

      - name: Deploy to Vercel
        if: success()
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📊 Dashboard & Reporting

### HTML Dashboard Generator

**File: `scripts/generate-dashboard.ts`**

```typescript
import fs from 'fs';
import { AgentReport } from './agents/base-agent';

export function generateDashboard(reports: AgentReport[]): string {
  const avgScore = Math.round(
    reports.reduce((sum, r) => sum + r.score, 0) / reports.length
  );

  const externalReports = reports.filter(r => r.agentType === 'external');
  const internalReports = reports.filter(r => r.agentType === 'internal');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Quality Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      background: #f9fafb;
      padding: 2rem;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 2rem; margin-bottom: 2rem; color: #111827; }
    .overall-score {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      text-align: center;
      margin-bottom: 2rem;
    }
    .score {
      font-size: 4rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .score.high { color: #10b981; }
    .score.medium { color: #f59e0b; }
    .score.low { color: #ef4444; }
    .section { margin-bottom: 2rem; }
    .section h2 { margin-bottom: 1rem; color: #374151; }
    .agent-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }
    .agent-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .agent-card h3 { margin-bottom: 1rem; color: #111827; }
    .agent-score {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .strengths, .improvements { margin-bottom: 1rem; }
    .strengths h4, .improvements h4 {
      font-size: 0.875rem;
      text-transform: uppercase;
      color: #6b7280;
      margin-bottom: 0.5rem;
    }
    .strengths ul, .improvements ul {
      list-style: none;
      font-size: 0.875rem;
    }
    .strengths li::before { content: '✓ '; color: #10b981; }
    .improvements li::before { content: '→ '; color: #f59e0b; }
    .chart-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 Portfolio Quality Dashboard</h1>

    <div class="overall-score">
      <div class="score ${getScoreClass(avgScore)}">${avgScore}/100</div>
      <p style="color: #6b7280; font-size: 1.125rem;">Overall Portfolio Score</p>
      <p style="color: #9ca3af; font-size: 0.875rem; margin-top: 0.5rem;">
        Generated ${new Date().toLocaleString()}
      </p>
    </div>

    <div class="chart-container">
      <canvas id="scoresChart"></canvas>
    </div>

    <div class="section">
      <h2>👤 External Validators (User Experience)</h2>
      <div class="agent-grid">
        ${externalReports.map(renderAgentCard).join('')}
      </div>
    </div>

    <div class="section">
      <h2>🔧 Internal Validators (Code Quality)</h2>
      <div class="agent-grid">
        ${internalReports.map(renderAgentCard).join('')}
      </div>
    </div>
  </div>

  <script>
    const ctx = document.getElementById('scoresChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ${JSON.stringify(reports.map(r => r.agentName))},
        datasets: [{
          label: 'Score',
          data: ${JSON.stringify(reports.map(r => r.score))},
          backgroundColor: ${JSON.stringify(reports.map(r =>
            r.score >= 90 ? '#10b981' : r.score >= 70 ? '#f59e0b' : '#ef4444'
          ))},
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
  </script>
</body>
</html>
  `;

  function renderAgentCard(report: AgentReport): string {
    const scoreClass =
      report.score >= 90 ? 'high' :
      report.score >= 70 ? 'medium' : 'low';

    return `
      <div class="agent-card">
        <h3>${report.agentName}</h3>
        <div class="agent-score ${scoreClass}">${report.score}/100</div>

        ${report.strengths.length > 0 ? `
          <div class="strengths">
            <h4>Strengths</h4>
            <ul>
              ${report.strengths.slice(0, 3).map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${report.improvements.length > 0 ? `
          <div class="improvements">
            <h4>Improvements</h4>
            <ul>
              ${report.improvements.slice(0, 3).map(i => `<li>${i}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
  }

  function getScoreClass(score: number): string {
    return score >= 90 ? 'high' : score >= 70 ? 'medium' : 'low';
  }
}

// CLI usage
if (require.main === module) {
  const reports = JSON.parse(
    fs.readFileSync('reports/agent-reports.json', 'utf-8')
  );

  const html = generateDashboard(reports);
  fs.writeFileSync('reports/dashboard.html', html);

  console.log('✓ Dashboard generated at reports/dashboard.html');
}
```

---

## 🔗 Integration with Existing Tools

### Playwright Integration

Agents use Playwright for:
- Content extraction
- User journey simulation
- Accessibility testing
- Visual checks

```typescript
// Example: Client Agent using Playwright
const browser = await chromium.launch();
const page = await browser.newPage();

// Simulate client finding relevant work
await page.goto('/');
await page.getByRole('link', { name: /work/i }).click();
await page.getByText('SaaS').click();

// Check if found relevant case studies
const foundRelevant = await page.getByText(/Ocean|CPaaS/i).isVisible();
```

### Chromatic Integration

Agents use Chromatic for:
- Visual regression detection
- Design-code parity comparison
- Component coverage

```typescript
// Example: Design-Code Parity Agent
const chromaticBuild = await getChromaticLatestBuild();
const visualAccuracy = chromaticBuild.changeCount === 0 ? 100 :
  Math.max(0, 100 - (chromaticBuild.changeCount * 2));
```

### Storybook Integration

Agents check:
- Story coverage
- Component documentation
- Interaction tests

```typescript
// Example: Architecture Guardian checking stories
const components = glob.sync('src/components/**/*.tsx');
const stories = glob.sync('src/components/**/*.stories.tsx');

const coverage = (stories.length / components.length) * 100;
```

---

## 📈 Success Metrics

Track improvement over time:

```
Week 1:  Overall 72/100
Week 2:  Overall 78/100  (+6)
Week 3:  Overall 85/100  (+7)
Week 4:  Overall 91/100  (+6)
```

**Goal:** Achieve 90+ average score across all agents

---

## 🎯 Implementation Timeline

### Week 1: Foundation
- Set up agent framework
- Implement Recruiter Agent
- Create basic CI/CD pipeline

### Week 2: External Agents
- Design Director Agent
- Client Agent
- Accessibility Agent

### Week 3: Internal Agents
- Architecture Guardian
- Design System Enforcer
- Performance Watchdog
- Design-Code Parity

### Week 4: Polish
- HTML dashboard
- Trend tracking
- Alert system
- Documentation

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install @anthropic-ai/sdk playwright axe-core

# Set up environment
echo "ANTHROPIC_API_KEY=your-key" >> .env.local

# Run agents locally
npm run agents:run

# View dashboard
open reports/dashboard.html

# Run in CI (GitHub Actions)
git push  # Triggers agent review on PR
```

---

## ✅ Success Criteria

You'll know the agent system is working when:

- ✓ PRs automatically get agent reviews
- ✓ Quality score visible in dashboard
- ✓ Violations caught before deploy
- ✓ Improvements tracked week-over-week
- ✓ Can showcase systematic quality process to clients

This agent system transforms portfolio quality from subjective to measurable!
