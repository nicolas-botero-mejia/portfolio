import * as amplitude from '@amplitude/analytics-browser';

// Initialize Amplitude
export const initAmplitude = () => {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  
  if (!apiKey) {
    console.warn('Amplitude API key not found. Analytics will not be tracked.');
    return;
  }

  amplitude.init(apiKey, undefined, {
    defaultTracking: {
      pageViews: true,
      sessions: true,
      formInteractions: false,
      fileDownloads: false,
    },
  });
};

// Event types for type safety
export type AnalyticsEvent =
  | { name: 'page_view'; properties: { path: string; title: string } }
  | { name: 'case_study_view'; properties: { slug: string; title: string; company: string } }
  | { name: 'case_study_password_attempt'; properties: { slug: string; success: boolean } }
  | { name: 'external_link_click'; properties: { url: string; label: string; section: string } }
  | { name: 'contact_click'; properties: { method: 'email' | 'linkedin'; section: string } }
  | { name: 'work_card_click'; properties: { slug: string; title: string; position: number } }
  | { name: 'navigation_click'; properties: { section: string; from: string } };

// Track event with Amplitude
export const trackEvent = (event: AnalyticsEvent) => {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  
  if (!apiKey) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event.name, event.properties);
    }
    return;
  }

  amplitude.track(event.name, event.properties);
};

// Track page view (both GA and Amplitude)
export const trackPageView = (path: string, title: string) => {
  // Google Analytics (handled by @next/third-parties)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const windowWithGtag = window as typeof window & { gtag: (...args: unknown[]) => void };
    windowWithGtag.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }

  // Amplitude
  trackEvent({
    name: 'page_view',
    properties: { path, title },
  });
};

// Identify user (optional - for authenticated users)
export const identifyUser = (userId: string, properties?: Record<string, string | number | boolean>) => {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  
  if (!apiKey) return;

  const identifyEvent = new amplitude.Identify();
  
  if (properties) {
    Object.entries(properties).forEach(([key, value]) => {
      identifyEvent.set(key, value);
    });
  }

  amplitude.identify(identifyEvent);
  amplitude.setUserId(userId);
};

// Reset user (for logout or session end)
export const resetUser = () => {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  
  if (!apiKey) return;

  amplitude.reset();
};
