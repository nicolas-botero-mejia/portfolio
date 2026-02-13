# Portfolio Website Roadmap

**Project Start:** November 11, 2025  
**Launched:** December 2025  
**Status:** In iteration

**Current focus:** Follow the recommended order below. If launch isn’t complete, do Project 2 → 3 first; then Project 4 in the sequence given.

---

## Structure: Project > Milestone > Task > Subtask

| Level | Meaning | In this roadmap |
|-------|---------|-----------------|
| **Project** | A defined body of work with an outcome | Each **Phase** (1, 2, 3, 4) |
| **Milestone** | A delivery target or checkpoint | **Weekly objectives** (Week 1, 2, …) or Phase 4 focus areas (4.1, 4.2, …) |
| **Task** | A concrete piece of work | Main bullets under a milestone |
| **Subtask** | Smaller steps inside a task | Nested bullets |

---

## Recommended order (what to do first)

Use this sequence so work builds on itself and nothing is blocked.

**Projects (in order):** 1 → 2 → 3 → 4. Finish launch (2 and 3) before iteration (4) unless you’re deliberately iterating in parallel.

**Within each project:**

| Project | Milestone order | Why |
|---------|-----------------|-----|
| **1** | Week 1 → Week 2 | Setup before design system (done) |
| **2** | Week 3 → Week 4 | Content before SEO |
| **3** | Week 5 (single milestone) | Custom domain & polish → QA → launch prep → deploy → post-launch |
| **4** | 4.0 → 4.2 → 4.4 → 4.1 → 4.3 → 4.5 → 4.6 → 4.7 → 4.8 | Architecture & DS (4.0) first if in progress; then quality & testing; then content structure; analytics; time-based; parking lot last |

**Task order within key milestones:**

- **Project 2, Week 3:** Create missing content → Complete home sections → Add case study assets → Optimize images → Write SEO meta.
- **Project 3, Week 5:** Custom domain → Polish & animations → Analytics setup → Final QA → Launch prep → Public launch → Post-launch.
- **Project 4, 4.2:** A11y (audit → fix → document) before code cleanup (scan → remove).
- **Project 4, 4.4:** Verify Vercel first → CI/CD pipeline → Playwright → Chromatic (so tests run in CI).

---

## Timeline

| When | What |
|------|------|
| Past | Project 1 completed |
| Current | Projects 2, 3, 4 (in recommended order above) |

---

## Project 1: Foundation – MVP

**Project outcome:** MVP launched

### Milestone: Week 1 – Setup + Content Migration

**Tasks:**

- [x] Initialize Next.js 16 project with TypeScript + Tailwind
- [x] Install dependencies (gray-matter, next-mdx-remote, Zod, Framer Motion, next-seo)
- [x] Configure MDX processing (gray-matter + next-mdx-remote)
- [x] Set up project structure (components, content, lib, data)
- [x] Create 5 AI agents in `.claude/agents/`:
  - [x] SEO Optimizer Agent
  - [x] Content Auditor Agent
  - [x] Accessibility Checker Agent
  - [x] Performance Optimizer Agent
  - [x] Case Study Migrator Agent
- [x] Migrate 3 case studies (Sainapsis, Ocean, AquaDS) and frontmatter
- [x] Migrate home page content
- [x] Create basic layout components (Header, Footer, Navigation)
- [x] Deploy to Vercel (staging)

### Milestone: Week 2 – Design System + Pages

**Tasks:**

- [x] Create Tailwind design tokens (color, typography, spacing, shadows, radii)
- [x] Build component library (Button, Card, Badge, typography, Image, Link)
- [x] Build home page and case study template
- [x] Collect/create assets; configure SEO basics (metadata, sitemap, robots.txt)
- [ ] Mobile responsiveness testing (ongoing)

---

## Project 2: Content + SEO – Full Launch

**Project outcome:** Full launch ready

### Milestone: Week 3 – Complete Content

**Tasks:** *(Order: content first, then assets, then optimization, then meta.)*

- [ ] Create missing content (workflow 300–500 words, about 500–800 words, resume for web)
- [ ] Complete home page sections:
  - [ ] Workflow section (process overview content)
  - [ ] About section (extended bio, skills, fun facts)
  - [ ] Resume section (experience timeline, skills list, download PDF CTA)
  - [ ] Contact section (contact info, social links)
- [ ] Add all assets to case studies:
  - [ ] Sainapsis: hero, timeline diagrams, before/after, component grid, metrics
  - [ ] Ocean: hero, architecture diagram, dashboard screenshots, multi-channel, collaboration
  - [ ] AquaDS: hero, component grid, atomic hierarchy, governance flow, metrics
- [ ] Optimize all images (WebP, blur placeholders, alt text, dimensions)
- [ ] Write SEO meta descriptions for all pages

### Milestone: Week 4 – SEO Optimization

**Tasks:** *(Order: implement SEO → run agents → enhancements → technical → test → Search Console.)*

- [ ] Implement advanced SEO:
  - [ ] Schema.org (Person, CreativeWork, Article)
  - [ ] Open Graph and Twitter Card tags
  - [ ] Canonical URLs
- [ ] Run AI agents on all pages (SEO, Content Auditor, Accessibility, Performance)
- [ ] SEO enhancements: internal linking, external company links, heading hierarchy, breadcrumbs, XML sitemap
- [ ] Technical optimization: lazy loading, font optimization, bundle size, code splitting
- [ ] Testing: mobile, cross-browser, Lighthouse 95+, Core Web Vitals
- [ ] Google Search Console: verify, submit sitemap, check indexing

---

## Project 3: Polish + Public Launch

**Project outcome:** Public launch

### Milestone: Week 5 – Final Polish + Launch

**Tasks:** *(Order: domain & foundation → polish → analytics → QA → prep → launch → post-launch.)*

- [ ] Custom domain: register, DNS, SSL, env vars
- [ ] Polish & animations:
  - [ ] Page transitions (Framer Motion)
  - [ ] Scroll animations for case study sections
  - [ ] Hover states, loading states
  - [ ] 404 page
- [ ] Analytics setup (e.g. Vercel Analytics), privacy policy if using cookies
- [ ] Final QA: re-run AI agents, proofread, test links, accessibility and performance check
- [ ] Launch preparation: OG images, LinkedIn launch post, optional email announcement
- [ ] Public launch:
  - [ ] Deploy to production with custom domain
  - [ ] Update LinkedIn and GitHub with portfolio link
  - [ ] Share launch post; optional Twitter, email to recruiters
- [ ] Post-launch:
  - [ ] Submit to design directories (bestfolios, layers.to, uxfolio, dribbble, behance)
  - [ ] Monitor analytics and fix bugs

---

## Project 4: Growth + Iteration

**Project outcome:** Continuous improvement, content structure, quality, and infrastructure

*Milestone order: 4.0 → 4.2 → 4.4 → 4.1 → 4.3 → 4.5 → 4.6 → 4.7 → 4.8 (architecture & DS first if in progress, then quality & testing, etc.).*

### Milestone: 4.0 – Architecture, tooling & design system *(in progress)*

**Tasks:**

- [x] Redefine site navigation structure
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
  - [ ] Extract script (plugin API): walk Figma variable collections, output JSON (Figma export format)
  - [ ] Import pipeline: create script (e.g. `scripts/importFigmaTokens.ts`) to consume JSON and merge into token sources
  - [ ] Define namespace/overrides: e.g. `figma/` or `imported/` prefix for Figma-origin tokens; optional `tokenOverrides.json` for explicit overrides
  - [ ] Implement conflict resolution: new keys from Figma → add; same path → code wins unless override file says otherwise
  - [ ] (Optional) Component spec extraction from Figma (after variables are stable)
- [ ] **Integrate DS components with Storybook**
  - [ ] Set up Storybook
  - [ ] Organize components
  - [ ] Create stories
  - [ ] Integrate add-ons
  - [ ] Test components
  - [ ] Optimize workflow
  - [ ] Review and finalize
- [ ] **Create Design System structure**
  - [x] Implement token logic
  - [x] Add Radix UI
  - [ ] Create card component
  - [ ] Create badge component
  - [x] Add theme support (light/dark)

### Milestone: 4.2 – Quality & maintenance *(do first in Phase 4 after 4.0)*

**Tasks:** *(Order: a11y before code cleanup so patterns are in place.)*

- [ ] **Implement a11y strategy**
  - [ ] Audit site (axe, Lighthouse, keyboard/screen reader)
  - [ ] Fix critical issues and document patterns
  - [ ] Add to PR/launch checklist
- [ ] **Scan project for unused code and libraries**
  - [ ] Run bundle/code analysis
  - [ ] Remove or replace unused deps and dead code

### Milestone: 4.4 – Testing & deployment *(do second in Phase 4)*

**Tasks:** *(Order: verify Vercel → CI/CD → Playwright → Chromatic so tests run in CI.)*

- [ ] **Verify and refine Vercel deployment**
  - [ ] Confirm env, domain, and previews
  - [ ] Document deploy and rollback steps
  - [ ] Post-deployment checks
- [ ] **Implement CI/CD pipeline**
  - [ ] Choose/confirm CI tool (e.g. GitHub Actions)
  - [ ] Configure build and lint
  - [ ] Add automated tests (e.g. Playwright)
  - [ ] Deploy to staging and production
  - [ ] Monitor and refine
- [ ] **Integrate site with Playwright**
  - [ ] Research and setup
  - [ ] Define test scenarios (critical paths)
  - [ ] Create test scripts
  - [ ] Integrate with CI
  - [ ] Document and iterate
- [ ] **Integrate site with Chromatic**
  - [ ] Research and setup
  - [ ] Configure project and run initial tests
  - [ ] Add to review workflow

### Milestone: 4.1 – Content structure *(do third in Phase 4)*

**Tasks:**

- [ ] **Separate Ocean case study into Features**
  - [ ] List features to extract from Ocean CS
  - [ ] Create feature MDX/content entries and routes
  - [ ] Update Ocean case study to link to or summarize features
- [ ] **Separate Bridge case study into Features**
  - [ ] List features to extract from Bridge CS
  - [ ] Create feature MDX/content entries and routes
  - [ ] Update Bridge case study to link to or summarize features

### Milestone: 4.3 – Analytics *(do fourth in Phase 4)*

**Tasks:**

- [ ] **Implement GA4 strategy**
  - [ ] Audit current analytics setup
  - [ ] Define key metrics and goals
  - [ ] Set up GA4 property
  - [ ] Implement event tracking
  - [ ] Create reports/dashboards (if needed)
- [ ] **Implement Amplitude in DS components** (if applicable)
  - [ ] Research and preparation
  - [ ] Event tracking plan
  - [ ] Component usage instrumentation
  - [ ] Integration, testing, documentation

### Milestone: 4.5 – Short-term (next 1–3 months)

**Tasks:**

- [ ] Add remaining case studies (Masiv, PayU Latam)
- [ ] Gather testimonials and add to About
- [ ] Content: thumbnails on Work section, filtering (year/type), “Related projects” on case studies
- [ ] SEO: monitor Search Console, optimize underperforming pages, build backlinks

### Milestone: 4.6 – Medium-term (3–6 months)

**Tasks:**

- [ ] Blog: layout, first 3–5 articles, RSS, promote on LinkedIn
- [ ] Case studies: interactive prototypes, before/after sliders, video walkthroughs (Loom)
- [ ] Portfolio v2: side projects, design principles page, resources/tools, public AquaDS-style docs
- [ ] Nice-to-haves when bandwidth allows: dark mode, contact form (spam protection), “Back to top”, reading progress on case studies

### Milestone: 4.7 – Long-term (6–12 months)

**Tasks:**

- [ ] Community: newsletter, regular posts, speaking/podcasts
- [ ] Advanced: case study templates, design resources/freebies, workshop/course (if desired)
- [ ] Analytics: quarterly review, conversion tracking, A/B tests on key pages
- [ ] Post-launch promotion: design directories (bestfolios, layers.to, uxfolio, dribbble, behance), backlink maintenance

### Milestone: 4.8 – Future ideas (parking lot – no commitment)

Capture so we don’t forget; prioritize only when they align with goals.

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

**Recommended next:** If launch incomplete → Project 2 (Week 3 → Week 4) then Project 3 (Week 5). If launch complete → Project 4 in order: 4.0 (finish in-progress) → 4.2 → 4.4 → 4.1 → 4.3, then 4.5–4.7 as needed.  
**Blockers:** None

---

## Key decisions

- **Stack:** Next.js 16, Tailwind 4, MDX (gray-matter + next-mdx-remote), Vercel.
- **Scope:** Launch with 3 case studies; add Masiv/PayU later. Blog in Phase 4. Dark mode and contact form optional.
- **SEO:** Case studies first, then home (Work, Workflow, About, Resume, Contact).

---

## Change log

- **Feb 2026:** Added recommended order (projects → milestones → tasks); reordered Phase 4 milestones to 4.2 → 4.4 → 4.1 → 4.3 → 4.5 → 4.6 → 4.7 → 4.8; reordered tasks in Project 2 Week 3, Project 3 Week 5, Project 4 (4.2, 4.4) with short “why” notes.
- **Feb 2026 (earlier):** Project > Milestone > Task > Subtask; Phases 2–3 restored as full projects; Phase 4 structure.

---

**Last updated:** February 2026  
**Review:** As needed (iteration)
