---
title: PaymentType (тип оплаты)
type: entity
tags: [model, finance, reference]
created: 2026-07-31
updated: 2026-07-31
sources: [models/PaymentType.ts, app/api/payment-types/route.ts, lib/validations/paymentType.ts]
---

# PaymentType (тип оплаты)

Справочник способов оплаты (наличные, Kaspi и т.п.): `name`, `taxRate` (0–100%), `bankCommissionRate` (0–100%), `isActive`. Админ-страница — `app/admin/payment-types`.

## Роль

- При продаже ([[sale]]) и почтовой доставке ([[delivery-flow]]) ставки определяют `taxAmount` и `bankCommissionAmount`.
- Значения **снапшотятся** в документ операции ([[snapshot-pattern]]): правка ставок влияет только на будущие продажи, история неизменна.
- Комиссия банка вычитается из баланса сразу; налог копится как «налог к уплате» ([[finance-model]]).

## API

`GET/POST /api/payment-types` — список и создание с Zod-валидацией.
