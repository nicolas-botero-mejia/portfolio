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

## URL Structure: Flat (Current) vs Hierarchical (Future)

### Current: Flat work URLs

Work items use **flat** URLs: `/work/ocean`, `/work/sainapsis`, `/work/aquads`. The app route is `src/app/work/[slug]/page.tsx`, which serves both products and features from a single slug namespace. Content lives in `content/work/products/` and `content/work/features/`; the slug alone identifies the item.

### Future consideration: Hierarchical URLs

If content grows and slug collisions become likely, migrate to hierarchical: `/work/products/ocean`.

| Aspect | Hierarchical | Flat (current) |
|--------|-------------|------|
| **Clarity** | Self-documenting | Ambiguous type |
| **Length** | Longer (~14 chars) | Shorter |
| **Namespace** | No conflicts | Collision risk |
| **Maintenance** | Mirrors folders | Check frontmatter |
| **SEO** | Keyword-rich | Clean |

**When to migrate:** When content exceeds ~20 items and slug collisions become a real risk.

---

## Work Page Architecture

Server/Client Component pattern:
- `src/app/work/page.tsx` — Server Component (fetches data with fs module)
- `src/components/work/WorkClient.tsx` — Client Component (handles interactivity, analytics)

Displays all work items sorted by date. Future: add filtering/tabs and "Load More" pagination when 10+ items exist.

---

## Navigation Logic

### Next/Previous: Within Subcategory

Navigate through items of the same type (product to product, not product to feature).

```typescript
const { prev, next } = getAdjacentProducts('ocean');
```

**Why within subcategory:** Users viewing a product expect more products. Cross-type navigation is jarring. Use cross-type only for category landing pages or search results.

### Implementation

- `getAdjacentProducts()` in content utilities
- `ContentNavigation.tsx` component (reusable, responsive, handles empty states)
- Sorted by year (most recent first)

---

## Content Organization Principles

### Use the Right Tool for Each Job

- **Folders:** Visual organization, namespace, primary grouping
- **Frontmatter:** Metadata, relationships, sorting, filtering
- **Filename:** Identity only (slug), no metadata or prefixes

### Folder Structure Over Filename Prefixes

```
content/work/products/ocean.mdx        (folder = type)
content/work/features/billing.mdx       (folder = type)
```

Not: `cs-ocean.mdx`, `ft-billing.mdx` (prefix = anti-pattern)

---

## Future Enhancements

1. Smart sorting using `date` field for chronological order
2. Related content via `tags` for suggestions
3. Cross-category navigation for browse-all views
4. Keyboard shortcuts (arrow keys for next/prev)
5. Progress indicator ("3 of 8 products")
6. Hierarchical URLs when content scales

---

**Last Updated:** February 15, 2026
