'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

interface CaseStudyTrackerProps {
  slug: string;
  title: string;
  company: string;
}

import { getCompanyName } from '@/data';

export default function CaseStudyTracker({ slug, title, company }: CaseStudyTrackerProps) {
  useEffect(() => {
    trackEvent({
      name: 'case_study_view',
      properties: { slug, title, company: getCompanyName(company) },
    });
  }, [slug, title, company]);

  return null;
}
