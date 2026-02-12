/**
 * Reading status lookup - resolves slug to status entity.
 */

import { readingStatuses } from '../sources/readingStatuses';

export function getReadingStatus(slug: string) {
  return readingStatuses.find((s) => s.slug === slug);
}
