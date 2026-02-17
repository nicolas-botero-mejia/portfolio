# Portfolio Project Context

**Project:** Nicolas Botero - Personal Portfolio Website
**Purpose:** SEO-optimized portfolio showcasing 10+ years of product design leadership
**Status:** Live (in active development - see [ROADMAP.md](ROADMAP.md))

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
- Design System components (reusable UI) → `src/components/ui/`
- Page-specific logic → standalone in feature folders
- Never duplicate component structures - maintain single source of truth
- If similar components exist, refactor to use shared design system components
- MDX components should use the SAME UI components as JSX pages

**Component Usage:**
- Always use existing UI components (`src/components/ui/`) over raw HTML elements
- Use `<Button>` instead of `<button>`, `<Link>` instead of `<a>`, `<Badge>` instead of `<span>` for labels, etc.
- Raw HTML is only acceptable when an existing component genuinely doesn't fit (e.g., Radix `asChild` primitives, custom form controls like toggle switches)
- When a raw element is needed, leave a brief comment explaining why

---

## Design System

### Token Pipeline

Single source of truth for all design values. No manual CSS duplication.

```
src/data/sources/primitiveTokens.ts   (raw palette & scales)
src/data/sources/semanticTokens.ts    (role-based mappings, light/dark themes)
         ↓
npm run tokens:generate
         ↓
src/app/tokens.generated.css          (auto-generated, do NOT edit)
         ↓
src/app/globals.css imports it → Tailwind @theme → utilities
```

Edit tokens in `primitiveTokens.ts` or `semanticTokens.ts`, then run `npm run tokens:generate`. Tailwind resolves utilities to CSS variables automatically.

### Semantic Tokens (Colors)

Role-based — express meaning, not raw values. Always use these for color decisions.

| Role | Example utilities |
|------|-------------------|
| background | `bg-background-surface`, `bg-background-subtle`, `bg-background-muted` |
| content | `text-content-primary`, `text-content-secondary`, `text-content-muted`, `text-content-inverted` |
| border | `border-border-default`, `border-border-subtle`, `border-border-strong` |
| action | `bg-action-primary-bg`, `text-action-primary-text`, `hover:bg-action-primary-hover` |
| status | `bg-status-success-bg`, `text-status-success-text`, `border-status-success-border` |

Light/dark themes defined in `semanticTokens.ts`. Both map primitives to the same role structure.

### Primitive Scale (Layout & Typography)

Scale-based — use standard Tailwind utilities that resolve to our theme values.

| Category | Examples |
|----------|----------|
| spacing | `px-2.5`, `py-4`, `gap-6`, `p-8` (4px base scale) |
| fontSize | `text-xs` (12), `text-sm` (14), `text-base` (16), `text-lg` (18), up to `text-6xl` (60) |
| fontWeight | `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700) |
| radii | `rounded-sm` (4), `rounded-md` (6), `rounded-lg` (8), `rounded-xl` (12) |
| fontFamily | `font-sans` (system stack), `font-mono` (monospace) |

### Component Style Pattern

Every UI component follows this structure:

```tsx
// 1. Layout & typography — primitive scale
const LAYOUT = 'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium';

// 2. Semantic colors — role-based variants
const variantStyles: Record<Variant, string> = {
  default: 'bg-background-subtle text-content-secondary border-border-default',
  success: 'bg-status-success-bg text-status-success-text border-status-success-border',
};

// 3. Compose: layout + semantic + className override
className={`${LAYOUT} ${variantStyles[variant]} ${className}`}
```

### Component Inventory

All in `src/components/ui/`. Full details, token wiring, and expansion rules: [docs/COMPONENTS.md](docs/COMPONENTS.md)

| Component | Purpose |
|-----------|---------|
| Badge | Labels, tags, status pills (default/success/warning/neutral) |
| Button | Primary actions, CTAs (primary/secondary/ghost) |
| Card + CardHeader/Content/Description/Image/ListItem/Meta/Title | Content containers |
| Link | Styled internal/external links (default/muted/ghost) |
| Breadcrumb | Navigation trail (Work > Project) |
| Divider | Section separation (horizontal/vertical, optional label) |
| EmptyState | No content / no results placeholder |
| PageHeader | Section/page title + description (default/serif) |
| PageLayout | Standard page wrapper |
| ScrollPrompt | Scroll-for-more affordance |
| ContentNavigation | Prev/next links |
| Typography | H1-H4, Lead, Body, Caption for MDX |
| NavLink | Navigation link with active/inactive states |
| Skeleton | Loading placeholders (text, image variants) |
| MDXRenderer | Renders MDX content with prose styling |
| Dialog | Modal (Radix) |
| Tabs | Tabbed content (Radix) |
| Tooltip | Hover tooltips (Radix) |
| ScrollArea | Scrollable regions (Radix) |

Layout components in `src/components/layout/`: SplitLayout (sidebar + main content area), TopNav (sticky top-right navigation with scroll-direction show/hide).
MDX renderer: `src/components/MDXRenderer.tsx` (not in `ui/` — standalone component)

---

## Tech Stack

### Core
- **Next.js 16** (App Router) · **React 19** · **TypeScript 5** (strict mode)

### Styling & UI
- **Tailwind CSS 4** — CSS-first config (no `tailwind.config.ts`). Tokens via `@theme` in generated CSS.
- **Radix UI** — Dialog, Tabs, Tooltip, ScrollArea primitives
- **Framer Motion** — Animations (installed, planned for Project 4.3)

### Content
- **MDX** via `next-mdx-remote` — Markdown with React components
- **gray-matter** — Frontmatter parsing
- **Zod** — Schema validation (installed, planned for frontmatter runtime validation)

### SEO & Deployment
- **Next.js Metadata API** + custom utilities (`src/lib/seo.ts`) — SEO optimization
- **next-sitemap** — Sitemap generation (installed, planned for Project 3.1)
- **Vercel** — Hosting and CI/CD

---

## Architecture

### App Router

```
src/app/
├── page.tsx              # Redirects to /work
├── work/
│   ├── page.tsx          # Work listing
│   └── [subType]/[slug]/page.tsx   # Individual work items (e.g., /work/products/ocean)
├── about/page.tsx        # Renders about.mdx
├── colophon/page.tsx     # Renders colophon.mdx
├── now/page.tsx          # Renders latest now entry
├── uses/page.tsx         # Renders uses.mdx
├── experiments/page.tsx  # Experiments listing
├── reading/page.tsx      # Reading listing
└── writing/page.tsx      # Writing listing
```

### Content Layer

All prose in MDX files under `content/`. Structured data in TypeScript under `src/data/`.
Full architecture: [docs/CONTENT_ARCHITECTURE.md](docs/CONTENT_ARCHITECTURE.md)

```
content/
├── work/               # products/, features/, side-projects/, transformations/
├── writing/            # posts/, thoughts/, quotes/
├── experiments/        # design/, code/, prototypes/
├── reading/            # books/, articles/
├── now/                # Dated snapshots (YYYY-MM-DD.mdx)
└── pages/              # about.mdx, uses.mdx
```

Frontmatter schemas, file naming, and content creation guides: [content/README.md](content/README.md)

### Data Layer

TypeScript in `src/data/` — separated into sources, content, resolvers, derived.
All public exports via `src/data/index.ts`. Import with `import { x } from '@/data'`.

| Layer | Purpose | Key exports |
|-------|---------|-------------|
| **sources/** | Raw reference data | `companies`, `contentTypes`, `workTypes`, `readingStatuses`, `site`, `tagGroups`, `colors`, `themes`, `spacing`, `typography`, `radii` |
| **content/** | Editorial data | `profile`, `experience`, `workflowPhases`, `designPrinciples` |
| **resolvers/** | Lookup logic | `getCompany`, `getContentType`, `getWorkTypeLabel`, `getTokensForFigma`, `getTokensForCSS`, `CONTENT_SLUGS` |
| **derived/** | Computed | `navigation`, `routes`, `getRoute` |
| **config/** | Feature flags | `features`, `isSectionEnabled`, `isSubTypeEnabled` (re-exported from `@/config/features`) |

Full details: [src/data/README.md](src/data/README.md)

### Password Protection

Server-side validation with HTTP-only cookies (SHA-256, 7-day expiry).
Priority: per-slug env var → global env var.
Setup and details: [README_PASSWORD_PROTECTION.md](README_PASSWORD_PROTECTION.md) | [docs/PASSWORD_PROTECTION.md](docs/PASSWORD_PROTECTION.md)

Key files: `src/lib/serverPasswordAuth.ts`, `src/actions/authActions.ts`, `src/components/ServerPasswordPrompt.tsx`

### Feature Flags

Centralized in `src/config/features.ts`. Controls what's on/off across the project. Every toggleable item has `{ label, enabled }` so display text lives in one place (used by DevToolsPanel). Group labels are in `featureGroups`.

| Group | Controls | Keys |
|-------|----------|------|
| `sections` | Navigation visibility, route access (404), SEO metadata | `work`, `experiments`, `reading`, `writing`, `about`, `now`, `uses`, `colophon` |
| `sections.*.subTypes` | Content subtype visibility in listings and route access | e.g. `work.subTypes.products`, `reading.subTypes.books` |
| `analytics` | Provider initialization and event tracking | `googleAnalytics`, `amplitude` |
| `appearance` | Theme mode — `'auto'` / `'light'` / `'dark'` | string (not boolean) |
| `passwordProtection` | Password gating for locked work items | `{ label, enabled }` |
| `contact` | Sidebar contact section elements | `email`, `linkedin`, `location`, `availability` |
| `seo` | SEO metadata features | `sitemap`, `openGraph`, `twitterCards`, `schemaOrg` |

Section slugs match `contentTypes.ts` exactly (kebab-case). Helpers: `isSectionEnabled(slug)`, `isSubTypeEnabled(section, subType)`.

Key file: `src/config/features.ts`

### Project Structure

```
portfolio/
├── src/
│   ├── app/                         # Next.js App Router pages
│   ├── components/
│   │   ├── ui/                      # Design system components (see inventory above)
│   │   ├── layout/                  # SplitLayout
│   │   ├── home/                    # Home page sections
│   │   ├── MDXRenderer.tsx          # MDX content renderer
│   │   └── ServerPasswordPrompt.tsx # Password protection UI
│   ├── data/                        # Structured data layer (see above)
│   ├── lib/                         # Utilities (contentLoader, seo, mdx, serverPasswordAuth)
│   ├── config/                      # Feature flags, auth cookie config
│   └── actions/                     # Server actions
├── content/                         # MDX content files
├── public/images/                   # Static assets (work/, experiments/, writing/, now/, etc.)
├── scripts/                         # Token generation, password hashing, MCP
├── docs/                            # Detailed documentation
└── .claude/agents/                  # AI optimization agents
```

---

## Development Standards

### Code Style
- **TypeScript:** Strict mode, explicit return types preferred
- **React:** Functional components with hooks, Server Components by default
- **Tailwind:** Semantic tokens for colors, primitive scale for layout (see Design System above)
- **Imports:** Absolute imports with `@/` prefix (maps to `src/`)
- **Constants over literals:** Always use existing constants instead of string literals. Content type slugs use `CONTENT_SLUGS.*` (from `@/data`), image variants use `IMAGE_VARIANTS.*`, default extension uses `DEFAULT_IMAGE_EXT` (both from `@/lib/contentPaths`). Never hardcode values like `'work'`, `'hero'`, `'thumbnail'`, `'png'` when a constant exists.

### File Naming
- **Components:** `PascalCase.tsx` (e.g., `ServerPasswordPrompt.tsx`)
- **Other files:** `kebab-case.tsx` (e.g., `content-loader.ts`)
- **MDX:** `lowercase.mdx` or `kebab-case.mdx`
- **Folders:** All lowercase, hyphens for multi-word (e.g., `side-projects/`)

### Commit Convention
- Conventional commits: `type: description`
- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- Include co-author:
  ```
  Generated with Claude Code

  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

### Git Workflow
- Work directly on `main` (personal project)
- PR_*.md files are local only (in `.gitignore`)
- **Never commit:** `.env*` (except `.env.example`), `PR_*.md`, `node_modules/`, `.next/`

---

## AI Shortcuts

Interpret these phrases literally — no need to re-ask.

| Phrase | Action |
|--------|--------|
| "Run Figma" / "Test Figma" | `./scripts/mcp.sh start figma` (background) + open Figma via Chrome DevTools MCP |
| "Run app" / "Test app" / "Run Chrome" | `./scripts/mcp.sh start app` (background) — dev server + Chrome at localhost:3000 |
| "Run application" | `npm run dev` only (background) |
| "Test connection" | Test Chrome DevTools MCP connection, report status |

When running `./scripts/mcp.sh stop app` or `stop figma`, use full permissions so the script can send kill signals.

**Terminal equivalents:**
- `./scripts/mcp.sh start figma` / `stop figma` — Chrome + dev server + Figma
- `./scripts/mcp.sh start app` / `stop app` — Dev server + Chrome (logs in Terminal windows)

---

## Common Workflows

### Adding Content
1. Create MDX file in appropriate `content/` subfolder
2. Add required frontmatter (see [content/README.md](content/README.md) for schemas)
3. Add images to `public/images/<contentType>/<subType>/` with `{slug}-hero.png` naming (see [docs/ASSETS.md](docs/ASSETS.md))
4. Test locally: `npm run dev`
5. Commit and push

### Creating PR Title & Description
Create `PR_INFO.md` at project root (gitignored) with:
```markdown
# PR Title
[Concise title]

# PR Description
## Changes
- Change 1
## Testing
- How to test
```

### Key Commands
```bash
npm run dev                      # Start dev server
npm run build                    # Build for production
npm run lint                     # Lint codebase
npm run tokens:generate          # Regenerate CSS from tokens
npm run hash-password "pass"     # Generate password hash
./scripts/mcp.sh start app       # Dev server + Chrome
./scripts/mcp.sh stop app        # Stop dev server + Chrome
```

### Deployment (Vercel)
Push to `main` → auto-deploys. Environment variables set in Vercel dashboard.

---

## Quality Standards

### Accessibility (WCAG 2.1 AA)
- Color contrast >= 4.5:1 for text
- Alt text for all images
- Keyboard navigation + visible focus states
- Screen reader compatible

### SEO (Lighthouse 100)
- Unique meta title (50-60 chars) and description (150-160 chars) per page
- Semantic HTML, Schema.org markup (Person, CreativeWork)
- Sitemap.xml + robots.txt, Open Graph + Twitter Cards

### Performance (Lighthouse 95+)
- LCP < 2.5s, FID < 100ms, CLS < 0.1
- FCP < 1s, TTI < 3s, bundle < 200KB gzipped

### Code Quality
- No `any` types, strict TypeScript
- Run `npm run lint` before committing
- Verify `npm run build` succeeds

---

## Project Rules

### Content
- No emojis in code/commits/docs unless explicitly requested
- Professional tone in all user-facing content
- Quantified impact in products (e.g., "16x productivity", "300M+ messages/month")

### Security
- Never expose passwords in code or frontmatter (use `.env.local`)
- Always use HTTPS in production
- HTTP-only cookies for authentication
- Server-side validation for password checks

### Documentation
- Link, don't duplicate — reference other docs instead of copying
- Keep README.md brief — overview only, details in docs/
- Update all affected docs when features change

---

## Documentation Map

### Project
| Doc | Purpose |
|-----|---------|
| [README.md](README.md) | Project overview and quick start |
| [ROADMAP.md](ROADMAP.md) | Development timeline and phases |
| [.env.example](.env.example) | Environment variable reference |

### Conventions
| Doc | Purpose |
|-----|---------|
| [docs/WORK_ITEM_TERMINOLOGY.md](docs/WORK_ITEM_TERMINOLOGY.md) | Internal "work item" vs user-facing "work sample" |

### Architecture & Design System
| Doc | Purpose |
|-----|---------|
| [docs/COMPONENTS.md](docs/COMPONENTS.md) | Component inventory, token wiring, expansion rules, style convention |
| [docs/CONTENT_ARCHITECTURE.md](docs/CONTENT_ARCHITECTURE.md) | Content principles, MDX + data composition, adding new content |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | URL structure, navigation logic, architectural decisions |
| [docs/ASSETS.md](docs/ASSETS.md) | Image organization (flat structure, slug-level naming) |
| [docs/RADIX_GUIDE.md](docs/RADIX_GUIDE.md) | Radix UI primitives usage patterns |
| [src/data/README.md](src/data/README.md) | Data layer structure and conventions |
| [content/README.md](content/README.md) | Content taxonomy, frontmatter schemas, naming conventions |

### Features
| Doc | Purpose |
|-----|---------|
| [README_PASSWORD_PROTECTION.md](README_PASSWORD_PROTECTION.md) | Password setup quick reference |
| [docs/PASSWORD_PROTECTION.md](docs/PASSWORD_PROTECTION.md) | Complete password protection guide |
| [README_ANALYTICS.md](README_ANALYTICS.md) | Analytics setup (GA4 + Amplitude) |

### Figma & Design Systems
| Doc | Purpose |
|-----|---------|
| [docs/FIGMA_LEARNINGS.md](docs/FIGMA_LEARNINGS.md) | Two-way Figma workflow, data contracts, canonical operations |
| [docs/FIGMA_CONSOLE_MCP_COMPARISON.md](docs/FIGMA_CONSOLE_MCP_COMPARISON.md) | Figma Console MCP vs Desktop Bridge comparison |
| [docs/DESIGN_SYSTEMS_MCP.md](docs/DESIGN_SYSTEMS_MCP.md) | Design Systems MCP: tokens, a11y, WCAG compliance |

### Planning & Optimization
| Doc | Purpose |
|-----|---------|
| [docs/IMPLEMENTATION_ROADMAP.md](docs/IMPLEMENTATION_ROADMAP.md) | Future roadmap: testing, Storybook, Figma integration |
| [docs/OPTIMIZATION_RECOMMENDATIONS.md](docs/OPTIMIZATION_RECOMMENDATIONS.md) | Code review findings and improvement tracking |
| [docs/AGENT_SYSTEM.md](docs/AGENT_SYSTEM.md) | Multi-agent validation system proposal (future) |

### AI Agents
Located in `.claude/agents/`: seo_optimizer, content_auditor, accessibility_checker, performance_optimizer, product_migrator. Invoke via Task tool.

---

**Last Updated:** February 16, 2026
**Maintained by:** Nicolas Botero + Claude Code
