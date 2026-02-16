'use server';

import { revalidatePath } from 'next/cache';
import { getWorkItemBySlug } from '@/lib/mdx';
import { validatePassword, setAuthCookie } from '@/lib/serverPasswordAuth';
import { logError } from '@/lib/errors';
import { getRoute, CONTENT_SLUGS } from '@/data';

export interface AuthResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to authenticate a work item.
 * Called from the password form.
 */
export async function authenticateWorkItem(
  subType: string,
  slug: string,
  password: string
): Promise<AuthResult> {
  try {
    const workItem = getWorkItemBySlug(subType, slug);

    if (!workItem) {
      return {
        success: false,
        error: 'Work sample not found',
      };
    }

    // Validate password (server-side)
    const isValid = validatePassword(workItem, password);

    if (!isValid) {
      return {
        success: false,
        error: 'Incorrect password. Please try again.',
      };
    }

    // Set authentication cookie
    await setAuthCookie(slug);

    // Revalidate the work item page to show the authenticated content
    revalidatePath(getRoute(CONTENT_SLUGS.WORK, subType, slug));

    return {
      success: true,
    };
  } catch (error) {
    logError('authenticateWorkItem', error);
    return {
      success: false,
      error: 'An error occurred. Please try again.',
    };
  }
}
