"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Search, X, ChevronDown, ChevronLeft, ChevronRight, ShoppingBag, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
  StoreJsonLd,
  ProductListJsonLd,
  BreadcrumbJsonLd,
} from "@/components/JsonLd";

interface Size {
  label: string;
  quantity: number;
}

interface RelatedProduct {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
}

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  sizes: Size[];
  isActive: boolean;
  relatedProducts?: RelatedProduct[];
}

interface CartItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

const WHATSAPP_NUMBER = "77783536898";

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("minawear-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("minawear-cart", JSON.stringify(cart));
  }, [cart]);

  // Track scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || !selectedProduct) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && selectedImage < selectedProduct.images.length - 1) {
      setSelectedImage(prev => prev + 1);
    }
    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(prev => prev - 1);
    }
  }, [touchStart, touchEnd, selectedProduct, selectedImage]);

  const nextImage = () => {
    if (selectedProduct && selectedImage < selectedProduct.images.length - 1) {
      setSelectedImage(prev => prev + 1);
    }
  };

  const prevImage = () => {
    if (selectedImage > 0) {
      setSelectedImage(prev => prev - 1);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Track page visit
  useEffect(() => {
    const recordVisit = async () => {
      try {
        await fetch("/api/page-visits", {
          method: "POST",
        });
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.error("Failed to record page visit:", error);
      }
    };

    recordVisit();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredProducts(
        products.filter((p) => p.name.toLowerCase().includes(query))
      );
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      if (data.success) {
        const activeProducts = data.data.filter((p: Product) => p.isActive);
        setProducts(activeProducts);
        setFilteredProducts(activeProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalQuantity = (sizes: Size[]) => {
    return sizes.reduce((sum, size) => sum + size.quantity, 0);
  };

  const getAvailableSizes = (sizes: Size[]) => {
    return sizes.filter((size) => size.quantity > 0);
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImage(0);
    setSelectedSize(null);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const addToCart = () => {
    if (!selectedProduct || !selectedSize) return;

    const existingIndex = cart.findIndex(
      (item) => item.productId === selectedProduct._id && item.size === selectedSize
    );

    if (existingIndex !== -1) {
      setCart((prev) =>
        prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        productId: selectedProduct._id,
        productName: selectedProduct.name,
        size: selectedSize,
        quantity: 1,
        price: selectedProduct.discountPrice || selectedProduct.price,
        image: selectedProduct.images[0] || "",
      };
      setCart((prev) => [...prev, newItem]);
    }

    setSelectedSize(null);
  };

  const updateCartItemQuantity = (index: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const getWhatsAppLinkForProduct = (product: Product) => {
    const message = `Здравствуйте! Меня интересует товар: ${product.name}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const getWhatsAppLinkForCart = () => {
    if (cart.length === 0) return "#";

    let message = "Здравствуйте! Хочу заказать:\n\n";
    cart.forEach((item) => {
      message += `• ${item.productName} (${item.size}) — ${item.quantity} шт. × ${item.price.toLocaleString()} ₸\n`;
    });
    message += `\nИтого: ${getCartTotal().toLocaleString()} ₸`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* JSON-LD Structured Data for SEO */}
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <StoreJsonLd />
      <BreadcrumbJsonLd />
      {products.length > 0 && <ProductListJsonLd products={products} />}

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? "bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/50"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Image
            src="/Logo_minawear.svg"
            alt="Minawear"
            width={100}
            height={28}
            className="opacity-90"
          />
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-neutral-300 hover:text-white transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 rounded-full text-xs flex items-center justify-center font-medium">
                {getCartItemCount()}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-neutral-950" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <Image
              src="/Logo_minawear.svg"
              alt="Minawear"
              width={280}
              height={80}
              className="mx-auto"
              priority
            />
          </div>
          <p className="text-lg md:text-xl text-neutral-300 font-light tracking-wide mb-8">
            Изысканная женская одежда
          </p>
          <button
            onClick={scrollToCatalog}
            className="group flex flex-col items-center gap-2 mx-auto text-neutral-400 hover:text-rose-300 transition-colors"
          >
            <span className="text-sm tracking-widest uppercase">Каталог</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </section>

      {/* Catalog Section */}
      <section ref={catalogRef} className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider text-rose-100 mb-4">
              Коллекция
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-800 to-transparent mx-auto" />
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-full text-white placeholder-neutral-500 focus:outline-none focus:border-rose-800 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-2 border-rose-800 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-lg">
                {searchQuery ? "Ничего не найдено" : "Товары скоро появятся"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => {
                const totalQty = getTotalQuantity(product.sizes);
                const availableSizes = getAvailableSizes(product.sizes);

                return (
                  <div
                    key={product._id}
                    className="group cursor-pointer"
                    onClick={() => openProduct(product)}
                  >
                    <div className="relative aspect-square bg-neutral-900 rounded-lg overflow-hidden mb-3">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-neutral-700">
                          Нет фото
                        </div>
                      )}
                      {totalQty === 0 && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <span className="text-neutral-400 text-sm tracking-wider uppercase">
                            Нет в наличии
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-light text-neutral-200 group-hover:text-rose-200 transition-colors truncate">
                      {product.name}
                    </h3>
                    {product.discountPrice ? (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-rose-400 font-medium">
                          {product.discountPrice.toLocaleString()} ₸
                        </span>
                        <span className="text-neutral-600 line-through text-xs">
                          {product.price.toLocaleString()} ₸
                        </span>
                      </div>
                    ) : (
                      <p className="text-rose-400 font-medium mt-1">
                        {product.price.toLocaleString()} ₸
                      </p>
                    )}
                    {availableSizes.length > 0 && (
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {availableSizes.map((size) => (
                          <span
                            key={size.label}
                            className="px-2 py-0.5 bg-neutral-900 text-neutral-400 text-xs rounded"
                          >
                            {size.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
          <Image
            src="/Logo_minawear.svg"
            alt="Minawear"
            width={120}
            height={35}
            className="opacity-60"
          />
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} Все права защищены.
          </p>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 md:max-h-[90vh]">
              {/* Images */}
              <div className="relative overflow-hidden min-w-0">
                <div
                  className="relative aspect-square bg-neutral-900 touch-pan-y"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  {selectedProduct.images[selectedImage] ? (
                    <Image
                      src={selectedProduct.images[selectedImage]}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover select-none pointer-events-none"
                      draggable={false}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-700">
                      Нет фото
                    </div>
                  )}

                  {/* Navigation Arrows */}
                  {selectedProduct.images.length > 1 && (
                    <>
                      {selectedImage > 0 && (
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                      )}
                      {selectedImage < selectedProduct.images.length - 1 && (
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      )}
                    </>
                  )}

                  {/* Dots indicator */}
                  {selectedProduct.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProduct.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${selectedImage === index
                            ? "bg-rose-500"
                            : "bg-white/50 hover:bg-white/80"
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {selectedProduct.images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto bg-neutral-900/50">
                    {selectedProduct.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index
                          ? "border-rose-700"
                          : "border-transparent hover:border-neutral-700"
                          }`}
                      >
                        <Image
                          src={img}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 md:hidden bg-black/50 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="hidden md:flex justify-end mb-4">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-neutral-500 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
                  {selectedProduct.name}
                </h2>
                {selectedProduct.discountPrice ? (
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-2xl md:text-3xl text-rose-500 font-bold">
                      {selectedProduct.discountPrice.toLocaleString()} ₸
                    </p>
                    <p className="text-xl text-neutral-500 line-through">
                      {selectedProduct.price.toLocaleString()} ₸
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl md:text-3xl text-rose-400 font-medium mb-6">
                    {selectedProduct.price.toLocaleString()} ₸
                  </p>
                )}

                <div className="flex-1">
                  <p className="text-sm text-neutral-500 uppercase tracking-wider mb-3">
                    Выберите размер
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => size.quantity > 0 && setSelectedSize(size.label)}
                        disabled={size.quantity === 0}
                        className={`px-5 py-2.5 rounded-lg border transition-colors ${size.quantity > 0
                          ? selectedSize === size.label
                            ? "border-rose-600 bg-rose-600/20 text-white"
                            : "border-neutral-700 text-white hover:border-rose-800"
                          : "border-neutral-800 text-neutral-600 line-through cursor-not-allowed"
                          }`}
                      >
                        {size.label}
                        {size.quantity > 0 && (
                          <span className="ml-2 text-xs text-neutral-500">
                            ({size.quantity})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={addToCart}
                    disabled={!selectedSize}
                    className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${selectedSize
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                      }`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    В корзину
                  </button>

                  <a
                    href={getWhatsAppLinkForProduct(selectedProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Написать в WhatsApp
                  </a>
                </div>

                {/* Related Products */}
                {selectedProduct.relatedProducts && selectedProduct.relatedProducts.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-neutral-800">
                    <h3 className="text-lg font-medium text-white mb-4">Также может заинтересовать</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProduct.relatedProducts.map((related) => (
                        <button
                          key={related._id}
                          onClick={() => {
                            const fullProduct = products.find((p) => p._id === related._id);
                            if (fullProduct) {
                              setSelectedProduct(fullProduct);
                              setSelectedImage(0);
                              setSelectedSize(null);
                            }
                          }}
                          className="group bg-neutral-900 rounded-lg overflow-hidden text-left hover:bg-neutral-800 transition-colors"
                        >
                          <div className="relative aspect-square">
                            {related.images[0] ? (
                              <Image
                                src={related.images[0]}
                                alt={related.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full bg-neutral-800 text-neutral-600">
                                Нет фото
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <p className="text-sm text-white truncate">{related.name}</p>
                            {related.discountPrice ? (
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-rose-400 font-medium">
                                  {related.discountPrice.toLocaleString()} ₸
                                </span>
                                <span className="text-xs text-neutral-600 line-through">
                                  {related.price.toLocaleString()} ₸
                                </span>
                              </div>
                            ) : (
                              <p className="text-sm text-rose-400 mt-1">
                                {related.price.toLocaleString()} ₸
                              </p>
                            )}
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

      {/* Cart Modal */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-start justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="bg-neutral-950 border-l border-neutral-800 h-full w-full max-w-md overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 p-4 flex items-center justify-between">
              <h2 className="text-xl font-light">Корзина</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-neutral-500">
                <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                <p>Корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="p-4 space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-4 p-3 bg-neutral-900 rounded-lg"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-800">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-neutral-600 text-xs">
                            Нет фото
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">
                          {item.productName}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          Размер: {item.size}
                        </p>
                        <p className="text-rose-400 font-medium mt-1">
                          {item.price.toLocaleString()} ₸
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateCartItemQuantity(index, -1)}
                            className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItemQuantity(index, 1)}
                            className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
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
                    <span className="text-neutral-400">Итого:</span>
                    <span className="text-white font-medium">
                      {getCartTotal().toLocaleString()} ₸
                    </span>
                  </div>
                  <a
                    href={getWhatsAppLinkForCart()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Оформить через WhatsApp
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
