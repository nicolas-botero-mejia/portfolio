# Password Lock Feature for Case Studies

This documentation explains how to use the password lock feature to protect case studies.

## Overview

The password lock system allows you to:
- Protect individual case studies with passwords
- Use a global password for all locked case studies
- Lock/unlock case studies per session (stored in browser)
- Have unlocked case studies by default

## Configuration

### Global Password

Edit `/src/config/passwords.ts` to set a global password:

```typescript
export const PASSWORD_CONFIG = {
  GLOBAL_PASSWORD: 'your-password-here', // Set to '' to disable
  STORAGE_KEY: 'unlockedCaseStudies',
} as const;
```

**Important:** The global password works for ALL locked case studies.

### Per-Case Study Password

Add password configuration to the case study's MDX frontmatter:

```yaml
---
title: "My Case Study"
description: "A protected case study"
company: "Example Corp"
# ... other frontmatter fields ...
locked: true                    # Enable password protection
password: "case-study-password" # Optional: Dedicated password for this case study only
---
```

## Password Priority

When a case study is locked, passwords are validated in this order:

1. **Dedicated password** (from case study frontmatter) - if set
2. **Global password** (from config file) - if set

If either password is correct, the case study is unlocked.

## Examples

### Example 1: Unlocked Case Study (Default)

```yaml
---
title: "Public Case Study"
# ... other fields ...
# No 'locked' field = publicly accessible
---
```

### Example 2: Locked with Dedicated Password

```yaml
---
title: "Protected Case Study"
# ... other fields ...
locked: true
password: "unique-password-123"
---
```

This case study can be unlocked with:
- The dedicated password: `unique-password-123`
- OR the global password (if set in config)

### Example 3: Locked with Only Global Password

```yaml
---
title: "Protected Case Study"
# ... other fields ...
locked: true
# No 'password' field = uses global password only
---
```

This case study can only be unlocked with the global password.

## Session Management

### How It Works

- When a user successfully enters a password, the case study slug is stored in `sessionStorage`
- The case study remains unlocked for that browser session
- When the browser is closed, all unlocked case studies are locked again
- Users must re-enter the password in a new session

### Programmatic Access

You can programmatically manage unlocked case studies:

```typescript
import {
  isCaseStudyUnlocked,
  unlockCaseStudy,
  lockCaseStudy,
  clearUnlockedCaseStudies,
} from '@/lib/passwordAuth';

// Check if unlocked
const isUnlocked = isCaseStudyUnlocked('ocean');

// Manually unlock
unlockCaseStudy('ocean');

// Manually lock
lockCaseStudy('ocean');

// Clear all unlocked
clearUnlockedCaseStudies();
```

## Security Considerations

⚠️ **Important Security Notes:**

1. **Client-side only**: Passwords are validated on the client side. This is NOT secure for highly sensitive content.
2. **Passwords in code**: Passwords are stored in plaintext in your codebase and bundled with the application.
3. **Use case**: This feature is designed for light protection (e.g., hiding work-in-progress case studies, preventing casual browsing).
4. **Not for sensitive data**: DO NOT use this for truly confidential or sensitive information.

For better security:
- Use environment variables for passwords
- Implement server-side authentication
- Use a proper auth system (NextAuth.js, Auth0, etc.)

## User Experience

When accessing a locked case study:

1. User clicks on a case study link
2. A password prompt appears with:
   - Lock icon
   - Case study title
   - Password input field
   - Error messages (if incorrect)
3. User enters password and clicks "Unlock Case Study"
4. If correct: case study content is displayed
5. If incorrect: error message is shown
6. User can click "Back to portfolio" to return

## Testing

To test the password lock feature:

1. Set a global password in `/src/config/passwords.ts`
2. Add `locked: true` to a case study's frontmatter
3. Run the dev server: `npm run dev`
4. Navigate to the locked case study
5. Test with correct and incorrect passwords

## Files Involved

- `/src/config/passwords.ts` - Global password configuration
- `/src/lib/passwordAuth.ts` - Password validation utilities
- `/src/components/PasswordPrompt.tsx` - Password input UI
- `/src/components/CaseStudyContent.tsx` - Content wrapper with password check
- `/src/app/[slug]/page.tsx` - Case study page
- `/src/lib/mdx.ts` - Case study data interface

## Troubleshooting

**Password not working?**
- Check that `locked: true` is set in frontmatter
- Verify password matches exactly (case-sensitive)
- Check global password in config file
- Clear browser cache and sessionStorage

**Case study always shows password prompt?**
- Check browser console for errors
- Verify sessionStorage is enabled in browser
- Try incognito/private mode

**Changes not reflecting?**
- Rebuild the project: `npm run build`
- Restart dev server: `npm run dev`
