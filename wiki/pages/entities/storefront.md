---
title: Storefront (витрина)
type: entity
tags: [frontend, public, seo]
created: 2026-07-31
updated: 2026-10-09
sources: [app/page.tsx, components/JsonLd.tsx, models/PageVisit.ts, app/sitemap.ts, app/robots.ts]
---

# Storefront (витрина)

Публичный каталог бутика на `app/page.tsx` (client component). Без авторизации, без онлайн-оплаты.

## Возможности

- Hero-секция с фоновым видео `/hero-vid.mp4`: всегда стартует muted (единственный вариант автоплея, который браузеры не останавливают). Звук управляется тремя условиями: жест пользователя уже был (pointerup/touchend/keydown), скролл в hero-зоне (`scrollY < 30%` высоты экрана) и карточка товара закрыта. Все условия выполнены → fade-in ~3 сек; любое нарушено → быстрый fade-out ~0.5 сек и mute. Не пытаться включать звук программно до жеста: Chrome ставит видео на паузу при unmute без user gesture (есть pause-guard с откатом). Скролл колёсиком жестом не считается — на десктопе звук включится только после клика/клавиши. На iOS fade не работает — `video.volume` игнорируется, звук включается/выключается сразу.
- Каталог активных товаров [[product]] с поиском, галереей изображений (swipe на мобильных), выбором размера, скидочными ценами и блоком похожих товаров (`relatedProducts`).
- Покупателю не показывается количество остатков: размеры с `quantity > 0` доступны для выбора, без цифр; закончившиеся размеры зачёркнуты, товар без остатков помечен «Нет в наличии». Точные остатки видны только в админке (`components/ProductCard.tsx`, `components/ProductListItem.tsx`). Публичный `GET /api/products` при этом по-прежнему отдаёт `sizes[].quantity`.
- Клиентская корзина (state, без персистентности на сервере).
- **Оформление заказа — через WhatsApp**: корзина сериализуется в текст сообщения на номер магазина (константа `WHATSAPP_NUMBER` в `app/page.tsx`). Заказ затем вручную вносится админом как [[sale]].
- Счётчик посещений: `POST /api/page-visits` пишет документ PageVisit (модель `models/PageVisit.ts` — только timestamp).

## SEO

- JSON-LD разметка (`components/JsonLd.tsx`): Organization, Website, Store, ProductList, Breadcrumb.
- `app/sitemap.ts`, `app/robots.ts`.

## Связи

- Остатки по размерам берутся из `Product.sizes[].quantity` — денормализованного хранилища ([[fifo-inventory]]).
- Изображения — из [[cloudinary-integration]].
