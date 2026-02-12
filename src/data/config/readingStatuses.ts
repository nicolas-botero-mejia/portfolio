/**
 * Reading statuses - for books and articles (READ, READING, TO_READ).
 * Maps to Badge variants for consistent display.
 */

export interface ReadingStatus {
  slug: string;
  label: string;
  badgeVariant: 'success' | 'warning' | 'neutral';
}

export const readingStatuses: ReadingStatus[] = [
  { slug: 'read', label: 'READ', badgeVariant: 'success' },
  { slug: 'reading', label: 'READING', badgeVariant: 'warning' },
  { slug: 'to-read', label: 'TO READ', badgeVariant: 'neutral' },
];

export function getReadingStatus(slug: string): ReadingStatus | undefined {
  return readingStatuses.find((s) => s.slug === slug);
}
