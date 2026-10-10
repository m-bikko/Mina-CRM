---
title: SEO и мультиязычность витрины
type: concept
tags: [seo, i18n, kazakhstan, structured-data]
created: 2026-10-10
updated: 2026-10-10
sources: [lib/site.ts, lib/i18n.ts, lib/catalog.ts, lib/seo.ts, components/storefront/, app/sitemap.ts, app/robots.ts, app/llms.txt/route.ts]
---

# SEO и мультиязычность витрины

SEO витрины [[storefront]] заточено под рынок Казахстана: Google и Yandex, плюс превью ссылок в WhatsApp, Telegram и Instagram. Сайт трёхъязычный: русский — основной язык, есть казахская и английская версии.

## Канонический домен

- Все абсолютные URL (canonical, sitemap, hreflang, OG, JSON-LD) строятся из `SITE_URL` в `lib/site.ts`. Значение берётся из `NEXT_PUBLIC_CANONICAL_URL`, по умолчанию `https://mina-wear.vercel.app`.
- **Gotcha.** Раньше использовалась `NEXT_PUBLIC_SITE_URL` с фолбэком `mina-crm.vercel.app`. Это чужое приложение, и canonical всей витрины указывал на него. Старая переменная больше не читается. При переезде на свой домен (например `minawear.kz`) задать `NEXT_PUBLIC_CANONICAL_URL` и настроить 301 с vercel.app.

## Структура URL и локали

- Русская версия лежит в корне без префикса: `/`, `/category/<slug>`, `/product/<slug>-<id>`. Казахская — под `/kk/...`, английская — под `/en/...`.
- hreflang: `ru-KZ`, `kk-KZ`, `en` и `x-default` (указывает на русскую версию). Ссылки есть и в `<head>`, и в sitemap, у каждой записи полный набор, включая саму себя.
- `html lang` в корневом layout всегда `ru`, а язык страницы задаётся атрибутом `lang` на обёртке. Google определяет язык по видимому контенту и `lang` не использует.
- **Product slug.** Транслитерация названия плюс Mongo id. Страница находит товар по id, а при неверном slug делает 308-редирект на канонический адрес. Поэтому старые ссылки вида `/product/<id>` тоже работают.
- Страницы товаров и категорий собираются по первому запросу и кешируются (ISR, `revalidate = 300`, `generateStaticParams → []`). Главные страницы — ISR с пререндером при сборке.

## Данные и переводы

- **Серверный каталог.** `lib/catalog.ts` → `getCatalog()`. Это `cache()`-обёртка над `Product.find({isActive:true})`. Наружу отдаётся только `inStock` по размерам, точных остатков нет.
- **Названия товаров на kk/en.** `localizeProductName` разбирает русское название на цвет, модификаторы и тип и собирает его по словарю. Если в названии есть незнакомое слово, остаётся русское название, перевод не выдумывается. Новые типы товаров добавляются в `NOUNS`/`MODIFIERS`/`COLORS` в `lib/i18n.ts`.
- **Латиница в названиях.** `normalizeRuName` заменяет латинские буквы-двойники на кириллические: в CRM была «Cиняя американка» с латинской C, которая ломала поиск.
- **Категории.** Выводятся из названия по регуляркам (`CATEGORIES` в `lib/i18n.ts`). Пустая категория получает `noindex`.
- **Тексты.** Описания товаров и категорий собираются из реальных фактов: цена, старая цена, выгода, размеры, цвета. Без маркетинговых обещаний.

## Структурированные данные

- **Главная:** `OnlineStore` (не `ClothingStore`, потому что у онлайн-магазина нет физического адреса), `WebSite` + `SearchAction` (`/?search=` работает на клиенте), `ItemList`, `FAQPage`.
- **Товар:** `Product` + `Offer` в KZT. При скидке `Offer` дополняется `StrikethroughPrice` и `BreadcrumbList`.
- **Категория:** `ItemList` + `BreadcrumbList`.

## Превью и иконки

- `public/og/og-{ru,kk,en}.jpg` (1200×630) — превью витрины. У товара в превью его фото через Cloudinary `c_pad,b_blurred`.
- Иконки: `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` (монограмма «M»), а для manifest — `public/icon-192.png` и `icon-512.png`.
- **Потоковые метаданные Next 15.** Обычным браузерам метаданные приходят потоком позже. Googlebot, YandexBot, TelegramBot, WhatsApp и facebookexternalhit получают их сразу в `<head>` (проверено 2026-10-10).

## AI-поиск

`/llms.txt` — краткая карта магазина: категории, товары с ценами и размерами, контакты, условия заказа.

## Ручные шаги владельца (вне кода)

- Google Search Console и Yandex Webmaster: отправить `sitemap.xml`, в Yandex выставить регион «Казахстан».
- Свой домен `.kz` — сильный гео-сигнал (Instagram уже `@minawear.kz`).
- Вычитать казахские тексты носителем языка.

## Связи

- [[storefront]] — витрина и её UI.
- [[product]] — модель товара. Поля описания нет, поэтому тексты генерируются из фактов.
