# Content Architecture

## Principles

**Single Source of Truth:** All content lives in MDX files, never in JSX page components.

**Structured Data:** Reusable, type-safe data (experience, workflow, etc.) lives in TypeScript files under `src/data/`.

**Component Composition:** MDX files import and render TypeScript data via React components.

## Directory Structure

```
content/
├── work/
│   ├── case-studies/     # Full case studies (sainapsis, ocean, aquads)
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
├── workflow.ts           # Design process data
├── experience.ts         # Work history data
└── [future data files]

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
// src/data/experience.ts
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
import { experience } from '@/data/experience';

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
import MDXPageRenderer from '@/components/mdx/MDXPageRenderer';

export default function AboutPage() {
  const page = getPageBySlug('about');
  return <MDXPageRenderer content={page.content} />;
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
   import MDXPageRenderer from '@/components/mdx/MDXPageRenderer';

   export default function ColophonPage() {
     const page = getPageBySlug('colophon');
     return <MDXPageRenderer content={page.content} />;
   }
   ```

3. Add to navigation (if needed):
   ```typescript
   // src/components/layout/SplitLayout.tsx
   { name: 'Colophon', href: '/colophon' }
   ```

### New Structured Data (e.g., "skills")

1. Create data file:
   ```typescript
   // src/data/skills.ts
   export interface Skill {
     name: string;
     category: string;
     level: number;
   }

   export const skills: Skill[] = [...];
   ```

2. Create MDX component:
   ```typescript
   // src/components/mdx/SkillsSection.tsx
   import { skills } from '@/data/skills';

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

**Last Updated:** February 10, 2026
