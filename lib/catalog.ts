import { cache } from "react";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/models/Product";
import {
  categoryForName,
  colorsOf,
  formatTenge,
  localePath,
  localizeProductName,
  localizeSizeLabel,
  normalizeRuName,
  slugify,
  type Category,
  type Locale,
} from "@/lib/i18n";

export interface CatalogSize {
  label: string;
  inStock: boolean;
}

export interface CatalogProduct {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  images: string[];
  sizes: CatalogSize[];
  inStock: boolean;
  relatedIds: string[];
  categorySlug: string | null;
  slug: string;
  updatedAt: string;
}

interface LeanSize {
  label: string;
  quantity: number;
}

interface LeanProduct {
  _id: { toString(): string };
  name: string;
  price: number;
  discountPrice?: number | null;
  images?: string[];
  sizes?: LeanSize[];
  relatedProducts?: Array<{ toString(): string }>;
  updatedAt?: Date;
}

const toCatalogProduct = (doc: LeanProduct): CatalogProduct => {
  const id = doc._id.toString();
  const name = normalizeRuName(doc.name).trim();
  const sizes = (doc.sizes ?? []).map((size) => ({ label: size.label, inStock: size.quantity > 0 }));
  const discount = doc.discountPrice && doc.discountPrice > 0 && doc.discountPrice < doc.price ? doc.discountPrice : null;
  return {
    id,
    name,
    price: doc.price,
    discountPrice: discount,
    images: doc.images ?? [],
    sizes,
    inStock: sizes.some((size) => size.inStock),
    relatedIds: (doc.relatedProducts ?? []).map((related) => related.toString()),
    categorySlug: categoryForName(name)?.slug ?? null,
    slug: `${slugify(name)}-${id}`,
    updatedAt: (doc.updatedAt ?? new Date(0)).toISOString(),
  };
};

export const getCatalog = cache(async (): Promise<CatalogProduct[]> => {
  await connectDB();
  const docs = await Product.find({ isActive: true })
    .select("name price discountPrice images sizes relatedProducts updatedAt sortOrder createdAt")
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean<LeanProduct[]>();
  return docs.map(toCatalogProduct);
});

export const productIdFromSlug = (slug: string): string | null => {
  const match = /([a-f0-9]{24})$/i.exec(slug);
  return match ? match[1].toLowerCase() : null;
};

export const getCatalogProduct = async (slug: string): Promise<CatalogProduct | null> => {
  const id = productIdFromSlug(slug);
  if (!id) return null;
  const catalog = await getCatalog();
  return catalog.find((product) => product.id === id) ?? null;
};

export const effectivePrice = (product: CatalogProduct): number => product.discountPrice ?? product.price;

export const productPath = (locale: Locale, product: CatalogProduct): string => localePath(locale, `/product/${product.slug}`);

export const categoryPath = (locale: Locale, category: Category): string => localePath(locale, `/category/${category.slug}`);

export interface LocalizedProduct {
  id: string;
  name: string;
  originalName: string;
  price: number;
  discountPrice: number | null;
  priceText: string;
  oldPriceText: string | null;
  savingText: string | null;
  images: string[];
  sizes: CatalogSize[];
  sizesInStock: string[];
  inStock: boolean;
  href: string;
  categorySlug: string | null;
}

export const localizeProduct = (product: CatalogProduct, locale: Locale): LocalizedProduct => ({
  id: product.id,
  name: localizeProductName(product.name, locale),
  originalName: product.name,
  price: product.price,
  discountPrice: product.discountPrice,
  priceText: formatTenge(effectivePrice(product)),
  oldPriceText: product.discountPrice ? formatTenge(product.price) : null,
  savingText: product.discountPrice ? formatTenge(product.price - product.discountPrice) : null,
  images: product.images,
  sizes: product.sizes.map((size) => ({ label: localizeSizeLabel(size.label, locale), inStock: size.inStock })),
  sizesInStock: product.sizes.filter((size) => size.inStock).map((size) => localizeSizeLabel(size.label, locale)),
  inStock: product.inStock,
  href: productPath(locale, product),
  categorySlug: product.categorySlug,
});

export interface CategorySummary {
  count: number;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  hasDiscounts: boolean;
}

export const summarizeCategory = (products: CatalogProduct[], locale: Locale): CategorySummary => {
  const prices = products.map(effectivePrice);
  const sizes = Array.from(new Set(products.flatMap((p) => p.sizes.filter((s) => s.inStock).map((s) => localizeSizeLabel(s.label, locale)))));
  const colors = Array.from(new Set(products.flatMap((p) => colorsOf(p.name, locale))));
  return {
    count: products.length,
    minPrice: prices.length > 0 ? Math.min(...prices) : 0,
    maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
    sizes,
    colors,
    hasDiscounts: products.some((p) => p.discountPrice !== null),
  };
};
