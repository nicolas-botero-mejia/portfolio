# Portfolio Website Roadmap

**Project Start:** November 11, 2025  
**Launched:** December 2025  
**Status:** In iteration

**Current focus:** Content structure (Ocean/Bridge → features), quality (a11y, code cleanup), and infrastructure (testing, analytics, CI/CD). Phases 2 and 3 keep their own tasks; pick from the phase you’re working in.

---

## Structure: Project > Milestone > Task > Subtask

| Level | Meaning | In this roadmap |
|-------|---------|-----------------|
| **Project** | A defined body of work with an outcome | Each **Phase** (1, 2, 3, 4) |
| **Milestone** | A delivery target or checkpoint | **Weekly objectives** (Week 1, Week 2, …) or, in Phase 4, focus areas (4.1, 4.2, …) |
| **Task** | A concrete piece of work | Main bullets under a milestone |
| **Subtask** | Smaller steps inside a task | Nested bullets |

Phases stay separate: Phase 2 and Phase 3 are their own projects with their own milestones and tasks. We don’t mix them into Phase 4.

---

## Timeline

| When | What |
|------|------|
| Past | Phase 1 completed; Phases 2–3 in progress or to do |
| Current | Phase 4 (Growth + iteration) plus any open work in Phase 2–3 |

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

**Tasks:**

- [ ] Complete home page sections:
  - [ ] Workflow section (process overview content)
  - [ ] About section (extended bio, skills, fun facts)
  - [ ] Resume section (experience timeline, skills list, download PDF CTA)
  - [ ] Contact section (contact info, social links)
- [ ] Create missing content (workflow 300–500 words, about 500–800 words, resume for web)
- [ ] Add all assets to case studies:
  - [ ] Sainapsis: hero, timeline diagrams, before/after, component grid, metrics
  - [ ] Ocean: hero, architecture diagram, dashboard screenshots, multi-channel, collaboration
  - [ ] AquaDS: hero, component grid, atomic hierarchy, governance flow, metrics
- [ ] Optimize all images (WebP, blur placeholders, alt text, dimensions)
- [ ] Write SEO meta descriptions for all pages

### Milestone: Week 4 – SEO Optimization

**Tasks:**

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

**Tasks:**

- [ ] Polish & animations:
  - [ ] Page transitions (Framer Motion)
  - [ ] Scroll animations for case study sections
  - [ ] Hover states, loading states
  - [ ] 404 page
- [ ] Analytics setup (e.g. Vercel Analytics), privacy policy if using cookies
- [ ] Final QA: re-run AI agents, proofread, test links, accessibility and performance check
- [ ] Custom domain: register, DNS, SSL, env vars
- [ ] Launch preparation: OG images, LinkedIn launch post, optional email announcement
- [ ] Public launch:
  - [ ] Deploy to production with custom domain
  - [ ] Update LinkedIn and GitHub with portfolio link
  - [ ] Share launch post; optional Twitter, email to recruiters
- [ ] Post-launch:
  - [ ] Submit to design directories (bestfolios, layers.to, uxfolio, dribbble, behance)
  - [ ] Monitor analytics and fix bugs

---

## Project 4: Growth + Iteration (current)

**Project outcome:** Continuous improvement, content structure, quality, and infrastructure

### Milestone: 4.1 – Content structure

**Tasks:**

- [ ] **Separate Ocean case study into Features**
  - [ ] List features to extract from Ocean CS
  - [ ] Create feature MDX/content entries and routes
  - [ ] Update Ocean case study to link to or summarize features
- [ ] **Separate Bridge case study into Features**
  - [ ] List features to extract from Bridge CS
  - [ ] Create feature MDX/content entries and routes
  - [ ] Update Bridge case study to link to or summarize features

### Milestone: 4.2 – Quality & maintenance

**Tasks:**

- [ ] **Implement a11y strategy**
  - [ ] Audit site (axe, Lighthouse, keyboard/screen reader)
  - [ ] Fix critical issues and document patterns
  - [ ] Add to PR/launch checklist
- [ ] **Scan project for unused code and libraries**
  - [ ] Run bundle/code analysis
  - [ ] Remove or replace unused deps and dead code

### Milestone: 4.3 – Analytics

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

### Milestone: 4.4 – Testing & deployment

**Tasks:**

- [ ] **Integrate site with Playwright**
  - [ ] Research and setup
  - [ ] Define test scenarios (critical paths)
  - [ ] Create test scripts
  - [ ] Integrate with CI (when CI is in place)
  - [ ] Document and iterate
- [ ] **Integrate site with Chromatic**
  - [ ] Research and setup
  - [ ] Configure project and run initial tests
  - [ ] Add to review workflow
- [ ] **Implement CI/CD pipeline**
  - [ ] Choose/confirm CI tool (e.g. GitHub Actions)
  - [ ] Configure build and lint
  - [ ] Add automated tests (e.g. Playwright)
  - [ ] Deploy to staging and production
  - [ ] Monitor and refine
- [ ] **Verify and refine Vercel deployment**
  - [ ] Confirm env, domain, and previews
  - [ ] Document deploy and rollback steps
  - [ ] Post-deployment checks

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

**Project:** 4 – Growth + iteration (and/or 2–3 if you’re finishing launch work)  
**Focus:** 4.1 Content structure, 4.2 Quality, 4.3 Analytics, 4.4 Testing; or Phase 2/3 milestones as needed  
**Blockers:** None  
**Next:** Pick a project and milestone (e.g. Phase 2 Week 3, or Phase 4 → 4.1).

---

## Key decisions

- **Stack:** Next.js 16, Tailwind 4, MDX (gray-matter + next-mdx-remote), Vercel.
- **Scope:** Launch with 3 case studies; add Masiv/PayU later. Blog in Phase 4. Dark mode and contact form optional.
- **SEO:** Case studies first, then home (Work, Workflow, About, Resume, Contact).

---

## Change log

- **Feb 2026:** Restructured as Project > Milestone > Task > Subtask; Phases = Projects, weekly objectives = Milestones; restored Phase 2 and Phase 3 as full projects (no 4.0 mixing); Phase 4 milestones = 4.1–4.8.
- **Feb 2026 (earlier):** Phase order 1→2→3→4; structure map; carryover and Phase 4 sections.

---

**Last updated:** February 2026  
**Review:** As needed (iteration)
