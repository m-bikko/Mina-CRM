"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { ProductListItem } from "@/components/ProductListItem";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { IProduct, ISize } from "@/models/Product";

type ViewMode = "grid" | "list";

type ProductWithId = IProduct & { _id: string };

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithId | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sizes: [] as ISize[],
    images: [] as string[],
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
        sizes: formData.sizes,
        images: formData.images,
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
      setFormData({
        name: product.name,
        price: product.price.toString(),
        sizes: product.sizes,
        images: product.images,
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
      sizes: [],
      images: [],
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

  const addSize = (): void => {
    if (!newSize.label) {
      alert("Укажите размер");
      return;
    }

    if (editingSizeIndex !== null) {
      setFormData((prev) => ({
        ...prev,
        sizes: prev.sizes.map((size, index) =>
          index === editingSizeIndex ? { ...newSize } : size
        ),
      }));
      setEditingSizeIndex(null);
    } else {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, { ...newSize }],
      }));
    }
    setNewSize({ label: "", quantity: 0 });
  };

  const editSize = (index: number): void => {
    const size = formData.sizes[index];
    setNewSize({ ...size });
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Каталог товаров</h1>
          <div className="flex gap-3">
            <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Карточки
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Список
              </button>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>Добавить товар</Button>
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
        ) : (
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
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <Image
                        src={url}
                        alt={`Product ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                      >
                        ×
                      </button>
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
                      className={`p-3 rounded-lg border ${
                        editingSizeIndex === sizeIndex
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
