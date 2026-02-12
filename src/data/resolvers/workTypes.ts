/**
 * Work type lookup - resolves slug to display label.
 */

import { workTypes } from '../sources/workTypes';

export function getWorkTypeLabel(slug: string): string {
  const wt = workTypes.find((t) => t.slug === slug);
  return wt?.label ?? slug;
}
