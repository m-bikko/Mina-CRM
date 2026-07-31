---
title: Return (возврат)
type: entity
tags: [model, finance, inventory]
created: 2026-07-31
updated: 2026-07-31
sources: [models/Return.ts, app/api/returns/route.ts, lib/validations/return.ts]
---

# Return (возврат)

Возврат товара по существующей продаже [[sale]]. Ограничение: **один возврат на продажу** (проверка на существующий Return по `sale`). Можно вернуть часть позиций, но не больше проданного количества.

## Финансовый расчёт

Ставки берутся из **снапшотов исходной продажи** ([[snapshot-pattern]]), не из текущего [[payment-type]]:

- `taxAmountReversed = totalAmount × taxRateSnapshot` — уменьшает «налог к уплате»;
- `bankCommissionLost = totalAmount × bankCommissionRateSnapshot` — комиссия банка потеряна безвозвратно;
- `refundAmount = totalAmount − bankCommissionLost` — на столько уменьшается баланс [[financial-stats]].

Пишется [[transaction]] (EXPENSE/RETURN). Всё в MongoDB transaction.

## Склад

- `Product.sizes[].quantity` увеличивается ([[product]]).
- Создаётся **новая** партия [[inventory-batch]] с `supply: null` и себестоимостью из продажи — исходные партии не восстанавливаются ([[fifo-inventory]]). Возвращённый товар встаёт в конец FIFO-очереди (новый `createdAt`).

## Дашборд

Убыток от возврата = `totalAmount − totalCostPrice − taxAmountReversed`, вычитается из общей прибыли ([[finance-model]]). Админ-страница — `app/admin/returns`.
