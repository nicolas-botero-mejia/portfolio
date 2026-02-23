/**
 * Reading statuses - for books and articles (READ, READING, TO_READ).
 * Maps to Badge variants for consistent display.
 */

export interface ReadingStatus {
  slug: string;
  label: string;
  badgeVariant: 'success' | 'warning' | 'neutral';
}

export const READING_STATUS_SLUGS = {
  READ: 'read',
  READING: 'reading',
  TO_READ: 'to-read',
} as const;

export const readingStatuses: ReadingStatus[] = [
  { slug: READING_STATUS_SLUGS.READ, label: 'READ', badgeVariant: 'success' },
  { slug: READING_STATUS_SLUGS.READING, label: 'READING', badgeVariant: 'warning' },
  { slug: READING_STATUS_SLUGS.TO_READ, label: 'TO READ', badgeVariant: 'neutral' },
];
