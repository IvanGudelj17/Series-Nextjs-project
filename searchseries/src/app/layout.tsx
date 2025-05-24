import "./globals.css";
import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
 
export const metadata: Metadata = {
  title: "SearchSeries",
  description: "Explore TV shows, episodes and cast with style.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">{children}
        <SpeedInsights /></body>
    </html>
  );
}
