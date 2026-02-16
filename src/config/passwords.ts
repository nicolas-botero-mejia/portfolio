/**
 * Password and auth cookie configuration for work item protection.
 *
 * Password values are stored in environment variables (.env.local).
 * See .env.example for setup. This file holds the runtime config constants.
 *
 * Password priority: frontmatter (dev) → WORK_[SLUG]_PASSWORD → WORK_GLOBAL_PASSWORD
 */

/** Cookie name prefix for work auth — one prefix for all work subtypes (e.g. work_auth_ocean) */
export const AUTH_COOKIE_PREFIX = 'work_auth_';

/** Cookie max age in seconds (7 days) */
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
