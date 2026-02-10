'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initAmplitude, trackPageView } from '@/lib/analytics';

function AnalyticsTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      const title = document.title;
      
      trackPageView(url, title);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  // Initialize Amplitude on mount
  useEffect(() => {
    initAmplitude();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTrackerInner />
      </Suspense>
      {children}
    </>
  );
}
