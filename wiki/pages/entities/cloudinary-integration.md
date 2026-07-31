---
title: Cloudinary (изображения)
type: entity
tags: [integration, images]
created: 2026-07-31
updated: 2026-07-31
sources: [lib/cloudinary.ts, app/api/upload/route.ts]
---

# Cloudinary (изображения)

Хранилище изображений товаров. Обёртка — `lib/cloudinary.ts`: `uploadImage` (загрузка в папку `amina-crm/products`, возвращает `secure_url`) и `deleteImage`.

- Загрузка идёт через `POST /api/upload`; в [[product]] хранятся только итоговые URL (`images: string[]`).
- Креды — env-переменные `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`.
- URL напрямую используются витриной [[storefront]] и админкой.
