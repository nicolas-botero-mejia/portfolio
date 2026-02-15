# Figma Integration Learnings

Learnings for a **two-way** Figma workflow: create in Figma from prompts (views, components, flows, using variables and subcomponents) and import from Figma (variables, components, flows) back into our workflow. All via the Plugin API and `evaluate_script`. Use this doc for any Figma-related task.

**How to use this doc:** New to Figma here? Read **Our relationship with Figma** (what we do in Figma and how). Then **When Starting Figma Tasks** (runbook). Writing or running scripts? See **Best practices for evaluate_script**. Need token → Figma mapping? See **Token Architecture**, **Font Tokens**, and **Component-to-Token Mapping**. Hitting an API quirk? Check **API Gotchas** and **Community & forum learnings**. Planning bidirectional tokens? See **Strategy: Figma → Code**.

**Related:** [docs/FIGMA_INTEGRATION.md](FIGMA_INTEGRATION.md) describes an alternative, Figma-as-source flow (REST API, `src/tokens/`). It is superseded for this project; we use code-first tokens and the Plugin API (this doc).

---

## Relationship to figma-friend Skill

**Use the figma-friend skill** when doing Figma work—it's not obsolete. It defines:
- **Primary tools**: `navigate_page` / `browser_navigate`, `evaluate_script` (Chrome DevTools MCP)
- **Workflow**: Open Figma → confirm `figma` global → run plugin API scripts
- **Rules**: Plugin API only (no REST API, no manual UI instructions)
- **Troubleshooting**: Edit access, plugin permissions, open-close-plugin trick

**This doc extends figma-friend** with project-specific patterns: token architecture, component creation (createComponentFromNode, HUG), component properties (text/label), variable bindings, font mapping, and positioning. Invoke figma-friend first; apply these learnings for this portfolio's design system.

**Token flow (this project):** Tokens live in code (`src/data/sources/primitiveTokens.ts`, `semanticTokens.ts`) and we sync them to Figma (variables, bindings) via scripts in the plugin context (e.g. `evaluate_script`). We also support **import from Figma**: variables, components, and flows created or edited in Figma can be brought back into our workflow (see Strategy and Our relationship with Figma).

---

## Our relationship with Figma

**Two-way.** We work with Figma in both directions: **create in Figma from prompts** (using our tokens and components), and **import from Figma** when something is created or changed there (variables, components, flows).

**Create in Figma (prompt-driven):** You can ask with a **complete prompt** to create in Figma, and the AI uses `evaluate_script` (and our token/component patterns) to do it. Expected use cases:

- **Views and components:** Create a view or a component in Figma—using **subcomponents** and **variables** (tokens)—from a descriptive prompt (e.g. “Dashboard header with nav and user menu”).
- **Flows:** Create **different views** (screens, states) so you can see a **flow** (e.g. onboarding steps, checkout, or a case study sequence). Multiple frames or pages that tell a story.

Scripts run in the plugin context: create frames, use existing or new variables, instantiate or create components, bind tokens, position and layout. The runbook and best practices in this doc support that.

**Import from Figma:** When a **component**, **variable**, and/or **flow** is created or edited in Figma, we want to be able to **import it**—so what lives in Figma can be reflected in our workflow (e.g. token sources, component specs, or flow documentation). Today: variable extract + `scripts/importFigmaTokens.ts` is the planned path for variables; component and flow import are goals (see Strategy: Figma → Code).

**What we do there (summary):**

| Task | Direction | How |
|------|-----------|-----|
| **Variables / tokens** | Code → Figma | Scripts via `evaluate_script`: create or update collections and variables from token sources; map names and types (e.g. `FIGMA_FONT_FAMILY_MAP`). |
| **Components, views, flows** | Prompt → Figma | You describe what you want; AI runs scripts that create views, components (with subcomponents and variables), and multiple views for a flow. Uses existing variables and components where possible. |
| **Variables** | Figma → code | Extract script in Figma → JSON; `scripts/importFigmaTokens.ts` merges into code (see Strategy). |
| **Components / flows** | Figma → code | Import components or flow structure from Figma into our workflow (goal; implementation TBD). |

**How we do it:** Open Figma in a Chrome tab (e.g. `mcp.sh start figma`), then **Chrome DevTools MCP** runs `evaluate_script` in that tab. The `figma` global is available after any plugin has been opened once in the file. Plugin API only (no REST for variables); see [FIGMA_CONSOLE_MCP_COMPARISON.md](FIGMA_CONSOLE_MCP_COMPARISON.md) for the alternative stack.

---

## Connection & Access

- **Chrome DevTools MCP** runs `evaluate_script` in the Figma page. The `figma` global is available when a plugin has been opened at least once in the file.
- **Cursor IDE Browser** and **Chrome DevTools** are separate instances. Chrome DevTools connects to its own Chrome profile; select the tab with the Figma design file before running scripts.
- Check connection: `typeof figma !== 'undefined'` returns `true` when ready.

---

## Best practices for evaluate_script (CRUD and tasks)

When writing scripts that run via `evaluate_script` to create, read, update, or delete designs, tokens, or components in Figma, follow these so the process stays debuggable and reliable.

- **Pre-flight:** Confirm `figma` is defined and the correct file/tab is active before running. If the script depends on a specific page or selection, return a clear error (e.g. `{ success: false, error: 'No collection named Primitives' }`) instead of failing silently.
- **One logical operation per script when possible:** Prefer “sync primitives only” or “add label property to Button” over one giant script that does everything. Easier to debug, retry, and reason about.
- **Return JSON-serializable values:** `evaluate_script` results are serialized. No circular refs, no Figma node objects—return ids, names, counts, or plain data. Optional wrapper: `{ success: true, result }` or `{ success: false, error: string }` so the caller (AI or import script) can handle success and failure consistently.
- **Use async APIs for reliability:** In files with dynamic page loading, use `figma.getNodeByIdAsync()`, `figma.variables.getLocalVariableCollectionsAsync()`, `figma.variables.getLocalVariablesAsync()`, `node.getMainComponentAsync()`. Sync APIs (`figma.getNodeById()`, `.mainComponent`) can be undefined for nodes on unloaded pages.
- **Load fonts before any text change:** Any change to `characters`, `fontSize`, `fontName`, etc. requires `figma.loadFontAsync()` first. Batch multiple fonts with `Promise.all(...fonts.map(figma.loadFontAsync))`.
- **Batch reads where it helps:** Read all variables or all collections once, then process in memory. Avoid many small “get one variable” calls when you need the full set.
- **Create/update: find-or-create:** When syncing from code, look up by name or id first (e.g. collection name, variable key); create only if missing. Reduces duplicates and keeps one source of truth per name.
- **Error handling:** Wrap the main logic in try/catch. On failure, return `{ success: false, error: err.message }` (or a short message) so the user or import script can react instead of assuming success.

See **When Starting Figma Tasks**, **Token Architecture**, **Working with text**, and **API Gotchas** for project-specific details (HUG, label property, variable bindings, dynamic loading).

---

## Canonical operations (create & import)

We support the following **named operations** via `evaluate_script`. Use them to compose “create a view”, “create a flow”, or “import variables/components” prompts. Names align with [Figma Console MCP](https://github.com/southleft/figma-console-mcp) tool names where useful so we can share import shapes and optionally use their MCP later.

| Operation | Purpose | Where implemented / documented |
|-----------|---------|---------------------------------|
| **Get variables** | Return variables + collections (for import). Output shape: same as `figma_get_variables` (collections, variables, modes) so `importFigmaTokens.ts` or their tools can consume it. | Extract script (Strategy: Figma → Code); Token Architecture. |
| **Create variable collection** / **Create variable** / **Update variable** | Push tokens from code to Figma; create or update by name/key. | Token Architecture; “find-or-create” in Best practices. |
| **Get file structure** | Return pages, key frames, structure (for flow import). Can mirror verbosity levels of `figma_get_file_data`. | Goal; implement when we add flow import. |
| **Get component(s)** | Return component metadata (key, name, props, layout) for import. Align field names with `figma_get_component` output. | Goal; Component Creation, Component-to-Token Mapping. |
| **Instantiate component** | Create instance of existing component (with optional overrides, position). For “create view” and “create flow” prompts. | Component Creation; API: `figma.instantiateComponent()`. |
| **Create frame / Create child** | Create frames, auto-layout, children. For views and flow steps. | Component Creation; API Gotchas; `figma.createFrame()`, etc. |

When you implement extract scripts (variables, then components, then flow), **match the structure** their tools return so the same import pipeline works whether data came from our script or from Figma Console MCP (see [FIGMA_CONSOLE_MCP_COMPARISON.md](FIGMA_CONSOLE_MCP_COMPARISON.md) → “Adapting Figma Console MCP”).

**When to use Figma Console MCP vs our flow:** Use **our flow** (Chrome + `evaluate_script` + this runbook) for code-first token push, browser Figma, and portfolio-specific scripts. Use **Figma Console MCP** (optional, with Figma Desktop + Desktop Bridge) when you want their 56+ tools for design creation from chat, variable/component management in Figma, design-system summary, or import via `figma_get_variables` / `figma_get_component` / `figma_get_file_data` without writing an extract script. See comparison doc for setup and “when to use which”.

---

## Patterns from reference (Figma Console MCP)

Use these when building a **bridge** (e.g. plugin that receives code from outside the page) or running code in the **plugin worker** from an external channel. Our current flow uses `evaluate_script` in the browser page, so these apply only if we add that layer.

- **Async IIFE + eval in plugin worker:** Figma’s plugin sandbox restricts `new Function` / `AsyncFunction`. To run arbitrary async code in the worker, wrap it in an async IIFE and use `eval`: `(async function() { ... })()`. Not needed for `evaluate_script` (browser context).
- **RequestId for request/response:** On any async channel (WebSocket, postMessage), give each request a unique id and include it in the response so in-flight calls don’t get mixed.
- **Timeout and result shape:** Run user code with `Promise.race(codePromise, timeoutPromise)`. Return a consistent shape: `{ success, result?, error?, fileContext?: { fileName, fileKey } }` so callers can handle failures and know which file the result came from.
- **Script contract for evaluate_script:** Scripts run via `evaluate_script` should return **JSON-serializable** values (no circular refs). For consistent handling, optional wrapper: `{ success: true, result }` or `{ success: false, error: string }`.

**Stability:** Always confirm `figma` before running scripts. For a future bridge: use requestId, timeout, and the async IIFE + eval pattern in the worker. See [FIGMA_CONSOLE_MCP_COMPARISON.md](FIGMA_CONSOLE_MCP_COMPARISON.md) for where these come from.

**Scalability:** No restructure needed today. Our flow is doc-driven (figma-friend + this runbook); the only Figma-touching code is the future extract step for `scripts/importFigmaTokens.ts`. When you implement that extract (run via `evaluate_script`), have it return JSON-serializable data and optionally `{ success, result? }` or `{ success: false, error }` so the import script can handle failures consistently.

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

**Current state:** Tokens live in code; we push to Figma and support create-in-Figma from prompts (views, components, flows). Variable import (Figma → code) is in progress; component and flow import are goals.

**Goal:** Full two-way: create in Figma from prompts (using variables and subcomponents) and import back—variables, components, and flows created or edited in Figma can be brought into our workflow. Conflict rules below apply to tokens; component/flow import format and merge strategy TBD.

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

### Figma Console MCP (Southleft) vs our setup

**[docs/FIGMA_CONSOLE_MCP_COMPARISON.md](FIGMA_CONSOLE_MCP_COMPARISON.md)** compares our flow (Chrome DevTools MCP + figma-friend + code-first tokens) with [Figma Console MCP](https://github.com/southleft/figma-console-mcp) and the [Desktop Bridge](https://github.com/southleft/figma-console-mcp/tree/main/figma-desktop-bridge) plugin. Use it to decide when to use which: we keep code-first push and browser-based scripts; add Figma Console MCP optionally for variable/token management and design creation inside Figma from chat.

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
