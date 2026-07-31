---
title: InventoryBatch (партия)
type: entity
tags: [model, inventory, fifo]
created: 2026-07-31
updated: 2026-07-31
sources: [models/InventoryBatch.ts, lib/fifo/, app/api/inventory-batches/route.ts]
---

# InventoryBatch (партия)

Единица FIFO-учёта: `product` + `sizeLabel`, ссылка на [[supply]] (nullable), `costPrice`, `initialQuantity`, `remainingQuantity`. Источник истины для себестоимости — см. [[fifo-inventory]].

## Жизненный цикл

- **Создаётся**: завозом ([[supply]], через `createBatches`) или возвратом ([[return]] создаёт новую партию с `supply: null`).
- **Списывается**: продажей ([[sale]], `allocateBatches` — старые партии первыми по `createdAt`) или списанием ([[write-off]] — пользователь выбирает партию явно).
- `supply: null` — партия от возврата или legacy-товар, заведённый до системы завозов.

## Индексы

- Составной `{ product: 1, sizeLabel: 1, createdAt: 1 }` — FIFO-выборка.
- Одиночные на `product`, `supply`, `remainingQuantity`.

## API

`GET /api/inventory-batches` — список партий (используется страницей списаний `app/admin/write-off`).

## Роль в финансах

Стоимость склада по себестоимости (Σ `remainingQuantity × costPrice`) — слагаемое капитала на дашборде ([[finance-model]]).
