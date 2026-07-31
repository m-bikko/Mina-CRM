---
title: Snapshot-паттерн
type: concept
tags: [pattern, data-integrity]
created: 2026-07-31
updated: 2026-07-31
sources: [models/Sale.ts, models/Return.ts, models/Supply.ts, models/WriteOff.ts]
---

# Snapshot-паттерн

Исторические документы копируют значения справочников в момент операции, чтобы правки справочников не искажали прошлое.

## Что снапшотится

- **[[sale]]**: `paymentTypeName`, `taxRateSnapshot`, `bankCommissionRateSnapshot` (из [[payment-type]]), `priceAtSale`, `productName`, а также дублирующий набор `delivery*Snapshot`-полей для доставки ([[delivery-flow]]).
- **[[return]]**: пересчитывает налог/комиссию по снапшотам из исходной продажи, а не по текущим ставкам; хранит `paymentTypeName`, `priceAtSale`, `costPrice`.
- **[[supply]] / [[write-off]] / позиции продаж**: `productName`, `sizeLabel`, `costPrice` — переименование или удаление товара не ломает историю.
- **`batchAllocations`** в позициях продажи фиксируют, из каких партий и по какой себестоимости списан товар ([[fifo-inventory]]).

## Следствия

- Изменение ставок в [[payment-type]] действует только на будущие операции.
- Отчёты дашборда ([[finance-model]]) считаются агрегациями по снапшот-полям, поэтому исторически точны.
- ObjectId-ссылки (`product`, `paymentType`) при этом сохраняются — для навигации, но не для расчётов.
