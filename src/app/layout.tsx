import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VayuDrishti — See What You're Breathing | AI-Powered Air Quality Intelligence",
  description:
    "India's first personal air quality companion. Track your pollution exposure, get AI-powered health advice, and protect your family with real-time AQI intelligence from 1000+ monitoring stations.",
  keywords: [
    "air quality",
    "AQI",
    "India",
    "pollution",
    "health",
    "breath score",
    "Delhi air",
    "PM2.5",
    "air pollution tracker",
  ],
  openGraph: {
    title: "VayuDrishti — See What You're Breathing",
    description: "India's first personal air quality companion. Track pollution exposure. Protect your family.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="bg-[#fafafa] text-[#09090b] font-sans antialiased selection:bg-neutral-900 selection:text-white min-h-screen">
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
