# Content Architecture

## Principles

**Single Source of Truth:** All content lives in MDX files, never in JSX page components.

**Structured Data:** Reusable, type-safe data lives in TypeScript under `src/data/`. Data layer has clear separation: sources (raw data), content (editorial), resolvers (lookup logic), derived (routes, navigation). See [src/data/README.md](../../src/data/README.md).

**Component Composition:** MDX files import and render TypeScript data via React components.

## Directory Structure

```
content/
├── work/
│   ├── products/        # Products (sainapsis, ocean, aquads)
│   ├── features/         # Individual product features
│   └── side-projects/    # Personal/side projects
├── writing/
│   ├── posts/            # Long-form blog posts
│   ├── thoughts/         # Short-form thoughts
│   └── quotes/           # Curated quotes
├── reading/
│   ├── books/            # Book reviews/notes
│   └── articles/         # Article highlights
├── experiments/
│   ├── design/           # Design experiments
│   ├── code/             # Code experiments
│   └── prototypes/       # Interactive prototypes
└── pages/
    ├── about.mdx         # About page (imports workflow + experience)
    ├── now.mdx           # What I'm doing now
    └── uses.mdx          # Tools and setup

src/data/
├── sources/              # Raw reference data (companies, contentTypes, workTypes, etc.)
├── content/              # Editorial data (profile, experience, workflow)
├── resolvers/            # Lookup logic (getCompany, getContentType, etc.)
├── derived/              # Computed (routes, navigation)
└── index.ts              # Public API — import from '@/data'

src/components/mdx/
├── MDXPageRenderer.tsx   # Renders MDX content
├── WorkflowSection.tsx   # Renders workflow data
├── ExperienceSection.tsx # Renders experience data
└── [future components]
```

## How It Works

### 1. Content Files (MDX)

All prose content lives in MDX files with frontmatter:

```mdx
---
title: "About"
description: "Short description"
seo:
  metaTitle: "SEO Title"
  metaDescription: "SEO description"
  keywords: ["keyword1", "keyword2"]
---

import WorkflowSection from '@/components/mdx/WorkflowSection';

<div className="px-8 py-16">
  <h1>About</h1>
  <p>Your content here...</p>
</div>

<WorkflowSection />
```

### 2. Structured Data (TypeScript)

Reusable data that's rendered in multiple places lives in TypeScript:

```typescript
// src/data/content/experience.ts
export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: 'Sainapsis',
    role: 'UX Advisor',
    period: '2024 - 2025',
    description: '...',
    highlights: ['16x productivity increase', '...'],
  },
];
```

### 3. MDX Components (React)

Components that consume structured data and render it:

```typescript
// src/components/mdx/ExperienceSection.tsx
import { experience } from '@/data';

export default function ExperienceSection() {
  return (
    <section>
      {experience.map((job) => (
        <div key={job.company}>
          <h3>{job.company}</h3>
          <p>{job.role}</p>
          {/* render job details */}
        </div>
      ))}
    </section>
  );
}
```

### 4. Page Routes (Next.js)

Page routes fetch MDX content and render it:

```typescript
// src/app/about/page.tsx
   import { getPageBySlug } from '@/lib/mdx';
   import { CONTENT_SLUGS } from '@/data';
   import { notFound } from 'next/navigation';

   export default function AboutPage() {
  const page = getPageBySlug(CONTENT_SLUGS.ABOUT);
  if (!page) notFound();
  return <MDXRenderer content={page.content} />;
}
```

## Benefits

### Consistency
- All content managed the same way (MDX)
- No split between JSX pages and MDX pages
- Single pattern to learn and maintain

### Type Safety
- Structured data is validated at build time
- TypeScript catches errors before deployment
- Better IDE autocomplete and refactoring

### Reusability
- Structured data can be rendered in multiple places
- MDX components are composable and shareable
- No duplication of data across files

### Maintainability
- Content updates don't require code changes
- Structured data changes are centralized
- Clear separation of concerns

## Assets (images and media)

Images use **one folder per subType** (no slug subfolders); the filename carries slug + level (e.g. `ocean-hero.png`, `ocean-1.png`). Mirrors MDX: flat files per folder. See [docs/ASSETS.md](ASSETS.md) for the layout, naming convention, and rationale.

## Adding New Content

### New MDX Page (e.g., "colophon")

1. Create MDX file:
   ```bash
   content/pages/colophon.mdx
   ```

2. Create route:
   ```typescript
   // src/app/colophon/page.tsx
   import { getPageBySlug } from '@/lib/mdx';
   import { CONTENT_SLUGS } from '@/data';
   import { notFound } from 'next/navigation';

   export default function ColophonPage() {
     const page = getPageBySlug(CONTENT_SLUGS.COLOPHON);
     if (!page) notFound();
     return <MDXRenderer content={page.content} />;
   }
   ```

3. Add to navigation (if needed): Edit `src/data/derived/navigation.ts` navConfig, or add to contentTypes in sources if it's a new page.

### New Structured Data (e.g., "skills")

1. Create data file in `src/data/content/` (editorial) or `src/data/sources/` (reference/lookup):
   ```typescript
   // src/data/content/skills.ts
   export interface Skill {
     name: string;
     category: string;
     level: number;
   }

   export const skills: Skill[] = [...];
   ```

2. Export from `src/data/index.ts`:
   ```typescript
   export { skills } from './content/skills';
   export type { Skill } from './content/skills';
   ```

3. Create MDX component:
   ```typescript
   // src/components/mdx/SkillsSection.tsx
   import { skills } from '@/data';

   export default function SkillsSection() {
     return <div>{/* render skills */}</div>;
   }
   ```

3. Import in MDX:
   ```mdx
   ---
   title: "About"
   ---

   import SkillsSection from '@/components/mdx/SkillsSection';

   <SkillsSection />
   ```

### New Content Collection (e.g., "podcasts")

1. Add to `content/` structure:
   ```bash
   content/podcasts/episode-name.mdx
   ```

2. Add MDX utilities in `src/lib/mdx.ts`:
   ```typescript
   export function getPodcasts(): Podcast[] { ... }
   export function getPodcastBySlug(slug: string): Podcast | null { ... }
   ```

3. Create listing page:
   ```typescript
   // src/app/podcasts/page.tsx
   import { getPodcasts } from '@/lib/mdx';
   ```

## Rules

### ✅ DO

- Store all prose content in MDX files
- Store structured, reusable data in TypeScript files
- Create MDX components to render structured data
- Keep page routes minimal (fetch data, render MDX)

### ❌ DON'T

- Put prose content in JSX page components
- Duplicate data across multiple files
- Mix content and component logic
- Create hybrid approaches (some content in JSX, some in MDX)

## Examples

### Good: About Page

```mdx
<!-- content/pages/about.mdx -->
---
title: "About"
---

import WorkflowSection from '@/components/mdx/WorkflowSection';
import ExperienceSection from '@/components/mdx/ExperienceSection';

<div>
  <h1>About</h1>
  <p>Prose content here...</p>
</div>

<WorkflowSection />
<ExperienceSection />
```

### Bad: Mixed Approach

```typescript
// ❌ Don't do this - content in JSX
export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>Prose content here...</p>
      <WorkflowSection />
    </div>
  );
}
```

---

**Last Updated:** February 12, 2026
