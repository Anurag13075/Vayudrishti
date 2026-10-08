import type { Metadata } from "next";
import { Inter, Space_Grotesk, Newsreader } from "next/font/google";
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

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VayuDrishti — AI-Powered Hyperlocal Air Quality Intelligence",
  description:
    "India's first personal respiratory defense platform. Track cumulative toxic dose, get AWS Bedrock clinical guidance, and protect schools with real-time CPCB sensor intelligence.",
  keywords: [
    "air quality",
    "AQI",
    "India",
    "pollution",
    "health",
    "breath score",
    "Delhi air",
    "PM2.5",
    "AWS Bedrock",
  ],
  openGraph: {
    title: "VayuDrishti — Hyperlocal Air Quality Intelligence",
    description: "Real-time personal respiratory defense platform powered by AWS Cloud.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${newsreader.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="bg-[#fbfbf9] text-[#111110] font-sans antialiased selection:bg-[#111110] selection:text-white min-h-screen">
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
