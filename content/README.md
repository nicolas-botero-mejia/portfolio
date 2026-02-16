# Content Structure

This folder contains all content for the portfolio site, organized by type.

## Structure

```
content/
├── work/                      # Professional work
│   ├── products/              # Full platform/product stories
│   ├── features/              # Granular product features
│   └── side-projects/         # Personal/experimental projects
│
├── writing/                   # Written content
│   ├── posts/                 # Long-form articles
│   ├── thoughts/              # Quick takes, notes
│   └── quotes/                # Curated quotes with context
│
├── reading/                   # Reading-related content
│   ├── books/                # Book notes/reviews
│   └── articles/             # Article summaries
│
├── experiments/               # Creative explorations
│   ├── design/               # Design experiments
│   ├── code/                 # Code experiments
│   └── prototypes/           # Interactive prototypes
│
├── now/                       # Now page entries (dated snapshots)
│   ├── 2026-02-10.mdx        # Most recent shown on /now
│   └── _example-now.mdx
│
└── pages/                     # Special static pages
    ├── about.mdx
    └── uses.mdx
```

## File Naming

- **Use lowercase** for all filenames (e.g., `ocean-platform.mdx`)
- **Use hyphens** for multi-word names (not underscores or spaces)
- **No prefixes** - the folder structure provides the namespace
- **Descriptive names** that reflect the content

## Frontmatter

All MDX files require frontmatter with specific fields depending on content type.

### Frontmatter order (for readability)

1. Identity: title, description
2. Classification: type, subtitle
3. Context: company, role, parent (features only)
4. Timeline: year, duration, date
5. Display: featured, heroImage, tags
6. Security: locked (products, optional)
7. SEO: seo block (always last)

### Products (`work/products/`)

```yaml
---
title: "Ocean — Global CPaaS Platform"
description: "Short description for listings (150-160 chars)"
type: "product"
subtitle: "SaaS Product Design & Scaling"
company: "routemobile"         # Company slug (see src/data/ — COMPANY_SLUGS in sources/companies)
role: "Lead Product Designer"
year: "2021-2024"
duration: "3 years"
date: "2024-06-15"            # For sorting (YYYY-MM-DD format)
featured: true
heroImage: "/images/products/ocean-hero.png"
tags: ["design systems", "platform", "global"]
locked: false                  # Password protection (optional)
seo:
  metaTitle: "Ocean CPaaS Platform | Nicolás Botero"
  metaDescription: "How I designed Ocean, a platform serving 300M+ messages monthly"
  keywords: ["cpaas platform", "messaging platform"]
---
```

### Features (`work/features/`)

```yaml
---
title: "Ocean Billing System"
description: "Redesigned billing dashboard for 1000+ enterprise clients"
type: "feature"
subtitle: "Enterprise Billing Dashboard"
company: "routemobile"
role: "Lead Product Designer"
parent: "ocean"                # Links to parent product
year: "2023"
duration: "3 months"
featured: false
heroImage: "/images/features/ocean-billing.png"
tags: ["enterprise", "billing", "dashboard"]
seo:
  metaTitle: "Ocean Billing System | Nicolás Botero"
  metaDescription: "Enterprise billing dashboard design"
  keywords: ["billing dashboard", "enterprise ux"]
---
```

### Posts (`writing/posts/`)

```yaml
---
title: "Building Design Systems That Scale"
description: "Lessons from building 3 design systems"
date: "2025-02-09"
featured: true
tags: ["design systems", "process", "scale"]
seo:
  metaTitle: "Building Design Systems That Scale"
  metaDescription: "Practical lessons from building design systems"
  keywords: ["design systems", "scalability"]
---
```

### Quotes (`writing/quotes/`)

```yaml
---
title: "Perfect is the Enemy of Progress"
quote: "Perfect is the enemy of good"
author: "Voltaire"
source: "La Bégueule (1772)"
date: "2025-02-09"              # Date you added it
featured: false
tags: ["philosophy", "iteration", "perfectionism"]
context: |
  Why this resonates with my design process
---

Your personal reflection on why this quote matters to you,
how it applies to your work, examples of when you've seen
this principle in action, etc.
```

### Now (`now/`)

Dated snapshots—add a new file when you update. The most recent is shown on `/now`.

```yaml
---
title: "What I'm Doing Now"
description: "Current projects, focus areas, and what I'm learning right now."
date: "2026-02-10"            # When this snapshot was written
seo:
  metaTitle: "Now - Nicolás Botero"
  metaDescription: "What I'm currently working on, learning, and focusing on."
  keywords: ["now page", "current projects", "availability"]
---
```

Filename convention: `YYYY-MM-DD.mdx` (e.g. `2026-03-15.mdx` for your next update).

### Experiments (`experiments/`)

```yaml
---
title: "Micro-interactions for Loading States"
description: "Exploring playful loading animations"
type: "design"                 # design, code, or prototype
date: "2025-02-09"
featured: true
tags: ["animation", "micro-interactions", "ui"]
demo: "https://codepen.io/..."  # Optional demo link
---
```

### Books (`reading/books/`)

```yaml
---
title: "Thinking in Systems"
author: "Donella Meadows"
date: "2025-02-09"            # Date you read/reviewed it
rating: 5                      # Out of 5
tags: ["systems thinking", "complexity"]
---
```

## Password Protection

To password-protect content (typically products):

1. **Set `locked: true` in frontmatter:**
   ```yaml
   locked: true
   ```

2. **Add password hash to `.env.local`:**
   ```bash
   # Generate hash first
   npm run hash-password "clientpassword"
   
   # Add to .env.local (NEVER commit this file)
   WORK_OCEAN_PASSWORD=hash-here
   ```

3. **For global password (all locked content):**
   ```bash
   WORK_GLOBAL_PASSWORD=hash-here
   ```

**Password priority:**
1. Per-item `WORK_[SLUG]_PASSWORD` env var (slug = filename, UPPERCASE, hyphens → underscores)
2. Global `WORK_GLOBAL_PASSWORD` env var (applies to all work items: products, features, side-projects)

**⚠️ Never put passwords in frontmatter in production!**

## URL Structure

Content is automatically mapped to URLs:

| File | URL |
|------|-----|
| `work/products/ocean.mdx` | `/work/ocean` |
| `work/features/ocean-billing.mdx` | `/work/features/ocean-billing` |
| `writing/posts/design-systems.mdx` | `/writing/posts/design-systems` |
| `writing/quotes/perfect-is-enemy.mdx` | `/writing/quotes/perfect-is-enemy` |
| `experiments/design/loading.mdx` | `/experiments/design/loading` |
| `reading/books/thinking-in-systems.mdx` | `/reading/books/thinking-in-systems` |

## Adding New Content

1. Create MDX file in appropriate folder
2. Add required frontmatter
3. Write content using Markdown or MDX components
4. Add images to `public/images/<subType>/` with filenames `{slug}-hero.png`, `{slug}-thumbnail.png`, etc. (see [docs/ASSETS.md](../docs/ASSETS.md))
5. Test locally: `npm run dev`
6. Commit and push

## Images

**One folder per subType**, no slug subfolders. Filenames encode slug + level: `{slug}-hero.png`, `{slug}-thumbnail.png`, `{slug}-1.png`, etc. Mirrors MDX (flat files per folder).

Example for products:
- Content: `content/work/products/ocean.mdx`
- Assets: `public/images/products/ocean-hero.png`, `ocean-thumbnail.png`, `ocean-1.png`, …

Reference in MDX:
```markdown
![Alt text](/images/products/ocean-hero.png)
```

Full layout, levels, and rationale: [docs/ASSETS.md](../docs/ASSETS.md).

## Design System Components

All content can use design system components (coming soon):

```mdx
<Section title="The Challenge">
  <Grid cols={2}>
    <Card>Problem 1</Card>
    <Card>Problem 2</Card>
  </Grid>
</Section>
```

---

**Last Updated:** February 12, 2026
