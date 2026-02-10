import type { Metadata } from "next";
import "./globals.css";
import SplitLayout from "@/components/layout/SplitLayout";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SplitLayout>{children}</SplitLayout>
      </body>
    </html>
  );
}
