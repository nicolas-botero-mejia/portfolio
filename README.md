# Nicolás Botero - Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> SEO-optimized portfolio showcasing 10+ years of product design leadership, design systems, and strategic transformation work.

**Live Site:** [nicolasbotero.com](#) *(coming soon)*
**Status:** 🚧 In Development
**Current Phase:** Phase 1 - Foundation

---

## 🎯 Project Overview

This portfolio showcases my work as a Product Designer, featuring detailed case studies with quantified impact:

- **Sainapsis** - 16x productivity transformation through design system & process innovation
- **Ocean** - Global CPaaS platform serving 300M+ messages/month across Colombia & India
- **AquaDS** - Design system enabling 80-90% component adoption and 80% faster delivery

**Core Features:**
- ⚡️ Blazing-fast performance (Next.js 15 + SSG)
- 🎨 MDX-powered case studies with type-safe content
- 🔍 SEO-optimized for design leadership keywords
- ♿️ WCAG 2.1 AA accessible
- 📱 Mobile-first responsive design
- 🤖 AI agents for content optimization

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Visit http://localhost:3000

# Build for production
npm run build

# Preview production build
npm start
```

---

## 📁 Project Structure

```
portfolio/
├── .claude/
│   └── agents/                    # AI agents for optimization
│       ├── seo_optimizer_agent.md
│       ├── content_auditor_agent.md
│       ├── accessibility_checker_agent.md
│       ├── performance_optimizer_agent.md
│       └── case_study_migrator_agent.md
│
├── app/                           # Next.js App Router
│   ├── page.tsx                   # Home page
│   ├── work/
│   │   ├── page.tsx              # Work overview
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Case study template
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── resume/
│   │   └── page.tsx              # Resume page
│   └── contact/
│       └── page.tsx              # Contact page
│
├── components/
│   ├── ui/                        # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Typography.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   └── home/
│       ├── Hero.tsx
│       ├── FeaturedWork.tsx
│       ├── About.tsx
│       └── Contact.tsx
│
├── content/
│   ├── case-studies/              # MDX case studies
│   │   ├── sainapsis.mdx
│   │   ├── ocean.mdx
│   │   └── aquads.mdx
│   └── pages/                     # MDX pages
│       ├── about.mdx
│       └── workflow.mdx
│
├── public/
│   ├── images/
│   │   ├── case-studies/
│   │   │   ├── sainapsis/
│   │   │   ├── ocean/
│   │   │   └── aquads/
│   │   └── headshot.jpg
│   └── resume.pdf
│
├── lib/
│   ├── contentlayer.ts            # Content utilities
│   └── seo.ts                     # SEO utilities
│
├── contentlayer.config.ts         # Contentlayer configuration
├── tailwind.config.ts             # Tailwind configuration
└── next.config.js                 # Next.js configuration
```

---

## 🛠 Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Wrap Balancer** - Better typography

### Content Management
- **Contentlayer** - Type-safe MDX content
- **MDX** - Markdown with React components
- **Zod** - Schema validation

### SEO & Analytics
- **next-seo** - SEO optimization
- **next-sitemap** - Automatic sitemap generation
- **Vercel Analytics** - Privacy-friendly analytics

### Deployment
- **Vercel** - Hosting & CI/CD

---

## 🤖 AI Agents

This project uses Claude AI agents to automate optimization tasks:

### Available Agents

#### 1. SEO Optimizer

```bash
Use SEO Optimizer agent to analyze /work/sainapsis
```

- Checks meta titles/descriptions
- Validates heading hierarchy
- Suggests keyword optimization
- Reviews alt text completeness
- Validates schema.org markup

#### 2. Content Auditor

```bash
Use Content Auditor agent to review case studies
```

- Checks for metrics/impact
- Validates storytelling structure
- Ensures consistent tone
- Flags missing sections
- Proofreads for typos

#### 3. Accessibility Checker

```bash
Use Accessibility Checker agent to validate accessibility
```

- Color contrast validation
- Alt text review
- Keyboard navigation testing
- Screen reader compatibility
- Focus state visibility

#### 4. Performance Optimizer

```bash
Use Performance Optimizer agent to optimize site speed
```

- Image size/format recommendations
- Bundle size analysis
- Core Web Vitals monitoring
- Lazy loading suggestions
- Caching strategy validation

#### 5. Case Study Migrator

```bash
Use Case Study Migrator agent to convert markdown to MDX
```

- Adds frontmatter with metadata
- Converts visual placeholders to image components
- Validates MDX syntax
- Cleans up formatting

---

## 📝 Content Structure

### Case Study Frontmatter

Each case study uses MDX with structured frontmatter:

```yaml
---
title: "Sainapsis — Transforming Chaos into a 16x Productivity System"
description: "10-month design system transformation achieving 16x productivity increase and 24x team output at Sainapsis."
company: "Sainapsis"
role: "UX Advisor · System Architect · Design System Lead"
year: "2024-25"
duration: "10 months"
type: "Design System & Process Transformation"
featured: true
heroImage: "/images/case-studies/sainapsis-hero.png"
tags: ["design systems", "process transformation", "mentorship", "productivity"]
seo:
  metaTitle: "Sainapsis Case Study - 16x Productivity with Design Systems | Nicolás Botero"
  metaDescription: "How I transformed a chaotic design process into a 16x productivity system through design systems, process innovation, and mentorship."
  keywords: ["design systems", "productivity transformation", "design leadership"]
---
```

### Adding Images to Case Studies

```jsx
<Image
  src="/images/sainapsis/handoff-timeline.png"
  alt="Timeline showing 2-month handoff cycle with weekly priority changes"
  width={1200}
  height={600}
  caption="Before/after comparison of handoff process"
/>
```

---

## 🎯 SEO Strategy

### Target Keywords

**Primary:**
- Nicolás Botero Product Designer
- Nico Botero Designer Portfolio
- Product Designer Colombia
- Design Systems Lead

**Secondary:**
- Senior Product Designer Remote
- SaaS Product Designer
- Design System Architect
- Product Design Case Studies

**Impact-Based:**
- Design Team Transformation
- Design Productivity Metrics
- Design System ROI

### SEO Checklist

- [ ] Unique meta titles for each page (50-60 chars)
- [ ] Meta descriptions (150-160 chars)
- [ ] Schema.org Person & CreativeWork markup
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags
- [ ] Semantic HTML structure
- [ ] Alt text for all images
- [ ] Sitemap.xml & robots.txt
- [ ] Fast loading (<1s First Contentful Paint)
- [ ] Mobile-responsive design

---

## 📊 Performance Targets

### Core Web Vitals
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

### Lighthouse Scores
- **Performance:** 95+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

### Other Metrics
- **First Contentful Paint:** <1s
- **Time to Interactive:** <3s
- **Total Bundle Size:** <200KB (gzipped)

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://nicolasbotero.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Custom Domain Setup

1. Add domain in Vercel dashboard
2. Update DNS records:
   - A record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`
3. Enable SSL (automatic)
4. Update `NEXT_PUBLIC_SITE_URL` in env vars

---

## 📈 Success Metrics

### Launch Goals (Week 5)
- ✅ Lighthouse score 95+ (all categories)
- ✅ All pages have unique meta tags
- ✅ WCAG 2.1 AA compliant
- ✅ <1s First Contentful Paint
- ✅ Mobile-responsive (tested on 3+ devices)

### 30-Day Goals
- 100+ unique visitors
- Indexed for "Nicolás Botero Product Designer"
- 2+ min average session duration
- 50+ case study page views

### 90-Day Goals
- 500+ unique visitors
- Top 10 ranking for target keywords
- 5+ interview requests from portfolio
- 10+ backlinks to portfolio

---

## 🗺 Roadmap

See [ROADMAP.md](ROADMAP.md) for detailed development timeline.

**Current Status:** Phase 1 - Foundation (Weeks 1-2)

**Upcoming:**
- Phase 2: Content + SEO (Weeks 3-4)
- Phase 3: Polish + Launch (Week 5)
- Phase 4: Growth (Ongoing)

---

## 🤝 Contributing

This is a personal portfolio project, but feedback is welcome!

- **Found a bug?** Open an issue
- **Have a suggestion?** Open a discussion
- **Want to contribute?** Fork and submit a PR

---

## 📄 License

Copyright © 2025 Nicolás Botero. All rights reserved.

Code is MIT licensed. Content (case studies, images, copy) is proprietary.

---

## 📞 Contact

- **Email:** n.boterom@gmail.com
- **LinkedIn:** [linkedin.com/in/nicolas-botero](https://linkedin.com/in/nicolas-botero)
- **Location:** Bogotá, Colombia (Remote-ready)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
