---
title: Sale (продажа)
type: entity
tags: [model, finance, fifo]
created: 2026-07-31
updated: 2026-07-31
sources: [models/Sale.ts, app/api/sales/, lib/validations/sale.ts]
---

# Sale (продажа)

Транзакция продажи: `date`, `customerPhone` (идентификатор клиента — учётных записей нет), тип оплаты со снапшотами ставок, позиции, агрегаты сумм и блок полей доставки ([[delivery-flow]]).

## Позиции (`items`)

Каждая позиция: товар + размер + количество + `priceAtSale`, плюс:

- `batchAllocations: [{ batch, quantity, costPrice }]` — из каких партий [[inventory-batch]] списано (результат `allocateBatches`, см. [[fifo-inventory]]);
- `totalCostPrice` — себестоимость позиции по FIFO.

## Создание (`POST /api/sales`)

Атомарно в MongoDB transaction:

1. Проверка остатков в [[product]] по размерам.
2. `allocateBatches` для каждой позиции → списание из партий + себестоимость.
3. Декремент `Product.sizes[].quantity`.
4. Расчёт `taxAmount` и `bankCommissionAmount` по ставкам [[payment-type]] (снапшотятся, см. [[snapshot-pattern]]).
5. Создание Sale, баланс [[financial-stats]] `+= totalAmount − bankCommissionAmount`, запись [[transaction]] (INCOME/SALE).

Налог из баланса не вычитается — копится как «налог к уплате» ([[finance-model]]).

## Прочие эндпоинты

- `GET /api/sales` — список (сортировка по дате).
- `GET /api/sales/[id]` — одна продажа.
- `PUT/DELETE /api/sales/[id]/delivery` — прикрепление/снятие доставки ([[delivery-flow]]).
- `POST /api/sales/clear` — очистка (dev-инструмент).

## Связи

- [[return]] — возврат ссылается на продажу (не более одного возврата на продажу).
- Продажа создаётся из админ-панели; заказы с витрины [[storefront]] приходят через WhatsApp и вносятся вручную.
