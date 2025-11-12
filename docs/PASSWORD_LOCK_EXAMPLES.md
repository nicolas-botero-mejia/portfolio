# Password Lock Examples

This document provides practical examples of how to configure password protection for case studies.

## Example 1: Lock a Single Case Study with Dedicated Password

To lock the "Ocean" case study with a dedicated password:

**File:** `/content/case-studies/ocean.mdx`

```yaml
---
title: "Ocean — Scaling a CPaaS Platform to 300M+ Messages Monthly"
description: "Led design of global CPaaS platform serving 300M+ messages per month across Colombia and India markets."
company: "Ocean (RouteMobile)"
role: "Lead Product Designer · UX Strategy · Design Systems"
year: "2021-24"
duration: "3 years"
type: "SaaS Product Design & Scaling"
featured: true
heroImage: "/images/case-studies/ocean/hero.png"
tags: ["SaaS", "enterprise platform", "scalability", "multi-channel"]
locked: true                    # Add this line
password: "ocean2024"           # Add this line (your chosen password)
seo:
  metaTitle: "Ocean CPaaS Platform Case Study - Scaling to 300M Messages | Nicolás Botero"
  metaDescription: "How I designed a global CPaaS platform serving 300M+ messages monthly across multiple markets and communication channels."
  keywords: ["SaaS design", "platform design", "enterprise UX", "scalability"]
---
```

**Result:** The Ocean case study will require the password `ocean2024` to view.

---

## Example 2: Lock Multiple Case Studies with Global Password

**Step 1:** Set global password in `/src/config/passwords.ts`

```typescript
export const PASSWORD_CONFIG = {
  GLOBAL_PASSWORD: 'portfolio2024', // Global password for all locked studies
  STORAGE_KEY: 'unlockedCaseStudies',
} as const;
```

**Step 2:** Lock case studies by adding `locked: true` to their frontmatter

**File:** `/content/case-studies/ocean.mdx`
```yaml
---
title: "Ocean — Scaling a CPaaS Platform to 300M+ Messages Monthly"
# ... other fields ...
locked: true                    # No dedicated password = uses global
---
```

**File:** `/content/case-studies/sainapsis.mdx`
```yaml
---
title: "Sainapsis — Transforming Chaos into a 16x Productivity System"
# ... other fields ...
locked: true                    # No dedicated password = uses global
---
```

**Result:** Both case studies can be unlocked with the global password `portfolio2024`.

---

## Example 3: Mix of Global and Dedicated Passwords

**Global Config:** `/src/config/passwords.ts`
```typescript
export const PASSWORD_CONFIG = {
  GLOBAL_PASSWORD: 'viewportfolio',
  STORAGE_KEY: 'unlockedCaseStudies',
} as const;
```

**Case Study 1:** Ocean (locked with dedicated password)
```yaml
---
title: "Ocean — Scaling a CPaaS Platform"
locked: true
password: "ocean-specific-pass"
---
```

**Case Study 2:** Sainapsis (locked with global password only)
```yaml
---
title: "Sainapsis — Design System Transformation"
locked: true
# No password field = uses global password
---
```

**Case Study 3:** Aquads (not locked)
```yaml
---
title: "Aquads — E-commerce Platform"
# No locked field = publicly accessible
---
```

**Result:**
- Ocean can be unlocked with: `ocean-specific-pass` OR `viewportfolio`
- Sainapsis can be unlocked with: `viewportfolio` only
- Aquads is always accessible (no password needed)

---

## Example 4: Work-in-Progress Protection

Use case: You want to show a case study to clients but not make it public yet.

**Global Config:**
```typescript
export const PASSWORD_CONFIG = {
  GLOBAL_PASSWORD: '', // No global password
  STORAGE_KEY: 'unlockedCaseStudies',
} as const;
```

**Case Study:**
```yaml
---
title: "Confidential Client Project"
description: "Strategic redesign for enterprise client"
company: "Confidential"
locked: true
password: "share-with-client-123"
# ... other fields ...
---
```

**Usage:**
- Share the case study URL: `yourportfolio.com/confidential-client-project`
- Share the password privately: `share-with-client-123`
- The case study won't appear in your public portfolio list (if not featured)
- Only people with the direct link and password can view it

---

## Example 5: Temporary Lock During Review

Lock all case studies while getting feedback:

**Global Config:**
```typescript
export const PASSWORD_CONFIG = {
  GLOBAL_PASSWORD: 'review-mode-2024',
  STORAGE_KEY: 'unlockedCaseStudies',
} as const;
```

**Lock all case studies:**
```yaml
# ocean.mdx
locked: true

# sainapsis.mdx
locked: true

# aquads.mdx
locked: true
```

Share the global password with reviewers, then remove the `locked: true` field when ready to publish.

---

## Quick Configuration Guide

### To lock a case study:
1. Add `locked: true` to the frontmatter
2. Optionally add `password: "your-password"` for a dedicated password
3. Or set `GLOBAL_PASSWORD` in config for a universal password

### To unlock a case study:
- Remove `locked: true` from the frontmatter
- Or remove the `password` field and clear `GLOBAL_PASSWORD` in config

### To change a password:
- For dedicated: Update `password: "new-password"` in frontmatter
- For global: Update `GLOBAL_PASSWORD` in `/src/config/passwords.ts`

### To test:
```bash
npm run dev
# Navigate to a locked case study
# Try entering correct and incorrect passwords
```

---

## Best Practices

1. **Use environment variables** for production (more secure than hardcoded passwords)
2. **Document passwords** in a secure location (password manager)
3. **Don't commit sensitive passwords** to public repositories
4. **Use different passwords** for different sensitivity levels
5. **Test thoroughly** before sharing with clients
6. **Communicate clearly** with clients about password access
7. **Set expiration dates** for temporary passwords (manual process)

## Security Reminder

⚠️ This is client-side protection only. Anyone can view the source code and find passwords. Use this for:
- Casual privacy (hide WIP work)
- Professional courtesy (password-gate client work)
- Portfolio organization (control what's immediately visible)

Do NOT use for:
- Truly confidential information
- Legal protection
- Security-critical data
