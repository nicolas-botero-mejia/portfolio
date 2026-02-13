import type { Metadata } from "next";
import "./globals.css";
import SplitLayout from "@/components/layout/SplitLayout";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { defaultMetadata } from "@/lib/seo";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = defaultMetadata;

/** Runs before React hydration to prevent theme flash. */
const themeInitScript = `
(function(){
  var t=localStorage.getItem('theme');
  var d=window.matchMedia('(prefers-color-scheme: dark)').matches;
  var dark=t==='dark'?true:t==='light'?false:d;
  document.documentElement.classList[dark?'add':'remove']('dark');
})();
`;

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
        <ThemeProvider>
          <AnalyticsProvider>
            <SplitLayout>{children}</SplitLayout>
          </AnalyticsProvider>
        </ThemeProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
