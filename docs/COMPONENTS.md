# Component Inventory & Roadmap

Design system components for the portfolio. Token-driven; Tailwind utilities map to our design tokens.

## Current Components

| Component | Purpose | Variants | Token Usage |
|-----------|---------|----------|-------------|
| **Badge** | Labels, tags, status pills | default, success, warning, neutral | background, content, border, status roles |
| **Button** | Primary actions, CTAs | primary, secondary, ghost | action/\* roles |
| **Card** | Content containers, work items | — | background-surface, border-subtle |
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
| **PageHeader** | Section/page title + optional description | default, serif | typography, content-primary/muted |
| **ScrollPrompt** | Scroll-for-more affordance (icon + label) | — | content-muted; label configurable |
| **MDXRenderer** | Renders MDX content | — | prose |

## Reusability & MDX

**Design system components** in `@/components/ui` are the single source of truth for both App Router pages and MDX content.

- **PageHeader** – Use for any section or page title. In app routes: `<PageHeader title="Work" description="…" variant="serif" />`. In MDX: import the same component and pass title/description from frontmatter or as props (e.g. in a layout wrapper that reads `frontmatter.title`).
- **ScrollPrompt** – Fully configurable: `label` (e.g. "Scroll for more"), optional `onVisible` callback for load-more, and `once` to control whether it fires every time it enters view or only once. Use the same component anywhere you need a scroll affordance or infinite-scroll trigger.
- **Cards** – Work listing uses an overlay pattern (16:9 image + gradient + text overlay). That pattern is implemented in `WorkClient`; if we need the same overlay card elsewhere (e.g. featured work in MDX), extract an `OverlayCard` (or similar) into `ui/` and use it from both places.
- **MDX usage** – MDX files can import any component from `@/components/ui`. Use the same primitives (Badge, Card, PageHeader, etc.) so MDX and JSX pages stay visually and semantically consistent. Prefer passing data via props (e.g. from frontmatter) rather than duplicating layout logic inside MDX.

**Best practice:** Before creating a new component, ask: "Is this design system or page-specific?" If it’s reusable (2+ places or clear variants), put it in `ui/`. If it’s page-specific, keep it in the feature folder or inline.

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

**Role-based semantics** – Components map to design roles, not component names:

| Role | Tokens | Used By |
|------|--------|---------|
| background | primary, subtle, surface, muted | Badge default, Card, body |
| content | primary, secondary, muted, inverted | Badge, body text |
| border | subtle, default, strong | Badge, Card, Button secondary |
| action | primary, secondary, ghost | Button |
| status | success, warning, neutral | Badge variants |

Examples:

- Badge default → `bg-background-subtle text-content-secondary border-border-default`
- Badge success → `bg-status-success-bg text-status-success-text border-status-success-border`
- Button primary → `bg-action-primary-bg text-action-primary-text`
- Card → `bg-background-surface border-border-subtle`
- Body → `background-surface`, `content-primary`

Add new roles in `sources/tokens.ts` when a pattern emerges. Use primitive tokens (gray-100) for one-offs.

---

## Token Convention (DRY Standard)

Components use two token categories. Both are defined in `sources/tokens.ts`; Tailwind consumes them via `tokens.generated.css`.

### 1. Semantic tokens (colors)

**Role-based** – express meaning, not raw values. Use for color decisions.

| Role | Example utilities |
|------|-------------------|
| background | `bg-background-surface`, `bg-background-subtle` |
| content | `text-content-primary`, `text-content-muted` |
| border | `border-border-default`, `border-border-subtle` |
| action | `bg-action-primary-bg`, `text-action-primary-text` |
| status | `bg-status-success-bg`, `text-status-success-text` |

### 2. Primitive scale (layout & typography)

**Scale-based** – radii, spacing, fontSize, fontWeight. Use Tailwind utilities that resolve to our theme values.

| Category | Source | Example utilities |
|----------|--------|--------------------|
| radii | `radii.md`, `radii.lg` | `rounded-md`, `rounded-lg` |
| spacing | `spacing.2.5`, `spacing.4` | `px-2.5`, `py-0.5`, `p-4` |
| fontSize | `typography.fontSize.xs`, `.sm` | `text-xs`, `text-sm` |
| fontWeight | `typography.fontWeight.medium` | `font-medium`, `font-semibold` |

Values flow: `tokens.ts` → `tokens.generated.css` → Tailwind `@theme` → utilities.

### Component style structure

Structure component styles in three sections for readability:

```tsx
// 1. Layout & typography — primitive scale (tokens.ts → Tailwind theme)
const LAYOUT = 'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium';

// 2. Semantic colors — role-based (variants)
const variantStyles: Record<Variant, string> = {
  default: 'bg-background-subtle text-content-secondary border-border-default',
  // ...
};

// 3. Compose: layout + semantic + optional override
className={`${LAYOUT} ${variantStyles[variant]} ${className}`}
```

- **LAYOUT** (or `BASE`, `SIZE`) – layout/typography from primitive scale; shared across variants.
- **variantStyles** – semantic colors per variant.
- **Compose** – layout + semantic + `className` override.

### Components following this standard

| Component | Layout constant | Semantic usage |
|-----------|-----------------|----------------|
| Badge | `LAYOUT` | `variantStyles` (status, background, content, border) |
| Button | `LAYOUT` | `variantStyles` (action roles), focus ring `background-primary` |
| Card | `LAYOUT` | `background-surface`, `border-subtle` |
| CardHeader | `LAYOUT` | `border-subtle`, `content-muted` |
| CardTitle | `LAYOUT` | `content-primary` |
| CardDescription | `LAYOUT` | `content-muted` |
| CardMeta | `LAYOUT` | `content-muted` |
| CardContent | `LAYOUT` | — |
| CardImage | `LAYOUT` | — |
| CardListItem | `LAYOUT` | `background-muted/subtle`, `content-primary/muted`, focus ring |
| ContentNavigation | `NAV_LAYOUT`, `labelStyles`, `titleStyles` | `border-default`, `content-muted/secondary/primary` |
| Tooltip | `LAYOUT`, `COLORS` | `background-primary`, `content-inverted` |
| Dialog | Multiple constants | `background-surface`, `content-primary/muted/secondary`, `border-strong` |
| Tabs | `LIST_LAYOUT`, `TRIGGER_LAYOUT`, `TRIGGER_COLORS` | `border-default`, `content-muted/primary`, `background-primary` (active) |
| ScrollArea | `ROOT_LAYOUT`, `THUMB_LAYOUT` | `border-default` (thumb) |
| PageHeader | `WRAPPER`, `TITLE_*`, `DESCRIPTION` | `content-primary`, `content-muted`; serif variant uses custom font stack |
| ScrollPrompt | `WRAPPER`, `LABEL_STYLES` | `content-muted`; `label` prop is configurable |