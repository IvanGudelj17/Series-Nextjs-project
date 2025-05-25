import "./globals.css";
import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
 
export const metadata: Metadata = {
  title: "SearchSeries | Must-Watch TV Shows",
  description: "Discover, explore and filter must-watch TV series by genre, rating, and cast. Built with Next.js.",
  keywords: [
    "TV shows", "series", "Next.js", "genres", "cast", "episodes",
    "Ivan Gudelj", "SearchSeries", "favorites", "streaming", "best tv shows"
  ],
  authors: [{ name: "Ivan Gudelj", url: "https://github.com/IvanGudelj17" }],
  creator: "Ivan Gudelj",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SearchSeries | Must-Watch TV Shows",
    description: "Explore top-rated and trending TV series with genre filtering. Find your next favorite show.",
    url: "https://series-nextjs-project-3sos.vercel.app",
    siteName: "SearchSeries",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SearchSeries Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
