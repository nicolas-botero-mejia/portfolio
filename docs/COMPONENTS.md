# Component Inventory & Roadmap

Design system components for the portfolio. Token-driven; Tailwind utilities map to our design tokens.

## Current Components

| Component | Purpose | Variants | Token Usage |
|-----------|---------|----------|-------------|
| **Badge** | Labels, tags, status pills | default, success, warning, neutral | badge/\* semantic colors |
| **Button** | Primary actions, CTAs | primary, secondary, ghost | button/\* semantic colors |
| **Card** | Content containers, work items | — | card/\* (bg, border) |
| **CardHeader** | Card section header with CTA | — | gray scale |
| **CardContent** | Card body | — | — |
| **CardDescription** | Card subtitle | — | — |
| **CardImage** | Card hero/thumb | — | radii |
| **CardListItem** | List item within card | — | — |
| **CardMeta** | Card metadata (role, year, etc.) | — | gray scale |
| **CardTitle** | Card title | — | typography |
| **ContentNavigation** | Prev/next links | — | — |
| **Dialog** | Modal (Radix) | — | — |
| **Tabs** | Tabbed content (Radix) | — | — |
| **Tooltip** | Hover tooltips (Radix) | — | — |
| **ScrollArea** | Scrollable regions (Radix) | — | — |
| **CheckIcon** | SVG checkmark | — | — |
| **MDXRenderer** | Renders MDX content | — | prose |

## Component vs Layout

- **UI components** (`components/ui/`) – Reusable, token-driven primitives
- **Layout components** (`components/layout/`) – Page structure (Header, SplitLayout, etc.)
- **Feature components** (`components/work/`, etc.) – Composed from UI + layout

## Components We Might Need

| Component | When | Notes |
|-----------|------|-------|
| **Link** | Internal vs external styling | Button as="link" exists; might want dedicated Link with variants |
| **Input** | Forms, search | Add when we have forms |
| **Typography** | H1–H4, Body, Caption | Prose handles MDX; standalone for structured content |
| **Image** | Optimized image with blur | Next/Image wrapper with aspect ratio, placeholder |
| **Avatar** | Profile photos | About, team sections |
| **Breadcrumb** | Navigation trail | Case study pages |
| **Skeleton** | Loading states | If we add loading UIs |
| **Toast** | Notifications | If we add feedback (e.g. contact form success) |
| **Select/Dropdown** | Filters, pickers | Reading filters, etc. |
| **Accordion** | Expandable sections | FAQ, workflow details |

## Expansion Rule

Add a new component when:

1. **Used in 2+ places** – Reuse justifies abstraction
2. **Has clear variants** – Token-driven variants (like Badge, Button)
3. **Belongs in design system** – Not page-specific

If it's one-off or experimental, keep it in the feature folder.

## Token Wiring

Components use Tailwind classes that resolve to our tokens:

- `bg-badge-default-bg` → `--color-badge-default-bg`
- `text-badge-default-text` → `--color-badge-default-text`
- `rounded-md` → `--radius-md`
- `px-2.5 py-0.5` → `--spacing-2.5`, `--spacing-0.5`

Add semantic tokens in `sources/tokens.ts` when a component needs a dedicated token (e.g. `card.bg`). Use primitive tokens (gray-100, etc.) for general-purpose styling.
