---
title: Архитектура
type: concept
tags: [architecture, nextjs, mongodb]
created: 2026-07-31
updated: 2026-07-31
sources: [app/, lib/, models/, package.json]
---

# Архитектура

Mina CRM (Amina) — монолит на Next.js 15 (App Router) + React 19 + TypeScript. Одно приложение обслуживает два контура:

1. **Публичная витрина** — [[storefront]] на `app/page.tsx`: каталог товаров, корзина, оформление заказа через WhatsApp. Без авторизации и онлайн-оплаты.
2. **Админ-панель** — `app/admin/*`: dashboard, товары, завозы, продажи, доставка, возвраты, списания, типы оплат, финансы.

## Слои

- `app/api/**/route.ts` — REST API (route handlers). Формат ответа единый: `{ success: boolean; data?: T; error?: string }`.
- `models/` — Mongoose-схемы: [[product]], [[sale]], [[supply]], [[inventory-batch]], [[payment-type]], [[transaction]], [[financial-stats]], [[return]], [[write-off]], PageVisit (счётчик визитов витрины).
- `lib/fifo/` — ядро складской логики, см. [[fifo-inventory]].
- `lib/validations/` — Zod-схемы для всех входов API.
- `lib/db/mongodb.ts` — подключение с кэшем в `global` (переживает hot-reload); dev/prod базы разделены через `MONGODB_URI_DEV` / `MONGODB_URI`.
- `lib/cloudinary.ts` — загрузка/удаление изображений товаров, см. [[cloudinary-integration]].
- `components/` — свои компоненты + shadcn/ui-примитивы в `components/ui/`.

## Ключевые принципы

- **MongoDB transactions** для всех мутирующих денежных операций (продажа, завоз, возврат, списание, корректировка): `mongoose.startSession()` → `startTransaction()` → commit/abort. Исключение — обновление доставки (`app/api/sales/[id]/delivery/route.ts`) работает без session, см. [[delivery-flow]].
- **Snapshot-паттерн** — имена и ставки типа оплаты копируются в документ продажи, см. [[snapshot-pattern]].
- **Двойной учёт остатков**: денормализованный `Product.sizes[].quantity` (для UI/витрины) и партии [[inventory-batch]] (источник себестоимости). Каждая операция обязана двигать оба, см. [[fifo-inventory]].
- **Единый денежный поток**: любая операция с деньгами пишет [[transaction]] и инкрементирует баланс в [[financial-stats]], см. [[finance-model]].

## Служебные эндпоинты

- `POST /api/clear-db`, `POST /api/sales/clear` — очистка данных (опасные, dev-инструменты).
- `GET /api/dashboard` — агрегаты для дашборда: баланс, капитал, налог к уплате, прибыль, график продаж (см. [[finance-model]]).
- `POST /api/page-visits` — счётчик посещений витрины.
- `POST /api/upload` — загрузка изображений в Cloudinary.

## Стек

Next.js ^15.1, React ^19, Mongoose ^8.9, Zod ^3.23, Tailwind CSS 3.4, shadcn/ui (Radix), lucide-react, recharts (графики дашборда), Cloudinary.
