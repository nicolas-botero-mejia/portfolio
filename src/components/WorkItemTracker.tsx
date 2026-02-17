'use client';

import { useEffect } from 'react';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';
import { getCompanyName } from '@/data';

interface WorkItemTrackerProps {
  slug: string;
  title: string;
  company?: string;
}

export default function WorkItemTracker({ slug, title, company }: WorkItemTrackerProps) {
  useEffect(() => {
    trackEvent({
      name: ANALYTICS_EVENTS.WORK_ITEM_VIEW,
      properties: { slug, title, ...(company && { company: getCompanyName(company) }) },
    });
  }, [slug, title, company]);

  return null;
}
