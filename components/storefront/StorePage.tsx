"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, type ReactElement, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, MessageCircle, Minus, Plus, Search, ShoppingBag, Trash2, X } from "lucide-react";
import { ShoppingOrb } from "@/components/ShoppingOrb";
import { LanguageSwitcher, SiteFooter } from "@/components/storefront/SiteChrome";
import { formatTenge, getDictionary, type Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

export interface StoreSize {
  label: string;
  display: string;
  inStock: boolean;
}

export interface StoreProduct {
  id: string;
  name: string;
  originalName: string;
  price: number;
  discountPrice: number | null;
  priceText: string;
  oldPriceText: string | null;
  images: string[];
  sizes: StoreSize[];
  inStock: boolean;
  href: string;
  relatedIds: string[];
}

export interface StoreCategoryLink {
  slug: string;
  name: string;
  href: string;
}

interface CartItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

interface StorePageProps {
  locale: Locale;
  products: StoreProduct[];
  categories: StoreCategoryLink[];
  children?: ReactNode;
}

const CART_KEY = "minawear-cart";
const MIN_SWIPE = 50;

const readCart = (): CartItem[] => {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
};

export const StorePage = ({ locale, products, categories, children }: StorePageProps): ReactElement => {
  const dict = getDictionary(locale);
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const [isInHeroZone, setIsInHeroZone] = useState(true);
  const [orbFocusId, setOrbFocusId] = useState<string | null>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products;
    return products.filter((p) => p.name.toLowerCase().includes(query) || p.originalName.toLowerCase().includes(query));
  }, [searchQuery, products]);

  useEffect(() => {
    const events: Array<keyof WindowEventMap> = ["pointerup", "touchend", "keydown"];
    const unlock = (): void => {
      setSoundUnlocked(true);
      events.forEach((event) => window.removeEventListener(event, unlock));
    };
    events.forEach((event) => window.addEventListener(event, unlock));
    return () => events.forEach((event) => window.removeEventListener(event, unlock));
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const soundOn = soundUnlocked && isInHeroZone && !selectedProduct;
    let fadeInterval: ReturnType<typeof setInterval> | undefined;
    let pauseGuard: ReturnType<typeof setTimeout> | undefined;
    if (soundOn) {
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => undefined);
        setSoundUnlocked(false);
      });
      pauseGuard = setTimeout(() => {
        if (video.paused) {
          video.muted = true;
          video.play().catch(() => undefined);
          setSoundUnlocked(false);
        }
      }, 300);
      fadeInterval = setInterval(() => {
        const next = Math.min(video.volume + 0.05, 1);
        video.volume = next;
        if (next >= 1 && fadeInterval) clearInterval(fadeInterval);
      }, 150);
    } else {
      if (video.paused) video.play().catch(() => undefined);
      fadeInterval = setInterval(() => {
        const next = Math.max(video.volume - 0.1, 0);
        video.volume = next;
        if (next <= 0) {
          video.muted = true;
          if (fadeInterval) clearInterval(fadeInterval);
        }
      }, 50);
    }
    return () => {
      if (fadeInterval) clearInterval(fadeInterval);
      if (pauseGuard) clearTimeout(pauseGuard);
    };
  }, [soundUnlocked, isInHeroZone, selectedProduct]);

  useEffect(() => {
    setCart(readCart());
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      return;
    }
  }, [cart, cartLoaded]);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
      setIsInHeroZone(window.scrollY < window.innerHeight * 0.3);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("search");
    if (initial) {
      setSearchQuery(initial);
      catalogRef.current?.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    fetch("/api/page-visits", { method: "POST" }).catch(() => undefined);
  }, []);

  const onTouchStart = (e: React.TouchEvent): void => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || !selectedProduct) return;
    const distance = touchStart - touchEnd;
    if (distance > MIN_SWIPE && selectedImage < selectedProduct.images.length - 1) setSelectedImage((prev) => prev + 1);
    if (distance < -MIN_SWIPE && selectedImage > 0) setSelectedImage((prev) => prev - 1);
  }, [touchStart, touchEnd, selectedProduct, selectedImage]);

  const openProduct = useCallback((product: StoreProduct) => {
    setSelectedProduct(product);
    setSelectedImage(0);
    setSelectedSize(null);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (): void => {
    if (!selectedProduct || !selectedSize) return;
    const existing = cart.findIndex((item) => item.productId === selectedProduct.id && item.size === selectedSize);
    if (existing !== -1) {
      setCart((prev) => prev.map((item, index) => (index === existing ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCart((prev) => [
        ...prev,
        {
          productId: selectedProduct.id,
          productName: selectedProduct.originalName,
          size: selectedSize,
          quantity: 1,
          price: selectedProduct.discountPrice ?? selectedProduct.price,
          image: selectedProduct.images[0] || "",
        },
      ]);
    }
    setSelectedSize(null);
  };

  const updateCartItemQuantity = (index: number, delta: number): void => {
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: item.quantity + delta } : item)).filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (index: number): void => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const productWhatsApp = (product: StoreProduct): string => whatsappLink(`${dict.waInterested} ${product.originalName}`);

  const cartWhatsApp = (): string => {
    if (cart.length === 0) return "#";
    const lines = cart.map((item) => `• ${item.productName} (${item.size}) — ${item.quantity} ${dict.pcs} × ${formatTenge(item.price)}`);
    return whatsappLink(`${dict.waOrderIntro}\n\n${lines.join("\n")}\n\n${dict.total}: ${formatTenge(cartTotal)}`);
  };

  const cartItemName = (item: CartItem): string => byId.get(item.productId)?.name ?? item.productName;

  const sizeDisplay = (productId: string, label: string): string =>
    byId.get(productId)?.sizes.find((size) => size.label === label)?.display ?? label;

  const orbProducts = useMemo(
    () =>
      filteredProducts.map((p) => ({
        _id: p.id,
        name: p.name,
        price: p.price,
        discountPrice: p.discountPrice ?? undefined,
        sizes: p.sizes.map((size) => ({ label: size.display, quantity: size.inStock ? 1 : 0 })),
        relatedProducts: p.relatedIds.map((id) => ({ _id: id })),
      })),
    [filteredProducts],
  );

  const related = selectedProduct
    ? selectedProduct.relatedIds.map((id) => byId.get(id)).filter((p): p is StoreProduct => Boolean(p))
    : [];

  return (
    <div lang={locale} className="min-h-screen bg-neutral-950 text-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/50" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <Image src="/Logo_minawear.svg" alt="Minawear" width={100} height={28} className="opacity-90" />
          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} path="/" />
            <button
              type="button"
              aria-label={dict.openCart}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-300 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 rounded-full text-xs flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video ref={heroVideoRef} autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover">
          <source src="/hero-vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-neutral-950" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <Image src="/Logo_minawear.svg" alt="Minawear" width={280} height={80} className="mx-auto" priority />
          </div>
          <h1 className="text-lg md:text-xl text-neutral-200 font-light tracking-wide mb-2">{dict.homeH1}</h1>
          <p className="text-sm md:text-base text-neutral-400 font-light tracking-wide mb-8">{dict.brandTagline}</p>
          <button
            type="button"
            onClick={() => catalogRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="group flex flex-col items-center gap-2 mx-auto text-neutral-400 hover:text-rose-300 transition-colors"
          >
            <span className="text-sm tracking-widest uppercase">{dict.catalog}</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </section>

      <section id="catalog" ref={catalogRef} className="relative z-10 py-16 md:py-24 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider text-rose-100 mb-4">{dict.collection}</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-800 to-transparent mx-auto" />
          </div>

          {categories.length > 0 && (
            <nav aria-label={dict.categories} className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={category.href}
                  className="px-4 py-2 rounded-full border border-neutral-800 text-sm text-neutral-300 hover:text-rose-200 hover:border-rose-900 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          )}

          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="search"
                placeholder={dict.searchPlaceholder}
                aria-label={dict.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-full text-white placeholder-neutral-500 focus:outline-none focus:border-rose-800 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label={dict.clearSearch}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-lg">{searchQuery ? dict.nothingFound : dict.comingSoon}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => {
                const availableSizes = product.sizes.filter((size) => size.inStock);
                const isOrbFocused = orbFocusId === product.id;
                return (
                  <a
                    key={product.id}
                    href={product.href}
                    data-product-id={product.id}
                    className="group block cursor-pointer"
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                      e.preventDefault();
                      openProduct(product);
                    }}
                  >
                    <div
                      className={`relative aspect-square bg-neutral-900 rounded-lg overflow-hidden mb-3 transition-[opacity,box-shadow] duration-300 ${
                        isOrbFocused
                          ? "opacity-100 ring-2 ring-rose-400/70 shadow-[0_0_28px_rgba(251,113,133,0.35)]"
                          : "opacity-[0.88] group-hover:opacity-100"
                      }`}
                    >
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          priority={index < 2}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-light text-neutral-200 group-hover:text-rose-200 transition-colors truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-rose-400 font-medium">{product.priceText}</span>
                      {product.oldPriceText && <span className="text-neutral-600 line-through text-xs">{product.oldPriceText}</span>}
                    </div>
                    {availableSizes.length > 0 && (
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {availableSizes.map((size) => (
                          <span key={size.label} className="px-2 py-0.5 bg-neutral-900 text-neutral-400 text-xs rounded">
                            {size.display}
                          </span>
                        ))}
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {children}

      <SiteFooter locale={locale} />

      <ShoppingOrb
        products={orbProducts}
        catalogRef={catalogRef}
        hidden={filteredProducts.length === 0 || isInHeroZone || isCartOpen || selectedProduct !== null}
        activeProductId={selectedProduct?.id ?? null}
        locale={locale}
        onFocusChange={setOrbFocusId}
        onOpen={(item) => {
          const product = byId.get(item._id);
          if (product) openProduct(product);
        }}
      />

      {selectedProduct && (
        <div
          data-orb-ignore
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedProduct.name}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 md:max-h-[90vh]">
              <div className="relative overflow-hidden min-w-0">
                <div className="relative aspect-square bg-neutral-900 touch-pan-y" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                  {selectedProduct.images[selectedImage] ? (
                    <Image
                      src={selectedProduct.images[selectedImage]}
                      alt={selectedProduct.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover select-none pointer-events-none"
                      draggable={false}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-700">{dict.noPhoto}</div>
                  )}
                  {selectedProduct.images.length > 1 && (
                    <>
                      {selectedImage > 0 && (
                        <button
                          type="button"
                          aria-label={dict.prevPhoto}
                          onClick={() => setSelectedImage((prev) => Math.max(prev - 1, 0))}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                      )}
                      {selectedImage < selectedProduct.images.length - 1 && (
                        <button
                          type="button"
                          aria-label={dict.nextPhoto}
                          onClick={() => setSelectedImage((prev) => Math.min(prev + 1, selectedProduct.images.length - 1))}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      )}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProduct.images.map((img, index) => (
                          <button
                            key={img}
                            type="button"
                            aria-label={`${dict.photo} ${index + 1}`}
                            onClick={() => setSelectedImage(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${selectedImage === index ? "bg-rose-500" : "bg-white/50 hover:bg-white/80"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                {selectedProduct.images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto bg-neutral-900/50">
                    {selectedProduct.images.map((img, index) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? "border-rose-700" : "border-transparent hover:border-neutral-700"
                        }`}
                      >
                        <Image src={img} alt={`${selectedProduct.name} — ${dict.photo} ${index + 1}`} fill sizes="64px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  aria-label={dict.close}
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 md:hidden bg-black/50 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 flex flex-col">
                <div className="hidden md:flex justify-end mb-4">
                  <button type="button" aria-label={dict.close} onClick={() => setSelectedProduct(null)} className="text-neutral-500 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-2">{selectedProduct.name}</h2>
                <div className="flex items-center gap-3 mb-6">
                  <p className={`text-2xl md:text-3xl ${selectedProduct.oldPriceText ? "text-rose-500 font-bold" : "text-rose-400 font-medium"}`}>
                    {selectedProduct.priceText}
                  </p>
                  {selectedProduct.oldPriceText && <p className="text-xl text-neutral-500 line-through">{selectedProduct.oldPriceText}</p>}
                </div>

                <div className="flex-1">
                  <p className="text-sm text-neutral-500 uppercase tracking-wider mb-3">{dict.chooseSize}</p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => size.inStock && setSelectedSize(size.label)}
                        disabled={!size.inStock}
                        className={`px-5 py-2.5 rounded-lg border transition-colors ${
                          size.inStock
                            ? selectedSize === size.label
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

                <div className="mt-8 space-y-3">
                  <button
                    type="button"
                    onClick={addToCart}
                    disabled={!selectedSize}
                    className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      selectedSize ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {dict.addToCart}
                  </button>
                  <a
                    href={productWhatsApp(selectedProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {dict.writeInWhatsApp}
                  </a>
                  <Link href={selectedProduct.href} className="block text-center text-sm text-neutral-400 hover:text-rose-200 underline underline-offset-4">
                    {dict.productPage}
                  </Link>
                </div>

                {related.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-neutral-800">
                    <h3 className="text-lg font-medium text-white mb-4">{dict.alsoLike}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {related.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => openProduct(item)}
                          className="group bg-neutral-900 rounded-lg overflow-hidden text-left hover:bg-neutral-800 transition-colors"
                        >
                          <div className="relative aspect-square">
                            {item.images[0] ? (
                              <Image
                                src={item.images[0]}
                                alt={item.name}
                                fill
                                sizes="(min-width: 768px) 20vw, 45vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full bg-neutral-800 text-neutral-600">{dict.noPhoto}</div>
                            )}
                          </div>
                          <div className="p-3">
                            <p className="text-sm text-white truncate">{item.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-rose-400 font-medium">{item.priceText}</span>
                              {item.oldPriceText && <span className="text-xs text-neutral-600 line-through">{item.oldPriceText}</span>}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div data-orb-ignore className="fixed inset-0 bg-black/90 z-50 flex items-start justify-end" onClick={() => setIsCartOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={dict.cart}
            className="bg-neutral-950 border-l border-neutral-800 h-full w-full max-w-md overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 p-4 flex items-center justify-between">
              <h2 className="text-xl font-light">{dict.cart}</h2>
              <button type="button" aria-label={dict.close} onClick={() => setIsCartOpen(false)} className="text-neutral-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-neutral-500">
                <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                <p>{dict.cartEmpty}</p>
              </div>
            ) : (
              <>
                <div className="p-4 space-y-4">
                  {cart.map((item, index) => (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-4 p-3 bg-neutral-900 rounded-lg">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-800">
                        {item.image ? (
                          <Image src={item.image} alt={cartItemName(item)} fill sizes="80px" className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-neutral-600 text-xs">{dict.noPhoto}</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">{cartItemName(item)}</h3>
                        <p className="text-sm text-neutral-500">
                          {dict.sizeLabel}: {sizeDisplay(item.productId, item.size)}
                        </p>
                        <p className="text-rose-400 font-medium mt-1">{formatTenge(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            aria-label={dict.decrease}
                            onClick={() => updateCartItemQuantity(index, -1)}
                            className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={dict.increase}
                            onClick={() => updateCartItemQuantity(index, 1)}
                            className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            aria-label={dict.remove}
                            onClick={() => removeFromCart(index)}
                            className="ml-auto w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-red-900/50 text-neutral-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sticky bottom-0 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800 p-4 space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-neutral-400">{dict.total}:</span>
                    <span className="text-white font-medium">{formatTenge(cartTotal)}</span>
                  </div>
                  <a
                    href={cartWhatsApp()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {dict.orderCartInWhatsApp}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
