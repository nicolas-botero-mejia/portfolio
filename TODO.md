# Portfolio TODO

## Pending Tasks

### 1. Review Unused Dependencies
After componentization is complete, review and potentially remove:
- `framer-motion` (^12.23.24) - Animation library not currently in use
- `react-wrap-balancer` (^1.1.1) - Typography helper not currently in use
- `next-seo` (^7.0.1) - Using custom SEO implementation instead
- `next-sitemap` (^4.2.3) - No config file present

**Action:** Run `npm uninstall <package>` for each unused dependency after confirming they won't be needed.

### 2. Add Analytics & Event Tracking

#### Google Analytics
- [ ] Install `@next/third-parties` or `react-ga4`
- [ ] Add GA measurement ID to environment variables
- [ ] Create analytics utility/component
- [ ] Add to layout for tracking page views
- [ ] Test in production

#### Amplitude Event Tracking
- [ ] Install `@amplitude/analytics-browser`
- [ ] Add Amplitude API key to environment variables
- [ ] Create event tracking utilities
- [ ] Define key events to track:
  - Page views
  - Case study views
  - External link clicks
  - Contact button clicks
  - Password entry attempts
- [ ] Implement tracking calls
- [ ] Test in development and production

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
