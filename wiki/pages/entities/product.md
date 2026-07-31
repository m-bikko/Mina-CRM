---
title: Product (товар)
type: entity
tags: [model, catalog]
created: 2026-07-31
updated: 2026-07-31
sources: [models/Product.ts, app/api/products/, lib/validations/product.ts]
---

# Product (товар)

Каталожная единица бутика: `name`, `price`, опциональная `discountPrice`, массив `images` (URL из [[cloudinary-integration]]), `isActive`, `sortOrder` (ручная сортировка, `POST /api/products/reorder`), `relatedProducts` (ссылки на другие товары для блока рекомендаций на витрине).

## Размеры и остатки

`sizes: [{ label, quantity }]` — остаток хранится **по размерам**. Это денормализованный быстрый остаток для UI и [[storefront]]; источник себестоимости — партии [[inventory-batch]]. Оба хранилища двигаются синхронно каждой операцией — см. инвариант в [[fifo-inventory]].

## API

- `GET/POST /api/products`, `PUT/DELETE /api/products/[id]` — CRUD с Zod-валидацией.
- `POST /api/products/reorder` — пересортировка каталога.
- GET populate'ит `relatedProducts` (id, name, price, images).

## Связи

- Позиции [[supply]], [[sale]], [[return]], [[write-off]] ссылаются на товар по ObjectId, но имя/размер снапшотятся ([[snapshot-pattern]]).
- Витрина [[storefront]] показывает только `isActive` товары с ненулевыми остатками.
