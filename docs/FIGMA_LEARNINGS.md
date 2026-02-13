# Figma Integration Learnings

Design-to-code learnings from pushing tokens and components to Figma via the plugin API. Use this doc to improve future Figma-related tasks.

---

## Relationship to figma-friend Skill

**Use the figma-friend skill** when doing Figma work—it's not obsolete. It defines:
- **Primary tools**: `navigate_page` / `browser_navigate`, `evaluate_script` (Chrome DevTools MCP)
- **Workflow**: Open Figma → confirm `figma` global → run plugin API scripts
- **Rules**: Plugin API only (no REST API, no manual UI instructions)
- **Troubleshooting**: Edit access, plugin permissions, open-close-plugin trick

**This doc extends figma-friend** with project-specific patterns: token architecture, component creation (createComponentFromNode, HUG), component properties (text/label), variable bindings, font mapping, and positioning. Invoke figma-friend first; apply these learnings for this portfolio's design system.

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

## Component Properties (Text / Label)

Use component properties so instances expose a single control (e.g. **label**) for the main text instead of deep-selecting layers.

- **Create a text property:** `node.addComponentProperty('label', 'TEXT', defaultString)`. Returns the full property key (e.g. `label#25:0`). Use **lowercase** names for consistency.
- **Bind to text layers:** set `textNode.componentPropertyReferences = { characters: propertyName }` on every text node that should be driven by that property. Use the exact key returned from `addComponentProperty`.
- **Component sets:** one property can drive all variants. Find all TEXT descendants (e.g. one per variant), then assign the same `componentPropertyReferences` to each so every variant shows the same control in the instance panel.
- **Rename a property:** `node.editComponentProperty(existingKey, { name: 'newName' })`. Returns the new full key (e.g. `label#25:0`). Bindings stay valid; only the display name changes.
- **Finding components by name:** walk the tree for `COMPONENT` or `COMPONENT_SET` and match `node.name.toLowerCase().includes('badge')`. File names may differ (e.g. "Tabs" not "Tab"); search flexibly.

**Components with a `label` property (this project):** Badge, Button, Tabs, Tooltip.

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
- **Component properties:** `addComponentProperty()` returns the full key (e.g. `label#25:0`). Use that exact string for `componentPropertyReferences` and for `editComponentProperty()`; the suffix is required. To find an existing text property by display name, use `Object.keys(node.componentPropertyDefinitions).find(k => k.startsWith('Label#'))` (or the current name).

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

1. **Invoke figma-friend** for the base workflow.
2. Confirm Chrome DevTools MCP is connected and Figma file is open.
3. Check token source (`primitiveTokens.ts`, `semanticTokens.ts`) for current structure.
4. For new components: create frame with auto-layout → convert to component → combine as variants.
5. For fontFamily: use `FIGMA_FONT_FAMILY_MAP` values in Figma; bind to text nodes.
6. Position new elements below existing ones; avoid overlap.
7. For existing text-based components (Badge, Button, Tabs, Tooltip): ensure a **label** text property exists and is bound to all relevant text layers so instances are editable from the panel without deep selection.

---

## Strategy: Figma → Code (Multi-Source Tokens)

**Current state:** Tokens live in code (`primitiveTokens.ts`, `semanticTokens.ts`); we push to Figma. One direction.

**Goal:** Tokens as source of truth that can **incorporate** from multiple sources—including Figma—not just from code.

### Options to consider

| Approach | Pros | Cons |
|----------|------|------|
| **Import script** | Run periodically; pull Figma variables via plugin API or REST; output to a staging file (e.g. `figma-import.json`) for review | Need conflict resolution; Figma structure differs from our primitives/semantics |
| **Merge layer** | Keep code tokens as canonical; add an "imports" step that merges new/updated values from Figma into the token files (or a generated override file) | Merge logic; deciding who wins on conflicts |
| **Figma as input, code as curator** | Designer adds variables in Figma → import script extracts → human or script merges into `primitiveTokens` / `semanticTokens` | Manual or semi-manual curation step |
| **DTCG + Style Dictionary** | Use Design Tokens Community Group format as interchange; Style Dictionary transforms Figma export → our structure | Adds tooling; Figma export format may need adaptation |

### Recommended next steps

1. **Extract script (plugin API):** Write a script run via `evaluate_script` that walks `figma.variables.getLocalVariableCollections()`, reads variable names and values, and outputs JSON. This becomes the "Figma export" format.
2. **Import pipeline:** Create `scripts/importFigmaTokens.ts` (or similar) that consumes that JSON and merges into token sources. Define rules: e.g. "new keys → add; existing keys → code wins unless explicitly marked as Figma override."
3. **Namespace:** Consider `figma/` or `imported/` prefix for tokens that originate from Figma, so they're distinguishable from hand-written tokens.
4. **Components:** Pulling component structure (variants, props) from Figma is heavier; start with variables, then design component spec extraction if needed.

### Conflict resolution (draft)

- **New token in Figma, not in code:** Add to `primitiveTokens` or `semanticTokens` (or staging file for review).
- **Same path, different value:** Code wins by default; or support an override file (e.g. `tokenOverrides.json`) that Figma import can populate for explicit overrides.
- **fontFamily:** Always use `FIGMA_FONT_FAMILY_MAP` for Figma-bound values; source keeps CSS stacks.
