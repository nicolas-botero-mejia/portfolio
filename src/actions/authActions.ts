'use server';

import { revalidatePath } from 'next/cache';
import { getCaseStudyBySlug } from '@/lib/mdx';
import { validatePassword, setAuthCookie } from '@/lib/serverPasswordAuth';
import { logError } from '@/lib/errors';
import { getRoute, CONTENT_SLUGS } from '@/data';

export interface AuthResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to authenticate a case study
 * Called from the password form
 */
export async function authenticateCaseStudy(
  slug: string,
  password: string
): Promise<AuthResult> {
  try {
    // Get the case study
    const caseStudy = getCaseStudyBySlug(slug);

    if (!caseStudy) {
      return {
        success: false,
        error: 'Case study not found',
      };
    }

    // Validate password (server-side)
    const isValid = validatePassword(caseStudy, password);

    if (!isValid) {
      return {
        success: false,
        error: 'Incorrect password. Please try again.',
      };
    }

    // Set authentication cookie
    await setAuthCookie(slug);

    // Revalidate the case study page to show the authenticated content
    revalidatePath(getRoute(CONTENT_SLUGS.WORK, undefined, slug));

    return {
      success: true,
    };
  } catch (error) {
    logError('authenticateCaseStudy', error);
    return {
      success: false,
      error: 'An error occurred. Please try again.',
    };
  }
}
