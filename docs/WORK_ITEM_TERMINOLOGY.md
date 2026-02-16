# Work Item vs Work Sample Terminology

**Internal (code, comments, dev docs):** **work item(s)**  
**User-facing (UI, error messages, visitor copy):** **work sample(s)**

Work items are the content under `/work`: products, features, side-projects. In the codebase and for developers we call them *work items*. In the UI and any text the visitor sees we call them *work samples* so the concept is clear for users.

## Where it applies

| Context | Term | Examples |
|--------|------|----------|
| Code (variables, comments, JSDoc) | work item | "Get the work item", "Revalidate the work item page" |
| Dev docs (CLAUDE.md, ARCHITECTURE, PASSWORD_PROTECTION) | work item | "Password protection for work items", "locked work item" |
| UI copy (empty state, password screen, errors) | work sample | "No work samples yet", "This work sample requires a password", "Work sample not found" |
| Analytics (event names, internal) | work_item_* | `work_item_view`, `work_item_password_attempt` |

## Taxonomy (unchanged)

- **Content subtype** (folder): e.g. `products`, `features`, `side-projects`
- **Work type** (frontmatter `type`): e.g. `product`, `feature`, `side-project` — labels "Product", "Feature", "Side Project"
- **Umbrella term (internal):** work item
- **Umbrella term (user):** work sample

## Implementation impact (summary)

- **Code:** `authenticateWorkItem`, error "Work sample not found", JSDoc "work item"; empty state and password prompt use "work sample" in UI.
- **Analytics:** Events `work_item_view`, `work_item_password_attempt`; component `WorkItemTracker` (replaces ProductTracker).
- **Docs:** README_ANALYTICS, PASSWORD_PROTECTION, README, ROADMAP, COMPONENTS, agents; CLAUDE.md doc map links here.
