# Figma Integration Learnings

Design-to-code learnings from pushing tokens and components to Figma via the plugin API. Use this doc to improve future Figma-related tasks.

**How to use this doc:** New to a Figma task? Start with **When Starting Figma Tasks** (runbook). Need token → Figma mapping? See **Token Architecture**, **Font Tokens**, and **Component-to-Token Mapping**. Hitting an API quirk? Check **API Gotchas** and **Community & forum learnings**. Planning bidirectional tokens? See **Strategy: Figma → Code**.

---

## Relationship to figma-friend Skill

**Use the figma-friend skill** when doing Figma work—it's not obsolete. It defines:
- **Primary tools**: `navigate_page` / `browser_navigate`, `evaluate_script` (Chrome DevTools MCP)
- **Workflow**: Open Figma → confirm `figma` global → run plugin API scripts
- **Rules**: Plugin API only (no REST API, no manual UI instructions)
- **Troubleshooting**: Edit access, plugin permissions, open-close-plugin trick

**This doc extends figma-friend** with project-specific patterns: token architecture, component creation (createComponentFromNode, HUG), component properties (text/label), variable bindings, font mapping, and positioning. Invoke figma-friend first; apply these learnings for this portfolio's design system.

**Token flow (this project):** Tokens live in code (`src/data/sources/primitiveTokens.ts`, `semanticTokens.ts`) and are the source of truth. We push to Figma (variables, component styling) via scripts run in the plugin context (e.g. `evaluate_script`). Future: optional import from Figma → staging/merge (see Strategy).

---

## Connection & Access

- **Chrome DevTools MCP** runs `evaluate_script` in the Figma page. The `figma` global is available when a plugin has been opened at least once in the file.
- **Cursor IDE Browser** and **Chrome DevTools** are separate instances. Chrome DevTools connects to its own Chrome profile; select the tab with the Figma design file before running scripts.
- Check connection: `typeof figma !== 'undefined'` returns `true` when ready.

---

## When Starting Figma Tasks

1. **Invoke figma-friend** for the base workflow.
2. Confirm Chrome DevTools MCP is connected and Figma file is open.
3. Check token source (`src/data/sources/primitiveTokens.ts`, `semanticTokens.ts`) for current structure.
4. For new components: create frame with auto-layout → convert to component → combine as variants.
5. For fontFamily: use `FIGMA_FONT_FAMILY_MAP` values in Figma; bind to text nodes.
6. Position new elements below existing ones; avoid overlap.
7. For existing text-based components (Badge, Button, Tabs, Tooltip): ensure a **label** text property exists and is bound to all relevant text layers so instances are editable from the panel without deep selection.

---

## Token Architecture

- **Source of truth:** `src/data/sources/primitiveTokens.ts`, `semanticTokens.ts` (see also ROADMAP — token generation, Figma sync).
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

## Working with text (when modifying via plugin)

When a script changes text content or layout-related text properties, the Plugin API requires fonts to be loaded and has specific behavior to handle.

- **Load fonts before changing text:** Any change to `characters`, `fontSize`, `fontName`, `textStyleId`, `textCase`, `letterSpacing`, `lineHeight`, or range functions like `setRangeFontSize()` requires the font to be loaded first. Call `figma.loadFontAsync(fontName)` (or the node's `fontName`). Without this, the plugin throws.
- **Single vs multiple fonts:** For one font: `await figma.loadFontAsync(node.fontName)`. For mixed-style text: `await Promise.all(node.getRangeAllFontNames(0, node.characters.length).map(figma.loadFontAsync))`.
- **Colors/strokes only:** You do *not* need to load fonts to change `.fills`, `.strokes`, `.fillStyleId`, etc.
- **Mixed styles:** Many text properties can return `figma.mixed` when different character ranges have different values. Use `getStyledTextSegments()` or `getRange*` / `setRange*` when working with partial ranges.
- **Missing fonts:** Check `textNode.hasMissingFont` before loading. Users often run plugins in files with missing fonts; handle or warn instead of ignoring.
- **Creating text:** Load the font first, then set `fontName` and `characters` on the new text node.

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

## Variable Naming

- Figma allows slashes for hierarchy (e.g. `colors/gray/50`, `semantic/background/primary`).
- Avoid numeric keys in paths (e.g. `spacing/0.5` → use `spacing/0-5`).
- Duplicate variable names in a collection cause errors.

---

## Variable Bindings

- **Paints** (fills, strokes): use `figma.variables.setBoundVariableForPaint(paint, 'color', variable)` and assign the returned paint to `node.fills` or `node.strokes`.
- **Text**: `fontFamily`, `fontSize`, `fontWeight` are bindable. Pass the Variable object, not the ID.
- **Layout**: `cornerRadius`, `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom`, `strokeWeight` accept variable bindings.
- **Effect** (drop shadow): Figma effect format differs; avoid complex effects if the API format is unclear.

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
- **Component properties:** `addComponentProperty()` returns the full key (e.g. `label#25:0`). Use that exact string for `componentPropertyReferences` and for `editComponentProperty()`; the suffix is required. To find an existing text property by display name, use `Object.keys(node.componentPropertyDefinitions).find(k => k.startsWith('Label#'))` (or the current name). If properties don’t register, see **Community & forum learnings**.
- **Large files / dynamic page loading:** With `"documentAccess": "dynamic-page"` (default for new plugins), only the current page loads fully. Use async APIs: `figma.getNodeByIdAsync()`, `figma.getLocalTextStylesAsync()`, `node.getMainComponentAsync()`, etc. Sync variants (`figma.getNodeById()`, `.mainComponent`) can fail or be undefined when the node is on an unloaded page. [Migrating to dynamic loading](https://www.figma.com/plugin-docs/migrating-to-dynamic-loading/).
- **Performance (widgets/canvas):** Blurs, shadows, non-normal blend modes, and complex SVG are expensive. Prefer rasterizing effects as images if needed. Load additional pages only when the user needs them.

---

## Community & forum learnings

Pitfalls and patterns from Figma Forum, Dev.to, Discord, and blogs—not just official docs.

- **loadFontAsync + closePlugin:** Do not call `figma.closePlugin()` before `loadFontAsync` (and any dependent work) completes. Closing the plugin can leave the promise hanging indefinitely. Await all async work, then close. [Forum: loadFontAsync stuck](https://forum.figma.com/report-a-problem-6/loadfontasync-stuck-indefinitely-43195), [How to properly load fonts](https://forum.figma.com/archive-21/how-to-properly-load-fonts-via-figma-loadfontasync-24488).
- **Loading multiple fonts:** Avoid calling `loadFontAsync` in a loop; use `Promise.all(...fonts.map(figma.loadFontAsync))` so loads run concurrently and avoid unnecessary event-loop round-trips.
- **addComponentProperty not registering:** Multiple Forum reports: properties sometimes don’t show up (`componentPropertyDefinitions` stays empty) even with correct structure. Workarounds to try: ensure the node is the main component (not an instance), run with that component selected, or create the property from a nested text layer. [Forum: addComponentProperty not registering](https://forum.figma.com/report-a-problem-6/figma-plugin-api-addcomponentproperty-not-registering-properties-on-components-43076).
- **Text ↔ component property binding:** The API way to link text to a component property is `textNode.componentPropertyReferences = { characters: propertyName }`. You can’t bind both a variable and a component property to the same text field. [Forum: Link TextNode to component property](https://forum.figma.com/ask-the-community-7/plugin-api-link-textnode-characters-to-component-property-29614).
- **Network requests from plugins:** Plugin iframes have a null origin; fetch only works to endpoints that allow `Access-Control-Allow-Origin: *` (or your plugin). Declare domains in `manifest.json` under `networkAccess` for production.
- **Asking for help:** Forum and Discord responses are better when you include full error messages, minimal code snippets, and reproducible steps.

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

---

## References & further reading

### Official Figma docs

| Topic | Resource |
|-------|----------|
| **Plugin API (overview)** | [Introduction to Plugins](https://www.figma.com/plugin-docs/) |
| **Working with text** | [Working with Text](https://www.figma.com/plugin-docs/working-with-text/) — loadFontAsync, mixed styles, missing fonts |
| **Working with variables** | [Working with Variables](https://www.figma.com/plugin-docs/working-with-variables/) — collections, bindings, typography variables, samples |
| **Best practices (widgets)** | [Best Practices](https://www.figma.com/widget-docs/best-practices/) — performance, design, property menu |
| **Dynamic page loading** | [Migrating to Dynamically Load Pages](https://www.figma.com/plugin-docs/migrating-to-dynamic-loading/) — async APIs, large files |
| **API reference** | [Plugin API Reference](https://developers.figma.com/docs/plugins/api/api-reference/) |
| **Samples** | [figma/plugin-samples](https://github.com/figma/plugin-samples) — variables import/export, styles-to-variables, etc. |

### Community & other sources

Use these for real-world gotchas, workarounds, and discussions beyond the docs.

| Source | What you’ll find |
|--------|-------------------|
| **Figma Community Forum** | [forum.figma.com](https://forum.figma.com/) — API questions, bug reports, “how do I…” threads. Search for `addComponentProperty`, `loadFontAsync`, `componentPropertyReferences`, etc. |
| **Figma Discord** | [discord.gg/xzQhe2Vcvx](https://discord.gg/xzQhe2Vcvx) — Live help, plugin dev channel. Figma’s “Get Help” docs recommend it for faster answers with context (errors, code, steps). |
| **Friends of Figma** | [Friends of Figma: Plugins](https://friends.figma.com/plugins/) — Plugins interest group, quarterly remote talks by plugin developers. |
| **Dev.to** | Search “Figma plugin” — Practical posts (e.g. building a plugin in ~300 lines, plugin systems). Good for structure and patterns, not deep API reference. |
| **Reddit** | r/FigmaDesign, r/webdev — Occasional plugin/API threads; less API-specific than the Forum. Use for design+dev crossover and “has anyone done X?”. |
| **Figmalion** | [figmalion.com → Plugin Development](https://figmalion.com/topics/plugin-development/page/2) — Curated plugin topics and community plugins (e.g. Figlet as a learning sandbox). |
| **Blogs** | [9elements: variables2css](https://9elements.com/blog/variables2css-writing-a-figma-plugin/) — Writing a plugin that exports variables to CSS. [Evil Martians](https://evilmartians.com/chronicles/) — Advanced plugin patterns (auth, routing, storage). |
| **Tokens Studio** | [Tokens Studio for Figma](https://docs.tokens.studio/figma/variables-overview) — Community plugin for tokens ↔ variables; useful reference for token/variable workflows. |
