'use client';

import { useMemo } from 'react';
import { useFeatureFlags } from '@/components/FeatureFlagsProvider';

/**
 * Filters content items by subType using runtime feature flags.
 * Centralized so every listing page gets reactive dev-panel toggling for free.
 *
 * @param sectionKey - The key in features.sections (e.g. 'work', 'reading')
 * @param items - Content items with a subType field
 */
export function useFilteredContent<T extends { subType: string }>(
  sectionKey: string,
  items: T[],
): T[] {
  const flags = useFeatureFlags();
  const section = flags.sections[sectionKey as keyof typeof flags.sections];

  return useMemo(() => {
    if (!section?.subTypes) return items;
    return items.filter(item => section.subTypes![item.subType]?.enabled ?? true);
  }, [items, section]);
}
