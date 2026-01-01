import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mina-crm.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Minawear — Изысканная женская одежда в Казахстане",
    template: "%s | Minawear",
  },
  description:
    "Minawear — бутик изысканной женской одежды. Стильные платья, костюмы, блузы и аксессуары. Доставка по Казахстану. Высокое качество, актуальные тренды.",
  keywords: [
    "женская одежда",
    "купить платье",
    "женские костюмы",
    "модная одежда Казахстан",
    "Minawear",
    "бутик одежды",
    "стильная одежда",
    "платья Алматы",
    "женская мода",
    "одежда онлайн",
    "интернет магазин одежды",
    "казахстан одежда",
  ],
  authors: [{ name: "Minawear" }],
  creator: "Minawear",
  publisher: "Minawear",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/Logo_minawear.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: siteUrl,
    siteName: "Minawear",
    title: "Minawear — Изысканная женская одежда",
    description:
      "Бутик изысканной женской одежды. Стильные платья, костюмы и аксессуары с доставкой по Казахстану.",
    images: [
      {
        url: "/Logo_minawear.svg",
        width: 800,
        height: 400,
        alt: "Minawear — Изысканная женская одежда",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Minawear — Изысканная женская одежда",
    description:
      "Бутик изысканной женской одежды. Стильные платья, костюмы и аксессуары с доставкой по Казахстану.",
    images: ["/Logo_minawear.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googlea0c951e3477111d8",
    yandex: "61ca05eb1648abc0",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "fashion",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
