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
