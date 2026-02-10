import type { Metadata } from "next";
import "./globals.css";
import SplitLayout from "@/components/layout/SplitLayout";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { defaultMetadata } from "@/lib/seo";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AnalyticsProvider>
          <SplitLayout>{children}</SplitLayout>
        </AnalyticsProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
