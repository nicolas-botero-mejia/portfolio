# Analytics Implementation Guide

## Overview

The portfolio is equipped with comprehensive analytics tracking using **Google Analytics 4** and **Amplitude**. Both services are integrated to provide complementary insights:

- **Google Analytics**: Page views, user demographics, acquisition channels
- **Amplitude**: Detailed user interaction events, funnel analysis, cohort behavior

---

## Setup

### 1. Install Dependencies

```bash
npm install @amplitude/analytics-browser @next/third-parties
```

Already installed in this project.

### 2. Configure Environment Variables

Add the following to your `.env.local` file:

```bash
# Google Analytics Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Amplitude API Key
NEXT_PUBLIC_AMPLITUDE_API_KEY=your-amplitude-api-key-here
```

**Get your credentials:**
- **Google Analytics**: https://analytics.google.com/ → Admin → Data Streams → Measurement ID
- **Amplitude**: https://analytics.amplitude.com/ → Settings → Project → API Key

### 3. Deploy Configuration

For Vercel deployment, add these environment variables in the dashboard:
1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_AMPLITUDE_API_KEY`
3. Deploy or redeploy your application

---

## Architecture

### File Structure

```
src/
├── lib/
│   └── analytics.ts              # Core analytics utilities
├── components/
│   ├── AnalyticsProvider.tsx     # Global analytics provider
│   ├── ProductTracker.tsx        # Product view tracking
│   └── home/
│       └── HomeClient.tsx        # Home page with tracking
├── app/
│   ├── layout.tsx                # Google Analytics + Provider
│   ├── page.tsx                  # Home page (server component)
│   └── work/[slug]/page.tsx      # Product pages
```

### How It Works

1. **`layout.tsx`**: Wraps app with `AnalyticsProvider` and adds Google Analytics script
2. **`AnalyticsProvider`**: Initializes Amplitude and tracks automatic page views
3. **Event tracking**: Components call `trackEvent()` for user interactions
4. **Type safety**: TypeScript ensures correct event names and properties

---

## Tracked Events

### Automatic Events

| Event | Description | Tracked By |
|-------|-------------|------------|
| `page_view` | User views any page | AnalyticsProvider |
| `session_start` | User starts a session | Amplitude (automatic) |

### Manual Events

| Event | Properties | Triggered When |
|-------|-----------|----------------|
| `work_card_click` | `slug`, `title`, `position` | User clicks a work card on home page |
| `product_view` | `slug`, `title`, `company` | User views a product page |
| `product_password_attempt` | `slug`, `success` | User attempts to unlock a product |
| `contact_click` | `method` (email/linkedin), `section` | User clicks a contact link |
| `external_link_click` | `url`, `label`, `section` | User clicks an external link |
| `navigation_click` | `section`, `from` | User clicks a navigation link |

---

## Usage Examples

### Track a Custom Event

```typescript
import { trackEvent } from '@/lib/analytics';

// Track button click
trackEvent({
  name: 'contact_click',
  properties: { method: 'email', section: 'hero' },
});

// Track product view
trackEvent({
  name: 'product_view',
  properties: { slug: 'sainapsis', title: 'Sainapsis', company: 'Sainapsis' },
});
```

### Track Page View Manually

```typescript
import { trackPageView } from '@/lib/analytics';

trackPageView('/work/sainapsis', 'Sainapsis');
```

### Identify User (Optional)

```typescript
import { identifyUser } from '@/lib/analytics';

// When user authenticates or provides information
identifyUser('user-123', {
  email: 'user@example.com',
  plan: 'premium',
});
```

---

## Event Tracking Guidelines

### When to Track

✅ **DO track:**
- Primary user actions (clicks, form submissions)
- Navigation between sections/pages
- Key conversion events (contact clicks, product views)
- Error states or failed actions

❌ **DON'T track:**
- Mouse movements or scrolling (use heatmap tools instead)
- Every single hover or focus event
- Personally identifiable information (PII) without consent

### Best Practices

1. **Be specific**: Use descriptive event names (`work_card_click` not `click`)
2. **Include context**: Add relevant properties (position, section, from/to)
3. **Type safety**: Define events in `AnalyticsEvent` type in `lib/analytics.ts`
4. **Test events**: Check browser console in development mode
5. **Document events**: Update this README when adding new events

---

## Development

### Testing Analytics Locally

When running `npm run dev` without API keys, events are logged to console:

```
📊 Analytics Event: work_card_click { slug: 'sainapsis', title: '...', position: 0 }
```

### Adding a New Event

1. Define event type in `src/lib/analytics.ts`:

```typescript
export type AnalyticsEvent =
  | { name: 'new_event_name'; properties: { prop1: string; prop2: number } }
  | // ... existing events
```

2. Call `trackEvent()` where the event occurs:

```typescript
trackEvent({
  name: 'new_event_name',
  properties: { prop1: 'value', prop2: 123 },
});
```

3. Update this README with event documentation.

---

## Analytics Dashboards

### Google Analytics

**Key Reports:**
- Real-time → Overview: Live visitor count
- Reports → Engagement → Pages and screens: Most viewed pages
- Reports → Acquisition → Traffic acquisition: How users find the site
- Reports → Engagement → Conversions: Track contact clicks (if configured as conversions)

**Setup Conversions:**
1. Go to Admin → Events
2. Mark `contact_click` as conversion
3. Create audience for users who viewed products

### Amplitude

**Key Charts:**
- **Event Segmentation**: Count of events over time
- **Funnel Analysis**: Homepage → Product View → Contact Click
- **User Paths**: Common navigation flows
- **Retention**: Users who return after viewing products

**Recommended Charts:**
1. Work card clicks by position (which items get clicked most)
2. Product views by slug (most popular projects)
3. Contact conversion rate (% of visitors who click contact)
4. Password success rate (% of successful unlocks)

---

## Privacy & Compliance

### Data Collection

This implementation collects:
- Page URLs and titles
- Click events with context (section, position)
- Product interactions (views, password attempts)
- No personal data (names, emails, etc.) unless explicitly provided

### GDPR/CCPA Compliance

To comply with privacy regulations:

1. **Add cookie consent banner** (recommended: `react-cookie-consent`)
2. **Update privacy policy** with analytics disclosure
3. **Implement opt-out**:

```typescript
// Disable tracking if user opts out
if (typeof window !== 'undefined' && window.localStorage.getItem('analytics_opt_out')) {
  return; // Skip tracking
}
```

4. **Anonymize IP addresses** in Google Analytics:
   - Already enabled by default in GA4

---

## Troubleshooting

### Events Not Appearing in Amplitude

1. Check API key is correct in `.env.local`
2. Verify environment variables start with `NEXT_PUBLIC_`
3. Open browser console → Network tab → Filter `amplitude` → Check API calls
4. Events may take 1-2 minutes to appear in dashboard

### Google Analytics Not Working

1. Verify Measurement ID format: `G-XXXXXXXXXX`
2. Check browser extensions (ad blockers may block GA)
3. Use GA Debugger Chrome extension to test
4. Allow 24-48 hours for data to populate reports

### Build Errors

If you see "Module not found: Can't resolve 'fs'":
- Client components (`'use client'`) cannot import server-side utilities
- Use wrapper pattern: Server component fetches data → passes to client component

---

## Performance Impact

- **Bundle size increase**: ~15KB (gzipped) for Amplitude SDK
- **Page load impact**: Minimal (scripts load asynchronously)
- **Runtime overhead**: <1ms per event tracked

---

## Next Steps

1. ✅ Set up Google Analytics and Amplitude accounts
2. ✅ Add API keys to `.env.local` and Vercel
3. ⏳ Deploy and verify events are being tracked
4. ⏳ Create dashboards in Amplitude for key metrics
5. ⏳ Set up conversion tracking in Google Analytics
6. ⏳ Add cookie consent banner (if targeting EU users)

---

**Last Updated:** February 9, 2026
