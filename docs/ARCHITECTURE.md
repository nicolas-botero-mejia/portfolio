# Architecture Decisions

## URL Structure: Hierarchical vs. Flat

### Current implementation: Flat work URLs

Work items use **flat** URLs: `/work/ocean`, `/work/sainapsis`, `/work/aquads`. The app route is `app/work/[slug]/page.tsx`, which serves both case studies and features from a single slug namespace. Content lives in `content/work/case-studies/` and `content/work/features/`; the slug alone identifies the item. This keeps URLs short and avoids collisions in the current content set.

### Documented preference: Hierarchical URLs

The content taxonomy (`contentTypes`) defines hierarchical routes (`/work/case-studies`, `/work/features`) for path resolution and future use. If the content grows and slug collisions become likely, consider migrating to hierarchical URLs: `app/work/case-studies/[slug]/page.tsx` → `/work/case-studies/ocean`.

### Decision (for future migration): Prefer hierarchical when scaling

**Target format:** `/work/case-studies/ocean` (not `/work/ocean`)

### The Trade-off

| Aspect | Hierarchical | Flat |
|--------|-------------|------|
| **Clarity** | ✅ Self-documenting | ❌ Ambiguous |
| **Length** | ❌ Longer (~14 chars) | ✅ Shorter |
| **Namespace** | ✅ No conflicts | ❌ Collision risk |
| **Maintenance** | ✅ Mirrors folders | ❌ Check frontmatter |
| **SEO** | ✅ Keyword-rich | ✅ Clean |

### Why Hierarchical Wins

1. **Developer Experience**
   ```
   URL: /work/case-studies/ocean
   File: content/work/case-studies/ocean.mdx
   
   ✅ Path = URL (predictable, debuggable)
   ```

2. **Content Type Visibility**
   ```
   /work/case-studies/ocean      ✅ It's a case study
   /work/features/ocean-billing  ✅ It's a feature
   
   vs.
   
   /work/ocean                   ❓ What is this?
   /work/ocean-billing           ❓ What is this?
   ```

3. **Namespace Protection**
   ```
   ✅ Can have:
   /work/case-studies/design
   /experiments/design/design
   
   ❌ With flat URLs, collision:
   /work/design
   /experiments/design  (conflict!)
   ```

4. **Future-Proof Scalability**
   - With 100+ items, hierarchy helps humans navigate
   - Clear separation prevents chaos
   - Easy to add new content types

5. **URL Length is Irrelevant**
   - SEO: Google doesn't penalize longer descriptive URLs
   - UX: Users rarely type URLs manually
   - Sharing: 14 extra characters is negligible

### Counter-Arguments (Why You Might Want Flat)

1. **Aesthetics** - `/work/ocean` looks cleaner
2. **Flexibility** - Move content between types without breaking URLs
3. **Examples** - Some popular sites use flat (Medium: `/username/post-title`)

**My Take:** These aren't compelling for your use case. Your content HAS types, they're meaningful, and showing them is valuable.

### The Answer to Your Concern

> "We lose readability clarity for devs/code reviewers"

**You're right to be concerned.** Here's the solution:

**Keep hierarchical URLs** because:
1. Code clarity > URL length
2. Self-documenting > sleek minimalism
3. Maintainability > aesthetics
4. Your site will have 100+ items eventually

The slight URL length increase (5-15 chars) is a small price for massive maintainability gains.

---

## Navigation Architecture

### Level 1: Home Page (Current Focus)

```
/ → Shows featured content from all categories
```

**Sections:**
- Work (featured case studies)
- Workflow (process)
- Experience (timeline)
- Contact (CTA)

### Level 2: Category Landing Pages (Phase 1)

```
/work         → All work (case studies + features + side projects)
/experiments  → All experiments (design + code + prototypes)
/reading      → All reading (books + articles)
/writing      → All writing (posts + thoughts + quotes)
/about        → About page (standalone)
```

**Features:**
- Show all items in category
- Filter/tabs by subcategory
- Sort by date, featured, etc.
- Search/tag filtering (Phase 2)

### Level 3: Subcategory Browsing (Optional)

```
/work/case-studies  → Only case studies
/work/features      → Only features
```

**When to add:** Only if you have 20+ items per subcategory.

### Level 4: Individual Content

```
/work/case-studies/ocean
/experiments/design/loading-states
```

**Features:**
- Full content
- Next/prev within same subcategory (folder-based)
- Related content (tag-based)
- Back to category link

---

## Navigation Logic

### Next/Previous Approaches

#### Approach 1: Within Subcategory (Implemented)

**Use case:** Navigate through case studies only

```typescript
// Folder-based
const { prev, next } = getAdjacentCaseStudies('ocean');
// prev: aquads, next: sainapsis
```

**Implementation:**
```typescript
export function getAdjacentCaseStudies(currentSlug: string) {
  const items = getCaseStudies(); // From work/case-studies/ folder
  const index = items.findIndex(item => item.slug === currentSlug);
  
  return {
    prev: items[index - 1] || null,
    next: items[index + 1] || null,
  };
}
```

**Pros:**
- ✅ Stays within content type (case study → case study)
- ✅ Uses folder as natural boundary
- ✅ Simple logic
- ✅ Better UX (related content)

#### Approach 2: Across All Work (Alternative)

**Use case:** Navigate through ALL work items

```typescript
// Frontmatter-based
const { prev, next } = getAdjacentInWork('ocean');
// prev: might be a feature, next: might be a side project
```

**Implementation:**
```typescript
export function getAdjacentInWork(currentSlug: string) {
  const allWork = [
    ...getCaseStudies(),
    ...getFeatures(),
    ...getSideProjects()
  ].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const index = allWork.findIndex(item => item.slug === currentSlug);
  
  return {
    prev: allWork[index - 1] || null,
    next: allWork[index + 1] || null,
  };
}
```

**Pros:**
- ✅ Browse entire category
- ✅ Discover different content types

**Cons:**
- ❌ Jarring UX (case study → feature → side project)
- ❌ Not contextually related
- ❌ Users expect similar content in next/prev

### My Recommendation

**Use Approach 1 (within subcategory) by default.**

**Why:**
- Users viewing a case study expect more case studies
- Users viewing a design experiment expect more design experiments
- Next/prev should be contextually related, not just chronologically adjacent

**When to use Approach 2:**
- Category landing pages (/work) - browse all
- RSS feeds - show all chronologically
- Search results - mixed types

**Don't use for:** Individual content next/prev navigation

---

## Prefix vs. Frontmatter: The Final Answer

### For Visual Categorization

**❌ Filename Prefixes:**
```
cs-ocean.mdx
ft-billing.mdx
sp-tool.mdx
```

**Why not:**
- Redundant with folder structure
- Harder to refactor
- Not industry standard
- Uglier to work with
- Less flexible

**✅ Folder Structure:**
```
work/case-studies/ocean.mdx
work/features/billing.mdx
work/side-projects/tool.mdx
```

**Why yes:**
- Visual clarity in file explorer
- Standard practice
- Easy to reorganize
- Clean filenames

### For Metadata & Logic

**✅ Frontmatter:**
```yaml
---
type: "case-study"
category: "work"
date: "2024-06-15"
order: 1
---
```

**Why:**
- Flexible querying
- Multiple dimensions
- Easy to change
- Programmable
- Industry standard

---

## Architectural Principles

### 1. Use the Right Tool for Each Job

- **Folders:** Visual organization, namespace, primary grouping
- **Frontmatter:** Metadata, relationships, sorting, filtering
- **Filename:** Identity only (slug), no metadata

### 2. Optimize for Humans, Not Machines

- Developers maintain code → clear folder structure
- Users navigate site → hierarchical URLs
- Both benefit from explicit naming

### 3. Scale First, Optimize Later

- Plan for 1000+ items, not 10
- Clear structure > short URLs
- Maintainability > aesthetics

### 4. Industry Standards Exist for Reasons

- Every major CMS uses folders + frontmatter
- Prefixes in filenames is an anti-pattern
- Follow conventions unless you have compelling reasons

---

## Implementation Status

### ✅ Completed

1. **Frontmatter fields added:**
   - `date` - For chronological sorting
   - `category` - For cross-category features
   - `order` - For manual ordering (optional)

2. **Navigation utilities:**
   - `getAdjacentCaseStudies()` - Get next/prev case studies
   - Returns null safely for first/last items

3. **UI Component:**
   - `ContentNavigation.tsx` - Reusable next/prev component
   - Responsive design
   - Hover states
   - Empty state handling

4. **Integrated in case study pages:**
   - Shows next/prev at bottom of each case study
   - Navigates within case studies folder
   - Sorted by year (most recent first)

### 🔮 Future Enhancements

1. **Smart sorting** - Use `date` field for chronological order
2. **Related content** - Use `tags` for suggestions
3. **Cross-category navigation** - Browse all work if desired
4. **Keyboard shortcuts** - Arrow keys for next/prev
5. **Progress indicator** - "3 of 8 case studies"

---

## Final Answer to Your Question

> "Should we use prefixes for visual categorization?"

**No.** Use:
- **Folders** for visual organization (what you see in file explorer)
- **Frontmatter** for logic/metadata (what code uses)
- **Hierarchical URLs** for clarity (what users/devs see)

This is the industry-standard architecture. It's not innovative, but that's a good thing—it's proven to work at scale.

---

**Verdict:** Keep hierarchical structure. It's the right long-term decision.
