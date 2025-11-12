# Portfolio Website Roadmap

**Project Start:** November 11, 2025  
**Target Launch:** December 16, 2025 (5 weeks)  
**Status:** 🚧 Phase 1 - Foundation

---

## 📅 Timeline Overview

- **Week 1-2:** Foundation (MVP)
- **Week 3-4:** Content + SEO (Full Launch)
- **Week 5:** Polish + Launch (Public)
- **Ongoing:** Growth + Iteration

---

## 🎯 Phases & Milestones

### Phase 1: Foundation - MVP Launch

**Timeline:** Weeks 1-2 (Nov 11-24, 2025)
**Goal:** Working portfolio with 3 case studies deployed to Vercel

#### Week 1: Setup + Content Migration

**Focus:** Infrastructure + Content

**Tasks:**
- [x] Initialize Next.js 15 project with TypeScript + Tailwind
- [ ] Install dependencies (Contentlayer, Zod, Framer Motion, next-seo)
- [ ] Configure Contentlayer for MDX processing
- [ ] Set up project structure (components, content, lib)
- [ ] Create 5 AI agents in `.claude/agents/`:
  - [ ] SEO Optimizer Agent
  - [ ] Content Auditor Agent
  - [ ] Accessibility Checker Agent
  - [ ] Performance Optimizer Agent
  - [ ] Case Study Migrator Agent
- [ ] Migrate 3 case studies from Career Companion repo:
  - [ ] Sainapsis case study → `content/case-studies/sainapsis.mdx`
  - [ ] Ocean case study → `content/case-studies/ocean.mdx`
  - [ ] AquaDS case study → `content/case-studies/aquads.mdx`
- [ ] Add MDX frontmatter to each case study
- [ ] Migrate home page content
- [ ] Create basic layout components:
  - [ ] Header component
  - [ ] Footer component
  - [ ] Navigation component
- [ ] Deploy to Vercel (staging)

**Deliverable:** Deployed site with 3 case studies (unstyled)

---

#### Week 2: Design System + Pages

**Focus:** UI/UX + Core Pages

**Tasks:**
- [ ] Create Tailwind design tokens:
  - [ ] Color palette (primary, secondary, accent, neutral)
  - [ ] Typography scale (headings, body, captions)
  - [ ] Spacing scale (4px, 8px, 16px, 24px, 32px, etc.)
  - [ ] Shadows, borders, radii
- [ ] Build component library:
  - [ ] Button component (primary, secondary, ghost variants)
  - [ ] Card component
  - [ ] Badge component
  - [ ] Typography components (H1, H2, H3, Body, Caption)
  - [ ] Image component (with blur placeholder)
  - [ ] Link component (internal, external)
- [ ] Build pages:
  - [ ] Home page (`app/page.tsx`)
    - [ ] Hero section
    - [ ] Featured work section (3 case studies)
    - [ ] About teaser
    - [ ] Contact CTA
  - [ ] Work overview page (`app/work/page.tsx`)
  - [ ] Case study template (`app/work/[slug]/page.tsx`)
  - [ ] Contact page (`app/contact/page.tsx`)
- [ ] Collect/create assets:
  - [ ] Professional headshot
  - [ ] Case study hero images (placeholder if needed)
  - [ ] Favicon
- [ ] Configure SEO basics:
  - [ ] Root metadata in `app/layout.tsx`
  - [ ] Sitemap configuration
  - [ ] Robots.txt
- [ ] Mobile responsiveness testing

**Deliverable:** Styled, functional portfolio with 3 case studies

**Milestone:** ✅ **MVP Launch** - Portfolio deployed and shareable

---

### Phase 2: Content + SEO - Full Launch

**Timeline:** Weeks 3-4 (Nov 25 - Dec 8, 2025)
**Goal:** Complete, SEO-optimized portfolio ready for public launch

#### Week 3: Complete Content

**Focus:** Missing Pages + Assets

**Tasks:**
- [ ] Write and build additional pages:
  - [ ] About page (`app/about/page.tsx`)
    - [ ] Extended biography
    - [ ] Skills/expertise section
    - [ ] Workflow/process section
    - [ ] Fun facts/personal touch
  - [ ] Resume page (`app/resume/page.tsx`)
    - [ ] Experience timeline
    - [ ] Skills list
    - [ ] Download PDF CTA
- [ ] Create missing content:
  - [ ] Workflow/process content (300-500 words)
  - [ ] Extended about copy (500-800 words)
  - [ ] Resume content formatted for web
- [ ] Add all assets to case studies:
  - [ ] Sainapsis case study images:
    - [ ] Hero image
    - [ ] Timeline diagrams
    - [ ] Before/after comparisons
    - [ ] Component grid
    - [ ] Metrics dashboard
  - [ ] Ocean case study images:
    - [ ] Hero image
    - [ ] Architecture diagram
    - [ ] Dashboard screenshots
    - [ ] Multi-channel flow
    - [ ] Collaboration diagram
  - [ ] AquaDS case study images:
    - [ ] Hero image
    - [ ] Component library grid
    - [ ] Atomic design hierarchy
    - [ ] Governance flow
    - [ ] Metrics dashboard
- [ ] Optimize all images:
  - [ ] Convert to WebP format
  - [ ] Generate blur placeholders
  - [ ] Add proper alt text
  - [ ] Resize to appropriate dimensions
- [ ] Write SEO meta descriptions for all pages

**Deliverable:** Complete portfolio with all content and assets

---

#### Week 4: SEO Optimization

**Focus:** Search Engine Optimization + Quality

**Tasks:**
- [ ] Implement advanced SEO:
  - [ ] Schema.org markup:
    - [ ] Person schema (About page)
    - [ ] CreativeWork schema (Case studies)
    - [ ] Article schema (Case studies)
  - [ ] Open Graph tags for all pages
  - [ ] Twitter Card tags
  - [ ] Canonical URLs
- [ ] Run AI agents on all pages:
  - [ ] **SEO Optimizer Agent** → analyze each page, implement suggestions
  - [ ] **Content Auditor Agent** → review all copy, fix issues
  - [ ] **Accessibility Checker Agent** → validate WCAG compliance
  - [ ] **Performance Optimizer Agent** → optimize speed
- [ ] SEO enhancements:
  - [ ] Add internal linking between case studies
  - [ ] Add external links to companies (Sainapsis, RouteMobile, Masiv)
  - [ ] Optimize heading hierarchy on all pages
  - [ ] Add breadcrumb navigation
  - [ ] Create XML sitemap
- [ ] Technical optimization:
  - [ ] Image lazy loading
  - [ ] Font optimization (next/font)
  - [ ] Bundle size reduction
  - [ ] Code splitting optimization
- [ ] Testing:
  - [ ] Mobile testing (3+ devices/browsers)
  - [ ] Cross-browser testing (Chrome, Firefox, Safari)
  - [ ] Lighthouse audits (target: 95+ on all metrics)
  - [ ] Core Web Vitals validation
- [ ] Google Search Console setup:
  - [ ] Verify ownership
  - [ ] Submit sitemap
  - [ ] Check indexing status

**Deliverable:** SEO-optimized, performant portfolio

**Milestone:** ✅ **Full Launch Ready** - Portfolio complete and optimized

---

### Phase 3: Polish + Public Launch

**Timeline:** Week 5 (Dec 9-16, 2025)
**Goal:** Public launch with polish and promotion

#### Week 5: Final Polish + Launch

**Focus:** Animations, QA, Promotion

**Tasks:**
- [ ] Polish & animations:
  - [ ] Add page transitions (Framer Motion)
  - [ ] Add scroll animations for case study sections
  - [ ] Add hover states for interactive elements
  - [ ] Add loading states
  - [ ] Add 404 page
- [ ] Optional enhancements:
  - [ ] Implement dark mode toggle
  - [ ] Add contact form (with spam protection)
  - [ ] Add "Back to top" button for long pages
  - [ ] Add reading progress indicator for case studies
- [ ] Analytics setup:
  - [ ] Configure Vercel Analytics
  - [ ] Add privacy policy (if using cookies)
- [ ] Final QA:
  - [ ] Re-run all AI agents for final check
  - [ ] Proofread all copy (2x)
  - [ ] Test all links (internal and external)
  - [ ] Test form submissions (if applicable)
  - [ ] Accessibility final check
  - [ ] Performance final check
- [ ] Custom domain setup:
  - [ ] Register domain (nicolasbotero.com or similar)
  - [ ] Configure DNS
  - [ ] Enable SSL
  - [ ] Update environment variables
- [ ] Launch preparation:
  - [ ] Create Open Graph images for social sharing
  - [ ] Write launch post for LinkedIn
  - [ ] Prepare email announcement (optional)
- [ ] **🚀 Public Launch:**
  - [ ] Deploy to production with custom domain
  - [ ] Update LinkedIn profile with portfolio link
  - [ ] Update GitHub profile with portfolio link
  - [ ] Share launch post on LinkedIn
  - [ ] Share on Twitter (if applicable)
  - [ ] Email portfolio to recruiters/contacts (optional)
- [ ] Post-launch:
  - [ ] Submit to design directories:
    - [ ] bestfolios.com
    - [ ] layers.to
    - [ ] uxfolio.com
    - [ ] dribbble.com (update profile)
    - [ ] behance.net (create project)
  - [ ] Monitor analytics for first week
  - [ ] Fix any bugs reported

**Deliverable:** Launched portfolio at custom domain

**Milestone:** ✅ **Public Launch** - Portfolio live and promoted

---

### Phase 4: Growth + Iteration

**Timeline:** Ongoing (Dec 16, 2025+)
**Goal:** Continuous improvement and content expansion

#### Short-Term (1-3 Months)
- [ ] Add remaining case studies:
  - [ ] Masiv (2018-21) case study
  - [ ] PayU Latam (2016-18) case study
- [ ] Gather testimonials:
  - [ ] Request testimonial from Sainapsis colleagues
  - [ ] Request testimonial from Masiv colleagues
  - [ ] Add testimonials section to About page
- [ ] Content enhancements:
  - [ ] Add project thumbnails/previews to Work page
  - [ ] Add filtering to Work page (by year, type)
  - [ ] Add "Related projects" section to case studies
- [ ] SEO iteration:
  - [ ] Monitor Google Search Console
  - [ ] Optimize underperforming pages
  - [ ] Build backlinks (guest posts, interviews, etc.)

#### Medium-Term (3-6 Months)

- [ ] Blog section:
  - [ ] Design blog layout
  - [ ] Write first 3-5 articles on design systems, leadership, etc.
  - [ ] Set up RSS feed
  - [ ] Promote articles on LinkedIn
- [ ] Interactive features:
  - [ ] Embed interactive prototypes in case studies
  - [ ] Add before/after sliders for visual comparisons
  - [ ] Add video walkthroughs (Loom recordings)
- [ ] Portfolio v2 enhancements:
  - [ ] Side projects showcase
  - [ ] Design principles page
  - [ ] Resources/tools page
  - [ ] Design system documentation (public AquaDS docs)

#### Long-Term (6-12 Months)

- [ ] Community building:
  - [ ] Newsletter signup (Substack, ConvertKit, etc.)
  - [ ] Regular blog posts (2-4 per month)
  - [ ] Speaking engagements (conferences, podcasts)
- [ ] Advanced features:
  - [ ] Case study templates download
  - [ ] Design resources/freebies
  - [ ] Workshop/course offering (if interested)
- [ ] Analytics review:
  - [ ] Quarterly traffic analysis
  - [ ] Conversion tracking (interview requests)
  - [ ] A/B testing on key pages

---

## 📊 Success Metrics

### Launch Success (Week 5)

- [ ] Lighthouse score 95+ on all categories
- [ ] All pages have unique meta titles/descriptions
- [ ] WCAG 2.1 AA compliant
- [ ] <1s First Contentful Paint
- [ ] Mobile-responsive (tested on 3+ devices)
- [ ] Zero accessibility violations
- [ ] Deployed to custom domain

### 30-Day Success


- [ ] 100+ unique visitors
- [ ] Indexed by Google for "Nicolás Botero Product Designer"
- [ ] 2+ minute average session duration
- [ ] 50+ case study page views
- [ ] 5+ backlinks to portfolio
- [ ] 1+ interview request

### 90-Day Success


- [ ] 500+ unique visitors
- [ ] Top 10 ranking for 3+ target keywords
- [ ] 5+ minute average session duration
- [ ] 200+ case study page views
- [ ] 10+ backlinks to portfolio
- [ ] 5+ interview requests
- [ ] 3+ testimonials collected

---

## 🚧 Current Status

**Phase:** Phase 1 - Foundation  
**Week:** Week 1 - Setup + Content Migration  
**Progress:** 10%  
**Blockers:** None  
**Next Task:** Initialize Next.js project

---

## 📝 Change Log

### **November 11, 2025**
- ✅ Created initial roadmap
- ✅ Defined 4 phases with detailed tasks
- ✅ Set launch target: December 16, 2025

---

## 🎯 Key Decisions

### Tech Stack

- **Framework:** Next.js 15 (chosen for SEO, performance, ease of deployment)
- **Styling:** Tailwind CSS (chosen for speed, consistency, small bundle size)
- **Content:** MDX + Contentlayer (chosen for type safety, flexibility)
- **Hosting:** Vercel (chosen for free tier, instant deploys, edge network)

### Scope Decisions


- **Launch with 3 case studies** (Sainapsis, Ocean, AquaDS) - Add Masiv/PayU post-launch
- **No blog at launch** - Add in Phase 4 after validating portfolio traction
- **Dark mode optional** - Nice-to-have, not required for launch
- **Contact form optional** - Email link sufficient for launch

### SEO Priorities


- **Primary focus:** Case study pages (longest content, most valuable)
- **Secondary focus:** Home page, About page
- **Tertiary focus:** Resume, Contact pages

---

## 💡 Future Ideas (Parking Lot)

Ideas for future consideration (not planned for current phases):

- Multilingual support (English + Spanish)
- Interactive design system playground
- Public component library (AquaDS as open source)
- Design critique service offering
- Mentorship program page
- Podcast/video series on design leadership
- Community forum for designers
- Job board for design roles

---

**Last Updated:** November 11, 2025  
**Next Review:** November 18, 2025 (End of Week 1)