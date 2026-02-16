'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import { getCompanyName } from '@/data';

interface ProductTrackerProps {
  slug: string;
  title: string;
  company: string;
}

export default function ProductTracker({ slug, title, company }: ProductTrackerProps) {
  useEffect(() => {
    trackEvent({
      name: 'product_view',
      properties: { slug, title, company: getCompanyName(company) },
    });
  }, [slug, title, company]);

  return null;
}
