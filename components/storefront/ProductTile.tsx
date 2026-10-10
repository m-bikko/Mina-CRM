import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { LocalizedProduct } from "@/lib/catalog";

interface ProductTileProps {
  product: LocalizedProduct;
  locale: Locale;
  priority?: boolean;
}

export const ProductTile = ({ product, locale, priority = false }: ProductTileProps): ReactElement => {
  const dict = getDictionary(locale);
  return (
    <Link href={product.href} className="group block">
      <div className="relative aspect-square bg-neutral-900 rounded-lg overflow-hidden mb-3">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-700">{dict.noPhoto}</div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-neutral-400 text-sm tracking-wider uppercase">{dict.outOfStock}</span>
          </div>
        )}
      </div>
      <h3 className="font-light text-neutral-200 group-hover:text-rose-200 transition-colors truncate">{product.name}</h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-rose-400 font-medium">{product.priceText}</span>
        {product.oldPriceText && <span className="text-neutral-600 line-through text-xs">{product.oldPriceText}</span>}
      </div>
      {product.sizesInStock.length > 0 && (
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {product.sizesInStock.map((size) => (
            <span key={size} className="px-2 py-0.5 bg-neutral-900 text-neutral-400 text-xs rounded">
              {size}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};
