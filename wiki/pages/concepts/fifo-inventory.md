---
title: FIFO-учёт склада
type: concept
tags: [fifo, inventory, cost-price]
created: 2026-07-31
updated: 2026-07-31
sources: [lib/fifo/, models/InventoryBatch.ts]
---

# FIFO-учёт склада

Себестоимость проданного товара считается методом FIFO: продажа списывает товар из самых старых партий. Ядро — три функции в `lib/fifo/`:

- `createBatches` — при завозе ([[supply]]) создаёт по одной партии [[inventory-batch]] на каждую позицию (товар + размер), с `costPrice` и `remainingQuantity = initialQuantity`.
- `allocateBatches` — при продаже ([[sale]]) выбирает партии `remainingQuantity > 0` по `(product, sizeLabel)`, сортирует `createdAt: 1` (старые первыми), жадно распределяет количество и декрементирует `remainingQuantity` внутри MongoDB session. Бросает ошибку, если суммарного остатка партий не хватает. Возвращает массив `batchAllocations` (партия, количество, costPrice).
- `calculateTotalCost` — сумма `quantity × costPrice` по allocations → `totalCostPrice` позиции продажи.

Для выборки есть составной индекс `{ product: 1, sizeLabel: 1, createdAt: 1 }` в `models/InventoryBatch.ts`.

## Двойной учёт остатков (критичный инвариант)

Остаток хранится в двух местах и должен меняться синхронно:

| Хранилище | Назначение |
|---|---|
| `Product.sizes[].quantity` | быстрый остаток для UI и витрины |
| `InventoryBatch.remainingQuantity` | источник себестоимости и FIFO |

Операции и их влияние на оба хранилища:

- **Завоз** ([[supply]]): `+quantity` в Product, новая партия.
- **Продажа** ([[sale]]): `-quantity` в Product, `allocateBatches` декрементирует партии. Продажа сначала проверяет остаток в Product, затем FIFO проверяет остаток в партиях — расхождение двух хранилищ даст ошибку «Недостаточно товара».
- **Возврат** ([[return]]): `+quantity` в Product, создаётся **новая** партия с `supply: null` и себестоимостью из продажи (возврат не восстанавливает исходные партии).
- **Списание** ([[write-off]]): пользователь выбирает конкретную партию; `-quantity` и в партии, и в Product.

`supply: null` у партии также означает legacy-товар, заведённый до появления системы завозов.

## См. также

- [[finance-model]] — как `totalCostPrice` участвует в прибыли и капитале
- [[architecture]] — общая картина
