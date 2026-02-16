'use server';

import { revalidatePath } from 'next/cache';
import { getProductBySlug } from '@/lib/mdx';
import { validatePassword, setAuthCookie } from '@/lib/serverPasswordAuth';
import { logError } from '@/lib/errors';
import { getRoute, CONTENT_SLUGS } from '@/data';

export interface AuthResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to authenticate a product
 * Called from the password form
 */
export async function authenticateProduct(
  slug: string,
  password: string
): Promise<AuthResult> {
  try {
    // Get the product
    const product = getProductBySlug(slug);

    if (!product) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    // Validate password (server-side)
    const isValid = validatePassword(product, password);

    if (!isValid) {
      return {
        success: false,
        error: 'Incorrect password. Please try again.',
      };
    }

    // Set authentication cookie
    await setAuthCookie(slug);

    // Revalidate the product page to show the authenticated content
    revalidatePath(getRoute(CONTENT_SLUGS.WORK, undefined, slug));

    return {
      success: true,
    };
  } catch (error) {
    logError('authenticateProduct', error);
    return {
      success: false,
      error: 'An error occurred. Please try again.',
    };
  }
}
