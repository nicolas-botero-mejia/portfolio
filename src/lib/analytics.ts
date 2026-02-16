import * as amplitude from '@amplitude/analytics-browser';

const DEBUG = process.env.NODE_ENV === 'development';
const PREFIX = '[Analytics]';

function logError(message: string, error?: unknown): void {
  if (DEBUG) {
    console.error(`${PREFIX} ${message}`, error ?? '');
  }
}

function logDebug(message: string, data?: unknown): void {
  if (DEBUG) {
    console.log(`${PREFIX} ${message}`, data ?? '');
  }
}

// Initialize Amplitude
export const initAmplitude = () => {
  try {
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

// Event types for type safety
export type AnalyticsEvent =
  | { name: 'page_view'; properties: { path: string; title: string } }
  | { name: 'work_item_view'; properties: { slug: string; title: string; company: string } }
  | { name: 'work_item_password_attempt'; properties: { slug: string; success: boolean } }
  | { name: 'external_link_click'; properties: { url: string; label: string; section: string } }
  | { name: 'contact_click'; properties: { method: 'email' | 'linkedin'; section: string } }
  | { name: 'work_card_click'; properties: { slug: string; title: string; position: number } }
  | { name: 'navigation_click'; properties: { section: string; from: string } };

// Track event with Amplitude
export const trackEvent = (event: AnalyticsEvent) => {
  try {
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
    if (typeof window !== 'undefined' && 'gtag' in window && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      const windowWithGtag = window as typeof window & { gtag: (...args: unknown[]) => void };
      windowWithGtag.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title,
      });
      logDebug('GA page_view', { path, title });
    }

    // Amplitude
    trackEvent({
      name: 'page_view',
      properties: { path, title },
    });
  } catch (error) {
    logError('trackPageView failed', error);
  }
};

// Identify user (optional - for authenticated users)
export const identifyUser = (userId: string, properties?: Record<string, string | number | boolean>) => {
  try {
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
    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

    if (!apiKey) return;

    amplitude.reset();
    logDebug('User reset');
  } catch (error) {
    logError('resetUser failed', error);
  }
};
