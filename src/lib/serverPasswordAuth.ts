import { cookies } from 'next/headers';
import crypto from 'crypto';
import { AUTH_COOKIE_PREFIX, AUTH_COOKIE_MAX_AGE } from '@/config/passwords';
import type { WorkItemContent } from './mdx';
import { logError } from './errors';

/**
 * Hash a password using SHA-256
 */
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Get the environment variable key for a work item password.
 * Single auth system for all work subtypes (products, features, side-projects).
 */
function getPasswordEnvKey(slug: string): string {
  // e.g., "ocean" -> "WORK_OCEAN_PASSWORD"
  return `WORK_${slug.toUpperCase().replace(/-/g, '_')}_PASSWORD`;
}

/**
 * Check if a work item requires password protection.
 */
export function requiresPassword(product: WorkItemContent): boolean {
  return product.frontmatter.locked === true;
}

/**
 * Get the expected password hash for a work item.
 * Checks in order:
 * 1. Item's dedicated password from frontmatter (hashed)
 * 2. Environment variable for that slug (WORK_[SLUG]_PASSWORD)
 * 3. Global work password (WORK_GLOBAL_PASSWORD)
 */
function getExpectedPasswordHash(product: WorkItemContent): string | null {
  if (product.frontmatter.password) {
    return hashPassword(product.frontmatter.password);
  }

  const specificEnvKey = getPasswordEnvKey(product.slug);
  const specificPassword = process.env[specificEnvKey];
  if (specificPassword) {
    return specificPassword; // Already hashed in env
  }

  const globalPassword = process.env.WORK_GLOBAL_PASSWORD;
  if (globalPassword) {
    return globalPassword; // Already hashed in env
  }

  return null;
}

/**
 * Validate a password for a work item.
 * Server-side only - never exposes actual passwords to client.
 */
export function validatePassword(product: WorkItemContent, password: string): boolean {
  if (!requiresPassword(product)) {
    return true; // Not protected
  }

  const expectedHash = getExpectedPasswordHash(product);
  if (!expectedHash) {
    return true; // No password configured, allow access
  }

  const providedHash = hashPassword(password);
  return providedHash === expectedHash;
}

/**
 * Set authentication cookie for a work item (work_auth_[slug]).
 * Server-side only.
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
 * Check if user is authenticated for a work item.
 * Server-side only.
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
 * Remove authentication cookie for a work item.
 * Server-side only.
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
 * Clear all work authentication cookies (work_auth_*).
 * Server-side only.
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
