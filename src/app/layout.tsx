import type { Metadata } from "next";
import "./globals.css";
import SplitLayout from "@/components/layout/SplitLayout";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FeatureFlagsProvider } from "@/components/FeatureFlagsProvider";
import DevToolsPanel from "@/components/layout/DevToolsPanel";
import { defaultMetadata } from "@/lib/seo";
import { GoogleAnalytics } from '@next/third-parties/google';
import { features } from '@/config/features';

export const metadata: Metadata = defaultMetadata;

/** Runs before React hydration to prevent theme flash. Also reads dev overrides from localStorage. */
const themeInitScript = features.appearance === 'light'
  ? `document.documentElement.classList.remove('dark')`
  : features.appearance === 'dark'
  ? `document.documentElement.classList.add('dark')`
  : `(function(){var o=JSON.parse(localStorage.getItem('dev-feature-overrides')||'{}');var a=o.appearance||'auto';if(a==='light'){document.documentElement.classList.remove('dark');return;}if(a==='dark'){document.documentElement.classList.add('dark');return;}var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList[d?'add':'remove']('dark');})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <FeatureFlagsProvider>
          <ThemeProvider>
            <AnalyticsProvider>
              <SplitLayout>{children}</SplitLayout>
            </AnalyticsProvider>
            <DevToolsPanel />
          </ThemeProvider>
        </FeatureFlagsProvider>
        {features.analytics.googleAnalytics.enabled && gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
