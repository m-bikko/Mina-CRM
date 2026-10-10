import type { Metadata } from "next";
import { BRAND_NAME, INSTAGRAM_URL, PHONE_E164, SITE_URL, absoluteUrl } from "@/lib/site";
import {
  HREFLANG,
  LOCALES,
  OG_LOCALE,
  alternateLanguages,
  getDictionary,
  localePath,
  type Category,
  type Locale,
} from "@/lib/i18n";
import type { CatalogProduct, LocalizedProduct } from "@/lib/catalog";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type JsonLdObject = { [key: string]: JsonValue };

const ORG_ID = `${SITE_URL}/#organization`;

export const siteOgImage = (locale: Locale): string => absoluteUrl(`/og/og-${locale}.jpg`);

export const productOgImage = (imageUrl: string | undefined, locale: Locale): string =>
  imageUrl && imageUrl.includes("/upload/")
    ? imageUrl.replace("/upload/", "/upload/c_pad,b_blurred:400:15,w_1200,h_630,q_auto,f_jpg/")
    : siteOgImage(locale);

interface PageMetaInput {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image: string;
}

export const pageMetadata = ({ locale, path, title, description, image }: PageMetaInput): Metadata => {
  const url = absoluteUrl(localePath(locale, path));
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: alternateLanguages(path) },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      url,
      siteName: BRAND_NAME,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
};

export const organizationJsonLd = (): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  "@id": ORG_ID,
  name: BRAND_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/icon-512.png"),
  image: siteOgImage("ru"),
  description: getDictionary("ru").about("атласные рубашки, кардиганы, топы, джинсы, юбки, брюки, спортивные штаны и леггинсы"),
  sameAs: [INSTAGRAM_URL],
  areaServed: { "@type": "Country", name: "Kazakhstan" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_E164,
    contactType: "customer service",
    areaServed: "KZ",
    availableLanguage: ["Russian", "Kazakh"],
  },
});

export const websiteJsonLd = (locale: Locale): JsonLdObject => {
  const home = absoluteUrl(localePath(locale, "/"));
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${home}#website`,
    url: home,
    name: BRAND_NAME,
    inLanguage: HREFLANG[locale],
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${home}?search={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
};

export const breadcrumbJsonLd = (items: Array<{ name: string; path: string }>, locale: Locale): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(localePath(locale, item.path)),
  })),
});

export const itemListJsonLd = (products: LocalizedProduct[]): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  numberOfItems: products.length,
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(product.href),
    name: product.name,
  })),
});

export const productJsonLd = (
  product: CatalogProduct,
  localized: LocalizedProduct,
  locale: Locale,
  category: Category | null,
  description: string,
): JsonLdObject => {
  const offer: JsonLdObject = {
    "@type": "Offer",
    url: absoluteUrl(localized.href),
    priceCurrency: "KZT",
    price: product.discountPrice ?? product.price,
    availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": ORG_ID },
  };
  if (product.discountPrice !== null) {
    offer.priceSpecification = {
      "@type": "UnitPriceSpecification",
      priceType: "https://schema.org/StrikethroughPrice",
      price: product.price,
      priceCurrency: "KZT",
    };
  }
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(localized.href)}#product`,
    name: localized.name,
    description,
    sku: product.id,
    image: product.images.slice(0, 6),
    brand: { "@type": "Brand", name: BRAND_NAME },
    inLanguage: HREFLANG[locale],
    offers: offer,
  };
  if (category) data.category = category.name[locale];
  return data;
};

export const faqJsonLd = (locale: Locale): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: HREFLANG[locale],
  mainEntity: getDictionary(locale).faq.map((entry) => ({
    "@type": "Question",
    name: entry.q,
    acceptedAnswer: { "@type": "Answer", text: entry.a },
  })),
});

export const serializeJsonLd = (data: JsonLdObject | JsonLdObject[]): string =>
  JSON.stringify(data).replace(/</g, "\\u003c");
