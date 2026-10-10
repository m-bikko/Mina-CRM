import type { ReactElement } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ChevronRight, MessageCircle, Truck } from "lucide-react";
import { getCategory, getDictionary, localePath, type Locale } from "@/lib/i18n";
import {
  categoryPath,
  getCatalog,
  getCatalogProduct,
  localizeProduct,
  productIdFromSlug,
  type CatalogProduct,
  type LocalizedProduct,
} from "@/lib/catalog";
import { breadcrumbJsonLd, pageMetadata, productJsonLd, productOgImage } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { JsonLdScript, SiteChrome } from "@/components/storefront/SiteChrome";
import { ProductTile } from "@/components/storefront/ProductTile";
import { ProductActions } from "@/components/storefront/ProductActions";

const describe = (product: LocalizedProduct, locale: Locale): string => {
  const dict = getDictionary(locale);
  const category = product.categorySlug ? getCategory(product.categorySlug) : null;
  return dict.productDescription({
    name: product.name,
    price: product.priceText,
    oldPrice: product.oldPriceText,
    saving: product.savingText,
    sizes: product.sizesInStock,
    categoryName: category ? category.name[locale] : null,
  });
};

export const productMetadata = async (locale: Locale, slug: string): Promise<Metadata> => {
  const product = await getCatalogProduct(slug);
  if (!product) return { title: { absolute: "Minawear" }, robots: { index: false, follow: true } };
  const localized = localizeProduct(product, locale);
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: `/product/${product.slug}`,
    title: dict.productTitle(localized.name, localized.priceText),
    description: describe(localized, locale),
    image: productOgImage(product.images[0], locale),
  });
};

const relatedFor = (product: CatalogProduct, catalog: CatalogProduct[]): CatalogProduct[] => {
  const explicit = product.relatedIds
    .map((id) => catalog.find((p) => p.id === id))
    .filter((p): p is CatalogProduct => Boolean(p) && p?.id !== product.id);
  const sameCategory = catalog.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug && !explicit.some((e) => e.id === p.id),
  );
  const others = catalog.filter((p) => p.id !== product.id && !explicit.includes(p) && !sameCategory.includes(p));
  return [...explicit, ...sameCategory, ...others].slice(0, 4);
};

interface ProductPageProps {
  locale: Locale;
  slug: string;
}

export const ProductPage = async ({ locale, slug }: ProductPageProps): Promise<ReactElement> => {
  if (!productIdFromSlug(slug)) notFound();
  const product = await getCatalogProduct(slug);
  if (!product) notFound();
  if (product.slug !== slug) permanentRedirect(localePath(locale, `/product/${product.slug}`));

  const catalog = await getCatalog();
  const dict = getDictionary(locale);
  const localized = localizeProduct(product, locale);
  const category = product.categorySlug ? getCategory(product.categorySlug) : null;
  const description = describe(localized, locale);
  const related = relatedFor(product, catalog).map((p) => localizeProduct(p, locale));
  const path = `/product/${product.slug}`;

  const crumbs = [
    { name: dict.home, path: "/" },
    ...(category ? [{ name: category.name[locale], path: `/category/${category.slug}` }] : []),
    { name: localized.name, path },
  ];

  return (
    <SiteChrome locale={locale} path={path}>
      <JsonLdScript data={[productJsonLd(product, localized, locale, category, description), breadcrumbJsonLd(crumbs, locale)]} />
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <nav aria-label="breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-neutral-500 mb-6">
          {crumbs.map((crumb, index) => (
            <span key={crumb.path} className="inline-flex items-center gap-1">
              {index > 0 && <ChevronRight className="w-4 h-4 text-neutral-700" />}
              {index < crumbs.length - 1 ? (
                <Link href={localePath(locale, crumb.path)} className="hover:text-rose-200 transition-colors">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-neutral-300">{crumb.name}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-3">
            <div className="relative aspect-square bg-neutral-900 rounded-xl overflow-hidden">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={localized.name}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-neutral-700">{dict.noPhoto}</div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1, 9).map((src, index) => (
                  <div key={src} className="relative aspect-square bg-neutral-900 rounded-lg overflow-hidden">
                    <Image
                      src={src}
                      alt={`${localized.name} — ${dict.photo} ${index + 2}`}
                      fill
                      sizes="(min-width: 768px) 12vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-light text-white mb-3">{localized.name}</h1>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-2xl md:text-3xl text-rose-400 font-medium">{localized.priceText}</span>
              {localized.oldPriceText && (
                <span className="text-lg text-neutral-500 line-through">
                  <span className="sr-only">{dict.wasPrice} </span>
                  {localized.oldPriceText}
                </span>
              )}
            </div>
            {localized.savingText && (
              <p className="inline-flex self-start px-3 py-1 rounded-full bg-rose-600/15 text-rose-200 text-sm mb-4">
                {dict.saving}: {localized.savingText}
              </p>
            )}
            <p className="text-neutral-400 leading-relaxed mb-6">{description}</p>
            {category && <p className="text-neutral-500 text-sm mb-6">{category.blurb[locale]}</p>}

            <ProductActions
              productId={product.id}
              originalName={product.name}
              price={product.discountPrice ?? product.price}
              image={product.images[0] ?? ""}
              pageUrl={absoluteUrl(localized.href)}
              catalogHref={`${localePath(locale, "/")}#catalog`}
              sizes={product.sizes.map((size, index) => ({
                value: size.label,
                display: localized.sizes[index]?.label ?? size.label,
                inStock: size.inStock,
              }))}
              labels={{
                chooseSize: dict.chooseSize,
                addToCart: dict.addToCart,
                addedToCart: dict.addedToCart,
                orderInWhatsApp: dict.orderInWhatsApp,
                catalog: dict.backToCatalog,
                waInterested: dict.waInterested,
                waSize: dict.waSize,
              }}
            />

            <ul className="mt-8 space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-rose-300 shrink-0" />
                {dict.delivery}
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-rose-300 shrink-0" />
                {dict.orderHow}
              </li>
            </ul>

            {category && (
              <Link
                href={categoryPath(locale, category)}
                className="mt-6 inline-flex self-start text-sm text-rose-300 hover:text-rose-200 underline underline-offset-4"
              >
                {category.name[locale]}
              </Link>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl md:text-2xl font-light text-rose-100 mb-6">{dict.related}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((item) => (
                <ProductTile key={item.id} product={item} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteChrome>
  );
};
