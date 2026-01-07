import React from "react";
import Image from "next/image";
import { IProduct } from "@/models/Product";

interface ProductCardProps {
  product: IProduct & { _id: string };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64 bg-gray-200">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Нет изображения
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{product.name}</h3>
        <p className="text-gray-600 mb-3">{product.price} ₸</p>
        <div className="flex gap-2 mb-3 flex-wrap">
          {product.sizes.map((size, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
            >
              {size.label} ({size.quantity} шт)
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product._id)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Редактировать
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
