# Architecture Updates - February 10, 2026

## Summary

Migrated content sections from the home page to appropriate locations, streamlined navigation, and consolidated contact information to eliminate redundancy.

## Changes Made

### 1. Home Page Simplification
- **Before:** Home page (`/`) displayed featured work + workflow + experience + contact sections
- **After:** Home page redirects to `/work` (main landing page)
- **Rationale:** Cleaner architecture with dedicated pages for each content type

### 2. Work Page (`/work`)
- Now the main landing page (accessed via root `/` redirect)
- Displays **ALL** work items (case studies + features), sorted by date
- Includes analytics tracking for work card clicks
- Server/Client Component pattern:
  - `src/app/work/page.tsx` - Server Component (fetches data with fs module)
  - `src/components/work/WorkClient.tsx` - Client Component (handles interactivity)
- **Future:** Add "Load More" pagination when 10+ items exist (TODO comment in place)

### 3. About Page (`/about`)
- **Added:** Workflow section (My Workflow + Design Principles)
- **Added:** Experience section (Professional history with highlights)
- **Kept:** Original about content and bio
- **Removed:** Redundant contact CTA (now centralized in sidebar)

### 4. Left Sidebar Contact Info
- **Enhanced** contact section in `src/components/layout/SplitLayout.tsx`:
  - Email: n.boterom@gmail.com
  - LinkedIn: nicolas-botero
  - Location: Bogotá, Colombia + "Remote-ready worldwide"
  - Availability: "Open to opportunities" + "Freelance • Consulting • Full-time"
- **Logo link** now points to `/work` (instead of `/`)

### 5. Content Utilities (`src/lib/mdx.ts`)
- **Added:** `getAllWork()` helper function
  - Combines case studies + features
  - Sorts by date (newest first)
  - Used by the work page to display all content

### 6. Deleted Files
- `src/components/home/HomeClient.tsx` (no longer needed after redirect)

## Navigation Flow

```
/ (root) → redirects to /work
/work → All work (case studies + features)
/about → About + Workflow + Experience
/experiments → Coming soon
/reading → Coming soon
/writing → Coming soon
```

## Architecture Decisions

### Why Redirect Root to /work?
- Portfolio site = work-first showcase
- Eliminates duplicate content at `/` and `/work`
- Simplifies routing and maintenance
- Logo/brand click naturally goes to main showcase

### Why Move Workflow + Experience to About?
- About page is the natural home for process and career history
- Keeps work page focused on project showcase only
- User who wants to learn "about" you expects workflow + experience there

### Why Centralize Contact in Sidebar?
- Always visible on every page (no scrolling needed)
- Eliminates redundancy across multiple sections
- Cleaner content pages without repeated CTAs
- Single source of truth for contact information

## Testing Checklist

- [x] Build succeeds without errors
- [x] Linter passes with no warnings
- [x] Root `/` redirects to `/work`
- [ ] Work page displays all case studies + features
- [ ] About page shows workflow + experience sections
- [ ] Sidebar contact info visible on all pages
- [ ] Analytics tracking works on work card clicks

## Next Steps

1. **Test in browser:**
   - Visit `/` → should redirect to `/work`
   - Verify work page shows all 3 items (sainapsis, ocean, aquads)
   - Check about page has workflow + experience
   - Confirm sidebar contact info on all pages

2. **Future enhancements:**
   - Add filtering/tabs to work page (case studies, features, side projects)
   - Implement "Load More" pagination when 10+ work items exist
   - Add content to other sections (experiments, reading, writing)

---

**Date:** February 10, 2026  
**Status:** ✅ Complete - Ready for browser testing
