import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Женская одежда с доставкой по Казахстану — Minawear",
    template: "%s",
  },
  description:
    "Атласные рубашки, кардиганы, топы, джинсы, юбки и брюки. Размеры и цены на сайте, заказ в WhatsApp, доставка курьером по городу и почтой по Казахстану.",
  applicationName: "Minawear",
  authors: [{ name: "Minawear" }],
  creator: "Minawear",
  publisher: "Minawear",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: SITE_URL,
    siteName: "Minawear",
    title: "Женская одежда с доставкой по Казахстану — Minawear",
    description:
      "Атласные рубашки, кардиганы, топы, джинсы, юбки и брюки. Заказ в WhatsApp, доставка по Казахстану.",
    images: [{ url: "/og/og-ru.jpg", width: 1200, height: 630, alt: "Minawear — женская одежда" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Женская одежда с доставкой по Казахстану — Minawear",
    description: "Атласные рубашки, кардиганы, топы, джинсы, юбки и брюки. Заказ в WhatsApp, доставка по Казахстану.",
    images: ["/og/og-ru.jpg"],
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
