---
title: Supply (завоз)
type: entity
tags: [model, inventory, finance]
created: 2026-07-31
updated: 2026-07-31
sources: [models/Supply.ts, app/api/supplies/, lib/validations/supply.ts]
---

# Supply (завоз)

Приход товара на склад: `date`, позиции `{ product, productName, sizeLabel, quantity, costPrice }`, `totalCost`.

## Создание (`POST /api/supplies`)

Атомарно в MongoDB transaction:

1. Инкремент `Product.sizes[].quantity` по каждой позиции ([[product]]).
2. Создание документа Supply.
3. `createBatches` — по партии [[inventory-batch]] на позицию с закупочной `costPrice` ([[fifo-inventory]]).
4. Баланс [[financial-stats]] `−= totalCost`, запись [[transaction]] (EXPENSE/SUPPLY).

Имена товаров снапшотятся ([[snapshot-pattern]]). `GET /api/supplies`, `GET /api/supplies/[id]` — чтение; редактирования/удаления завозов нет.

## Связи

- Партии [[inventory-batch]] ссылаются на завоз (`supply`); `supply: null` — legacy-партии или партии от возвратов ([[return]]).
- Списание [[write-off]] показывает дату завоза партии (`supplyDate`).
