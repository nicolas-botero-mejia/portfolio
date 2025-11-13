/**
 * Password configuration for case studies
 *
 * IMPORTANT: Passwords are now managed server-side via environment variables.
 * This file exists for documentation purposes only.
 *
 * To set passwords:
 * 1. Create a .env.local file in the project root (never commit this)
 * 2. Add password hashes (see instructions in .env.example)
 * 3. Restart your dev server
 *
 * Password priority:
 * 1. Case study's dedicated password (in frontmatter) - for testing/development
 * 2. Environment variable for specific case study: CASE_STUDY_[SLUG]_PASSWORD
 * 3. Global password: CASE_STUDY_GLOBAL_PASSWORD
 *
 * All environment variable passwords should be SHA-256 hashes, not plain text.
 * Use the password hashing utility to generate hashes.
 */

export const PASSWORD_CONFIG_INFO = {
  // Documentation only - actual passwords are in environment variables
  description: 'Server-side password protection for case studies',
  cookiePrefix: 'cs_auth_',
  cookieMaxAge: 60 * 60 * 24 * 7, // 7 days
} as const;
