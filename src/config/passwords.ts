/**
 * Password configuration for case studies
 *
 * Set GLOBAL_PASSWORD to enable password protection for all locked case studies.
 * Leave empty ('') to disable global password.
 *
 * Individual case studies can override this with their own password in frontmatter.
 */

export const PASSWORD_CONFIG = {
  // Global password that applies to all locked case studies
  // Set to empty string ('') to disable global password
  GLOBAL_PASSWORD: '',

  // Session storage key for tracking unlocked case studies
  STORAGE_KEY: 'unlockedCaseStudies',
} as const;
