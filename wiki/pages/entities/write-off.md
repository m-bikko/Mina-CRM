---
title: WriteOff (списание)
type: entity
tags: [model, inventory, finance]
created: 2026-07-31
updated: 2026-07-31
sources: [models/WriteOff.ts, app/api/write-offs/route.ts]
---

# WriteOff (списание)

Списание брака/недостачи с конкретной партии: пользователь на `app/admin/write-off` выбирает партию [[inventory-batch]] (через `GET /api/inventory-batches`), количество и обязательную причину.

## Логика (`POST /api/write-offs`, MongoDB transaction)

1. Декремент `remainingQuantity` выбранной партии и `Product.sizes[].quantity` ([[product]]).
2. Документ WriteOff со снапшотами: `productName`, `sizeLabel`, `costPrice`, `supplyDate` (дата создания партии).
3. **Баланс увеличивается** на `totalRefund = quantity × costPrice` — списание трактуется как компенсация себестоимости (возврат денег от поставщика за брак). Запись [[transaction]] — INCOME/WRITE_OFF.

Особенность модели: в отличие от классического write-off (чистый убыток), здесь себестоимость возвращается в баланс [[financial-stats]] — см. [[finance-model]]. Валидация — вручную в роуте (без Zod-схемы, в отличие от остальных операций).
