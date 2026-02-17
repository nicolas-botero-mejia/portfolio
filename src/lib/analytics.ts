import * as amplitude from '@amplitude/analytics-browser';
import { logError } from './errors';
import { features } from '@/config/features';

const DEBUG = process.env.NODE_ENV === 'development';

function logDebug(message: string, data?: unknown): void {
  if (DEBUG) {
    console.log(`[Analytics] ${message}`, data ?? '');
  }
}

// Initialize Amplitude
export const initAmplitude = () => {
  try {
    if (!features.analytics.amplitude) return;

    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

    if (!apiKey) {
      logDebug('Amplitude API key not found. Analytics will not be tracked.');
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
    logDebug('Amplitude initialized');
  } catch (error) {
    logError('Amplitude init failed', error);
  }
};

// Event name constants
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  WORK_ITEM_VIEW: 'work_item_view',
  WORK_ITEM_PASSWORD_ATTEMPT: 'work_item_password_attempt',
  EXTERNAL_LINK_CLICK: 'external_link_click',
  CONTACT_CLICK: 'contact_click',
  WORK_CARD_CLICK: 'work_card_click',
  NAVIGATION_CLICK: 'navigation_click',
} as const;

// Event types for type safety
export type AnalyticsEvent =
  | { name: typeof ANALYTICS_EVENTS.PAGE_VIEW; properties: { path: string; title: string } }
  | { name: typeof ANALYTICS_EVENTS.WORK_ITEM_VIEW; properties: { slug: string; title: string; company?: string } }
  | { name: typeof ANALYTICS_EVENTS.WORK_ITEM_PASSWORD_ATTEMPT; properties: { slug: string; success: boolean } }
  | { name: typeof ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK; properties: { url: string; label: string; section: string } }
  | { name: typeof ANALYTICS_EVENTS.CONTACT_CLICK; properties: { method: 'email' | 'linkedin'; section: string } }
  | { name: typeof ANALYTICS_EVENTS.WORK_CARD_CLICK; properties: { slug: string; title: string; position: number } }
  | { name: typeof ANALYTICS_EVENTS.NAVIGATION_CLICK; properties: { section: string; from: string } };

// Track event with Amplitude
export const trackEvent = (event: AnalyticsEvent) => {
  try {
    if (!features.analytics.amplitude) return;

    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

    if (!apiKey) {
      logDebug('Event (no API key):', { name: event.name, properties: event.properties });
      return;
    }

    amplitude.track(event.name, event.properties);
    logDebug('Event tracked:', event.name);
  } catch (error) {
    logError(`trackEvent failed: ${event.name}`, error);
  }
};

// Track page view (both GA and Amplitude)
export const trackPageView = (path: string, title: string) => {
  try {
    // Google Analytics (handled by @next/third-parties)
    if (features.analytics.googleAnalytics && typeof window !== 'undefined' && 'gtag' in window && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      const windowWithGtag = window as typeof window & { gtag: (...args: unknown[]) => void };
      windowWithGtag.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title,
      });
      logDebug('GA page_view', { path, title });
    }

    // Amplitude (trackEvent already checks the flag)
    trackEvent({
      name: ANALYTICS_EVENTS.PAGE_VIEW,
      properties: { path, title },
    });
  } catch (error) {
    logError('trackPageView failed', error);
  }
};

// Identify user (optional - for authenticated users)
export const identifyUser = (userId: string, properties?: Record<string, string | number | boolean>) => {
  try {
    if (!features.analytics.amplitude) return;

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
    logDebug('User identified:', userId);
  } catch (error) {
    logError('identifyUser failed', error);
  }
};

// Reset user (for logout or session end)
export const resetUser = () => {
  try {
    if (!features.analytics.amplitude) return;

    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

    if (!apiKey) return;

    amplitude.reset();
    logDebug('User reset');
  } catch (error) {
    logError('resetUser failed', error);
  }
};
