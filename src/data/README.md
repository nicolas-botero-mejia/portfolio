# Data Layer

Separation of data sources and the logic that processes them.

## Structure

| Layer | Purpose | Contains |
|-------|---------|----------|
| **sources/** | Raw reference data | Arrays, objects, `*_SLUGS` constants, interfaces. No functions. |
| **content/** | Editorial content | profile (bio, contact), experience (work history), workflow (phases, principles) |
| **resolvers/** | Lookup and transformation | `get*` functions that resolve slugs to entities or labels |
| **derived/** | Computed from sources | routes, navigation (built at module load) |

## Flow

```
sources (data)  →  resolvers (logic)  →  consumers
                →  derived (computed)
```

- **resolvers** import from sources
- **derived** imports from sources and resolvers
- **content** is standalone editorial data
- All public exports go through `index.ts`

## Conventions

- **Lookup tables** (companies, workTypes, readingStatuses): source has array + SLUGS; resolver has `get*(slug)`
- **Taxonomy** (contentTypes): source has raw array; resolver has `getContentType`, `CONTENT_SLUGS`
- **Static config** (site, tokens): source only; tokens also has `getTokensForFigma` in resolvers

## Design tokens (sources/tokens, resolvers/tokens)

**Single source of truth:** `sources/tokens.ts`

- **resolvers/tokens** – `getTokensForFigma()` (Figma push), `getTokensForCSS()` (CSS generation)
- **scripts/generateTokens.ts** – reads tokens, writes `src/app/tokens.generated.css`
- **globals.css** – imports generated CSS; `@theme` and body use token vars

**Flow:** Edit `sources/tokens.ts` → run `npm run tokens:generate` → Tailwind @theme and Figma stay in sync. No manual duplication.

**Tailwind v4:** Spacing keys with decimals (e.g. `2.5`) are preserved as `--spacing-2.5` so `px-2.5` resolves to our tokens.

## Component inventory

See [docs/COMPONENTS.md](../../docs/COMPONENTS.md) for component inventory, roadmap, and expansion rules.

## Adding new data

1. **Reference data** (slug → entity) → `sources/[domain].ts` + `resolvers/[domain].ts`
2. **Editorial content** → `content/[name].ts` (profile, experience, workflow—changes when you update your story)
3. **Computed config** → `derived/[name].ts`
