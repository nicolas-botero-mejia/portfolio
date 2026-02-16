# Asset structure (images & media)

How to organize images and other static assets so the site scales without adding new folders.

## Strategy: one folder per subType, slug-level in the filename

**Mirror the MDX structure:** one folder per content subType (products, features, posts, etc.). No slug subfolders. All images for that subType live in the same folder. The **filename** carries both the content piece and the “level” (hero, thumbnail, or sequence for in-body).

| Content file | Asset path (same folder, filename encodes slug + level) |
|--------------|--------------------------------------------------------|
| `content/work/products/ocean.mdx` | `public/images/products/ocean-hero.png`, `ocean-thumbnail.png`, `ocean-1.png`, … |
| `content/work/features/ocean-billing.mdx` | `public/images/features/ocean-billing-hero.png`, … |
| `content/writing/posts/design-systems.mdx` | `public/images/posts/design-systems-hero.png`, … |

**Naming convention:** `{slug}-{level}.{ext}`

- **level** = `hero` | `thumbnail` | `1` | `2` | `3` | … | `n` (or a short descriptive name, e.g. `ocean-dashboard.png`).
- **slug** = same as the MDX filename without extension (e.g. `ocean`, `aquads`, `design-systems`).

**Why this scales**

- **No new folders** — add new content by adding new files in the existing subType folder. Same number of directories as content (products, features, posts, …).
- **Mirrors MDX** — content is flat per folder (`products/ocean.mdx`, `aquads.mdx`); assets are flat per folder (`products/ocean-hero.png`, `aquads-hero.png`).
- **Predictable paths** — hero is always `/{subType}/{slug}-hero.png`; frontmatter and code use the same rule (`getHeroImagePath(subType, slug)`).
- **Clear ownership** — prefix in filename (slug) shows which piece an image belongs to.

**Tradeoffs**

- **One folder can get long** — e.g. 15 products × 10 images = 150 files in `products/`. Still manageable; use consistent naming so sorting stays useful.
- **Slug renames** — if you rename a slug (e.g. ocean → ocean-cpaas), you rename all files that start with that slug. With folder-per-slug you’d rename one folder; here you rename N files. For a portfolio-sized set this is usually rare and acceptable.
- **Stick to the convention** — `slug-level.ext` must be consistent so tooling and URLs don’t break.

## Directory layout

One folder per **subType** (same as content). Files inside use `{slug}-{level}.{ext}`.

```
public/images/
├── products/             # content/work/products/*.mdx
│   ├── ocean-hero.png
│   ├── ocean-thumbnail.png
│   ├── ocean-1.png
│   ├── aquads-hero.png
│   ├── sainapsis-hero.png
│   └── bridge-hero.png
├── features/              # content/work/features/*.mdx
│   └── <slug>-hero.png, ...
├── side-projects/
│   └── <slug>-hero.png, ...
├── posts/                 # content/writing/posts/*.mdx
│   └── <slug>-hero.png, ...
├── thoughts/
├── quotes/
├── books/
├── articles/
├── design/                # content/experiments/design/*.mdx
├── code/
└── prototypes/
```

## Standard levels

| Level | Use | Example |
|-------|-----|---------|
| `hero` | Hero image; frontmatter `heroImage`, detail pages | `ocean-hero.png` |
| `thumbnail` | Listing cards (when supported) | `ocean-thumbnail.png` |
| `1`, `2`, `3`, … | In-body images in order | `ocean-1.png`, `ocean-2.png` |
| Descriptive | Optional; short kebab-case | `ocean-dashboard.png` |

Use the same extension consistently (e.g. `.png` or `.jpg`) if you like; the app only cares that the path in frontmatter matches.

## References

- **Content taxonomy:** `src/data/sources/contentTypes.ts` (subTypes)
- **Path helper:** `src/lib/contentPaths.ts` — `getHeroImagePath(subType, slug)` → `/images/{subType}/{slug}-hero.png`
- **Content structure:** [content/README.md](../content/README.md)

---

**Last updated:** February 2026
