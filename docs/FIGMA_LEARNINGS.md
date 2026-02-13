# Figma Integration Learnings

Design-to-code learnings from pushing tokens and components to Figma via the plugin API (Chrome DevTools + figma-friend). Use this doc to improve future Figma-related tasks.

---

## Connection & Access

- **Chrome DevTools MCP** runs `evaluate_script` in the Figma page. The `figma` global is available when a plugin has been opened at least once in the file.
- **Cursor IDE Browser** and **Chrome DevTools** are separate instances. Chrome DevTools connects to its own Chrome profile; select the tab with the Figma design file before running scripts.
- Check connection: `typeof figma !== 'undefined'` returns `true` when ready.

---

## Token Architecture

- **Primitives** collection: raw palette (colors, spacing, typography, radii, border). Single mode.
- **Semantics** collection: role-based tokens aliasing primitives. Light/Dark modes for theming.
- Semantic variables reference primitives via `{ type: 'VARIABLE_ALIAS', id: variableId }`.
- Use `setBoundVariableForPaint()` for fills/strokes; `setValueForMode()` for the alias.

---

## Font Tokens: Figma vs Source

- **Source** uses CSS font stacks (e.g. `ui-sans-serif, system-ui, sans-serif...`).
- **Figma** expects single font names (e.g. `Inter`, `SF Mono`).
- **Resolver** (`getTokensForFigma`): map source keys to Figma values in `FIGMA_FONT_FAMILY_MAP`. Validate that every `fontFamily` key has a mapping; warn if missing.
- Store Figma-specific values (Inter, SF Mono) in Figma variables; keep source tokens as-is. Bind `fontFamily`, `fontSize`, `fontWeight` on text nodes.

---

## Component Creation

- **Convert frames to components** for HUG support: `figma.createComponentFromNode(frame)`. Components created from frames inherit `layoutMode` and support `layoutSizingHorizontal = 'HUG'` and `layoutSizingVertical = 'HUG'`.
- **Avoid** `figma.createComponent()` + appending a frame: the component won't have layout, so HUG won't work on variant children.
- Set HUG on the **component set** and each **variant** so they size to content.
- Place new components **below** existing ones: compute `startY` from max bottom of prior components + spacing (e.g. 24px).

---

## Variable Bindings

- **Paints** (fills, strokes): use `figma.variables.setBoundVariableForPaint(paint, 'color', variable)` and assign the returned paint to `node.fills` or `node.strokes`.
- **Text**: `fontFamily`, `fontSize`, `fontWeight` are bindable. Pass the Variable object, not the ID.
- **Layout**: `cornerRadius`, `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom`, `strokeWeight` accept variable bindings.
- **Effect** (drop shadow): Figma effect format differs; avoid complex effects if the API format is unclear.

---

## Variable Naming

- Figma allows slashes for hierarchy (e.g. `colors/gray/50`, `semantic/background/primary`).
- Avoid numeric keys in paths (e.g. `spacing/0.5` → use `spacing/0-5`).
- Duplicate variable names in a collection cause errors.

---

## Orphan Cleanup

- When replacing components, remove the old one first: `oldCollection.remove()`.
- Check traversal order when deleting duplicates: keep the correct instance (e.g. the one with HUG on variants).
- Empty frames or stray nodes: walk pages, identify orphans, remove.

---

## API Gotchas

- `VariableCollection.remove()` deletes the collection and its variables.
- `figma.createNodeFromSvg(svgString)` returns a Frame; useful for icons.
- `primaryAxisAlignItems`: use `'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'`, not `'STRETCH'`.
- `layoutSizingHorizontal = 'HUG'` only works on auto-layout frames and text children of auto-layout frames.

---

## Component-to-Token Mapping (This Project)

| Component       | fontSize | fontWeight | Semantic fills/strokes                         |
|----------------|----------|------------|-----------------------------------------------|
| Badge          | xs       | medium     | status/*, background/subtle, border/default   |
| Button         | sm       | medium     | action/primary/*, action/secondary/*, ghost   |
| Tabs           | sm       | medium     | content/muted, content/primary, background/primary (underline) |
| Tooltip        | sm       | medium     | background/primary, content/inverted          |
| CardTitle      | xl       | semibold   | content/primary                               |
| CardDescription| base     | normal     | content/muted                                 |
| CardMeta       | sm       | medium     | content/muted                                 |
| CardHeader     | sm       | medium     | content/muted, border/subtle                  |
| CardListItem   | sm       | medium     | content/primary, content/muted, background/subtle (selected) |
| CheckIcon      | —        | —          | content/primary                               |

---

## When Starting Figma Tasks

1. Confirm Chrome DevTools MCP is connected and Figma file is open.
2. Check token source (`primitiveTokens.ts`, `semanticTokens.ts`) for current structure.
3. For new components: create frame with auto-layout → convert to component → combine as variants.
4. For fontFamily: use `FIGMA_FONT_FAMILY_MAP` values in Figma; bind to text nodes.
5. Position new elements below existing ones; avoid overlap.
