# Design Systems MCP: Token Evaluation & Compliance

Use the **Design Systems MCP** (Southleft) when creating or changing tokens, UI components, or accessibility-related styles. This doc evaluates our tokens against spec best practices and defines rules + MCP-based compliance checks.

**MCP endpoint:** `https://design-systems-mcp.southleft.com/mcp`  
**Tools:** `search_design_knowledge`, `search_chunks`, `browse_by_category`, `get_all_tags`

---

## 1. Token evaluation (vs DTCG / spec)

Our token setup is in `src/data/sources/` (primitives + semantics) and outputs to `tokens.generated.css` for Tailwind. Compared to W3C DTCG and common practice:

| Aspect | Our setup | Spec / best practice | Verdict |
|--------|-----------|----------------------|---------|
| **Primitive vs semantic** | Primitives in `primitiveTokens.ts` (colors, spacing, typography, radii, border); semantics in `semanticTokens.ts` (themes light/dark). | DTCG: primitives as raw values; semantics as aliases/references to primitives; avoid binding UI to raw values. | Aligned. We use semantic roles (background, content, action, status) that map to primitives. |
| **Naming** | Semantic: `background.primary`, `content.primary`, `action.primary.bg`, `action-primary-disabled-text`. CSS: `--color-*`, `--spacing-*`, `--text-*`, `--radius-*`. | Names should be role- or purpose-based for semantics; character restrictions (e.g. no spaces). Our kebab-case in CSS is fine. | Aligned. Role-based names; consistent kebab-case in CSS. |
| **Theming** | Separate `themes.light` / `themes.dark`; only semantic colors vary by theme; `@theme` + `@theme dark:` in generated CSS. | Separate token files per theme or single group with theme overrides; semantic tokens should switch by context. | Aligned. Theme-scoped semantics; primitives shared. |
| **Single source of truth** | TypeScript sources → `npm run tokens:generate` → CSS. Figma resolver for plugin. | One canonical definition; translation to platforms (web, Figma, etc.) via resolvers. | Aligned. |
| **Composite tokens** | We don’t define composite tokens (e.g. “button” = bg + color + radius). Components compose multiple tokens. | DTCG allows composite tokens for values always used together; we effectively do that in component class strings. | Optional. Current approach is valid; add composites only if we need them in Figma or another consumer. |

**Conclusion:** No structural changes required. When adding tokens: keep primitives in `primitiveTokens.ts`, semantics in `semanticTokens.ts`; use role-based naming; extend themes only for semantic colors.

---

## 2. Component creation rules

These rules apply to any new or updated component in `src/components/ui/` (and any token changes that affect them). Follow [docs/COMPONENTS.md](COMPONENTS.md) for inventory and patterns; below is the enforceable subset.

### 2.1 Token usage

- **Colors:** Use **semantic** tokens only (e.g. `bg-action-primary-bg`, `text-content-muted`). No raw hex or palette names (e.g. `gray-700`) in components unless documented one-off (e.g. image overlay).
- **Layout & typography:** Use **primitive** scale via Tailwind: `rounded-md`, `px-4`, `text-sm`, `font-medium`, etc. These resolve to our theme (see `tokens.generated.css`).
- **New roles:** If you need a new color role (e.g. `accent`), add it to `semanticTokens.ts` and both themes, then generate CSS. Do not introduce one-off CSS variables in components.

### 2.2 Structure (LAYOUT + variantStyles + compose)

- **LAYOUT (or BASE/SIZE):** One constant for layout + typography (flex, alignment, spacing, radius, font size/weight) shared across variants.
- **variantStyles:** Map each variant to semantic color classes only.
- **Compose:** `className={\`${LAYOUT} ${variantStyles[variant]} ${className}\`}` (or equivalent). Allow `className` override for layout/feature usage.

### 2.3 Placement

- **Design system (`ui/`):** Reusable, token-driven, 2+ use cases or clear variants. See COMPONENTS.md “Expansion Rule”.
- **Feature or page:** One-off or experimental → keep in feature folder; do not add to `ui/` until reuse is clear.

### 2.4 Accessibility (in code)

- **Focus:** Visible focus ring (e.g. `focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2`). Use semantic tokens for the ring color.
- **Disabled:** Use disabled semantic tokens (e.g. `action-primary-disabled-bg`, `action-primary-disabled-text`) and `disabled:pointer-events-none` where appropriate.
- **Semantics:** Use correct elements (`button`, `a`, `nav`) and ARIA when needed (e.g. `aria-pressed` for toggle buttons). No color-alone for meaning (see WCAG).

---

## 3. When to use the Design Systems MCP for compliance

Use the MCP **before or after** creating/editing tokens or UI components in these cases:

| Situation | MCP use | Example |
|------------|---------|---------|
| **New component or new variant** | Check patterns and accessibility. | `search_design_knowledge`: "button variants accessibility focus states" or "WCAG 2.2 color contrast requirements". |
| **New semantic token or role** | Check naming and structure. | `search_design_knowledge`: "design tokens semantic naming" or `search_chunks`: "W3C DTCG design tokens". |
| **Contrast or color a11y** | Verify contrast and non-color cues. | `search_design_knowledge`: "WCAG color contrast" or "accessibility component color". |
| **Form controls, modals, tabs** | Check best practices and a11y. | `search_design_knowledge`: "form labels accessibility" or "modal focus trap"; `browse_by_category`: "components". |
| **Documentation or review** | Align wording with standards. | `search_chunks`: "design tokens specification" or "WCAG success criteria". |

### 3.1 Suggested MCP queries (examples)

- **Tokens:** “semantic design tokens naming structure”, “W3C DTCG design tokens format”
- **Components:** “button states accessibility”, “component creation rules design system”
- **Accessibility:** “WCAG 2.2 color contrast”, “focus visible keyboard”, “form labels associated”

### 3.2 What “compliance” means here

- **Tokens:** Naming and layering (primitive → semantic → theme) match DTCG-style practice; no raw values in component API.
- **Components:** Use tokens as above; focus and disabled states; semantic HTML and ARIA where needed; contrast and “don’t use color alone” per WCAG.

The MCP does not replace local docs: follow [COMPONENTS.md](COMPONENTS.md) and this doc first; use MCP to validate or look up spec/authoritative guidance.

---

## 4. Quick reference

- **Token sources:** `src/data/sources/primitiveTokens.ts`, `semanticTokens.ts`; generated: `src/app/tokens.generated.css`; generate with `npm run tokens:generate`.
- **Component patterns:** [docs/COMPONENTS.md](COMPONENTS.md) — Token Convention, Component style structure, Token wiring.
- **Cursor rule:** `.cursor/rules/design-system-mcp.mdc` — reminds the AI to use tokens correctly and to run MCP checks when creating/editing components or tokens.
