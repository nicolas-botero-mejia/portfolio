# Portfolio Project Context

**Project:** Nicolás Botero - Personal Portfolio Website
**Purpose:** SEO-optimized portfolio showcasing 10+ years of product design leadership
**Launched:** Not yet · **Current:** Pre-launch, in development (see [ROADMAP.md](ROADMAP.md))
**Status:** Live

---

## Communication Preferences

**Required.** These preferences are mandatory.

**Be Direct and Honest (But Still Human):**
- When I propose something wrong or suboptimal, say so directly - but explain why conversationally
- Don't use condescending phrases when you know the better approach, but don't be robotic either
- Don't present multiple options as equally valid when one is clearly superior
- When presenting options, if there's a clear winner, say which one and why
- Challenge my ideas with technical reasoning, not politeness
- Be straightforward about what will/won't work, but keep your personality
- Talk WITH me, not AT me - we're collaborating, not executing commands

**Clarity Over Speed:**
- Before writing or changing code: (1) Propose approach and scope. (2) Wait for my confirmation. (3) Then implement efficiently without being overly terse.
- Don't implement more than what was asked for
- "Clarity Beats Sophistication" - simple, clear plans beat complex solutions
- Balance directness with being conversational

**Component Creation:**
- Before creating ANY component, evaluate: "Is this design system or page-specific?"
- Design System components (reusable UI) → `src/components/ui/` or design system structure
- Page-specific logic → Can be standalone in feature folders
- Never duplicate component structures - maintain single source of truth
- If similar components exist, refactor to use shared design system components
- MDX components should use the SAME UI components as JSX pages

---

## Tech Stack

### Core Framework
- **Next.js 16** - React framework with App Router
- **TypeScript 5** - Type-safe JavaScript
- **React 19** - UI library

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Wrap Balancer** - Better typography

### Content Management
- **MDX** - Markdown with React components
- **gray-matter** - Frontmatter parsing
- **Zod** - Schema validation

### SEO & Features
- **next-seo** - SEO optimization
- **next-sitemap** - Automatic sitemap generation
- **Password Protection** - Server-side case study protection

### Deployment
- **Vercel** - Hosting & CI/CD

---

## Architecture

### Next.js App Router Structure
```
app/
├── page.tsx              # Redirects to /work
├── work/
│   ├── page.tsx          # Work listing page
│   └── [slug]/page.tsx   # Individual work items
├── about/page.tsx        # About page (renders about.mdx)
├── now/page.tsx          # Now page (renders now.mdx)
├── uses/page.tsx         # Uses page (renders uses.mdx)
├── experiments/page.tsx  # Experiments listing
├── reading/page.tsx      # Reading listing
└── writing/page.tsx      # Writing listing
```

### Content Layer
- **Location:** `content/` with organized taxonomy
- **Structure:** Hierarchical folders by content type (work, writing, experiments, reading, pages)
- **Processing:** gray-matter parses frontmatter + MDX content via next-mdx-remote
- **Structured Data:** TypeScript in `src/data/` — sources (reference data), content (editorial), resolvers (lookup logic), derived (routes, navigation). See [src/data/README.md](src/data/README.md)
- **Rendering:** MDX components import and render structured data
- **Architecture:** See [docs/CONTENT_ARCHITECTURE.md](docs/CONTENT_ARCHITECTURE.md)

**Content Taxonomy:**
```
content/
├── work/               # Professional work
│   ├── case-studies/   # Full platform/project stories
│   ├── features/       # Granular product features
│   └── side-projects/  # Personal projects
├── writing/            # Written content
│   ├── posts/          # Long-form articles
│   ├── thoughts/       # Quick takes
│   └── quotes/         # Curated quotes with context
├── experiments/        # Creative explorations
│   ├── design/
│   ├── code/
│   └── prototypes/
├── reading/            # Reading-related
│   ├── books/
│   └── articles/
└── pages/              # Special static pages
```

### Password Protection System
- **Type:** Server-side validation with HTTP-only cookies
- **Hashing:** SHA-256 via Node.js crypto
- **Authentication:** 7-day cookie with XSS/CSRF protection
- **Priority Order:**
  1. Frontmatter `password` field (dev only)
  2. `CASE_STUDY_[SLUG]_PASSWORD` env var
  3. `CASE_STUDY_GLOBAL_PASSWORD` env var
- **Files:**
  - `lib/serverPasswordAuth.ts` - Validation logic
  - `actions/authActions.ts` - Server actions
  - `components/ServerPasswordPrompt.tsx` - UI

---

## Project Structure

### Key Directories

```
portfolio/
├── .claude/agents/              # AI optimization agents
├── app/                         # Next.js App Router pages
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── layout/                  # Header, Footer, Navigation
│   ├── home/                    # Home page sections
│   └── ServerPasswordPrompt.tsx # Password protection UI
├── content/
│   ├── work/
│   │   ├── case-studies/        # MDX case studies (sainapsis, ocean, aquads)
│   │   ├── features/            # Granular features (coming soon)
│   │   └── side-projects/       # Personal projects (coming soon)
│   ├── writing/                 # Posts, thoughts & quotes (coming soon)
│   ├── experiments/             # Design/code experiments (coming soon)
│   ├── reading/                 # Books & articles (coming soon)
│   └── pages/                   # Special static pages (coming soon)
├── public/
│   └── images/
│       ├── work/                # Work-related images
│       ├── experiments/         # Experiment images
│       └── writing/             # Writing images
├── data/
│   ├── sources/                 # Raw reference data (companies, contentTypes, etc.)
│   ├── content/                 # Editorial (profile, experience, workflow)
│   ├── resolvers/               # Lookup logic (getCompany, getContentType, etc.)
│   ├── derived/                 # Computed (routes, navigation)
│   └── index.ts                 # Public API
├── lib/
│   ├── contentLoader.ts         # Content utilities
│   ├── seo.ts                   # SEO utilities
│   ├── serverPasswordAuth.ts    # Password validation
│   └── mdx.ts                   # MDX utilities
├── config/
│   └── passwords.ts             # Auth cookie config
├── actions/
│   └── authActions.ts           # Server actions for auth
├── scripts/
│   └── hashPassword.js          # Password hashing CLI
└── docs/                        # Detailed documentation
```

### File Naming Conventions
- **Files:** `kebab-case.tsx` (e.g., `server-password-prompt.tsx`)
- **Components:** `PascalCase.tsx` (e.g., `ServerPasswordPrompt.tsx`)
- **MDX:** `lowercase.mdx` or `kebab-case.mdx` (e.g., `sainapsis.mdx`, `my-project.mdx`)
- **Folders:** All lowercase, no spaces (e.g., `case-studies/`, not `Case-Studies/`)
- **Images:** `kebab-case.png` or descriptive names (e.g., `handoff-timeline.png`)

**Content Naming Rules:**
- Use lowercase for all MDX filenames
- Use hyphens for multi-word names (not underscores)
- No prefixes needed - folder structure provides namespace
- Descriptive names that reflect content

---

## Development Standards

### Code Style
- **TypeScript:** Strict mode enabled, explicit return types preferred
- **React:** Functional components with hooks, Server Components by default
- **Tailwind:** Utility-first, use design tokens from `tailwind.config.ts`
- **Imports:** Absolute imports with `@/` prefix (e.g., `import { X } from '@/lib/utils'`)

### Commit Convention
- Use conventional commit style: `type: description`
- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- Examples:
  - `feat: add password protection to case studies`
  - `docs: update README with password setup guide`
  - `fix: resolve cookie validation in Safari`
- Include co-author when applicable:
  ```
  🤖 Generated with Claude Code

  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

### Documentation Approach
- **Progressive Disclosure:** Brief in README → detailed in docs/
- **No Duplication:** Link to other docs instead of copying content
- **Structure:**
  - README.md - Overview + quick start
  - README_*.md - Quick reference guides
  - docs/*.md - Comprehensive guides with troubleshooting

### Git Workflow
- **Branch:** Work directly on `main` for personal project
- **PR Files:** PR_*.md files are local only (in `.gitignore`)
- **Never Commit:**
  - `.env*` files (except `.env.example`)
  - `PR_*.md` files
  - `node_modules/`, `.next/`, build artifacts

---

## Features

### 1. MDX Case Studies

**Frontmatter Schema (Required Fields):**
```yaml
---
title: string                    # Case study title
description: string              # Short description (150-160 chars)
company: string                  # Company name
role: string                     # Your role(s)
year: string                     # Year or range (e.g., "2024-25")
duration: string                 # Project duration (e.g., "10 months")
type: string                     # Project type
featured: boolean                # Show on homepage?
heroImage: string                # Path to hero image
tags: string[]                   # Tags for categorization
locked?: boolean                 # Password protect? (optional, default: false)
password?: string                # Dev-only password (optional, DO NOT use in prod)
seo:
  metaTitle: string             # SEO title (50-60 chars)
  metaDescription: string       # SEO description (150-160 chars)
  keywords: string[]            # Target keywords
---
```

**Example:**
```yaml
---
title: "Sainapsis — Transforming Chaos into a 16x Productivity System"
description: "10-month design system transformation achieving 16x productivity increase."
company: "Sainapsis"
role: "UX Advisor · System Architect"
year: "2024-25"
duration: "10 months"
type: "Design System & Process Transformation"
featured: true
heroImage: "/images/case-studies/sainapsis/hero.png"
tags: ["design systems", "process transformation", "mentorship"]
locked: false
seo:
  metaTitle: "Sainapsis Case Study - 16x Productivity | Nicolás Botero"
  metaDescription: "How I transformed a chaotic design process into a 16x productivity system."
  keywords: ["design systems", "productivity transformation"]
---
```

### 2. Password Protection

**Setup:**
```bash
# 1. Generate hash
npm run hash-password "yourpassword"

# 2. Add to .env.local (NEVER commit this file)
CASE_STUDY_GLOBAL_PASSWORD=hash-here
# OR per-case-study:
CASE_STUDY_OCEAN_PASSWORD=hash-here

# 3. Lock case study in frontmatter
locked: true
```

**Rules:**
- ✅ **DO:** Use hashed passwords in `.env.local`
- ✅ **DO:** Set `locked: true` in frontmatter
- ❌ **DON'T:** Put passwords in frontmatter (except dev testing)
- ❌ **DON'T:** Commit `.env*` files
- ❌ **DON'T:** Use password protection for compliance requirements

**Documentation:**
- Quick reference: [README_PASSWORD_PROTECTION.md](README_PASSWORD_PROTECTION.md)
- Full guide: [docs/PASSWORD_PROTECTION.md](docs/PASSWORD_PROTECTION.md)

### 3. AI Agents

**Location:** `.claude/agents/*.md`

**Available Agents:**
1. **seo_optimizer_agent.md** - SEO analysis and recommendations
2. **content_auditor_agent.md** - Content quality and consistency checks
3. **accessibility_checker_agent.md** - WCAG 2.1 AA compliance validation
4. **performance_optimizer_agent.md** - Performance and optimization suggestions
5. **case_study_migrator_agent.md** - Markdown to MDX migration

**Usage:** Invoke via Task tool when optimizing specific aspects of the portfolio.

---

## Common Workflows

### Run Commands (User Shortcuts)

When the user says:

- **"Run Figma"** / **"Test Figma"** (or "run figma" / "test figma") → Run the **full pipeline**: (1) `./scripts/mcp.sh start figma` (in background), (2) Open Figma in that Chrome via Chrome DevTools MCP (navigate to figma.com or a design file). Do not ask for confirmation; execute in that order.
- **"Run app"** / **"Test app"** / **"Run Chrome"** / **"Test Chrome"** (or "run app", "test app", "run chrome", "test chrome") → Run `./scripts/mcp.sh start app` (in background). Starts dev server + Chrome opening the app at http://localhost:3000; do not open Figma.
- **"Run application"** / **"Run app"** → Run **only** `npm run dev` (in background).
- **"Test connection"** (or "test connection") → Test Chrome DevTools MCP connection (e.g. list_pages) and report whether Chrome is connected and how many tabs/pages.

When the AI runs `./scripts/mcp.sh stop app` or `stop figma`, it must use full permissions (e.g. `required_permissions: ["all"]`) so the script can send kill signals to Chrome and the dev server; otherwise the sandbox blocks kill and processes keep running.

Interpret these phrases literally; no need to re-ask. If MCP tools are unavailable when opening Figma, still run the script and dev server and tell the user Figma could not be opened from here.

**From the terminal (without saying "run figma" to the AI):**
- **Start Figma (full pipeline):** `./scripts/mcp.sh start figma`. Chrome + dev server + Figma; PIDs in `.mcp-run.pids`.
- **Stop Figma:** `./scripts/mcp.sh stop figma`. Kills Chrome and dev server from last `start figma`.
- **Start app:** `./scripts/mcp.sh start app`. Dev server + Chrome opening http://localhost:3000.
- **Stop app:** `./scripts/mcp.sh stop app`. Stops Chrome and dev server from last `start app`.

### Adding a New Case Study

1. Create MDX file in `content/case-studies/[slug].mdx`
2. Add required frontmatter (see schema above)
3. Write content using MDX components
4. Add images to `public/images/case-studies/[slug]/`
5. Test locally: `npm run dev`
6. Verify password protection if `locked: true`
7. Commit and push

### Password Protecting a Case Study

1. Generate password hash:
   ```bash
   npm run hash-password "clientpassword"
   ```
2. Add hash to `.env.local`:
   ```env
   CASE_STUDY_[SLUG]_PASSWORD=hash-here
   # Example: CASE_STUDY_OCEAN_PASSWORD=abc123...
   ```
3. Set `locked: true` in case study frontmatter
4. Test authentication flow
5. Add environment variable to Vercel dashboard for production

### Creating PR Title & Description

**IMPORTANT WORKFLOW:**

When asked to provide a PR title and description:

1. **Create a file called `PR_INFO.md` at the project root**
2. Format it as follows:
   ```markdown
   # PR Title
   [Your concise PR title here]

   # PR Description
   [Your detailed PR description here with markdown formatting]

   ## Changes
   - List of changes
   - Another change

   ## Testing
   - How to test these changes
   ```
3. This file is already in `.gitignore` (local only, never committed)
4. User can easily copy formatted content from the file without browser parsing issues

**Why this approach?**
- Browser parses markdown in chat, breaking formatting
- File preserves exact markdown structure
- Easy to copy/paste into GitHub PR form
- Already gitignored, won't be accidentally committed

### Updating Documentation

**Follow Progressive Disclosure:**
1. **README.md** - Brief overview + links
2. **README_*.md** - Quick reference guides
3. **docs/*.md** - Comprehensive documentation

**Rules:**
- Update once, link everywhere
- Don't duplicate content across files
- Keep README.md concise and scannable

### Running Tests & Building

```bash
# Development
npm run dev                      # Start dev server

# Password management
npm run hash-password "pass"     # Generate password hash

# Production
npm run build                    # Build for production
npm start                        # Preview production build
npm run lint                     # Lint codebase
```

### Deployment (Vercel)

1. Push to `main` branch → auto-deploys to production
2. Set environment variables in Vercel dashboard:
   ```
   NEXT_PUBLIC_SITE_URL=https://nicolas-botero-mejia.com
   CASE_STUDY_GLOBAL_PASSWORD=hash-here
   ```
3. Verify deployment at live URL
4. Test password protection in production

---

## Quality Standards

### Accessibility
- **Target:** WCAG 2.1 AA compliance
- **Requirements:**
  - Color contrast ratio ≥ 4.5:1 for text
  - Alt text for all images
  - Keyboard navigation support
  - Focus states visible
  - Screen reader compatible

### SEO
- **Target:** Lighthouse SEO score 100
- **Requirements:**
  - Unique meta title (50-60 chars) per page
  - Unique meta description (150-160 chars) per page
  - Semantic HTML structure
  - Schema.org markup (Person, CreativeWork)
  - Sitemap.xml + robots.txt
  - Open Graph + Twitter Card tags

### Performance
- **Target:** Lighthouse Performance 95+
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1
- **Other Metrics:**
  - First Contentful Paint: <1s
  - Time to Interactive: <3s
  - Total Bundle Size: <200KB (gzipped)

### Code Quality
- **TypeScript:** No `any` types, strict mode
- **Testing:** Test password protection flows manually
- **Lint:** Run `npm run lint` before committing
- **Build:** Verify `npm run build` succeeds

---

## Project Rules

### Content
- **No emojis** in code/commits/docs unless explicitly requested by user
- **Professional tone** in all user-facing content
- **Quantified impact** in case studies (e.g., "16x productivity", "300M+ messages/month")

### Security
- **Never expose passwords** in code or frontmatter (use `.env.local`)
- **Always use HTTPS** in production
- **HTTP-only cookies** for authentication
- **Server-side validation** for password checks

### File Management
- **Never commit:**
  - `.env*` files (except `.env.example`)
  - `PR_*.md` files (local drafts only)
  - `node_modules/`, `.next/`, build artifacts
  - Sensitive client information

### Documentation
- **Link, don't duplicate** - Reference other docs instead of copying
- **Keep README.md brief** - Overview only, details in docs/
- **Update all affected docs** when features change
- **Test all code examples** before documenting

---

## Links to Documentation

### Core Documentation
- [README.md](README.md) - Project overview and quick start
- [ROADMAP.md](ROADMAP.md) - Development timeline and phases
- [.env.example](.env.example) - Environment variable examples

### Feature Documentation
- [README_PASSWORD_PROTECTION.md](README_PASSWORD_PROTECTION.md) - Password setup quick reference
- [docs/PASSWORD_PROTECTION.md](docs/PASSWORD_PROTECTION.md) - Complete password protection guide
- [docs/FIGMA_LEARNINGS.md](docs/FIGMA_LEARNINGS.md) - Figma plugin API learnings; start with "When Starting Figma Tasks" and "Token flow"; reference for tokens, components, and community gotchas
- [docs/FIGMA_INTEGRATION.md](docs/FIGMA_INTEGRATION.md) - Legacy/alternative: Figma-as-source REST flow; current project uses code-first + Plugin API (see FIGMA_LEARNINGS)

### External Resources
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDX Docs](https://mdxjs.com/)
- [Vercel Deployment](https://vercel.com/docs)

---

## Quick Reference

### Key Commands
```bash
npm run dev                      # Start development server
npm run build                    # Build for production
npm run hash-password "pass"     # Generate password hash
npm run lint                     # Lint codebase
./scripts/mcp.sh start figma     # Full pipeline: Chrome + Figma + dev server
./scripts/mcp.sh stop figma      # Stop Chrome + dev server
./scripts/mcp.sh start app       # Dev server + Chrome at localhost:3000
./scripts/mcp.sh stop app        # Stop Chrome + dev server
```

### Key Files
- `app/page.tsx` - Home page
- `app/work/[slug]/page.tsx` - Case study template
- `content/work/case-studies/*.mdx` - Case study content
- `data/index.ts` - Data layer public API (sources, resolvers, derived)
- `lib/serverPasswordAuth.ts` - Password validation
- `.env.local` - Local environment variables (NOT committed)

### Key Directories
- `.claude/agents/` - AI optimization agents
- `data/` - Reference data, editorial content, lookup logic (see data/README.md)
- `content/work/case-studies/` - MDX case studies
- `public/images/work/` - Case study images
- `docs/` - Detailed documentation

---

**Last Updated:** February 12, 2026
**Maintained by:** Nicolás Botero + Claude Code
