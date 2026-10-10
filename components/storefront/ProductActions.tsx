"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import { Check, MessageCircle, ShoppingBag } from "lucide-react";
import { whatsappLink } from "@/lib/site";

interface ActionSize {
  value: string;
  display: string;
  inStock: boolean;
}

interface ProductActionsLabels {
  chooseSize: string;
  addToCart: string;
  addedToCart: string;
  orderInWhatsApp: string;
  catalog: string;
  waInterested: string;
  waSize: string;
}

interface ProductActionsProps {
  productId: string;
  originalName: string;
  price: number;
  image: string;
  pageUrl: string;
  catalogHref: string;
  sizes: ActionSize[];
  labels: ProductActionsLabels;
}

interface StoredCartItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

const CART_KEY = "minawear-cart";

const readCart = (): StoredCartItem[] => {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredCartItem[]) : [];
  } catch {
    return [];
  }
};

export const ProductActions = ({
  productId,
  originalName,
  price,
  image,
  pageUrl,
  catalogHref,
  sizes,
  labels,
}: ProductActionsProps): ReactElement => {
  const [selected, setSelected] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const addToCart = (): void => {
    if (!selected) return;
    const cart = readCart();
    const index = cart.findIndex((item) => item.productId === productId && item.size === selected);
    const next =
      index >= 0
        ? cart.map((item, i) => (i === index ? { ...item, quantity: item.quantity + 1 } : item))
        : [...cart, { productId, productName: originalName, size: selected, quantity: 1, price, image }];
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(next));
      setAdded(true);
    } catch {
      setAdded(false);
    }
  };

  const message = `${labels.waInterested} ${originalName}${selected ? ` (${labels.waSize} ${selected})` : ""} — ${pageUrl}`;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-neutral-500 uppercase tracking-wider mb-3">{labels.chooseSize}</p>
        <div className="flex gap-2 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size.value}
              type="button"
              disabled={!size.inStock}
              aria-pressed={selected === size.value}
              onClick={() => {
                setSelected(size.value);
                setAdded(false);
              }}
              className={`px-5 py-2.5 rounded-lg border transition-colors ${
                size.inStock
                  ? selected === size.value
                    ? "border-rose-600 bg-rose-600/20 text-white"
                    : "border-neutral-700 text-white hover:border-rose-800"
                  : "border-neutral-800 text-neutral-600 line-through cursor-not-allowed"
              }`}
            >
              {size.display}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <button
          type="button"
          onClick={addToCart}
          disabled={!selected}
          className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            selected ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
          }`}
        >
          {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
          {added ? labels.addedToCart : labels.addToCart}
        </button>
        {added && (
          <Link href={catalogHref} className="block text-center text-sm text-rose-300 hover:text-rose-200 underline underline-offset-4">
            {labels.catalog}
          </Link>
        )}
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener"
          className="w-full py-3 rounded-lg font-medium border border-green-700/60 text-green-300 hover:bg-green-900/20 transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          {labels.orderInWhatsApp}
        </a>
      </div>
    </div>
  );
};
