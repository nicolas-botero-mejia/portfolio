'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

interface CaseStudyTrackerProps {
  slug: string;
  title: string;
  company: string;
}

export default function CaseStudyTracker({ slug, title, company }: CaseStudyTrackerProps) {
  useEffect(() => {
    trackEvent({
      name: 'case_study_view',
      properties: { slug, title, company },
    });
  }, [slug, title, company]);

  return null;
}
