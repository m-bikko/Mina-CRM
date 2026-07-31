---
title: Storefront (витрина)
type: entity
tags: [frontend, public, seo]
created: 2026-07-31
updated: 2026-07-31
sources: [app/page.tsx, components/JsonLd.tsx, models/PageVisit.ts, app/sitemap.ts, app/robots.ts]
---

# Storefront (витрина)

Публичный каталог бутика на `app/page.tsx` (client component). Без авторизации, без онлайн-оплаты.

## Возможности

- Каталог активных товаров [[product]] с поиском, галереей изображений (swipe на мобильных), выбором размера, скидочными ценами и блоком похожих товаров (`relatedProducts`).
- Клиентская корзина (state, без персистентности на сервере).
- **Оформление заказа — через WhatsApp**: корзина сериализуется в текст сообщения на номер магазина (константа `WHATSAPP_NUMBER` в `app/page.tsx`). Заказ затем вручную вносится админом как [[sale]].
- Счётчик посещений: `POST /api/page-visits` пишет документ PageVisit (модель `models/PageVisit.ts` — только timestamp).

## SEO

- JSON-LD разметка (`components/JsonLd.tsx`): Organization, Website, Store, ProductList, Breadcrumb.
- `app/sitemap.ts`, `app/robots.ts`.

## Связи

- Остатки по размерам берутся из `Product.sizes[].quantity` — денормализованного хранилища ([[fifo-inventory]]).
- Изображения — из [[cloudinary-integration]].
