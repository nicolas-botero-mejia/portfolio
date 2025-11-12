import { PASSWORD_CONFIG } from '@/config/passwords';
import type { CaseStudy } from './mdx';

/**
 * Check if a case study is password protected
 */
export function isCaseStudyLocked(caseStudy: CaseStudy): boolean {
  return caseStudy.frontmatter.locked === true;
}

/**
 * Validate password for a case study
 * Returns true if:
 * - The provided password matches the case study's dedicated password, OR
 * - The provided password matches the global password (if set)
 */
export function validatePassword(caseStudy: CaseStudy, password: string): boolean {
  if (!isCaseStudyLocked(caseStudy)) {
    return true; // Not locked, always valid
  }

  // Check case study's dedicated password first
  if (caseStudy.frontmatter.password) {
    if (password === caseStudy.frontmatter.password) {
      return true;
    }
  }

  // Check global password if set
  if (PASSWORD_CONFIG.GLOBAL_PASSWORD && password === PASSWORD_CONFIG.GLOBAL_PASSWORD) {
    return true;
  }

  return false;
}

/**
 * Check if a case study is unlocked in the current session
 */
export function isCaseStudyUnlocked(slug: string): boolean {
  if (typeof window === 'undefined') {
    return false; // Server-side, treat as locked
  }

  try {
    const unlocked = sessionStorage.getItem(PASSWORD_CONFIG.STORAGE_KEY);
    if (!unlocked) {
      return false;
    }

    const unlockedSlugs: string[] = JSON.parse(unlocked);
    return unlockedSlugs.includes(slug);
  } catch {
    return false;
  }
}

/**
 * Mark a case study as unlocked in the session
 */
export function unlockCaseStudy(slug: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const unlocked = sessionStorage.getItem(PASSWORD_CONFIG.STORAGE_KEY);
    const unlockedSlugs: string[] = unlocked ? JSON.parse(unlocked) : [];

    if (!unlockedSlugs.includes(slug)) {
      unlockedSlugs.push(slug);
      sessionStorage.setItem(PASSWORD_CONFIG.STORAGE_KEY, JSON.stringify(unlockedSlugs));
    }
  } catch (error) {
    console.error('Failed to unlock case study:', error);
  }
}

/**
 * Lock a case study (remove from unlocked list)
 */
export function lockCaseStudy(slug: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const unlocked = sessionStorage.getItem(PASSWORD_CONFIG.STORAGE_KEY);
    if (!unlocked) {
      return;
    }

    const unlockedSlugs: string[] = JSON.parse(unlocked);
    const filtered = unlockedSlugs.filter((s) => s !== slug);
    sessionStorage.setItem(PASSWORD_CONFIG.STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to lock case study:', error);
  }
}

/**
 * Clear all unlocked case studies from session
 */
export function clearUnlockedCaseStudies(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    sessionStorage.removeItem(PASSWORD_CONFIG.STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear unlocked case studies:', error);
  }
}
