"use client";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  sizes: { label: string; quantity: number }[];
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mina-crm.vercel.app";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Minawear",
    url: siteUrl,
    logo: `${siteUrl}/Logo_minawear.svg`,
    description: "Бутик изысканной женской одежды в Казахстане",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KZ",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-778-353-6898",
      contactType: "customer service",
      availableLanguage: ["Russian", "Kazakh"],
    },
    sameAs: [
      "https://wa.me/77783536898",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Minawear",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function StoreJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Minawear",
    url: siteUrl,
    image: `${siteUrl}/og-image.jpg`,
    description: "Бутик изысканной женской одежды. Стильные платья, костюмы и аксессуары.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KZ",
    },
    priceRange: "₸₸",
    currenciesAccepted: "KZT",
    paymentAccepted: "Cash, Card, Transfer",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProductListJsonLd({ products }: { products: Product[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, 10).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: product.images[0] || `${siteUrl}/Logo_minawear.svg`,
        url: siteUrl,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "KZT",
          availability: product.sizes.some(s => s.quantity > 0)
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Каталог",
        item: `${siteUrl}/#catalog`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
