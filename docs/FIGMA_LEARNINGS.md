# Figma Integration Learnings

Design-to-code learnings from pushing tokens and components to Figma via the plugin API. Use this doc to improve future Figma-related tasks.

**How to use this doc:** New to a Figma task? Start with **When Starting Figma Tasks** (runbook). Need token → Figma mapping? See **Token Architecture**, **Font Tokens**, and **Component-to-Token Mapping**. Hitting an API quirk? Check **API Gotchas** and **Community & forum learnings**. Planning bidirectional tokens? See **Strategy: Figma → Code**.

**Related:** [docs/FIGMA_INTEGRATION.md](FIGMA_INTEGRATION.md) describes an alternative, Figma-as-source flow (REST API, `src/tokens/`). It is superseded for this project; we use code-first tokens and the Plugin API (this doc).

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
- **Text ↔ component property binding:** The API way to link text to a component property is `textNode.componentPropertyReferences = { characters: propertyName }`. You can’t bind both a variable and a component property to the **same** text field. **They can coexist on different fields:** e.g. `label` drives `characters`; `fontSize`, `fontFamily`, `fontWeight` stay bound to variables. Badge, Button, Tabs, Tooltip use both. [Forum: Link TextNode to component property](https://forum.figma.com/ask-the-community-7/plugin-api-link-textnode-characters-to-component-property-29614).
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

**Goal:** Code remains the source of truth, but you can design in Figma and add tokens there for speed, then import into code. Bidirectional with clear conflict rules.

### Conflict resolution (canonical)

| Direction | When conflict | Rule |
|-----------|--------------|------|
| **Push (code → Figma)** | Token already exists in Figma | **Code wins** — overwrite Figma with code value |
| **Import (Figma → code)** | Token already exists in code | **Ask user** — "Update (replace code value) or Discard (keep code value)" |
| **Import** | New token in Figma, not in code | Add to canonical sources (or staging for review) |
| **fontFamily** | Always | Use `FIGMA_FONT_FAMILY_MAP` for Figma; source keeps CSS stacks |

### Staging

**Staging** = a temporary holding area for data while you decide what to do with it. In this context:
- Raw Figma export (e.g. `figma-export.json`) = staging until merge runs.
- During import conflicts, the incoming Figma value is "staged" until you choose Update or Discard.

Staging files are intermediate; they are not the source of truth. Final state lives in `primitiveTokens.ts`, `semanticTokens.ts`, or a generated override file that the pipeline merges.

### Resolvers and token pipeline

`src/data/resolvers/tokens.ts` currently handles **export** and **transformation** (code → Figma format, code → CSS). To support import and the full round-trip:

- **Repurpose/expand** the resolver (or introduce a token pipeline) to handle:
  - **Export:** `getTokensForFigma()`, `getTokensForCSS()` (existing)
  - **Import:** consume Figma export, merge with sources, apply conflict rules
  - **Transform:** path mapping (Figma ↔ code), `FIGMA_FONT_FAMILY_MAP`

Either rename to reflect the broader role (e.g. "token pipeline") or keep `resolvers/tokens.ts` and add `mergeFromFigma()` (or similar). The import script in `scripts/` would call into this layer.

### Figma ↔ Code mapping

| Figma | Code |
|-------|------|
| **Primitives** collection | `primitiveTokens.ts` (colors, spacing, typography, radii, border) |
| **Semantics** collection | `semanticTokens.ts` (themes.light, themes.dark) |
| Variable name `colors/gray/50` | `colors.gray[50]` |
| Variable name `spacing/4` | `spacing[4]` |
| Variable name `spacing/0-5` | `spacing[0.5]` |
| Variable name `typography/fontSize/sm` | `typography.fontSize.sm` |
| Variable name `typography/fontWeight/medium` | `typography.fontWeight.medium` |
| Variable name `typography/fontFamily/sans` | `typography.fontFamily.sans` (value: CSS stack in code; Inter in Figma via map) |
| Mode **Light** | `themes.light` |
| Mode **Dark** | `themes.dark` |
| Alias `{ type: 'VARIABLE_ALIAS', id }` | Semantic references primitive (e.g. `background/primary` → `colors.gray[900]`) |

Path convention: Figma uses `/`; code uses `.` in paths and `[key]` for numeric keys. Transform: `colors/gray/50` ↔ `colors.gray.50`.

### When and how import runs

| Aspect | Recommendation |
|--------|----------------|
| **Trigger** | Manual: `npm run tokens:import` (or `tokens:import-figma`) |
| **Steps** | 1) Run extract script in Figma (plugin / evaluate_script) → outputs JSON; 2) Run import script locally → reads JSON, merges, prompts for conflicts |
| **CI** | Optional: add a check job that diffs code tokens vs last Figma export to catch drift; do not auto-merge in CI |
| **Credentials** | Extract runs in-browser (user logged into Figma); no server-side Figma API key needed for plugin-based extract |
| **Output location** | Staging: `scripts/figma-export.json` (or `.ts`); merged result: see Output format below |

### Output format

**Recommendation: TypeScript** for consistency with the codebase.

- **Figma extract** → JSON (interchange format from plugin).
- **Import pipeline** → reads JSON, merges, outputs **TS** (e.g. `src/data/sources/figmaImport.ts` or `figmaOverrides.ts`).
- **Why TS:** Sources are TS; resolvers import from them. A generated `.ts` file can export the same shapes (`Record<string, string>`, etc.) and be consumed like `primitiveTokens`. Keeps types intact and avoids a separate JSON loader.
- **Structure:** Generated file exports `figmaPrimitives` and/or `figmaSemantics`; the main token barrel or resolver merges code + Figma imports. Hand-written sources stay untouched; Figma additions live in a generated file.

### Options to consider (reference)

| Approach | Pros | Cons |
|----------|------|------|
| **Import script** | Run on demand; pull via plugin API; output to staging for review | Conflict resolution; structure mapping |
| **DTCG + Style Dictionary** | Standard interchange format | Extra tooling; format adaptation |

### Recommended implementation order

1. **Extract script** (plugin API): walk `figma.variables.getLocalVariableCollections()`, output JSON.
2. **Import script** (`scripts/importFigmaTokens.ts`): read JSON, map to code structure, prompt for conflicts, write `figmaImport.ts` (or merge into staging).
3. **Resolver expansion:** add `mergeFromFigma()` or equivalent; token consumption merges code + figmaImport.
4. **Components:** defer; start with variables.

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
