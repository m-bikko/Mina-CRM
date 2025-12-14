import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Amina CRM</h1>
        <p className="text-gray-600 mb-8">CRM система для магазина женской одежды</p>
        <Link
          href="/admin/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Перейти к каталогу товаров
        </Link>
      </div>
    </div>
  );
}
