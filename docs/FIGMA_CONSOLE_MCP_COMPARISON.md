# Figma Console MCP (Southleft) vs Our Setup

Comparison of [Figma Console MCP](https://github.com/southleft/figma-console-mcp) + [Desktop Bridge](https://github.com/southleft/figma-console-mcp/tree/main/figma-desktop-bridge) with our portfolio’s Figma + MCP workflow. Use this to decide when to use which and what to adopt.

**References:**
- Article: [Figma Console MCP: AI-Powered Design System Management](https://southleft.com/insights/ai/figma-console-mcp-ai-powered-design-system-management/)
- Repo: [southleft/figma-console-mcp](https://github.com/southleft/figma-console-mcp)
- Bridge: [figma-desktop-bridge](https://github.com/southleft/figma-console-mcp/tree/main/figma-desktop-bridge)

---

## What We Have (Portfolio)

| Piece | Role |
|-------|------|
| **Chrome DevTools MCP** | Connects Cursor to a Chrome instance (browser automation, `evaluate_script`, `list_pages`, screenshots). We use `--browser-url=127.0.0.1:9222` to attach to Chrome we start. |
| **mcp.sh** | Script to start/stop: dev server in Terminal, Chrome (with remote debugging) in Terminal, and optionally Figma or app URL. Single entry point: `start app`, `start figma`, `stop app`, `stop figma`. |
| **figma-friend skill** | Workflow: open Figma in that Chrome → confirm `figma` global → run Plugin API via `evaluate_script`. No REST API; plugin context only. |
| **FIGMA_LEARNINGS.md** | Project-specific: code-first tokens, push to Figma, component properties, font mapping, variable bindings, API gotchas. |
| **Token flow** | Two-way: push tokens from code to Figma via scripts; import variables/components/flows from Figma (variable import in progress; component/flow import goals). Create in Figma from prompts (views, components, flows) via `evaluate_script`. |

So we: **drive Chrome from Cursor**, run **Plugin API scripts** in the Figma tab via `evaluate_script` (create-from-prompt + push), and support **import** from Figma with project-specific patterns and canonical operations (see FIGMA_LEARNINGS).

---

## What Figma Console MCP + Desktop Bridge Is

- **Figma Console MCP** = An MCP server that gives AI (Claude, Cursor, etc.) **56+ tools** to talk to Figma: read/write variables, get components, run Plugin API code (`figma_execute`), console logs, screenshots, design creation, variable CRUD, etc.
- **Desktop Bridge** = A Figma plugin that connects **Figma Desktop** to the MCP server over **WebSocket (ports 9223–9232)** or **CDP (port 9222)**. It exposes variables and component data (and more) so the MCP server can read/write without needing Figma’s REST API for everything (e.g. variables without Enterprise).

**Modes:**
- **Remote SSE** – OAuth, read-only, ~21 tools, no local install.
- **Local (NPX or Git)** – Full 56+ tools: variables, design creation, `figma_execute`, Desktop Bridge plugin. Uses **Figma Desktop** (not browser) + plugin + WebSocket or CDP.

**Architecture (local):**
- MCP server starts WebSocket server (e.g. 9223); optionally falls back to CDP (9222) if you launch Figma with `--remote-debugging-port=9222`.
- You run the **Desktop Bridge** plugin inside Figma Desktop; plugin connects to the MCP server.
- AI sends MCP tool calls → server → WebSocket/CDP → plugin → Figma Plugin API.

---

## Where We Intersect

| Aspect | Us | Figma Console MCP + Bridge |
|--------|-----|----------------------------|
| **Figma access from AI** | Yes, via Chrome DevTools MCP + `evaluate_script` in a Figma (browser) tab. | Yes, via dedicated MCP server + Figma Desktop + plugin. |
| **Plugin API** | We run arbitrary plugin code via `evaluate_script` in the page. | They run Plugin API via `figma_execute` and other tools; plugin runs in Figma Desktop. |
| **Connection to Figma** | Chrome (browser) with remote debugging 9222; we open figma.com in a tab. | Figma **Desktop** app + plugin; WebSocket 9223 or CDP 9222. |
| **Variables / tokens** | We push from code to Figma with our own scripts (code-first). | They read/write variables from Figma (extract, create, update, rename, etc.) via MCP tools. |
| **Use case** | Two-way: create in Figma from prompts (views, components, flows), push tokens, import variables/components/flows. Browser Figma + evaluate_script + runbook. | Full design-system management from chat (variables, components, creation, docs). |

So we **intersect** on: “AI + Figma,” “Plugin API,” create-from-prompt, and import. **They** use a dedicated MCP server + Figma Desktop + plugin; **we** use Chrome DevTools MCP + browser Figma + scripts and canonical operations.

---

## Where We Differ

| Dimension | Us | Figma Console MCP |
|-----------|-----|-------------------|
| **Figma surface** | Browser (figma.com) in Chrome we start. | Figma **Desktop** app. |
| **How AI talks to Figma** | Generic `evaluate_script` in the open tab (figma-friend + learnings). | 56+ named MCP tools (`figma_get_variables`, `figma_execute`, etc.). |
| **Token direction** | Two-way: push from code; import from Figma (variables in progress; components/flows goals). Create in Figma from prompts. | Figma ↔ AI (read + write variables/tokens in Figma from conversation). |
| **Setup** | mcp.sh + Chrome with 9222; MCP config `--browser-url=9222`. | Install MCP server (NPX), Figma token, run Desktop Bridge plugin in Figma Desktop; WebSocket or CDP. |
| **Scope** | Portfolio-specific: our tokens, our components, our scripts. | General: any Figma file, variables, components, design creation, docs. |
| **Console / debugging** | Not first-class; we’d use Chrome DevTools console. | Console logs, watch, screenshots, reload plugin. |

So: **we** are code-first, browser-based, script-driven. **They** are productized MCP + Figma Desktop, tool-rich, design-system-in-Figma focused.

---

## What’s More Advanced (Their Side)

- **56+ tools** – Variables CRUD, component metadata, `figma_execute`, design creation from natural language, design-code parity, batch variable ops, etc.
- **Desktop Bridge** – Plugin that talks WebSocket to MCP; no need to “run a plugin once” in the tab for `figma`; connection is managed.
- **Remote SSE option** – Read-only without local install (OAuth).
- **Multi-instance** – Multiple MCP servers (e.g. 9223–9232); one plugin connects to all.
- **MCP Apps** – Token browser, design system dashboard (experimental).

**Verdict:** Their stack is **more advanced** as a full “design system in Figma” management layer. Our stack is **lighter**: same machine, one Chrome, one script, code-first tokens, and we only need to run plugin API when we push or inspect.

---

## What We Could Adopt (Valuable and Fits)

1. **Run Figma Desktop + Desktop Bridge alongside our Chrome flow**  
   - Use **Figma Desktop** when you want their MCP (variables, design creation, full tool set).  
   - Keep **Chrome + mcp.sh** for “start app” / “start figma” and for any **browser-based** Figma tab work with figma-friend.  
   - No need to choose one forever; use both for different tasks.

2. **Add Figma Console MCP as an optional second MCP server**  
   - In Cursor, add a second MCP entry for `figma-console` (NPX + token + optional Desktop Bridge).  
   - Use **Chrome DevTools MCP** for: app, browser Figma tab, and `evaluate_script`.  
   - Use **Figma Console MCP** for: variable/token management in Figma, design creation, design-system audit, when you’re in Figma Desktop.  
   - Document in FIGMA_LEARNINGS: “For design-system-wide variables and creation, use Figma Console MCP + Desktop Bridge; for code-first push and ad-hoc plugin scripts, use Chrome + figma-friend.”

3. **Concept: WebSocket bridge instead of only CDP**  
   - We rely on Chrome + CDP (9222). They prefer WebSocket (9223) from a plugin so Figma doesn’t need to be launched with debug flags.  
   - We could **not** reimplement a WebSocket bridge; instead, if we adopt Figma Console MCP, we get that via their Desktop Bridge.  
   - Optional future: a **minimal** plugin that only exposes a WebSocket and forwards `evaluate_script`-like calls for our code-first scripts; that would be a smaller, portfolio-specific “bridge.” Only if we want to move from “browser + CDP” to “Figma Desktop + WebSocket” without adopting the full 56-tool stack.

4. **Docs and prompts**  
   - Reuse their **example prompts** (e.g. variable management, design creation) when we use Figma Console MCP.  
   - Keep our **FIGMA_LEARNINGS** as the source of truth for code-first tokens, push flow, and component patterns.

---

## Recommendation

- **Keep our current setup** for: app/dev server, Chrome, browser Figma tab, code-first token push, and ad-hoc plugin scripts (figma-friend + FIGMA_LEARNINGS).
- **Add Figma Console MCP as an optional, complementary path** when you want:
  - Variables/tokens managed **inside Figma** from chat.
  - Design creation or design-system audits from natural language.
  - Console logging and debugging of Figma plugin context.
- **Do not** replace our mcp.sh or code-first token flow with their stack; they solve “Figma as API” and “design system in Figma,” we solve “portfolio app + scripted push from code.”
- If you later want **fewer moving parts** and are okay using **Figma Desktop** for all Figma work, you could lean more on Figma Console MCP + Desktop Bridge and use Chrome DevTools MCP only for the **app** (localhost) and non-Figma browsing.

---

## Adapting Figma Console MCP to our two-way objectives

Our objectives: **create in Figma from prompts** (views, components with subcomponents and variables, flows) and **import from Figma** (variables, components, flows). Below: what from their stack maps to that, and what to adapt vs change.

### Mapping their tools to our objectives

| Our objective | Figma Console MCP tools that support it | Our current equivalent |
|---------------|----------------------------------------|-------------------------|
| **Create views / components / flows from prompt** | `figma_execute`, `figma_instantiate_component`, `figma_create_variable*`, `figma_create_child`, node manipulation (`figma_resize_node`, `figma_move_node`, etc.) | `evaluate_script` with custom scripts (one “power” entry point; we compose logic in script) |
| **Import variables** | `figma_get_variables` (with optional refresh), variable list + collections | Extract script in Figma → JSON → `importFigmaTokens.ts` |
| **Import components** | `figma_get_component`, `figma_get_component_for_development`, `figma_get_file_data` (structure) | Goal; no tool yet—we’d write an extract script or use their shape |
| **Import flows** | `figma_get_file_data` (pages, frames, structure) | Goal; flow = pages/frames structure + optional metadata |

So: **create-from-prompt** is covered on their side by `figma_execute` + variable/component/node tools; **import** is covered by `figma_get_variables`, `figma_get_component*`, `figma_get_file_data`. We can either use those tools (by adopting their MCP) or mirror the same operations with our scripts.

### What to adapt (without switching stack)

1. **Canonical operations / script catalog**  
   Define a small set of **named operations** we support via `evaluate_script`, aligned where useful with their tool names so prompts and docs stay consistent:
   - **Get variables** – script that returns variables + collections (same shape as `figma_get_variables` output so import pipeline can consume it).
   - **Create/update variables** – create collection, create variable, update variable (we already do this; document as “create_variable_collection”, “create_variable”, “update_variable”).
   - **Get file/structure** – script that returns file structure (pages, key frames) for “flow” import; can mirror `figma_get_file_data` verbosity levels.
   - **Get component(s)** – script that returns component metadata (and optionally reconstruction spec) for import; align field names with `figma_get_component` so we can reuse parsing.
   - **Instantiate component / create frame / create child** – document as discrete operations the AI can combine for “create view” and “create flow” prompts.

   FIGMA_LEARNINGS already has “When Starting Figma Tasks” and “Best practices for evaluate_script”; add a short **“Canonical operations (create & import)”** subsection listing these and pointing to Token Architecture / Component Creation for implementation. No new code required; we’re naming and structuring what we already do.

2. **Extract output shape for import**  
   When we implement variable extract and (later) component/flow extract, **match the structure** their tools return (e.g. variables + collections with same keys, component with `key`, `name`, props, layout). That lets us:
   - Reuse or compare with their tool output if we ever adopt their MCP.
   - Keep a single “import format” whether data came from our script or from their `figma_get_*` tools.

3. **When to use Figma Console MCP vs our flow**  
   - **Use our flow (Chrome + evaluate_script + FIGMA_LEARNINGS)** for: code-first token push, browser Figma, portfolio-specific runbook, and any script that follows our token/component mapping.  
   - **Use Figma Console MCP (optional)** for: design creation from natural language in Figma Desktop, variable/component management from chat, design-system summary, console logs, and **import** via `figma_get_variables` / `figma_get_component` / `figma_get_file_data` without writing an extract script yourself.  
   Document this in FIGMA_LEARNINGS so the AI knows when to prefer which.

### What to change (if you want to mainstream via their stack)

- **Option A – Add Figma Console MCP as optional (recommended first step)**  
  Add their MCP as a second server in Cursor. Use it when you want: create-from-prompt and import using their 56+ tools in **Figma Desktop**. Keep Chrome + figma-friend for browser Figma and code-first push. Two surfaces (browser + Desktop) but no change to our scripts or mcp.sh.

- **Option B – Prefer Figma Desktop + their MCP for Figma work**  
  Use Figma Desktop as the default Figma surface. Run Desktop Bridge; use Figma Console MCP for create-from-prompt and import. Our token push can still run via **figma_execute** (paste our script) or their variable tools (if we map our token sources to their create/update calls). Then Chrome DevTools MCP is for the app only. Update FIGMA_LEARNINGS and runbook to describe “Figma Desktop + Bridge + Figma Console MCP” as primary and “browser + evaluate_script” as fallback.

- **Option C – Single surface, their stack only**  
  Use only Figma Desktop + Figma Console MCP for all Figma work. Migrate token push to `figma_execute` or their variable tools; drop browser Figma from the runbook. Maximum alignment with their tools; we give up browser-based evaluate_script for Figma.

**Summary:** To mainstream two-way objectives **without changing stack**: add a **canonical operations** list and **extract output shape** aligned with their tools, and document **when to use Figma Console MCP vs our flow**. To mainstream **with** their stack: add their MCP optionally (A), or make Figma Desktop + their MCP primary (B/C). Prefer **adapt first** (canonical ops + extract shape + when-to-use), then **add their MCP optionally** if you want their tools and Figma Desktop in the loop.

---

## Implementation notes (reference repo)

Local reference: `_reference/figma-console-mcp`. **Patterns we adopt** (async IIFE + eval in worker, requestId, timeout, result shape, script contract) are documented in [FIGMA_LEARNINGS.md](FIGMA_LEARNINGS.md) under “Patterns from reference (Figma Console MCP)”. For their protocol and architecture (data flow, port discovery, variable/component commands, design-system scoring), see the reference repo; we don’t run their stack.

---

## Quick Links (Southleft)

| Resource | URL |
|----------|-----|
| Article | [Figma Console MCP: AI-Powered Design System Management](https://southleft.com/insights/ai/figma-console-mcp-ai-powered-design-system-management/) |
| Repo | [github.com/southleft/figma-console-mcp](https://github.com/southleft/figma-console-mcp) |
| Desktop Bridge | [figma-desktop-bridge](https://github.com/southleft/figma-console-mcp/tree/main/figma-desktop-bridge) |
| Setup (NPX) | Repo README → “NPX Setup” |
| Tools list | Repo README → “Available Tools” / [docs/TOOLS.md](https://github.com/southleft/figma-console-mcp/blob/main/docs/TOOLS.md) |

---

**Last updated:** February 2026
