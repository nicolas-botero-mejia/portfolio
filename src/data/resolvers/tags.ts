/**
 * Tag helpers - derived list and validation.
 */

import { tagGroups } from '../sources/tags';

export const allTags: string[] = tagGroups.flatMap((g) => g.tags);

export function isValidTag(tag: string): boolean {
  return allTags.includes(tag.toLowerCase());
}
