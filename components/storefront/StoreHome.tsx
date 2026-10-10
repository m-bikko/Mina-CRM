import type { ReactElement } from "react";
import type { Metadata } from "next";
import { CATEGORIES, formatTenge, getDictionary, type Locale } from "@/lib/i18n";
import { categoryPath, effectivePrice, getCatalog, localizeProduct } from "@/lib/catalog";
import { faqJsonLd, itemListJsonLd, organizationJsonLd, pageMetadata, siteOgImage, websiteJsonLd } from "@/lib/seo";
import { JsonLdScript } from "@/components/storefront/SiteChrome";
import { StorePage, type StoreCategoryLink, type StoreProduct } from "@/components/storefront/StorePage";

export const homeMetadata = async (locale: Locale): Promise<Metadata> => {
  const dict = getDictionary(locale);
  const catalog = await getCatalog();
  const prices = catalog.map(effectivePrice);
  const minPrice = prices.length > 0 ? formatTenge(Math.min(...prices)) : formatTenge(0);
  return pageMetadata({
    locale,
    path: "/",
    title: dict.homeTitle,
    description: dict.homeDescription(minPrice),
    image: siteOgImage(locale),
  });
};

interface StoreHomeProps {
  locale: Locale;
}

export const StoreHome = async ({ locale }: StoreHomeProps): Promise<ReactElement> => {
  const dict = getDictionary(locale);
  const catalog = await getCatalog();
  const localized = catalog.map((p) => localizeProduct(p, locale));
  const products: StoreProduct[] = catalog.map((p, index) => {
    const item = localized[index];
    return {
      id: p.id,
      name: item.name,
      originalName: p.name,
      price: p.price,
      discountPrice: p.discountPrice,
      priceText: item.priceText,
      oldPriceText: item.oldPriceText,
      images: p.images,
      sizes: p.sizes.map((size, i) => ({ label: size.label, display: item.sizes[i]?.label ?? size.label, inStock: size.inStock })),
      inStock: p.inStock,
      href: item.href,
      relatedIds: p.relatedIds,
    };
  });
  const present = CATEGORIES.filter((c) => catalog.some((p) => p.categorySlug === c.slug));
  const categories: StoreCategoryLink[] = present.map((c) => ({ slug: c.slug, name: c.name[locale], href: categoryPath(locale, c) }));
  const categoryList = present.map((c) => c.name[locale].toLowerCase()).join(", ");

  return (
    <>
      <JsonLdScript data={[organizationJsonLd(), websiteJsonLd(locale), itemListJsonLd(localized), faqJsonLd(locale)]} />
      <StorePage locale={locale} products={products} categories={categories}>
        <section className="relative z-10 px-4 pb-8">
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl font-light tracking-wide text-rose-100 mb-4">{dict.aboutTitle}</h2>
              <p className="text-neutral-400 leading-relaxed">{dict.about(categoryList)}</p>
            </div>
            <div>
              <h2 className="text-2xl font-light tracking-wide text-rose-100 mb-4">{dict.faqTitle}</h2>
              <div className="divide-y divide-neutral-900 border-y border-neutral-900">
                {dict.faq.map((entry) => (
                  <details key={entry.q} className="group py-4">
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-neutral-200 hover:text-rose-200 transition-colors">
                      {entry.q}
                      <span className="text-neutral-600 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                    </summary>
                    <p className="mt-3 text-neutral-400 leading-relaxed">{entry.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </StorePage>
    </>
  );
};
