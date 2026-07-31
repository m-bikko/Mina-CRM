# Лог операций wiki

## [2026-07-31] docs | scaffold knowledge base

Создана база знаний с нуля по текущему состоянию кода (ветка main, коммит 8bb4328):

- Concepts: architecture, fifo-inventory, finance-model, snapshot-pattern, delivery-flow.
- Entities: product, sale, supply, inventory-batch, payment-type, return, write-off, transaction, financial-stats, storefront, cloudinary-integration.
- Зафиксированы ключевые особенности: двойной учёт остатков, налог не вычитается из баланса, write-off возвращает себестоимость в баланс, доставка двигает баланс без Transaction и без MongoDB session.
