# Nicolás Botero - Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> SEO-optimized portfolio showcasing 10+ years of product design leadership, design systems, and strategic transformation work.

**Live Site:** [nicolas-botero-mejia.com](#) *(coming soon)*
**Status:** Pre-launch; in development (see [ROADMAP.md](ROADMAP.md))
**Current focus:** Project 2 (2.1 → 2.2) — Architecture, design system, mobile

---

## 🎯 Project Overview

This portfolio showcases my work as a Product Designer, featuring product work with quantified impact:

- **Sainapsis** - 16x productivity transformation through design system & process innovation
- **Ocean** - Global CPaaS platform serving 300M+ messages/month across Colombia & India
- **AquaDS** - Design system enabling 80-90% component adoption and 80% faster delivery

**Core Features:**
- ⚡️ Blazing-fast performance (Next.js 16 + SSG)
- 🎨 MDX-powered work samples with type-safe content
- 🔍 SEO-optimized for design leadership keywords
- ♿️ WCAG 2.1 AA accessible
- 📱 Mobile-first responsive design
- 🔒 Password protection for selective work sample access
- 📊 Comprehensive analytics (Google Analytics + Amplitude)
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

# Generate password hash (for password protection)
npm run hash-password "yourpassword"

# Build for production
npm run build

# Preview production build
npm start
```

---

## 📁 Project Structure

```
portfolio/
├── .claude/agents/                # AI optimization agents
├── content/                       # MDX content (source of truth)
│   ├── work/
│   │   ├── products/              # Products (sainapsis, ocean, aquads)
│   │   ├── features/              # Granular features
│   │   └── side-projects/         # Personal projects
│   ├── pages/                     # Static pages (about, uses, colophon)
│   ├── now/                       # Dated snapshots
│   ├── writing/                   # Posts, thoughts, quotes
│   ├── experiments/               # Design, code, prototypes
│   └── reading/                   # Books, articles
│
├── src/
│   ├── app/                       # Next.js App Router pages
│   ├── components/                # UI, layout, work
│   ├── data/                      # Reference data & lookup logic
│   │   ├── sources/               # Raw data (companies, contentTypes, etc.)
│   │   ├── content/               # Editorial (profile, experience, workflow)
│   │   ├── resolvers/             # Slug→entity lookup functions
│   │   └── derived/               # Routes, navigation (computed)
│   ├── lib/                       # Utilities & services
│   │   ├── contentLoader.ts       # MDX read/parse/sort
│   │   ├── mdx.ts                 # Content API (getProducts, etc.)
│   │   ├── seo.ts                 # Metadata generation
│   │   ├── serverPasswordAuth.ts  # Password validation
│   │   ├── analytics.ts           # Amplitude + GA tracking
│   │   └── errors.ts              # Error handling utilities
│   ├── config/
│   │   └── passwords.ts           # Auth cookie config
│   └── actions/
│       └── authActions.ts         # Server actions
│
├── public/images/                 # work/, experiments/, writing/, now/, etc.
├── scripts/hashPassword.js        # Password hashing utility
├── .env.example
├── next.config.ts
└── docs/                          # PASSWORD_PROTECTION, CONTENT_ARCHITECTURE, etc.
```

---

## 🛠 Tech Stack

### Core Framework
- **Next.js 16** - React framework with App Router
- **TypeScript 5** - Type-safe JavaScript
- **React 19** - UI library

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Wrap Balancer** - Typography

### Content Management
- **MDX** - Markdown with React components (next-mdx-remote, gray-matter)
- **Zod** - Schema validation

### SEO & Analytics
- **next-seo** - SEO optimization
- **next-sitemap** - Automatic sitemap
- **Google Analytics + Amplitude** - Page views and event tracking

### Deployment
- **Vercel** - Hosting & CI/CD

---

## 📚 Documentation

- [ROADMAP.md](ROADMAP.md) - Development timeline
- [src/data/README.md](src/data/README.md) - Data layer (sources, resolvers, derived)
- [content/README.md](content/README.md) - Content structure and frontmatter
- [docs/CONTENT_ARCHITECTURE.md](docs/CONTENT_ARCHITECTURE.md) - Content architecture

---

## 🤖 AI Agents

This project uses Claude AI agents to automate optimization tasks:

### Available Agents

#### 1. SEO Optimizer

```bash
Use SEO Optimizer agent to analyze /sainapsis
```

- Checks meta titles/descriptions
- Validates heading hierarchy
- Suggests keyword optimization
- Reviews alt text completeness
- Validates schema.org markup

#### 2. Content Auditor

```bash
Use Content Auditor agent to review work samples
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

#### 5. Product Migrator

```bash
Use Product Migrator agent to convert markdown to MDX
```

- Adds frontmatter with metadata
- Converts visual placeholders to image components
- Validates MDX syntax
- Cleans up formatting

---

## 📝 Content Structure

### Work Sample Frontmatter (work items)

Each work sample uses MDX with structured frontmatter:

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
tags: ["design systems", "process transformation", "mentorship", "productivity"]
seo:
  metaTitle: "Sainapsis - 16x Productivity with Design Systems | Nicolás Botero"
  metaDescription: "How I transformed a chaotic design process into a 16x productivity system through design systems, process innovation, and mentorship."
  keywords: ["design systems", "productivity transformation", "design leadership"]
---
```

### Adding Images to Work Samples

```jsx
<Image
  src="/images/work/products/sainapsis-handoff-timeline.png"
  alt="Timeline showing 2-month handoff cycle with weekly priority changes"
  width={1200}
  height={600}
/>
```

---

## 🔒 Password Protection

Secure password protection for work items (products, features, side-projects) with server-side validation, SHA-256 hashing, and HTTP-only cookies (`work_auth_[slug]`). Env: `WORK_GLOBAL_PASSWORD` or `WORK_[SLUG]_PASSWORD`. All work items are public by default unless `locked: true`.

**Key Features:**
- Server-side validation (passwords never exposed to client)
- 7-day authentication with XSS/CSRF protection
- Global or per-item passwords (one auth system for all work subtypes)
- Works with static generation

**Quick Setup:**
```bash
npm run hash-password "yourpassword"
# Add hash to .env.local, set locked: true in frontmatter
```

**Documentation:**
- **Quick Reference:** [README_PASSWORD_PROTECTION.md](README_PASSWORD_PROTECTION.md) - 3-step setup guide
- **Full Guide:** [docs/PASSWORD_PROTECTION.md](docs/PASSWORD_PROTECTION.md) - Complete documentation with examples, troubleshooting, and deployment

**Use for:** Client portfolios, WIP products, professional courtesy
**Not for:** HIPAA/PCI compliance, enterprise security, audit requirements

---

## 📊 Analytics & Tracking

Comprehensive analytics implementation with Google Analytics 4 and Amplitude for detailed user insights.

**Features:**
- Automatic page view tracking
- User interaction events (clicks, navigation)
- Work sample engagement (work_item_view, work_item_password_attempt)
- Password unlock analytics
- Type-safe event tracking with TypeScript
- Privacy-friendly (no PII collected)

**Tracked Events:**
- Page views across all routes
- Work card clicks with position tracking
- Work sample views and engagement
- Contact button interactions
- External link clicks
- Navigation usage patterns
- Password attempt success/failure

**Quick Setup:**
```bash
# Add to .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_AMPLITUDE_API_KEY=your-amplitude-api-key
```

**Documentation:**
- **Complete Guide:** [README_ANALYTICS.md](README_ANALYTICS.md) - Setup, usage, event definitions, and best practices

**Get API Keys:**
- Google Analytics: https://analytics.google.com/
- Amplitude: https://analytics.amplitude.com/

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
- Product Design Work

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
NEXT_PUBLIC_SITE_URL=https://nicolas-botero-mejia.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_AMPLITUDE_API_KEY=your-amplitude-api-key

# Password Protection (optional — for work items: products, features, side-projects)
WORK_GLOBAL_PASSWORD=your-password-hash-here
# Or per-item: WORK_OCEAN_PASSWORD=hash-here
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
- 50+ work sample page views

### 90-Day Goals
- 500+ unique visitors
- Top 10 ranking for target keywords
- 5+ interview requests from portfolio
- 10+ backlinks to portfolio

---

## 🗺 Roadmap

See [ROADMAP.md](ROADMAP.md) for the development timeline and recommended order.

**Current status:** Project 1 done (POC); executing Project 2 (2.1 → 2.2), then 3–7 per roadmap.

---

## 🤝 Contributing

This is a personal portfolio project, but feedback is welcome!

- **Found a bug?** Open an issue
- **Have a suggestion?** Open a discussion
- **Want to contribute?** Fork and submit a PR

---

## 📄 License

Copyright © 2025 Nicolás Botero. All rights reserved.

Code is MIT licensed. Content (products, images, copy) is proprietary.

---

## 📞 Contact

- **Email:** n.boterom@gmail.com
- **LinkedIn:** [linkedin.com/in/nicolas-botero](https://linkedin.com/in/nicolas-botero)
- **Location:** Bogotá, Colombia (Remote-ready)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
