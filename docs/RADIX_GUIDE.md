# Radix UI Guide

Radix provides **headless primitives** — they handle behavior and accessibility, you handle styling.

## What We Installed

- **@radix-ui/react-dialog** — Modals, focus trapping, escape to close
- **@radix-ui/react-tabs** — Tabbed content, keyboard navigation

## The Pattern

1. **Radix handles:** Keyboard nav, focus management, ARIA roles, screen reader announcements
2. **You handle:** All visual styling with Tailwind (or your design tokens)

## Using Dialog

```tsx
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger asChild>
    <button className="rounded-lg bg-gray-900 px-4 py-2 text-white">
      Open dialog
    </button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 shadow-xl">
      <Dialog.Title>Modal Title</Dialog.Title>
      <Dialog.Description>Optional description for screen readers.</Dialog.Description>
      <Dialog.Close asChild>
        <button>Close</button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

**Key bits:**
- `asChild` — Radix passes its props to your child element instead of rendering a default one
- `Dialog.Portal` — Renders the modal outside the DOM hierarchy (avoids z-index issues)
- You add all the Tailwind classes; Radix adds the logic

## Using Tabs

```tsx
import * as Tabs from '@radix-ui/react-tabs';

<Tabs.Root defaultValue="tab1">
  <Tabs.List className="flex gap-2 border-b border-gray-200">
    <Tabs.Trigger 
      value="tab1" 
      className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
    >
      Tab 1
    </Tabs.Trigger>
    <Tabs.Trigger value="tab2" className="...">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content for tab 1</Tabs.Content>
  <Tabs.Content value="tab2">Content for tab 2</Tabs.Content>
</Tabs.Root>
```

**Key bits:**
- `value` / `defaultValue` — Controls which tab is active
- `data-[state=active]` — Radix adds this attribute; use it for active styles
- Controlled: use `value` + `onValueChange` instead of `defaultValue`

## Styling with data attributes

Radix components expose `data-state` and `data-orientation` for styling:

- `data-state="open"` / `data-state="closed"` — Dialog overlay, content
- `data-state="active"` / `data-state="inactive"` — Tab triggers
- `data-disabled` — When disabled

Example:
```css
[data-state=active]:font-semibold
[data-state=active]:text-gray-900
```

## Adding more primitives

When you need other behaviors, install the specific package:

```bash
npm install @radix-ui/react-dropdown-menu   # Dropdowns
npm install @radix-ui/react-accordion       # Expandable sections
npm install @radix-ui/react-popover         # Popovers/tooltips
npm install @radix-ui/react-select          # Select dropdowns
```

Each follows the same pattern: Radix = behavior, you = styling.
