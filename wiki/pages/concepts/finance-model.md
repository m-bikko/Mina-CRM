---
title: Финансовая модель
type: concept
tags: [finance, balance, tax, commission, profit]
created: 2026-07-31
updated: 2026-07-31
sources: [app/api/sales/route.ts, app/api/supplies/route.ts, app/api/returns/route.ts, app/api/write-offs/route.ts, app/api/dashboard/route.ts, app/api/finance/adjustment/route.ts]
---

# Финансовая модель

Единственный агрегат состояния — `currentBalance` в [[financial-stats]] (singleton-документ). История — лента [[transaction]]. Валюта — тенге (₸).

## Ключевое правило: налог не вычитается из баланса

При продаже в баланс попадает `totalAmount − bankCommission` — комиссия банка теряется сразу, а налог только **накапливается** (поля `taxAmount` в [[sale]]) и показывается на дашборде как «налог к уплате» (`taxPayable`). Фактическая уплата налога — вручную через корректировку.

## Влияние операций на баланс

| Операция | Баланс | Transaction |
|---|---|---|
| Продажа ([[sale]]) | `+ totalAmount − bankCommissionAmount` | INCOME / SALE |
| Завоз ([[supply]]) | `− totalCost` (сумма закупа) | EXPENSE / SUPPLY |
| Возврат ([[return]]) | `− refundAmount`, где `refundAmount = totalAmount − bankCommissionLost` (комиссия банка не возвращается клиенту, но и нам её банк не вернул — она потеряна) | EXPENSE / RETURN |
| Списание ([[write-off]]) | `+ totalRefund` (себестоимость возвращается в баланс — модель компенсации от поставщика) | INCOME / WRITE_OFF |
| Почтовая доставка ([[delivery-flow]]) | `+ deliveryCharge − bankCommission − postalCost` | **не пишется** — только пересчёт баланса |
| Ручная корректировка (`/api/finance/adjustment`) | `± amount` | INCOME или EXPENSE / MANUAL_ADJUSTMENT |

Ставки налога и комиссии берутся из [[payment-type]] и фиксируются снапшотом ([[snapshot-pattern]]); возврат пересчитывает суммы по снапшоту исходной продажи.

## Метрики дашборда (`app/api/dashboard/route.ts`)

- **Баланс** — `FinancialStats.currentBalance`.
- **Капитал** = баланс + стоимость склада **по себестоимости** (aggregation по партиям [[inventory-batch]] с `remainingQuantity > 0`).
- **Стоимость склада по ценам продажи** (`inventoryValue`) — справочно для UI, по `Product.price × quantity` активных товаров.
- **Налог к уплате** = Σ(`taxAmount` + `deliveryTaxAmount`) по продажам − Σ`taxAmountReversed` по возвратам.
- **Прибыль** = Σ по продажам (`totalAmount − totalCostPrice − taxAmount − bankCommissionAmount`) − Σ по возвратам (`totalAmount − totalCostPrice − taxAmountReversed`).
- График продаж за 7/30 дней, продажи за сегодня.

## Целостность

Все операции таблицы выше, кроме доставки, выполняются в MongoDB transaction (session): документ операции + инкремент баланса + запись Transaction создаются атомарно. Доставка обновляется без session — см. [[delivery-flow]].

## См. также

- [[fifo-inventory]] — откуда берётся `totalCostPrice`
- [[architecture]]
