"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { ProductListItem } from "@/components/ProductListItem";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { IProduct, ISize } from "@/models/Product";

type ViewMode = "grid" | "list" | "sort";

type ProductWithId = IProduct & { _id: string };

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithId | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    sizes: [] as ISize[],
    images: [] as string[],
    relatedProducts: [] as string[],
  });

  const [newSize, setNewSize] = useState({
    label: "",
    quantity: 0,
  });

  const [editingSizeIndex, setEditingSizeIndex] = useState<number | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      alert("Ошибка при загрузке товаров");
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        sizes: formData.sizes,
        images: formData.images,
        relatedProducts: formData.relatedProducts,
        isActive: true,
      };

      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        await fetchProducts();
        handleCloseModal();
        alert(
          editingProduct
            ? "Товар успешно обновлен"
            : "Товар успешно добавлен"
        );
      } else {
        alert(data.error || "Ошибка при сохранении товара");
      }
    } catch (error) {
      alert("Ошибка при сохранении товара");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        await fetchProducts();
        alert("Товар успешно удален");
      } else {
        alert(data.error || "Ошибка при удалении товара");
      }
    } catch (error) {
      alert("Ошибка при удалении товара");
    }
  };

  const handleEdit = (id: string): void => {
    const product = products.find((p) => p._id === id);
    if (product) {
      setEditingProduct(product);
      const relatedIds: string[] = (product.relatedProducts || []).map((p) => {
        if (typeof p === 'string') return p;
        if (typeof p === 'object' && p !== null) {
          const obj = p as unknown as { _id?: string };
          if (obj._id) return String(obj._id);
        }
        return String(p);
      });
      setFormData({
        name: product.name,
        price: product.price.toString(),
        discountPrice: product.discountPrice ? product.discountPrice.toString() : "",
        sizes: product.sizes.map((s) => ({ label: s.label, quantity: s.quantity })),
        images: [...product.images],
        relatedProducts: relatedIds,
      });
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      discountPrice: "",
      sizes: [],
      images: [],
      relatedProducts: [],
    });
    setNewSize({ label: "", quantity: 0 });
    setEditingSizeIndex(null);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, data.url],
        }));
      } else {
        alert(data.error || "Ошибка при загрузке изображения");
      }
    } catch (error) {
      alert("Ошибка при загрузке изображения");
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const moveImageUp = (index: number): void => {
    if (index === 0) return;
    setFormData((prev) => {
      const newImages = [...prev.images];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      return { ...prev, images: newImages };
    });
  };

  const moveImageDown = (index: number): void => {
    if (index === formData.images.length - 1) return;
    setFormData((prev) => {
      const newImages = [...prev.images];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      return { ...prev, images: newImages };
    });
  };

  const addSize = (): void => {
    if (!newSize.label) {
      alert("Укажите размер");
      return;
    }

    if (editingSizeIndex !== null) {
      // При редактировании сохраняем существующее количество
      setFormData((prev) => ({
        ...prev,
        sizes: prev.sizes.map((size, index) =>
          index === editingSizeIndex ? { label: newSize.label, quantity: size.quantity } : size
        ),
      }));
      setEditingSizeIndex(null);
    } else {
      // Новый размер начинается с количества 0
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, { label: newSize.label, quantity: 0 }],
      }));
    }
    setNewSize({ label: "", quantity: 0 });
  };

  const editSize = (index: number): void => {
    const size = formData.sizes[index];
    setNewSize({ label: size.label, quantity: 0 });
    setEditingSizeIndex(index);
  };

  const cancelEditSize = (): void => {
    setNewSize({ label: "", quantity: 0 });
    setEditingSizeIndex(null);
  };

  const removeSize = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
    if (editingSizeIndex === index) {
      cancelEditSize();
    }
  };

  // Drag and Drop handlers for sorting
  const handleDragStart = (index: number): void => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number): void => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newProducts = [...products];
    const draggedItem = newProducts[draggedIndex];
    newProducts.splice(draggedIndex, 1);
    newProducts.splice(index, 0, draggedItem);
    setProducts(newProducts);
    setDraggedIndex(index);
  };

  const handleDragEnd = (): void => {
    setDraggedIndex(null);
  };

  const moveProductUp = (index: number): void => {
    if (index === 0) return;
    const newProducts = [...products];
    [newProducts[index - 1], newProducts[index]] = [newProducts[index], newProducts[index - 1]];
    setProducts(newProducts);
  };

  const moveProductDown = (index: number): void => {
    if (index === products.length - 1) return;
    const newProducts = [...products];
    [newProducts[index], newProducts[index + 1]] = [newProducts[index + 1], newProducts[index]];
    setProducts(newProducts);
  };

  const saveProductOrder = async (): Promise<void> => {
    setSavingOrder(true);
    try {
      const productIds = products.map((p) => p._id);
      const response = await fetch("/api/products/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Порядок товаров сохранен");
      } else {
        alert(data.error || "Ошибка при сохранении порядка");
      }
    } catch (error) {
      alert("Ошибка при сохранении порядка");
    } finally {
      setSavingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Каталог товаров</h1>
          <div className="flex gap-3">
            <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-md transition-colors ${viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                Карточки
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-md transition-colors ${viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                Список
              </button>
              <button
                onClick={() => setViewMode("sort")}
                className={`px-4 py-2 rounded-md transition-colors ${viewMode === "sort"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                Сортировка
              </button>
            </div>
            {viewMode === "sort" && (
              <Button onClick={saveProductOrder} disabled={savingOrder}>
                {savingOrder ? "Сохранение..." : "Сохранить порядок"}
              </Button>
            )}
            {viewMode !== "sort" && (
              <Button onClick={() => setIsModalOpen(true)}>Добавить товар</Button>
            )}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">Товары отсутствуют</p>
            <Button onClick={() => setIsModalOpen(true)} className="mt-4">
              Добавить первый товар
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : viewMode === "list" ? (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductListItem
                key={product._id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 mb-4">
              Перетащите товары для изменения порядка отображения на сайте. Не забудьте сохранить после изменений.
            </p>
            {products.map((product, index) => (
              <div
                key={product._id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-4 bg-white rounded-lg shadow-sm p-4 cursor-move border-2 transition-colors ${draggedIndex === index ? "border-blue-500 bg-blue-50" : "border-transparent"
                  }`}
              >
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveProductUp(index)}
                    disabled={index === 0}
                    className={`p-1 rounded ${index === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveProductDown(index)}
                    disabled={index === products.length - 1}
                    className={`p-1 rounded ${index === products.length - 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <span className="text-gray-400 font-mono text-sm w-8">{index + 1}</span>
                <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                      Нет фото
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.price.toLocaleString()} ₸</p>
                </div>
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 my-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingProduct ? "Редактировать товар" : "Добавить товар"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Название товара"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <Input
                label="Цена (₸)"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />

              <Input
                label="Цена со скидкой (₸) - Опционально"
                type="number"
                step="0.01"
                value={formData.discountPrice}
                onChange={(e) =>
                  setFormData({ ...formData, discountPrice: e.target.value })
                }
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Изображения
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploadingImage && (
                  <p className="text-sm text-gray-500 mt-2">Загрузка...</p>
                )}
                <div className="mt-3 flex flex-wrap gap-3">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative">
                      <div className="relative w-24 h-24">
                        <Image
                          src={url}
                          alt={`Product ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                            Главное
                          </span>
                        )}
                      </div>
                      <div className="absolute -top-2 -right-2 flex gap-1">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                        >
                          ×
                        </button>
                      </div>
                      <div className="flex justify-center gap-1 mt-1">
                        <button
                          type="button"
                          onClick={() => moveImageUp(index)}
                          disabled={index === 0}
                          className={`px-2 py-1 text-xs rounded ${index === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImageDown(index)}
                          disabled={index === formData.images.length - 1}
                          className={`px-2 py-1 text-xs rounded ${index === formData.images.length - 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                          →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Размеры
                </label>
                <div className="space-y-3">
                  {formData.sizes.map((size, sizeIndex) => (
                    <div
                      key={sizeIndex}
                      className={`p-3 rounded-lg border ${editingSizeIndex === sizeIndex
                        ? "bg-blue-50 border-blue-300"
                        : "bg-gray-50 border-gray-200"
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{size.label}</span>
                          <span className="ml-2 text-sm text-gray-600">
                            (Количество: {size.quantity})
                          </span>
                          {editingSizeIndex === sizeIndex && (
                            <span className="ml-2 text-sm text-blue-600 font-medium">
                              Редактируется
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => editSize(sizeIndex)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            Изменить
                          </button>
                          <button
                            type="button"
                            onClick={() => removeSize(sizeIndex)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border border-dashed border-gray-300 rounded-lg p-4">
                    <Input
                      label="Размер (например, S, M, L)"
                      value={newSize.label}
                      onChange={(e) =>
                        setNewSize({ ...newSize, label: e.target.value })
                      }
                    />

                    <div className="mt-3 flex gap-2">
                      <Button
                        type="button"
                        variant={editingSizeIndex !== null ? "primary" : "secondary"}
                        onClick={addSize}
                        className="flex-1"
                      >
                        {editingSizeIndex !== null
                          ? "Сохранить изменения"
                          : "Добавить размер"}
                      </Button>
                      {editingSizeIndex !== null && (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={cancelEditSize}
                          className="flex-1"
                        >
                          Отмена
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Products */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Также может заинтересовать
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Выберите товары, которые будут показаны в карточке этого товара
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {products
                    .filter((p) => p._id !== editingProduct?._id)
                    .map((product) => (
                      <label
                        key={product._id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.relatedProducts.includes(product._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                relatedProducts: [...prev.relatedProducts, product._id],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                relatedProducts: prev.relatedProducts.filter(
                                  (id) => id !== product._id
                                ),
                              }));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          {product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                              —
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.price.toLocaleString()} ₸
                          </p>
                        </div>
                      </label>
                    ))}
                </div>
                {formData.relatedProducts.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Выбрано: {formData.relatedProducts.length}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading
                    ? "Сохранение..."
                    : editingProduct
                      ? "Сохранить изменения"
                      : "Добавить товар"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCloseModal}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
