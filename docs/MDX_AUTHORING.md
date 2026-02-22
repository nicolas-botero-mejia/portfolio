# MDX Authoring Reference

Single reference for writing MDX content: images, tables (grid vs semantic), annotations, callouts, and code blocks. Use this when authoring work samples, posts, or any MDX file.

## Annotation rules

- An annotation is a [link definition](https://commonmark.org/spec/#link-reference-definitions) on its own line: `[key]: #` or `[key: value]: #`.
- It applies to the **next block** (table, paragraph, blockquote, or code block). A blank line between the annotation and the block is fine.
- The annotation is consumed (not rendered). Only the next block is shown, with the requested behavior.

## Images

**Shorthand** — resolved from the content path. For a work product with slug `bridge`, `![Alt](hero)` loads `public/images/work/products/bridge-hero.png`. Use a custom name and optional extension: `![Alt](detail)`, `![Alt](screenshot.jpg)`.

**Full path** — use when you need an absolute path: `![Alt](/images/work/products/bridge-hero.png)`.

**Alt vs caption** — by default images have no visible caption; `alt` is for accessibility only. Use `[caption: Your caption here]: #` before the image to show a caption below it.

## Full-width

Place `[full-width]: #` immediately before an image (or other block) to break it out of the content column so it spans the full main content area (viewport on mobile; viewport minus sidebar on desktop).

```md
[full-width]: #

![Hero overview](hero)
```

**Implementation note (for maintainers):** Full-bleed uses negative margins matching article padding (`-ml-8` / `lg:-ml-16`) and explicit width (`w-screen` mobile; `lg:w-[calc(100vw_-_400px)]` desktop). The `400px` matches the sidebar width in `SplitLayout.tsx`. If the layout or sidebar width changes, update both `SplitLayout.tsx` and the full-bleed div in `src/lib/mdxComponents.tsx`.

## Tables

**Design decision:** Grid is the default because most tables in case studies are visual layouts (image grids, collages, side-by-side comparisons), not structured data. Semantic `<table>` is available via annotation for the rare case where tabular data and screen reader navigation matter.

### Grid (default)

Any markdown table **without** an annotation renders as a responsive **div grid**: borderless, with responsive column breakpoints (e.g. 2 cols stack on small screens). Use for image collages and layout.

- **Empty header row** — header is hidden; only the body rows are shown as a grid.
- **Header row with content** — header cells become column labels above the grid (no borders).

Example — image row, no labels:

```md
|   |   |   |
|---|---|---|
| ![One](img1) | ![Two](img2) | ![Three](img3) |
```

Example — with column labels:

```md
| Before | After | Context |
|--------|-------|---------|
| ![Old](1) | ![New](2) | Supporting copy or another image. |
```

### Semantic table (opt-in)

Place `[table]: #` before the table when you need a real data table: borders, styled header, and proper semantics for screen readers. The table is wrapped in a horizontally scrollable container on small screens.

```md
[table]: #

| Metric | Before | After |
|--------|--------|-------|
| NPS    | 32     | 67    |
```

## Callouts

Place `[callout]: #` before a blockquote to render it as a styled highlight box (left border, background) instead of a plain italic quote.

```md
[callout]: #

> Reducing friction at handoff cut back-and-forth by 40%.
```

## Code blocks

Place `[filename: name.ext]: #` before a fenced code block to show a filename label bar above the code.

````md
[filename: tokens.css]: #

```css
--color-primary: #0066ff;
```
````

## Custom captions

By default, images render without a visible caption. Place `[caption: Your caption text]: #` before an image to show a caption (figcaption) below it. The `alt` attribute is always used for accessibility.

```md
[caption: The redesigned flow — conversion up 23%.]: #

![Onboarding screens](onboarding)
```

## Summary of annotations

| Annotation | Applies to | Effect |
|------------|------------|--------|
| `[full-width]: #` | Any block | Break out of content column to full viewport width |
| `[table]: #` | Table | Render as semantic `<table>` with borders and scroll |
| `[callout]: #` | Blockquote | Styled highlight box |
| `[filename: name]: #` | Fenced code block | Filename label bar above the code |
| `[caption: text]: #` | Image | Show figcaption below image (opt-in; alt unchanged) |
