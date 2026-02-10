# Portfolio TODO

## Pending Tasks

### 1. Review Unused Dependencies
After componentization is complete, review and potentially remove:
- `framer-motion` (^12.23.24) - Animation library not currently in use
- `react-wrap-balancer` (^1.1.1) - Typography helper not currently in use
- `next-seo` (^7.0.1) - Using custom SEO implementation instead
- `next-sitemap` (^4.2.3) - No config file present

**Action:** Run `npm uninstall <package>` for each unused dependency after confirming they won't be needed.

### 2. Add Analytics & Event Tracking ✅

#### Google Analytics ✅
- [x] Install `@next/third-parties`
- [x] Add GA measurement ID to environment variables
- [x] Create analytics utility/component
- [x] Add to layout for tracking page views
- [ ] Configure GA account and add measurement ID to `.env.local`
- [ ] Test in production

#### Amplitude Event Tracking ✅
- [x] Install `@amplitude/analytics-browser`
- [x] Add Amplitude API key to environment variables
- [x] Create event tracking utilities (`src/lib/analytics.ts`)
- [x] Define key events to track:
  - Page views ✅
  - Case study views ✅
  - External link clicks ✅
  - Contact button clicks ✅
  - Password entry attempts ✅
  - Work card clicks ✅
  - Navigation clicks ✅
- [x] Implement tracking calls across components
- [x] Create comprehensive documentation (README_ANALYTICS.md)
- [ ] Configure Amplitude account and add API key to `.env.local`
- [ ] Test in production

#### Completed Implementation
- ✅ `AnalyticsProvider` component with Suspense boundary
- ✅ `CaseStudyTracker` component for case study views
- ✅ Type-safe event tracking with TypeScript
- ✅ Tracking on home page (work cards, contact links)
- ✅ Tracking in sidebar (navigation, external links, contact)
- ✅ Tracking on case study pages
- ✅ Password attempt tracking
- ✅ Console logging in development mode

### 3. Current Work in Progress
- [x] Delete unused components (Header, Footer, Navigation)
- [ ] Componentize home page sections
  - [ ] Create `src/components/home/` directory
  - [ ] Extract WorkSection component
  - [ ] Extract WorkflowSection component
  - [ ] Extract ExperienceSection component
  - [ ] Extract ContactSection component
  - [ ] Create reusable UI components as needed

---

**Last Updated:** February 9, 2026
