# Architecture Decisions

## Current Navigation Flow

```
/ (root) → redirects to /work
/work → All work items (products + features), sorted by date
/about → About + Workflow + Experience (renders about.mdx)
/now → Latest now entry
/uses → Tools and setup (renders uses.mdx)
/experiments → Experiments listing
/reading → Reading listing
/writing → Writing listing
```

**Key decisions (Feb 2026):**
- Root redirects to `/work` — portfolio is work-first, avoids duplicate content
- Workflow + Experience moved to `/about` — natural home for process and career
- Contact centralized in sidebar (`SplitLayout.tsx`) — always visible, no repeated CTAs

## URL Structure

Work items use **hierarchical** URLs: `/work/[subType]/[slug]` (e.g., `/work/products/ocean`, `/work/features/billing`). The app route is `src/app/work/[subType]/[slug]/page.tsx`. This mirrors the content folder structure and is consistent with all other content sections (`/writing/posts/[slug]`, `/reading/books/[slug]`).

Legacy flat URLs (`/work/ocean`) are permanently redirected via `next.config.ts`.

---

## Work Page Architecture

Server/Client Component pattern:
- `src/app/work/page.tsx` — Server Component (fetches data with fs module)
- `src/components/work/WorkClient.tsx` — Client Component (handles interactivity, analytics)

Displays all work items sorted by date. Future: add filtering/tabs and "Load More" pagination when 10+ items exist.

---

## Navigation Logic

### Next/Previous: Across All Work

Navigate through all work items in featured-first order (featured items first, then by date/year).

```typescript
const { prev, next } = getAdjacentWork('ocean');
// Returns WorkItem with subType, so URLs can be built correctly
```

### Implementation

- `getAdjacentWork()` in `src/lib/mdx.ts` — spans all work types
- `ContentNavigation.tsx` component (reusable, responsive, handles empty states)
- Each nav item carries its own `href` (no `basePath` needed)

---

## Content Organization Principles

### Use the Right Tool for Each Job

- **Folders:** Visual organization, namespace, primary grouping
- **Frontmatter:** Metadata, relationships, sorting, filtering
- **Filename:** Identity only (slug), no metadata or prefixes

### Folder Structure Over Filename Prefixes

```
content/work/products/ocean.mdx              (folder = type)
content/work/features/billing.mdx            (folder = type)
content/work/transformations/example.mdx     (folder = type)
```

Not: `cs-ocean.mdx`, `ft-billing.mdx` (prefix = anti-pattern)

---

## Future Enhancements

1. Smart sorting using `date` field for chronological order
2. Related content via `tags` for suggestions
3. Cross-category navigation for browse-all views
4. Keyboard shortcuts (arrow keys for next/prev)
5. Progress indicator ("3 of 8 products")
6. ~~Hierarchical URLs when content scales~~ (done — `/work/[subType]/[slug]`)

---

**Last Updated:** February 15, 2026
