# Portfolio Website Roadmap

**Project Start:** November 11, 2025  
**Launched:** Not yet (no Vercel deployment)  
**Status:** Pre-launch; in development

**Current focus:** Follow the recommended order below. Process: build (1 → 2) → fill (3) → quality & ship (4) → launch (5) → iterate (6 → 7).

---

## Structure: Project > Milestone > Task > Subtask

| Level | Meaning | In this roadmap |
|-------|---------|-----------------|
| **Project** | A defined body of work with an outcome | Numbered 1–7; title = theme or outcome |
| **Milestone** | A delivery target or checkpoint (zero-duration) | Numbered **Project.Milestone** (e.g. 1.1, 1.2); name = deliverable or phase |
| **Task** | A concrete piece of work | Main bullets; **imperative verb** (Implement, Add, Create, Configure, Run, …) |
| **Subtask** | Smaller steps inside a task | Nested bullets; same **imperative** style |

**Writing style (industry-aligned):** Projects and milestones use **outcome or deliverable** names (what is achieved). Tasks and subtasks use **imperative verbs** so each item is one clear, actionable unit (e.g. "Implement a11y strategy", "Run bundle analysis"). Avoid passive or vague phrasing.

---

## Recommended order (what to do first)

Use this sequence so work builds on itself and nothing is blocked.

**Projects (in order):** 1 → 2 → 3 → 4 → 5 → 6 → 7. Aligns with process: **build** (1 Foundation POC, 2 Architecture & DS) → **fill** (3 Content + SEO) → **quality & ship** (4 Quality, Testing & Deployment) → **launch** (5 Polish + Public Launch) → **iterate** (6 Content structure & Analytics, 7 Growth).

**Within each project:**

| Project | Milestone order | Why |
|---------|-----------------|-----|
| **1** | 1.1 → 1.2 | Setup before design system (done) |
| **2** | 2.1 → 2.2 | Architecture & tooling (2.1) before DS structure, Storybook & design-to-code (2.2; 2.2 grows with components) |
| **3** | 3.1 → 3.2 | Content before SEO |
| **4** | 4.1 → 4.2 | Quality & maintenance before testing & deployment |
| **5** | 5.1 | Single milestone: polish → launch → post-launch |
| **6** | 6.1 → 6.2 | Content structure before analytics |
| **7** | 7.1 → 7.2 → 7.3 → 7.4 | Short → medium → long term → parking lot |

**Task order within key milestones:**

- **Project 2, 2.1:** Architecture and tooling first; mobile responsiveness (audit → fix → verify → document).
- **Project 2, 2.2:** Design-to-code, Storybook, and DS structure can run in parallel or in any order; DS structure and Storybook reinforce each other as components grow.
- **Project 3, 3.1:** Create missing content → Complete About/Uses → Add case study assets → Optimize images → Write SEO meta.
- **Project 3, 3.2:** Implement SEO → Run agents → SEO enhancements → Technical optimization → Testing → Sitemap & Search Console.
- **Project 4, 4.1:** A11y (audit → fix → document) before code cleanup (scan → remove).
- **Project 4, 4.2:** Deploy and launch on Vercel (full process) → CI/CD pipeline → Playwright → Chromatic.
- **Project 5, 5.1:** Polish → Analytics → Final QA → Launch prep → Execute launch (deploy done in 4.2) → Post-launch.

---

## Timeline

| When | What |
|------|------|
| Past | Project 1 completed (POC; no deployment) |
| Current | Projects 2, 3, 4, 5, 6, 7 (in recommended order above) |

---

## Project 1: Foundation – POC

**Project outcome:** Proof of concept; foundation and intent defined (no deployment, no formal deliverable)


### Milestone 1.1 – Setup + Content Migration

**Tasks:**

- [x] Initialize Next.js 16 project with TypeScript + Tailwind
- [x] Install dependencies (gray-matter, next-mdx-remote, Zod, Framer Motion, next-seo, next-sitemap)
- [x] Configure MDX processing (gray-matter + next-mdx-remote)
- [x] Set up project structure (components, content, lib, data)
- [x] Create 5 AI agents in `.claude/agents/` (SEO, Content Auditor, Accessibility, Performance, Case Study Migrator)
- [x] Migrate 3 case studies (Sainapsis, Ocean, AquaDS) and frontmatter
- [x] Migrate home page content
- [x] Create basic layout components (Header, Footer, Navigation; superseded by SplitLayout in Project 2)

### Milestone 1.2 – Design System + Pages

**Tasks:**

- [x] Create Tailwind design tokens (color, typography, spacing, shadows, radii)
- [x] Add token generation pipeline (sources → generated CSS, Figma sync)
- [x] Build component library (Button, Card, Badge, typography, Image, Link)
- [x] Build home page and case study template
- [x] Collect or create assets and configure SEO basics
  - [x] Default and per-page metadata (custom `seo.ts`; Open Graph, Twitter Card, robots)
  - [x] Robots (index/follow) via metadata; sitemap deferred to Project 3
- [x] Implement password protection (server-side, locked case studies, HTTP-only cookies)

---

## Project 2: Architecture & Design System

**Project outcome:** Architecture, tooling, and design system in place

### Milestone 2.1 – Architecture, tooling & mobile *(in progress)*

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
- [ ] **Integrate design-to-code logic**
  - [ ] Write extract script (plugin API): walk Figma variable collections, output JSON
  - [ ] Add import pipeline (script to consume JSON and merge into token sources)
  - [ ] Define namespace and overrides (e.g. `figma/` prefix; optional override file)
  - [ ] Implement conflict resolution (new keys add; same path code wins unless override)
  - [ ] (Optional) Add component spec extraction from Figma (after variables stable)
- [x] Add client-side analytics wiring (Amplitude + GA4 structure; configure keys and test in prod per 6.2)
- [ ] **Implement mobile responsiveness**
  - [ ] Audit key pages at breakpoints (e.g. 320, 375, 768, 1024px)
  - [ ] Fix layout and overflow (sidebar, cards, typography, containers)
  - [ ] Verify touch targets and spacing (min 44px, readable tap areas)
  - [ ] Test navigation and interactive elements on small viewports
  - [ ] Check landscape orientation (layout and overflow at key widths in landscape)
  - [ ] Document breakpoints and responsive patterns (or add to DS docs)

### Milestone 2.2 – Design system structure, Storybook & design-to-code *(grows with components)*

**Tasks:**
- [ ] **Integrate DS components with Storybook**
  - [ ] Set up Storybook
  - [ ] Organize components for Storybook
  - [ ] Create stories for each component
  - [ ] Integrate add-ons (a11y, controls, docs)
  - [ ] Test components in Storybook
  - [ ] Optimize Storybook workflow
  - [ ] Review and finalize integration
- [ ] **Create Design System structure**
  - [x] Implement token logic
  - [x] Add Radix UI
  - [x] Create Card component and subcomponents (CardHeader, CardTitle, CardDescription, CardMeta, CardImage, CardListItem)
  - [x] Create Badge component
  - [x] Add remaining UI components (Button, Tabs, Tooltip, Dialog, ScrollArea, ContentNavigation, CheckIcon)
  - [ ] Document all DS components in Storybook (variants, props)
  - [x] Add theme support (light/dark)

---

## Project 3: Content + SEO – Full Launch

**Project outcome:** Full launch ready

### Milestone 3.1 – Complete Content

**Tasks:** *(Order: content first, then pages and components, then assets, then optimization, then meta.)*

- [ ] Create missing content (workflow 300–500 words, about 500–800 words, resume for web)
- [ ] Complete About page (Workflow, Experience, bio)
  - [ ] Add or wire WorkflowGrid component (workflow phases from data)
  - [ ] Add or wire ExperienceTimeline component (work history from data)
- [ ] Complete Uses page (tools and setup details)
- [ ] Add all assets to case studies (Sainapsis, Ocean, AquaDS images and diagrams)
- [ ] Optimize all images (WebP, blur placeholders, alt text, dimensions)
- [ ] Write SEO meta descriptions for all pages

### Milestone 3.2 – SEO Optimization

**Tasks:** *(Order: implement SEO → run agents → enhancements → technical → test → Search Console.)*

- [ ] Implement advanced SEO (Schema.org, Open Graph, Twitter Card, canonical URLs)
- [ ] Run AI agents on all pages (SEO, Content Auditor, Accessibility, Performance)
- [ ] Add SEO enhancements (internal/external links, headings, breadcrumbs, sitemap)
- [ ] Apply technical optimization (lazy loading, fonts, bundle size, code splitting)
- [ ] Run testing (mobile, cross-browser, Lighthouse 95+, Core Web Vitals)
- [ ] Configure sitemap (next-sitemap config or custom; ensure sitemap.xml is generated)
- [ ] Configure Google Search Console (verify, submit sitemap, check indexing)

---

## Project 4: Quality, Testing & Deployment

**Project outcome:** Site stable, tested, and deployable

### Milestone 4.1 – Quality & maintenance

**Tasks:** *(Order: a11y before code cleanup.)*

- [ ] **Implement a11y strategy**
  - [ ] Audit site (axe, Lighthouse, keyboard/screen reader)
  - [ ] Fix critical issues and document patterns
  - [ ] Add a11y checks to PR/launch checklist
- [ ] **Scan project for unused code and libraries**
  - [ ] Run bundle and code analysis
  - [ ] Remove or replace unused dependencies (e.g. framer-motion, react-wrap-balancer, next-seo, next-sitemap if confirmed unused; see TODO.md)
  - [ ] Remove dead code and unused components

### Milestone 4.2 – Testing & deployment

**Tasks:** *(Order: deploy and launch on Vercel first, then CI/CD, then Playwright, then Chromatic.)*

- [ ] **Deploy and launch site on Vercel**
  - [ ] Create Vercel account (or use existing) and install Vercel CLI if needed
  - [ ] Add project: import Git repo (GitHub/GitLab/Bitbucket) or link existing project
  - [ ] Configure build settings (framework: Next.js, root directory, build command, output)
  - [ ] Add environment variables (match .env.local: NEXT_PUBLIC_*, CASE_STUDY_*_PASSWORD if used, GA/Amplitude keys when ready)
  - [ ] Trigger first production deploy (push to main or "Deploy" in dashboard)
  - [ ] Verify deployment (production URL loads, key routes work: /, /work, /about, case study slug)
  - [ ] Verify assets and server behavior (images, MDX, password flow if used)
  - [ ] Set up custom domain (add domain in Vercel, configure DNS records, wait for SSL)
  - [ ] Document deploy process and rollback steps (redeploy previous, or revert commit and push)
  - [ ] Run post-deploy checks (smoke test, analytics firing, any env-specific behavior)
- [ ] **Implement CI/CD pipeline**
  - [ ] Choose CI tool (e.g. GitHub Actions; Vercel already does deploy on push)
  - [ ] Add workflow: run build and lint on push or PR
  - [ ] Add test job (e.g. Playwright) when tests exist
  - [ ] Configure deploy on push to main (or rely on Vercel Git integration)
  - [ ] Add branch protection or deploy rules if needed
  - [ ] Monitor builds and refine (fix flaky steps, add notifications if desired)
- [ ] **Integrate site with Playwright**
  - [ ] Research and install Playwright for Next.js
  - [ ] Configure Playwright (config file, base URL for dev/prod)
  - [ ] Define test scenarios (critical paths: redirect / → /work, work list, one case study, about page)
  - [ ] Create test scripts for core flows
  - [ ] Run tests locally
  - [ ] Integrate Playwright into CI (run on PR or before deploy)
  - [ ] Document how to run and extend tests
- [ ] **Integrate site with Chromatic**
  - [ ] Research Chromatic for Next.js/React (visual regression)
  - [ ] Install and configure Chromatic (project token, script)
  - [ ] Run initial snapshot or link Storybook when Storybook exists
  - [ ] Add Chromatic to PR or deploy workflow (optional)
  - [ ] Document review workflow (how to approve/reject visual changes)

---

## Project 5: Polish + Public Launch

**Project outcome:** Public launch

### Milestone 5.1 – Final Polish + Launch

**Tasks:** *(Order: polish → analytics → QA → prep → launch → post-launch. Deployment steps are in 4.2.)*

- [ ] Set up custom domain (register domain if needed; DNS, SSL, env vars — or complete in Vercel per 4.2)
- [ ] Add polish and animations (transitions, scroll, hover, loading, 404)
- [ ] Set up analytics (e.g. Vercel Analytics or GA4) and add privacy policy if using cookies
- [ ] (Optional) Add rate limiting for password protection (e.g. attempts per IP per window)
- [ ] Run final QA (AI agents, proofread, links, a11y, performance)
- [ ] Complete launch preparation (OG images, LinkedIn post, optional email)
- [ ] Execute public launch (site already deployed via 4.2; update LinkedIn/GitHub with live URL, share)
- [ ] Complete post-launch tasks (design directories, monitor analytics, fix bugs)


## Project 6: Content Structure & Analytics

**Project outcome:** Content model and measurement in place

### Milestone 6.1 – Content structure

**Tasks:**

- [ ] **Break out Ocean case study into Features**
  - [ ] List features to extract from Ocean case study
  - [ ] Create feature MDX content entries and routes
  - [ ] Update Ocean case study to link to or summarize features
- [ ] **Break out Bridge case study into Features**
  - [ ] List features to extract from Bridge case study
  - [ ] Create feature MDX content entries and routes
  - [ ] Update Bridge case study to link to or summarize features
- [ ] **Add work list pagination** (Load More or pagination when 10+ work items exist)

### Milestone 6.2 – Analytics

**Tasks:**

- [ ] **Implement GA4 strategy**
  - [ ] Audit current setup and define key metrics
  - [ ] Set up GA4 property and add measurement ID to .env and production
  - [ ] Implement or verify page view tracking (e.g. @next/third-parties)
  - [ ] Test page views and events in production
  - [ ] Create reports or dashboards as needed
- [ ] **Implement Amplitude in DS components** (if applicable)
  - [x] Add event tracking utilities and key events (see README_ANALYTICS.md)
  - [ ] Configure Amplitude API key in .env and production
  - [ ] Test events in production (work card clicks, navigation, case study views, etc.)
  - [ ] Add component-level instrumentation if desired

---

## Project 7: Growth (Time-Based)

**Project outcome:** Ongoing content, reach, and optional ideas

### Milestone 7.1 – Short-term (next 1–3 months)

**Tasks:**

- [ ] Add remaining case studies (Masiv, PayU Latam)
- [ ] Gather testimonials and add to About section
- [ ] Add content enhancements (thumbnails on Work section, filtering by year/type, Related projects on case studies)
- [ ] Add placeholder or first content for Writing, Reading, Experiments pages (or keep coming-soon until ready)
- [ ] Monitor and optimize SEO (Search Console, underperforming pages, backlinks)

### Milestone 7.2 – Medium-term (3–6 months)

**Tasks:**

- [ ] Add blog (layout, first 3–5 articles, RSS, promote on LinkedIn)
- [ ] Add case study enhancements (interactive prototypes, before/after sliders, video walkthroughs e.g. Loom)
- [ ] Add portfolio v2 sections (side projects, design principles page, resources/tools, public AquaDS-style docs)
- [ ] Add nice-to-haves when bandwidth allows (dark mode, contact form (spam protection), “Back to top”, reading progress on case studies)

### Milestone 7.3 – Long-term (6–12 months)

**Tasks:**

- [ ] Build community (newsletter, regular posts, speaking/podcasts)
- [ ] Add advanced offerings (case study templates, design resources/freebies, workshop/course if desired)
- [ ] Run analytics review (quarterly review, conversion tracking, A/B tests on key pages)
- [ ] Execute post-launch promotion (design directories e.g. bestfolios, layers.to, uxfolio, dribbble, behance; backlink maintenance)

### Milestone 7.4 – Future ideas (parking lot)

*No commitment; capture so we don’t forget; prioritize only when they align with goals.*

- Multilingual (EN + ES)
- Interactive design system playground
- Public AquaDS-style component library (open source)
- Design critique service / mentorship program page
- Podcast or video series on design leadership
- Job board or community forum for designers
- Open Graph image generator for case studies
- Case study PDF export or print view
- Integrate Portfolio roadmap with ClickUp

---

## Success metrics (Key Results)

- **At launch:** Lighthouse 95+, unique meta per page, WCAG 2.1 AA, &lt;1s FCP, mobile-friendly, custom domain.
- **30 days post-launch:** 100+ visitors, indexed for “Nicolás Botero Product Designer”, 2+ min session, 50+ case study views, backlinks, 1+ interview request.
- **90 days post-launch:** 500+ visitors, top 10 for 3+ keywords, 5+ min session, 200+ case study views, 10+ backlinks, 5+ interview requests, 3+ testimonials.

---

## Current status

**Recommended next:** If launch incomplete → Project 2 (2.1 → 2.2) then Project 3 (3.1 → 3.2). If launch complete → Project 4 (4.1 → 4.2) → Project 5 (5.1) → Project 6 (6.1 → 6.2) → Project 7 (7.1–7.4 as needed).  
**Blockers:** None

---

## Key decisions

- **Stack:** Next.js 16, Tailwind 4, MDX (gray-matter + next-mdx-remote), Vercel.
- **Scope:** Launch with 3 case studies; add Masiv/PayU later. Blog in Project 7. Dark mode and contact form optional.
- **SEO:** Case studies first, then home (Work, Workflow, About, Resume, Contact).

---

## Change log

- **Feb 2026:** Project 2 split: moved mobile responsiveness from P1 to Milestone 2.1 with subtasks (audit breakpoints, fix layout, touch targets, test nav, document). Created Milestone 2.2 for design-to-code, Storybook, and Design System structure (2.2 grows with components). Updated recommended order and task-order bullets.

---

**Last updated:** February 2026  
**Review:** As needed (iteration)
