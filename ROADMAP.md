# Portfolio Website Roadmap

**Project Start:** November 11, 2025
**Launched:** Not yet (no Vercel deployment)
**Status:** Pre-launch; in development

**Current focus:** Follow the recommended order below. Process: build (1, 2) → fill + fix (3) → ship (4) → expand (5) → learn + harden (6, 7) → grow (8).

**Philosophy:** This is a learning-first project. Testing, Storybook, Figma pipelines, and CI/CD are valuable learning goals, not overhead. The sequencing prioritizes launch so there's a live, content-complete site to iterate on — which makes infrastructure work (testing, visual regression, automation) more valuable, not less.

---

## Structure: Project > Milestone > Task > Subtask

| Level | Meaning | In this roadmap |
|-------|---------|-----------------|
| **Project** | A defined body of work with an outcome | Numbered 1–8; title = theme or outcome |
| **Milestone** | A delivery target or checkpoint (zero-duration) | Numbered **Project.Milestone** (e.g. 1.1, 1.2); name = deliverable or phase |
| **Task** | A concrete piece of work | Main bullets; **imperative verb** (Implement, Add, Create, Configure, Run, …) |
| **Subtask** | Smaller steps inside a task | Nested bullets; same **imperative** style |

**Writing style (industry-aligned):** Projects and milestones use **outcome or deliverable** names (what is achieved). Tasks and subtasks use **imperative verbs** so each item is one clear, actionable unit (e.g. "Implement a11y strategy", "Run bundle analysis"). Avoid passive or vague phrasing.

---

## Recommended order (what to do first)

Use this sequence so work builds on itself and nothing is blocked.

**Projects (in order):** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8. Aligns with process: **build** (1 Foundation POC, 2 Architecture & DS) → **fill + fix** (3 Content & Launch Readiness) → **ship** (4 Deploy & Launch) → **expand** (5 Content Expansion) → **learn + harden** (6 Quality Infrastructure, 7 Design System Maturity) → **grow** (8 Growth).

**Within each project:**

| Project | Milestone order | Why |
|---------|-----------------|-----|
| **1** | 1.1 → 1.2 | Setup before design system (done) |
| **2** | 2.1 → 2.2 | Architecture & tooling (2.1) before component completion (2.2) |
| **3** | 3.1 → 3.2 → 3.3 | Fix blockers → polish content → optimize SEO |
| **4** | 4.1 → 4.2 → 4.3 | Deploy → QA → launch |
| **5** | 5.1 → 5.2 → 5.3 | More work samples → new sections → analytics |
| **6** | 6.1 → 6.2 → 6.3 → 6.4 | Unit tests → Storybook → E2E → CI/CD |
| **7** | 7.1 → 7.2 | Design-to-code pipeline → component formalization |
| **8** | 8.1 → 8.2 → 8.3 → 8.4 | Content & reach → product enhancements → advanced features → parking lot |

**Task order within key milestones:**

- **Project 2, 2.2:** Build remaining MDX override components → Build About page components (WorkflowGrid, ExperienceTimeline).
- **Project 3, 3.1:** Fix hero images → Write Uses content → Add sitemap/robots → Wire About page → Favicon/manifest → Theme toggle.
- **Project 3, 3.2:** Migrate Sainapsis → Bridge → Polish case studies → Optimize images → Audit SEO meta.
- **Project 4, 4.2:** Mobile audit → a11y audit (incl. skip-to-content) → performance audit → cross-browser → code cleanup + env validation.
- **Project 4, 4.3:** OG images → loading.tsx → polish → final QA → launch → post-launch monitoring.

---

## Timeline

| When | What |
|------|------|
| Done | Project 1 (Foundation POC) |
| Done | Project 2.1 (Architecture & Tooling — except design-to-code and mobile, moved to 7.1 and 4.2) |
| Current | Projects 2.2 → 3 → 4 (path to launch) |
| Post-launch | Projects 5 → 6 → 7 → 8 |

---

## Project 1: Foundation – POC

**Project outcome:** Proof of concept; foundation and intent defined (no deployment, no formal deliverable)


### Milestone 1.1 – Setup + Content Migration

**Tasks:**

- [x] Initialize Next.js 16 project with TypeScript + Tailwind
- [x] Install dependencies (gray-matter, next-mdx-remote, Zod, Framer Motion, next-seo, next-sitemap)
- [x] Configure MDX processing (gray-matter + next-mdx-remote)
- [x] Set up project structure (components, content, lib, data)
- [x] Create 5 AI agents in `.claude/agents/` (SEO, Content Auditor, Accessibility, Performance, Product Migrator)
- [x] Migrate 3 products (Sainapsis, Ocean, AquaDS) and frontmatter
- [x] Migrate home page content
- [x] Create basic layout components (Header, Footer, Navigation; superseded by SplitLayout in Project 2)

### Milestone 1.2 – Design System + Pages

**Tasks:**

- [x] Create Tailwind design tokens (color, typography, spacing, shadows, radii)
- [x] Add token generation pipeline (sources → generated CSS, Figma sync)
- [x] Build component library (Button, Card, Badge, typography, Image, Link)
- [x] Build home page and product template
- [x] Collect or create assets and configure SEO basics
  - [x] Default and per-page metadata (custom `seo.ts`; Open Graph, Twitter Card, robots)
  - [x] Robots (index/follow) via metadata; sitemap deferred to Project 3
- [x] Implement password protection (server-side, locked products, HTTP-only cookies)

---

## Project 2: Architecture & Design System

**Project outcome:** Architecture, tooling, and design system in place

### Milestone 2.1 – Architecture & Tooling *(done)*

**Tasks:**

- [x] Redefine site navigation structure (content types, routes, sidebar)
- [x] Integrate Figma MCP with Cursor
- [x] Organize site architecture
  - [x] Separate types of data
  - [x] Implement use of constants to remove hard coded data
  - [x] Migrate content data from config files
  - [x] Update documentation
- [x] Implement SplitLayout (sidebar + main, contact, navigation from content types)
- [x] Add error handling logic to the project
- [x] Integrate ChromeDevTools to Cursor
- [x] **Integrate code-to-design logic**
  - [x] Provide token data to Figma (sources → format consumable by plugin/scripts)
  - [x] Run or document scripts in Figma that create/update variable collections from token data
  - [x] Map source tokens to Figma naming and types (fonts, colors, spacing; e.g. FIGMA_FONT_FAMILY_MAP)
  - [x] Document workflow (open plugin, run script; see docs/FIGMA_LEARNINGS.md)
- [x] Add client-side analytics wiring (Amplitude + GA4 structure; configure keys and test in prod per 5.3)
- [x] Implement hierarchical URL structure (`/work/[subType]/[slug]`)
- [x] Standardize work item terminology across codebase (case studies → products/work items; see `docs/WORK_ITEM_TERMINOLOGY.md`)
- [x] Reorganize asset paths to match content hierarchy (`public/images/work/products/`)
- [x] Refactor work item type system (`ProductFrontmatter` → `WorkItemFrontmatter`, transversal vs subtype-specific fields, remove `heroImage` from frontmatter)
- [x] Add convention-based image path helpers (`getWorkThumbnailPath`, `getThumbnailPath`, `IMAGE_VARIANTS`, `DEFAULT_IMAGE_EXT` constants)
- [x] Enforce constants over literals (`CONTENT_SLUGS.*`, `IMAGE_VARIANTS.*`, `DEFAULT_IMAGE_EXT`; rule added to CLAUDE.md)
- [x] Harden SEO metadata for work items (ogImage from thumbnail, canonical URLs, `noIndex` + restrictive googleBot directives for locked/NDA items)
- [x] Implement side-projects content accessor in `mdx.ts` (`getSideProjects`, `getSideProjectBySlug`; `getAllWork` now includes side-projects)
- [x] Disable frontmatter passwords in production (dev-only guard in `getExpectedPasswordHash`)
- [x] Implement centralized feature flags system (`src/config/features.ts` — sections, subtypes, analytics, password protection, dark mode, contact, SEO)

*Design-to-code Figma integration → moved to Project 7.1*
*Mobile responsiveness → moved to Project 4.2 (audit with real content in place)*

### Milestone 2.2 – Component Completion *(in progress)*

**Tasks:**

- [x] Implement token logic
- [x] Add Radix UI
- [x] Create Card component and subcomponents (CardHeader, CardTitle, CardDescription, CardMeta, CardImage, CardListItem)
- [x] Create Badge component
- [x] Add remaining UI components (Button, Tabs, Tooltip, Dialog, ScrollArea, ContentNavigation, CheckIcon)
- [x] Add theme support (light/dark)
- [x] Complete UI barrel export (`src/components/ui/index.ts` — add missing Divider, Link, Skeleton, Breadcrumb, Typography exports)
- [x] Use `<Button>` component in ServerPasswordPrompt (replace hardcoded `<button>` for design system consistency)
- [x] Deduplicate analytics logging (import `logError` from `errors.ts` in `analytics.ts`)
- **Build MDX element override components** (markdown-first rendering; see `src/lib/mdxComponents.tsx`)
  - [x] Typography components (H1-H4, Lead, Body, Caption, Strong, Em → DS styled headings and text)
  - [x] List components (ul/ol/li → DS styled lists with proper spacing)
  - [x] Link component (MDX `a` → DS styled Link with internal/external handling)
  - [x] Divider component (`---` → DS styled horizontal rule)
  - [x] Image component (`img` → DS styled image with optional caption)
  - [ ] Callout/Blockquote component (`> blockquote` → DS styled callout)
  - [ ] InlineCode component (`` `code` `` → DS styled inline code)
  - [ ] CodeBlock component (` ```block``` ` → DS styled code block with syntax highlighting)
  - [ ] Table component (`| table |` → DS styled table with proper spacing/borders)
  - [ ] Video component (`<Video src="demo" />` → JSX-only, no markdown equivalent; embedded video player)
  - [ ] Image component (`<Image src="x" width={800} />` → JSX-only; explicit dimensions, captions, custom layouts)
- **Build About page components**
  - [ ] WorkflowGrid component (render workflow phases from `src/data/content/workflow.ts`)
  - [ ] ExperienceTimeline component (render experience data from `src/data/content/experience.ts`)

*Storybook, Vitest, Chromatic, component testing retrofit, TDD workflow → moved to Project 6*
*Figma push, DS documentation site, Component Status Tracker → moved to Project 7*

---

## Project 3: Content & Launch Readiness

**Project outcome:** Content complete, SEO optimized, ready to deploy

### Milestone 3.1 – Launch Blockers

**Tasks:**

- [x] ~~**Implement hero image rendering**~~ Removed hero image block from work item pages; images now follow convention-based paths (`getWorkThumbnailPath` for cards, `getWorkHeroImagePath` available for future use)
- [ ] **Write Uses page content** (`content/pages/uses.mdx` — currently a TODO skeleton; add Design Tools, Development Tools, Productivity, Hardware sections)
- [ ] **Add sitemap and robots route handlers** (`src/app/sitemap.ts` and `src/app/robots.ts`; next-sitemap installed but not configured)
- [ ] **Wire About page** to WorkflowGrid and ExperienceTimeline components (built in 2.2; remove TODO comments from `content/pages/about.mdx`)
- [ ] **Add favicon and web manifest** (`favicon.ico`, `apple-touch-icon.png`, `site.webmanifest` in `public/`; currently no favicon — browser tabs show generic icon)
- [ ] **Add theme toggle UI** (ThemeProvider infrastructure exists with light/dark/system modes, but no toggle button is exposed to users; add to sidebar or header)

### Milestone 3.2 – Content Polish

**Tasks:**

- [ ] **Migrate Sainapsis product to Bridge** (rewrite MDX content, update frontmatter; hero/thumbnail images already exist as `bridge-hero.png`/`bridge-thumbnail.png`; remove sainapsis assets)
- [ ] **Review and polish product case studies** (Ocean, AquaDS, Bridge — verify metrics, proofread, check formatting)
- [ ] **Optimize images** (compression, appropriate dimensions for hero and thumbnail)
- [ ] **Audit SEO meta** (verify all pages have unique, optimized title 50-60 chars + description 150-160 chars; product meta titles shortened and double-attribution bug fixed in architecture review)

### Milestone 3.3 – SEO Optimization

**Tasks:**

- [ ] **Add Schema.org structured data** (Person on About, CreativeWork on products)
- [x] **Verify canonical URLs** across all pages (work items via `getRoute`, static/listing pages via `routes[slug]` in `generateMetadataForPage`)
- [ ] **Run Lighthouse audit** and fix issues (target 95+)
- [ ] **Submit sitemap to Google Search Console** (after deployment in 4.1)

---

## Project 4: Deploy & Launch

**Project outcome:** Site live, QA'd, and publicly launched

### Milestone 4.1 – Deploy to Vercel

**Tasks:**

- [ ] **Create and configure Vercel project** (import Git repo, link to GitHub)
- [ ] **Configure build settings** (framework: Next.js, root directory, build command, output)
- [ ] **Add security headers** (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy via `headers()` in `next.config.ts`; currently relying on Vercel defaults only)
- [ ] **Add environment variables** (match `.env.local`: `NEXT_PUBLIC_*`, `WORK_*_PASSWORD` if used, GA/Amplitude keys)
- [ ] **Trigger first production deploy** (push to main or "Deploy" in dashboard)
- [ ] **Verify deployment** (production URL loads, key routes work: `/`, `/work`, `/about`, product slugs)
- [ ] **Verify assets and server behavior** (images render, MDX loads, password flow works)
- [ ] **Set up custom domain** (add domain in Vercel, configure DNS records, wait for SSL)
- [ ] **Document deploy process and rollback steps** (redeploy previous, or revert commit and push)

### Milestone 4.2 – Pre-Launch QA

**Tasks:**

- [ ] **Audit mobile responsiveness** (breakpoints: 320, 375, 768, 1024px)
  - [ ] Fix layout and overflow (sidebar, cards, typography, containers)
  - [ ] Verify touch targets and spacing (min 44px, readable tap areas)
  - [ ] Test navigation and interactive elements on small viewports
  - [ ] Check landscape orientation (layout and overflow at key widths)
  - [ ] Document breakpoints and responsive patterns
- [ ] **Audit accessibility** (axe, Lighthouse, keyboard navigation, screen reader)
  - [ ] Add skip-to-content link (WCAG 2.1 AA requirement; currently missing)
  - [ ] Fix critical and serious issues
  - [ ] Document a11y patterns and add to launch checklist
- [ ] **Audit performance** (Lighthouse 95+ target, LCP < 2.5s, FCP < 1s, CLS < 0.1)
- [ ] **Check cross-browser** (Chrome, Safari, Firefox — verify layout, fonts, interactions)
- [ ] **Scan for unused code and libraries**
  - [ ] Run bundle and code analysis
  - [ ] Remove or replace unused dependencies (next-seo and react-wrap-balancer already removed in architecture review; check framer-motion, next-sitemap usage)
  - [ ] Remove dead code and unused components
  - [ ] Review unused data layer exports (`designPrinciples`, `allTags`, `isValidTag`, `tagGroups` — exported from `src/data/index.ts` but no consumer in app)
- [ ] **Add environment variable validation** (centralized Zod schema for `process.env.*`; currently read inline across 5+ files with no build-time or runtime validation)

### Milestone 4.3 – Launch

**Tasks:**

- [ ] **Create OG images** (1200x630px PNG)
  - [ ] Create general fallback `public/og-image.png` (name, title, brand — used as default when sharing any page)
  - [ ] Create per-work-item OG images for each product (Ocean, AquaDS, Bridge — `{slug}-og.png` via `getWorkOgImagePath`, passed as `ogImage` in `generatePageMetadata`)
- [ ] **Add loading.tsx route files** (no loading states exist for any route; add root and/or per-route `loading.tsx` using Skeleton components for visual feedback during navigation)
- [ ] **Add polish and animations** (transitions, scroll, hover, loading, 404)
- [ ] **Add privacy policy** if analytics use cookies
- [ ] **Run final QA pass** (AI agents, proofread, links, images, a11y, performance)
- [ ] **Update LinkedIn/GitHub** with live URL
- [ ] **Execute public launch** (share on LinkedIn, relevant communities)
- [ ] **Complete post-launch tasks** (submit to design directories, monitor analytics, fix bugs)

---

## Project 5: Content Expansion

**Project outcome:** Broader content portfolio and active measurement

### Milestone 5.1 – Additional Work Samples

**Tasks:**

- [ ] **Add Masiv product** (create MDX, frontmatter, assets)
- [ ] **Add PayU Latam product** (create MDX, frontmatter, assets)
- [ ] **Break Ocean into feature case studies** (list features to extract, create feature MDX entries, update Ocean to link/summarize)
- [ ] **Break Bridge into feature case studies** (list features to extract, create feature MDX entries, update Bridge to link/summarize)
- [ ] **Add first transformation case studies** (UX company/cultural transformations; content subtype and data layer already wired)

### Milestone 5.2 – New Content Sections

**Tasks:**

- [ ] **Add first writing pieces** (1-2 blog posts or thoughts)
- [ ] **Add first reading entries** (2-3 book notes)
- [ ] **Add first experiments** (1-2 design or code explorations)
- [ ] **Add work list pagination** (Load More or pagination when 10+ work items exist)

### Milestone 5.3 – Analytics Activation

**Tasks:**

- [ ] **Configure GA4 property** (set up GA4 property, add measurement ID to `.env` and production)
- [ ] **Configure Amplitude** (add API key to `.env` and production)
- [x] Add event tracking utilities and key events (see `README_ANALYTICS.md`)
- [ ] **Verify events firing** in production (page views, work item views, navigation, work card clicks)
- [ ] **Set up basic dashboard/reports** as needed

---

## Project 6: Quality Infrastructure

**Project outcome:** Testing, visual regression, and CI/CD in place

This is the learning and tooling project. Building tests and stories against a live, content-complete site is more valuable than testing placeholder content.

### Milestone 6.1 – Testing Foundation

**Tasks:**

- [ ] **Install and configure Vitest** (vitest.config.ts, test environment: jsdom, coverage setup)
- [ ] **Install testing dependencies** (@testing-library/react, @testing-library/jest-dom, @testing-library/user-event)
- [ ] **Create test utilities and helpers** (custom renders, mock providers, theme wrapper)
- [ ] **Write unit tests for critical utilities** (content loader, SEO, analytics, password auth)
- [ ] **Document testing workflow** (where tests live, how to run, coverage expectations)

### Milestone 6.2 – Component Testing & Storybook

**Tasks:**

- [ ] **Set up Storybook for Next.js**
  - [ ] Research and install Storybook (latest compatible version)
  - [ ] Configure Storybook (main.js, preview.js, addons, webpack/turbopack config)
  - [ ] Configure Storybook to use design tokens (import Tailwind config, theme provider)
  - [ ] Add Storybook npm scripts to package.json (dev, build, test)
- [ ] **Add Storybook addons** (a11y, controls, docs, interactions, test runner)
- [ ] **Set up Storybook test runner** (@storybook/test-runner, configure test-storybook script)
- [ ] **Retrofit existing components with stories and tests**
  - [ ] Card component and subcomponents (CardHeader, CardTitle, CardDescription, CardMeta, CardImage, CardListItem)
    - [ ] Write Storybook stories (all variants: default, with image, with meta, with list items, interactive states)
    - [ ] Write component tests (rendering, props, accessibility, user interactions, theme support)
    - [ ] Run Chromatic visual regression (capture baselines, verify variants render correctly)
    - [ ] Document component in Storybook (usage, props table, best practices, accessibility notes)
  - [ ] Badge component
    - [ ] Write Storybook stories (all variants: colors, sizes, with/without icon, interactive)
    - [ ] Write component tests (rendering, props, accessibility, theme support)
    - [ ] Run Chromatic visual regression
    - [ ] Document component in Storybook
  - [ ] Button component
    - [ ] Write Storybook stories (all variants: primary, secondary, ghost, sizes, states, with/without icon)
    - [ ] Write component tests (rendering, click handlers, disabled state, loading state, accessibility)
    - [ ] Run Chromatic visual regression
    - [ ] Document component in Storybook
  - [ ] Tabs component
    - [ ] Write Storybook stories (all variants: horizontal, vertical, controlled, uncontrolled)
    - [ ] Write component tests (tab switching, keyboard navigation, accessibility, ARIA attributes)
    - [ ] Run Chromatic visual regression
    - [ ] Document component in Storybook
  - [ ] Tooltip component
    - [ ] Write Storybook stories (all variants: positions, triggers, delays, custom content)
    - [ ] Write component tests (show/hide, positioning, accessibility, keyboard interactions)
    - [ ] Run Chromatic visual regression
    - [ ] Document component in Storybook
  - [ ] Dialog component
    - [ ] Write Storybook stories (all variants: sizes, with/without overlay, controlled, with forms)
    - [ ] Write component tests (open/close, focus trap, escape key, overlay click, accessibility)
    - [ ] Run Chromatic visual regression
    - [ ] Document component in Storybook
  - [ ] ScrollArea component
    - [ ] Write Storybook stories (all variants: vertical, horizontal, both, custom styling)
    - [ ] Write component tests (scrolling behavior, accessibility, keyboard navigation)
    - [ ] Run Chromatic visual regression
    - [ ] Document component in Storybook
  - [ ] ContentNavigation component
    - [ ] Write Storybook stories (all variants: with different nav items, active states, responsive)
    - [ ] Write component tests (navigation, active state, click handlers, accessibility)
    - [ ] Run Chromatic visual regression
    - [ ] Document component in Storybook
  - [ ] Typography components (H1-H4, Lead, Body, Caption, Strong, Em)
    - [ ] Write Storybook stories (all variants, theme support)
    - [ ] Write component tests (rendering, accessibility)
    - [ ] Run Chromatic visual regression
    - [ ] Document components in Storybook
  - [ ] CheckIcon component
    - [ ] Write Storybook stories (all variants: sizes, colors, states)
    - [ ] Write component tests (rendering, props, accessibility)
    - [ ] Run Chromatic visual regression
    - [ ] Document component in Storybook
- [ ] **Install and configure Chromatic** (project token, chromatic.config.json or package.json script)
- [ ] **Run initial Storybook build and Chromatic baseline** (verify setup works)
- [ ] **Run coverage report** (Vitest coverage, aim for 80%+ on DS components)
- [ ] **Build future components with TDD from the start** (for each new component: write story → write tests → implement → run Chromatic → document)

**Component Status Tracker** (update as you build):

| Component | Story | Tests | Chromatic | Docs | Status |
|-----------|-------|-------|-----------|------|--------|
| Card | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Badge | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Button | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Tabs | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Tooltip | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Dialog | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| ScrollArea | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| ContentNavigation | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| CheckIcon | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Typography (H1-H4, Lead, Body, Caption, Strong, Em) | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| List (ul/ol/li) | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Link (MDX override) | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Divider (MDX override) | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Image (MDX override) | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Callout/Blockquote | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| InlineCode | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| CodeBlock | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Table | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Video | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |
| Image (sized) | ⏳ | ⏳ | ⏳ | ⏳ | Needs Testing |

**Legend:** ✅ Done | ⏳ Pending | ❌ Not Started | ⚠️ Blocked

### Milestone 6.3 – E2E Testing with Playwright

**Tasks:**

- [ ] **Install and configure Playwright** (@playwright/test, browsers, playwright.config.ts: base URL, timeouts, test dir)
- [ ] **Set up test fixtures and helpers** (auth states, page objects, custom matchers)
- [ ] **Write E2E tests for critical flows**
  - [ ] Homepage flow: visit `/`, verify redirect to `/work`, check work cards render
  - [ ] Work list: click work card, verify navigation to product
  - [ ] Product flow: visit product, verify content loads, check navigation works
  - [ ] Password-protected product: enter password, verify access, check cookie persistence
  - [ ] About page: visit `/about`, verify sections render (bio, workflow, experience)
  - [ ] Uses page: visit `/uses`, verify tools and setup render
  - [ ] Navigation: test sidebar navigation, verify active states, test mobile menu if present
  - [ ] 404 page: visit non-existent route, verify 404 page renders
  - [ ] Theme switching: toggle dark mode, verify persistence
- [ ] **Add accessibility checks** (run axe-core via @axe-core/playwright)
- [ ] **Test responsive behavior** (run tests at multiple viewport sizes: mobile, tablet, desktop)
- [ ] **Test cross-browser** (Chromium, Firefox, WebKit via Playwright config)
- [ ] **Run tests locally** (headless + headed mode + UI mode for debugging)
- [ ] **Generate and review test reports** (HTML reporter, trace viewer for failures)
- [ ] **Document Playwright workflow** (how to run locally, write new tests, debug failures, update tests when content changes)

### Milestone 6.4 – CI/CD Pipeline

**Tasks:**

- [ ] **Set up GitHub Actions workflow** (run build and lint on push or PR)
- [ ] **Add component test job** (run Vitest tests on PR)
- [ ] **Add Storybook build job** (verify Storybook builds successfully)
- [ ] **Add Chromatic job** (run visual regression on PR, block merge on unapproved changes)
- [ ] **Add Playwright E2E job** (install deps, run tests, upload artifacts on failure)
- [ ] **Configure deploy on push to main** (or rely on Vercel Git integration)
- [ ] **Add Lighthouse CI or performance budget checks** (optional; can use Vercel Analytics)
- [ ] **Add branch protection or deploy rules if needed** (require passing tests, code review)
- [ ] **Document CI/CD workflow** (how to trigger, debug failures, add new checks)

---

## Project 7: Design System Maturity

**Project outcome:** Two-way Figma pipeline, formalized component workflow, DS documentation

### Milestone 7.1 – Design-to-Code Pipeline

**Tasks:**

- [ ] **Write extract script** (Figma plugin API): walk Figma variable collections, output JSON
- [ ] **Add import pipeline** (script to consume JSON and merge into token sources)
- [ ] **Define namespace and overrides** (e.g. `figma/` prefix; optional override file)
- [ ] **Implement conflict resolution** (new keys add; same path code wins unless override)
- [ ] **(Optional) Add component spec extraction from Figma** (after variables stable)
- [ ] **Test round-trip**: code → Figma → back to code (verify integrity)

### Milestone 7.2 – Component Formalization

**Tasks:**

- [ ] **Define TDD workflow for new components** (story → test → implement → visual regression → document)
- [ ] **Push components and variables to Figma**
  - [ ] Export component specs from Storybook (props, variants, states) in Figma-consumable format
  - [ ] Update Figma plugin/scripts to sync components (map React components to Figma component sets)
  - [ ] Push design tokens to Figma (verify variables are up to date)
  - [ ] Create or update Figma component library (match Storybook component structure)
- [ ] **Create DS documentation** (overview, principles, token usage, component guidelines)
  - [ ] Add component usage examples and do's/don'ts for each component
  - [ ] Document accessibility patterns per component (keyboard nav, ARIA, focus management)
  - [ ] Add design system README or wiki (how to add components, testing requirements)
- [ ] **Document Figma sync workflow** (when to push, how to resolve conflicts, see `docs/FIGMA_LEARNINGS.md`)
- [ ] **Verify Storybook a11y addon reports** (fix critical/serious issues, document known minor issues)

---

## Project 8: Growth

**Project outcome:** Ongoing content, reach, and optional ideas

### Milestone 8.1 – Content & Reach

**Tasks:**

- [ ] **Build blog infrastructure** (layout, RSS feed, promote on LinkedIn)
- [ ] **Write 3-5 initial articles**
- [ ] **Gather testimonials** and add to About section
- [ ] **Monitor and optimize SEO** (Search Console, underperforming pages, backlinks)
- [ ] **Submit to design directories** (bestfolios, layers.to, uxfolio, dribbble, behance)

### Milestone 8.2 – Product Enhancements

**Tasks:**

- [ ] **Add interactive prototypes or video walkthroughs** (e.g. Loom)
- [ ] **Add before/after sliders**
- [ ] **Add related projects on work items**
- [ ] **Add filtering/sorting on work list** (by year, type)
- [ ] **Add thumbnails on Work section**
- [ ] **Add reading progress indicator** on products

### Milestone 8.3 – Advanced Features

**Tasks:**

- [ ] **Add contact form** (with spam protection)
- [ ] **Add newsletter signup**
- [ ] **Add rate limiting for password protection** (e.g. attempts per IP per window)
- [ ] **Add "Back to top" button**
- [ ] **Research: Multilingual (EN + ES)** — evaluate scope and complexity before committing
- [ ] **Research: Image optimization strategy** — evaluate `next/image` for automatic format conversion (WebP/AVIF), responsive `srcset`, lazy loading with blur placeholders, and CDN-level caching. Compare trade-offs vs plain `<img>`.

### Milestone 8.4 – Future ideas (parking lot)

*No commitment; capture so we don't forget; prioritize only when they align with goals.*

- Multilingual (EN + ES)
- Interactive design system playground
- Public AquaDS-style component library (open source)
- Design critique service / mentorship program page
- Podcast or video series on design leadership
- Job board or community forum for designers
- Open Graph image generator for products
- Product PDF export or print view
- Integrate Portfolio roadmap with ClickUp
- Side projects showcase section
- Design principles page
- Resources/tools page

---

## Success metrics (Key Results)

- **At launch:** Lighthouse 95+, unique meta per page, WCAG 2.1 AA, <1s FCP, mobile-friendly, custom domain.
- **30 days post-launch:** 100+ visitors, indexed for "Nicolas Botero Product Designer", 2+ min session, 50+ work sample views, backlinks, 1+ interview request.
- **90 days post-launch:** 500+ visitors, top 10 for 3+ keywords, 5+ min session, 200+ work sample views, 10+ backlinks, 5+ interview requests, 3+ testimonials.

---

## Current status

**Recommended next:** Project 2.2 (remaining MDX components + About page components) → Project 3 (content & launch readiness) → Project 4 (deploy & launch).
**Blockers:** None

---

## Key decisions

- **Stack:** Next.js 16, Tailwind 4, MDX (gray-matter + next-mdx-remote), Vercel.
- **Scope:** Launch with 3 products (Ocean, AquaDS, Bridge); add Masiv/PayU later. Blog in Project 8.
- **Sequencing:** Ship-first — launch the site (Projects 1-4), then build infrastructure (5-8). Testing and Storybook are more valuable against a live, content-complete site.
- **Learning-first:** Testing, Storybook, Figma pipelines, and CI/CD are learning goals, not overhead. They're sequenced post-launch, not deprioritized.
- **SEO:** Products first, then home (Work, Workflow, About, Resume, Contact).
- **Sainapsis → Bridge:** Sainapsis product to be migrated to Bridge (Project 3.2 — same slot, rewritten content).

---

## Change log

- **Feb 2026 (feature flags):** Added centralized feature flags system (`src/config/features.ts`). Controls: content sections and subtypes (navigation visibility, route access via `notFound()`, SEO metadata), analytics providers (GA4, Amplitude), password protection, dark mode, sidebar contact elements, and SEO features (OpenGraph, Twitter Cards). Section slugs match `contentTypes.ts`. Helpers: `isSectionEnabled()`, `isSubTypeEnabled()`. Wired into navigation, analytics, layout, ThemeProvider, serverPasswordAuth, seo, all section pages, work item pages, SplitLayout. Re-exported via `src/data/index.ts`. Documented in CLAUDE.md.
- **Feb 2026 (transformations subtype):** Added "transformations" work subtype for UX company/cultural transformation case studies. Wired content subtype (`contentTypes.ts`), work type (`workTypes.ts`), content loading functions (`mdx.ts`), content and image directories, example MDX template, and documentation updates across 5 docs.
- **Feb 2026 (architecture review gap analysis):** Added 6 untracked tasks from post-review sweep: favicon/manifest (3.1), theme toggle UI (3.1), security headers (4.1), skip-to-content link (4.2 a11y), env variable validation (4.2), loading.tsx route files (4.3). Also flagged unused data exports (`designPrinciples`, tag utilities) under 4.2 code cleanup.
- **Feb 2026 (architecture review):** Full codebase architecture review. Completed UI barrel export (added missing Divider, Link, Skeleton, Breadcrumb, Typography exports). Replaced hardcoded `<button>` in ServerPasswordPrompt with `<Button>` component. Added side-projects content accessor to `mdx.ts` (`getAllWork` now includes side-projects). Shortened SEO meta titles to under 60 chars and fixed double-attribution bug (titleTemplate already appends name). Disabled frontmatter passwords in production. Removed unused dependencies (next-seo, react-wrap-balancer). Fixed documentation drift in CLAUDE.md (layout components, tech stack, routes). Deduplicated analytics logging.
- **Feb 2026 (type system & SEO):** Refactored work item types (`ProductFrontmatter` → `WorkItemFrontmatter`), removed `heroImage` from frontmatter in favor of convention-based image paths (`getWorkThumbnailPath`, `getThumbnailPath`). Added `IMAGE_VARIANTS` and `DEFAULT_IMAGE_EXT` constants, enforced constants-over-literals rule in CLAUDE.md. Hardened SEO metadata: ogImage from thumbnails for public items, canonical URLs on work items, `noIndex` with restrictive googleBot directives for locked/NDA items. Updated example MDX templates and docs.
- **Feb 2026 (restructure):** Reorganized from 7 to 8 projects with ship-first sequencing. Added missing Project 3 (Content & Launch Readiness). Moved Storybook/testing/CI from pre-launch (old 2.2/4.2) to post-launch (new Project 6). Moved Figma sync and DS docs to Project 7. Moved mobile/a11y audits to Project 4.2 pre-launch QA. Merged old Projects 4+5 into new Project 4 (Deploy & Launch). Renamed old Project 7 milestones from time-based to theme-based (new Project 8). Planned Sainapsis → Bridge migration (Project 3.2). All completed tasks preserved.
- **Feb 2026:** Doc pass before execution: moved "Integrate design-to-code logic" from 2.1 to 2.2 (was only in 2.2 by title; now single place). README: status/phase → ROADMAP-aligned (pre-launch, Project 2 focus); Next.js 15 → 16; roadmap section simplified.
- **Feb 2026:** Project 2 split: moved mobile responsiveness from P1 to Milestone 2.1 with subtasks (audit breakpoints, fix layout, touch targets, test nav, document). Created Milestone 2.2 for design-to-code, Storybook, and Design System structure (2.2 grows with components). Updated recommended order and task-order bullets.

---

**Last updated:** February 2026
**Review:** As needed (iteration)
