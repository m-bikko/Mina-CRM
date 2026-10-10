import type { ReactElement } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CATEGORIES, formatTenge, getCategory, getDictionary, localePath, type Category, type CategoryTextInput, type Locale } from "@/lib/i18n";
import { categoryPath, getCatalog, localizeProduct, summarizeCategory, type CatalogProduct } from "@/lib/catalog";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata, productOgImage } from "@/lib/seo";
import { JsonLdScript, SiteChrome } from "@/components/storefront/SiteChrome";
import { ProductTile } from "@/components/storefront/ProductTile";

const categoryText = (category: Category, products: CatalogProduct[], locale: Locale): CategoryTextInput => {
  const summary = summarizeCategory(products, locale);
  return {
    name: category.name[locale],
    count: summary.count,
    minPrice: formatTenge(summary.minPrice),
    maxPrice: formatTenge(summary.maxPrice),
    sizes: summary.sizes,
    colors: summary.colors,
    hasDiscounts: summary.hasDiscounts,
  };
};

export const categoryMetadata = async (locale: Locale, slug: string): Promise<Metadata> => {
  const category = getCategory(slug);
  if (!category) return { title: { absolute: "Minawear" }, robots: { index: false, follow: true } };
  const products = (await getCatalog()).filter((p) => p.categorySlug === category.slug);
  const dict = getDictionary(locale);
  const meta = pageMetadata({
    locale,
    path: `/category/${category.slug}`,
    title: dict.categoryTitle(category.name[locale]),
    description: products.length > 0 ? dict.categoryDescription(categoryText(category, products, locale)) : category.blurb[locale],
    image: productOgImage(products[0]?.images[0], locale),
  });
  return products.length > 0 ? meta : { ...meta, robots: { index: false, follow: true } };
};

interface CategoryPageProps {
  locale: Locale;
  slug: string;
}

export const CategoryPage = async ({ locale, slug }: CategoryPageProps): Promise<ReactElement> => {
  const category = getCategory(slug);
  if (!category) notFound();
  const catalog = await getCatalog();
  const products = catalog.filter((p) => p.categorySlug === category.slug);
  const dict = getDictionary(locale);
  const localized = products.map((p) => localizeProduct(p, locale));
  const path = `/category/${category.slug}`;
  const crumbs = [
    { name: dict.home, path: "/" },
    { name: category.name[locale], path },
  ];
  const others = CATEGORIES.filter((c) => c.slug !== category.slug && catalog.some((p) => p.categorySlug === c.slug));

  return (
    <SiteChrome locale={locale} path={path}>
      <JsonLdScript data={[itemListJsonLd(localized), breadcrumbJsonLd(crumbs, locale)]} />
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm text-neutral-500 mb-6">
          <Link href={localePath(locale, "/")} className="hover:text-rose-200 transition-colors">
            {dict.home}
          </Link>
          <ChevronRight className="w-4 h-4 text-neutral-700" />
          <span className="text-neutral-300">{category.name[locale]}</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-rose-100 mb-4">{category.name[locale]}</h1>
          <p className="text-neutral-300 leading-relaxed">{category.blurb[locale]}</p>
          {products.length > 0 && (
            <p className="text-neutral-500 leading-relaxed mt-2">{dict.categoryIntro(categoryText(category, products, locale))}</p>
          )}
          <p className="text-neutral-500 text-sm mt-3">{dict.delivery}</p>
        </header>

        {localized.length === 0 ? (
          <p className="text-neutral-500 text-lg py-12">{dict.comingSoon}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {localized.map((product, index) => (
              <ProductTile key={product.id} product={product} locale={locale} priority={index < 2} />
            ))}
          </div>
        )}

        {others.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-light text-rose-100 mb-4">{dict.categories}</h2>
            <div className="flex flex-wrap gap-2">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  href={categoryPath(locale, c)}
                  className="px-4 py-2 rounded-full border border-neutral-800 text-neutral-300 hover:text-rose-200 hover:border-rose-900 transition-colors"
                >
                  {c.name[locale]}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteChrome>
  );
};
