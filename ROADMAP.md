# Portfolio Website Roadmap

**Project Start:** November 11, 2025  
**Launched:** December 2025  
**Status:** In iteration

**Current focus:** Follow the recommended order below. If launch isn’t complete, do Project 2 → 3 first; then Projects 4–7 in the sequence given.

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

**Projects (in order):** 1 → 2 → 3 → 4 → 5 → 6 → 7. Finish launch (2, 3) before iteration (4–7) unless you’re deliberately iterating in parallel.

**Within each project:**

| Project | Milestone order | Why |
|---------|-----------------|-----|
| **1** | 1.1 → 1.2 | Setup before design system (done) |
| **2** | 2.1 → 2.2 | Content before SEO |
| **3** | 3.1 | Single milestone: polish → launch → post-launch |
| **4** | 4.1 | Architecture & design system (in progress) |
| **5** | 5.1 → 5.2 | Quality & maintenance before testing & deployment |
| **6** | 6.1 → 6.2 | Content structure before analytics |
| **7** | 7.1 → 7.2 → 7.3 → 7.4 | Short → medium → long term → parking lot |

**Task order within key milestones:**

- **Project 2, 2.1:** Create missing content → Complete home sections → Add case study assets → Optimize images → Write SEO meta.
- **Project 3, 3.1:** Custom domain → Polish & animations → Analytics setup → Final QA → Launch prep → Public launch → Post-launch.
- **Project 5, 5.1:** A11y (audit → fix → document) before code cleanup (scan → remove).
- **Project 5, 5.2:** Verify Vercel first → CI/CD pipeline → Playwright → Chromatic.

---

## Timeline

| When | What |
|------|------|
| Past | Project 1 completed |
| Current | Projects 2, 3, 4, 5, 6, 7 (in recommended order above) |

---

## Project 1: Foundation – MVP

**Project outcome:** MVP launched

### Milestone 1.1 – Setup + Content Migration

**Tasks:**

- [x] Initialize Next.js 16 project with TypeScript + Tailwind
- [x] Install dependencies (gray-matter, next-mdx-remote, Zod, Framer Motion, next-seo)
- [x] Configure MDX processing (gray-matter + next-mdx-remote)
- [x] Set up project structure (components, content, lib, data)
- [x] Create 5 AI agents in `.claude/agents/` (SEO, Content Auditor, Accessibility, Performance, Case Study Migrator)
- [x] Migrate 3 case studies (Sainapsis, Ocean, AquaDS) and frontmatter
- [x] Migrate home page content
- [x] Create basic layout components (Header, Footer, Navigation)
- [x] Deploy to Vercel (staging)

### Milestone 1.2 – Design System + Pages

**Tasks:**

- [x] Create Tailwind design tokens (color, typography, spacing, shadows, radii)
- [x] Build component library (Button, Card, Badge, typography, Image, Link)
- [x] Build home page and case study template
- [x] Collect or create assets and configure SEO basics (metadata, sitemap, robots.txt)
- [ ] Run mobile responsiveness testing (ongoing)

---

## Project 2: Content + SEO – Full Launch

**Project outcome:** Full launch ready

### Milestone 2.1 – Complete Content

**Tasks:** *(Order: content first, then assets, then optimization, then meta.)*

- [ ] Create missing content (workflow 300–500 words, about 500–800 words, resume for web)
- [ ] Complete home page sections (Workflow, About, Resume, Contact)
- [ ] Add all assets to case studies (Sainapsis, Ocean, AquaDS images and diagrams)
- [ ] Optimize all images (WebP, blur placeholders, alt text, dimensions)
- [ ] Write SEO meta descriptions for all pages

### Milestone 2.2 – SEO Optimization

**Tasks:** *(Order: implement SEO → run agents → enhancements → technical → test → Search Console.)*

- [ ] Implement advanced SEO (Schema.org, Open Graph, Twitter Card, canonical URLs)
- [ ] Run AI agents on all pages (SEO, Content Auditor, Accessibility, Performance)
- [ ] Add SEO enhancements (internal/external links, headings, breadcrumbs, sitemap)
- [ ] Apply technical optimization (lazy loading, fonts, bundle size, code splitting)
- [ ] Run testing (mobile, cross-browser, Lighthouse 95+, Core Web Vitals)
- [ ] Configure Google Search Console (verify, submit sitemap, check indexing)

---

## Project 3: Polish + Public Launch

**Project outcome:** Public launch

### Milestone 3.1 – Final Polish + Launch

**Tasks:** *(Order: domain → polish → analytics → QA → prep → launch → post-launch.)*

- [ ] Set up custom domain (register, DNS, SSL, env vars)
- [ ] Add polish and animations (transitions, scroll, hover, loading, 404)
- [ ] Set up analytics (e.g. Vercel Analytics) and add privacy policy if using cookies
- [ ] Run final QA (AI agents, proofread, links, a11y, performance)
- [ ] Complete launch preparation (OG images, LinkedIn post, optional email)
- [ ] Execute public launch (deploy to production, update LinkedIn/GitHub, share)
- [ ] Complete post-launch tasks (design directories, monitor analytics, fix bugs)

---

## Project 4: Architecture & Design System

**Project outcome:** Architecture, tooling, and design system in place

### Milestone 4.1 – Architecture, tooling & design system *(in progress)*

**Tasks:**

- [x] Redefine site navigation structure (content types, routes, sidebar)
- [x] Integrate Figma MCP with Cursor
- [x] Organize site architecture
  - [x] Separate types of data
  - [x] Implement use of constants to remove hard coded data
  - [x] Migrate content data from config files
  - [x] Update documentation
- [x] Integrate code-to-design logic
- [x] Add error handling logic to the project
- [x] Integrate ChromeDevTools to Cursor
- [ ] **Integrate design-to-code logic**
  - [ ] Write extract script (plugin API): walk Figma variable collections, output JSON
  - [ ] Add import pipeline (script to consume JSON and merge into token sources)
  - [ ] Define namespace and overrides (e.g. `figma/` prefix; optional override file)
  - [ ] Implement conflict resolution (new keys add; same path code wins unless override)
  - [ ] (Optional) Add component spec extraction from Figma (after variables stable)
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
  - [ ] Create Card component (variants, docs)
  - [ ] Create Badge component (variants, docs)
  - [x] Add theme support (light/dark)

---

## Project 5: Quality, Testing & Deployment

**Project outcome:** Site stable, tested, and deployable

### Milestone 5.1 – Quality & maintenance

**Tasks:** *(Order: a11y before code cleanup.)*

- [ ] **Implement a11y strategy**
  - [ ] Audit site (axe, Lighthouse, keyboard/screen reader)
  - [ ] Fix critical issues and document patterns
  - [ ] Add a11y checks to PR/launch checklist
- [ ] **Scan project for unused code and libraries**
  - [ ] Run bundle and code analysis
  - [ ] Remove or replace unused dependencies and dead code

### Milestone 5.2 – Testing & deployment

**Tasks:** *(Order: verify Vercel → CI/CD → Playwright → Chromatic.)*

- [ ] **Verify and refine Vercel deployment** (env, domain, previews, deploy/rollback steps, post-deploy checks)
- [ ] **Implement CI/CD pipeline** (tool, build/lint, tests, deploy staging/prod, monitor)
- [ ] **Integrate site with Playwright** (research, scenarios, scripts, CI, document)
- [ ] **Integrate site with Chromatic** (research, setup, configure, tests, review workflow)

---

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

### Milestone 6.2 – Analytics

**Tasks:**

- [ ] **Implement GA4 strategy** (audit, metrics, property, event tracking, reports)
- [ ] **Implement Amplitude in DS components** (if applicable) (research, events, component usage, integration, testing, docs)

---

## Project 7: Growth (Time-Based)

**Project outcome:** Ongoing content, reach, and optional ideas

### Milestone 7.1 – Short-term (next 1–3 months)

**Tasks:**

- [ ] Add remaining case studies (Masiv, PayU Latam)
- [ ] Gather testimonials and add to About section
- [ ] Add content enhancements (thumbnails on Work section, filtering (year/type), “Related projects” on case studies)
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

---

## Success metrics (Key Results)

- **At launch:** Lighthouse 95+, unique meta per page, WCAG 2.1 AA, &lt;1s FCP, mobile-friendly, custom domain.
- **30 days post-launch:** 100+ visitors, indexed for “Nicolás Botero Product Designer”, 2+ min session, 50+ case study views, backlinks, 1+ interview request.
- **90 days post-launch:** 500+ visitors, top 10 for 3+ keywords, 5+ min session, 200+ case study views, 10+ backlinks, 5+ interview requests, 3+ testimonials.

---

## Current status

**Recommended next:** If launch incomplete → Project 2 (2.1 → 2.2) then Project 3 (3.1). If launch complete → Project 4 (4.1, finish in-progress) → Project 5 (5.1 → 5.2) → Project 6 (6.1 → 6.2) → Project 7 (7.1–7.4 as needed).  
**Blockers:** None

---

## Key decisions

- **Stack:** Next.js 16, Tailwind 4, MDX (gray-matter + next-mdx-remote), Vercel.
- **Scope:** Launch with 3 case studies; add Masiv/PayU later. Blog in Project 7. Dark mode and contact form optional.
- **SEO:** Case studies first, then home (Work, Workflow, About, Resume, Contact).

---

## Change log

- **Feb 2026:** Standardized writing style (industry-aligned): Structure table and “Writing style” note; projects/milestones = outcome or deliverable; tasks/subtasks = imperative verbs (Implement, Add, Create, Configure, Run, Set up, etc.). Fixed passive or noun-only task phrasing across the roadmap.
- **Feb 2026 (earlier):** Removed week numbering; Project.Milestone numbering (1.1, 1.2, …); split Project 4 into Projects 4–7; recommended order; design-to-code subtasks.

---

**Last updated:** February 2026  
**Review:** As needed (iteration)
