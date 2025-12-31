import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, Caveat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ihavefoodathome.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "I Have Food at Home | Simple Recipes for Busy Parents",
    template: "%s | I Have Food at Home",
  },
  description: "Simple, healthy, budget-friendly recipes from Lan. Turn mealtime chaos into joyful moments—even for picky eaters. French & Vietnamese inspired cooking.",
  keywords: ["recipes", "cooking", "family meals", "picky eaters", "kid-friendly", "French cooking", "Vietnamese food", "quick recipes"],
  authors: [{ name: "Lan", url: "https://www.youtube.com/@Ihavefoodathome" }],
  creator: "Lan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "I Have Food at Home",
    title: "I Have Food at Home | Simple Recipes for Busy Parents",
    description: "Simple, healthy, budget-friendly recipes from Lan. Turn mealtime chaos into joyful moments—even for picky eaters.",
  },
  twitter: {
    card: "summary_large_image",
    title: "I Have Food at Home | Simple Recipes for Busy Parents",
    description: "Simple, healthy, budget-friendly recipes from Lan. Turn mealtime chaos into joyful moments—even for picky eaters.",
    creator: "@Ihavefoodathome",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${sourceSans.variable} ${caveat.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
