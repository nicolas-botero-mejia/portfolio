/**
 * Password and auth cookie configuration for case study protection.
 *
 * Password values are stored in environment variables (.env.local).
 * See .env.example for setup. This file holds the runtime config constants.
 *
 * Password priority: frontmatter (dev) → CASE_STUDY_[SLUG]_PASSWORD → CASE_STUDY_GLOBAL_PASSWORD
 */

/** Cookie name prefix for case study auth (e.g. cs_auth_ocean) */
export const AUTH_COOKIE_PREFIX = 'cs_auth_';

/** Cookie max age in seconds (7 days) */
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
