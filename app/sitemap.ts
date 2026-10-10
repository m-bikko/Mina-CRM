import type { MetadataRoute } from "next";
import { CATEGORIES, LOCALES, alternateLanguages, localePath } from "@/lib/i18n";
import { getCatalog } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const entriesFor = (
  path: string,
  lastModified: Date,
  changeFrequency: "daily" | "weekly",
  priority: number,
): MetadataRoute.Sitemap =>
  LOCALES.map((locale) => ({
    url: absoluteUrl(localePath(locale, path)),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: alternateLanguages(path) },
  }));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home = entriesFor("/", new Date(), "daily", 1);
  try {
    const catalog = await getCatalog();
    const latest = catalog.reduce((max, p) => (p.updatedAt > max ? p.updatedAt : max), new Date(0).toISOString());
    const categories = CATEGORIES.filter((c) => catalog.some((p) => p.categorySlug === c.slug)).flatMap((c) =>
      entriesFor(`/category/${c.slug}`, new Date(latest), "weekly", 0.8),
    );
    const products = catalog.flatMap((p) => entriesFor(`/product/${p.slug}`, new Date(p.updatedAt), "weekly", 0.7));
    return [...home, ...categories, ...products];
  } catch {
    return home;
  }
}
