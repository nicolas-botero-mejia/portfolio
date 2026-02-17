# Asset structure (images & media)

How to organize images and other static assets so the site scales without adding new folders.

## Strategy: contentType + subType, slug-level in the filename

**Mirror the content structure:** one folder per **content type** (work, experiments, writing, etc.), then per **subType** where applicable. No slug subfolders. The **filename** carries both the content piece and the "level" (hero, thumbnail, or sequence for in-body).

| Content file | Asset path |
|--------------|------------|
| `content/work/products/ocean.mdx` | `public/images/work/products/ocean-hero.png`, `ocean-thumbnail.png`, `ocean-1.png`, … |
| `content/work/features/ocean-billing.mdx` | `public/images/work/features/ocean-billing-hero.png`, … |
| `content/writing/posts/design-systems.mdx` | `public/images/writing/posts/design-systems-hero.png`, … |
| `content/experiments/design/loading-states.mdx` | `public/images/experiments/design/loading-states-hero.png`, … |
| `content/now/2026-02-10.mdx` | `public/images/now/2026-02-10-hero.png` (optional; now has no subTypes) |

**Naming convention:** `{slug}-{level}.{ext}`

- **level** = `hero` | `thumbnail` | `1` | `2` | `3` | … | `n` (or a short descriptive name, e.g. `ocean-dashboard.png`).
- **slug** = same as the MDX filename without extension (e.g. `ocean`, `aquads`, `design-systems`).

**Path convention:** `/images/{contentType}/{subType}/{slug}-{level}.{ext}` when the content type has subTypes; `/images/{contentType}/{slug}-{level}.{ext}` when it does not (e.g. now).

**Why this scales**

- **All content types supported** — work, experiments, writing, reading, now, and pages can use images without collision.
- **Predictable paths** — frontmatter and code use the same rule (`getHeroImagePath(contentType, subType, slug)`).
- **Clear ownership** — contentType + subType + slug in path show which piece an image belongs to.

## Directory layout

One folder per **content type**, then per **subType** (matching content). Files inside use `{slug}-{level}.{ext}`.

```
public/images/
├── work/
│   ├── products/             # content/work/products/*.mdx
│   │   ├── ocean-hero.png
│   │   ├── ocean-thumbnail.png
│   │   ├── ocean-1.png
│   │   ├── aquads-hero.png
│   │   └── ...
│   ├── features/             # content/work/features/*.mdx
│   │   └── <slug>-hero.png, ...
│   ├── side-projects/
│   │   └── <slug>-hero.png, ...
│   └── transformations/         # content/work/transformations/*.mdx
│       └── <slug>-hero.png, ...
├── experiments/
│   ├── design/               # content/experiments/design/*.mdx
│   │   └── <slug>-hero.png, <slug>-concept.png, ...
│   ├── code/
│   └── prototypes/
├── writing/
│   ├── posts/                # content/writing/posts/*.mdx
│   │   └── <slug>-hero.png, <slug>-1.png, ...
│   ├── thoughts/
│   └── quotes/
├── reading/
│   ├── books/
│   └── articles/
├── now/                      # content/now/*.mdx (no subTypes)
│   └── <YYYY-MM-DD>-hero.png, ...
└── pages/                    # content/pages/*.mdx (about, uses, colophon)
    └── <slug>-hero.png, ...
```

## Standard levels

| Level | Use | Example |
|-------|-----|---------|
| `hero` | Hero image; used in MDX content | `ocean-hero.png` |
| `thumbnail` | Listing cards via `getWorkThumbnailPath()` | `ocean-thumbnail.png` |
| `1`, `2`, `3`, … | In-body images in order | `ocean-1.png`, `ocean-2.png` |
| Descriptive | Optional; short kebab-case | `ocean-dashboard.png`, `project-slug-concept.png` |

Use the same extension consistently (e.g. `.png` or `.jpg`) if you like; the app only cares that the path in frontmatter matches.

## Path helpers

- **Generic:** `src/lib/contentPaths.ts`
  - `getHeroImagePath(contentType, subType, slug, ext?)` → `/images/{contentType}/{subType}/{slug}-hero.{ext}` (or without subType when null)
  - `getImagePath(contentType, subType, slug, level, ext?)` → same with any level
- **Work-only convenience:** `getWorkHeroImagePath(subType, slug)`, `getWorkThumbnailPath(subType, slug)`, `getWorkImagePath(subType, slug, level)`

**Use in code (not in MDX):** The helpers are used for derived image paths. Listing cards use `getWorkThumbnailPath()` for thumbnails. Hero images and in-body images are authored directly in MDX (e.g. `![Alt](/images/work/products/ocean-hero.png)`) using the full path — there is no frontmatter field or MDX-level helper, so authors follow the naming convention.

## Migration from old layout

If you had images under `public/images/products/`, `public/images/features/`, etc. (without the contentType level), move them under the contentType folder:

- `public/images/products/` → `public/images/work/products/`
- `public/images/features/` → `public/images/work/features/`
- `public/images/side-projects/` → `public/images/work/side-projects/`
- `public/images/posts/` → `public/images/writing/posts/`
- `public/images/design/` → `public/images/experiments/design/`
- (and similarly for code/, prototypes/, thoughts/, quotes/, books/, articles/, now/, pages/)

## References

- **Content taxonomy:** `src/data/sources/contentTypes.ts` (contentTypes and subTypes)
- **Content structure:** [content/README.md](../content/README.md)

---

**Last updated:** February 2026
