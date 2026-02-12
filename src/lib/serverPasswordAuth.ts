import { cookies } from 'next/headers';
import crypto from 'crypto';
import { AUTH_COOKIE_PREFIX, AUTH_COOKIE_MAX_AGE } from '@/config/passwords';
import type { CaseStudy } from './mdx';
import { logError } from './errors';

/**
 * Hash a password using SHA-256
 */
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Get the environment variable key for a case study password
 */
function getPasswordEnvKey(slug: string): string {
  // Convert slug to uppercase and replace hyphens with underscores
  // e.g., "ocean" -> "CASE_STUDY_OCEAN_PASSWORD"
  return `CASE_STUDY_${slug.toUpperCase().replace(/-/g, '_')}_PASSWORD`;
}

/**
 * Check if a case study requires password protection
 */
export function requiresPassword(caseStudy: CaseStudy): boolean {
  return caseStudy.frontmatter.locked === true;
}

/**
 * Get the expected password hash for a case study
 * Checks in order:
 * 1. Case study's dedicated password from frontmatter (hashed)
 * 2. Environment variable for that specific case study
 * 3. Global password environment variable
 */
function getExpectedPasswordHash(caseStudy: CaseStudy): string | null {
  // Check case study's dedicated password first
  if (caseStudy.frontmatter.password) {
    return hashPassword(caseStudy.frontmatter.password);
  }

  // Check environment variable for specific case study
  const specificEnvKey = getPasswordEnvKey(caseStudy.slug);
  const specificPassword = process.env[specificEnvKey];
  if (specificPassword) {
    return specificPassword; // Already hashed in env
  }

  // Check global password
  const globalPassword = process.env.CASE_STUDY_GLOBAL_PASSWORD;
  if (globalPassword) {
    return globalPassword; // Already hashed in env
  }

  return null;
}

/**
 * Validate a password for a case study
 * Server-side only - never exposes actual passwords to client
 */
export function validatePassword(caseStudy: CaseStudy, password: string): boolean {
  if (!requiresPassword(caseStudy)) {
    return true; // Not protected
  }

  const expectedHash = getExpectedPasswordHash(caseStudy);
  if (!expectedHash) {
    return true; // No password configured, allow access
  }

  const providedHash = hashPassword(password);
  return providedHash === expectedHash;
}

/**
 * Set authentication cookie for a case study
 * Server-side only
 */
export async function setAuthCookie(slug: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(`${AUTH_COOKIE_PREFIX}${slug}`, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: AUTH_COOKIE_MAX_AGE,
      sameSite: 'strict',
      path: '/',
    });
  } catch (error) {
    logError('setAuthCookie', error);
    throw error;
  }
}

/**
 * Check if user is authenticated for a case study
 * Server-side only
 */
export async function isAuthenticated(slug: string): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(`${AUTH_COOKIE_PREFIX}${slug}`);
    return authCookie?.value === 'authenticated';
  } catch (error) {
    logError('isAuthenticated', error);
    return false;
  }
}

/**
 * Remove authentication cookie for a case study
 * Server-side only
 */
export async function clearAuthCookie(slug: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(`${AUTH_COOKIE_PREFIX}${slug}`);
  } catch (error) {
    logError('clearAuthCookie', error);
  }
}

/**
 * Clear all case study authentication cookies
 * Server-side only
 */
export async function clearAllAuthCookies(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    for (const cookie of allCookies) {
      if (cookie.name.startsWith(AUTH_COOKIE_PREFIX)) {
        cookieStore.delete(cookie.name);
      }
    }
  } catch (error) {
    logError('clearAllAuthCookies', error);
  }
}
