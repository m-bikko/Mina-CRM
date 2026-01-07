import React from "react";
import Image from "next/image";
import { IProduct } from "@/models/Product";

interface ProductListItemProps {
  product: IProduct & { _id: string };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProductListItem({
  product,
  onEdit,
  onDelete,
}: ProductListItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex gap-4">
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
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
        <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.price} ₸</p>
        <div className="flex gap-2 flex-wrap">
          {product.sizes.map((size, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
            >
              {size.label} ({size.quantity} шт)
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onEdit(product._id)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
        >
          Редактировать
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
