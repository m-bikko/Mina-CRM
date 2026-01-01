"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Search, X, ChevronDown } from "lucide-react";

interface Size {
  label: string;
  quantity: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  sizes: Size[];
  isActive: boolean;
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts();
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
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
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
          <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-4">
            <span className="text-rose-200">AMINA</span>
          </h1>
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
                    <div className="relative aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden mb-3">
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
                    <p className="text-rose-400 font-medium mt-1">
                      {product.price.toLocaleString()} ₸
                    </p>
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
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} Amina. Все права защищены.
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
            className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              {/* Images */}
              <div className="relative">
                <div className="relative aspect-square bg-neutral-900">
                  {selectedProduct.images[selectedImage] ? (
                    <Image
                      src={selectedProduct.images[selectedImage]}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-700">
                      Нет фото
                    </div>
                  )}
                </div>
                {selectedProduct.images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto bg-neutral-900/50">
                    {selectedProduct.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index
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
                <p className="text-2xl md:text-3xl text-rose-400 font-medium mb-6">
                  {selectedProduct.price.toLocaleString()} ₸
                </p>

                <div className="flex-1">
                  <p className="text-sm text-neutral-500 uppercase tracking-wider mb-3">
                    Размеры
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map((size) => (
                      <span
                        key={size.label}
                        className={`px-5 py-2.5 rounded-lg border transition-colors ${
                          size.quantity > 0
                            ? "border-neutral-700 text-white hover:border-rose-800"
                            : "border-neutral-800 text-neutral-600 line-through"
                        }`}
                      >
                        {size.label}
                        {size.quantity > 0 && (
                          <span className="ml-2 text-xs text-neutral-500">
                            ({size.quantity})
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-800">
                  <p className="text-sm text-neutral-500">
                    Для заказа свяжитесь с нами
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
