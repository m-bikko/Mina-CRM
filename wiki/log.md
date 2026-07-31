# Лог операций wiki

## [2026-07-31] feat | звук hero-видео только в верхней зоне

Звук витринного видео теперь играет только у верха страницы (< 30% высоты экрана) и при закрытой карточке товара; при уходе из зоны — быстрый fade-out, при возврате — fade-in. Обновлена страница storefront.

## [2026-07-31] feat | логин для админ-части

Добавлена аутентификация: env-креды владельца, JWT-кука на 30 дней (jose), middleware.ts закрывает /admin/* и все API кроме публичных эндпоинтов витрины. Новая страница [[auth]], обновлены architecture и index.

## [2026-07-31] feat | звук у hero-видео витрины

Hero-видео на витрине теперь пытается автозапускаться со звуком с fallback'ом на unmute при первом взаимодействии. Обновлена страница storefront.

## [2026-07-31] docs | scaffold knowledge base

Создана база знаний с нуля по текущему состоянию кода (ветка main, коммит 8bb4328):

- Concepts: architecture, fifo-inventory, finance-model, snapshot-pattern, delivery-flow.
- Entities: product, sale, supply, inventory-batch, payment-type, return, write-off, transaction, financial-stats, storefront, cloudinary-integration.
- Зафиксированы ключевые особенности: двойной учёт остатков, налог не вычитается из баланса, write-off возвращает себестоимость в баланс, доставка двигает баланс без Transaction и без MongoDB session.
