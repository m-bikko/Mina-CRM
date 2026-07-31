---
title: Transaction (финансовая операция)
type: entity
tags: [model, finance, history]
created: 2026-07-31
updated: 2026-07-31
sources: [models/Transaction.ts, app/api/finance/history/route.ts, app/api/finance/adjustment/route.ts]
---

# Transaction (финансовая операция)

Append-only лента движения денег: `type` (INCOME | EXPENSE), `category` (SALE | SUPPLY | MANUAL_ADJUSTMENT | WRITE_OFF | RETURN), `amount`, человекочитаемый `reason`, опциональный `referenceId` (ObjectId исходного документа), `date`.

## Кто пишет

- [[sale]] → INCOME/SALE (сумма за вычетом комиссии банка);
- [[supply]] → EXPENSE/SUPPLY;
- [[return]] → EXPENSE/RETURN;
- [[write-off]] → INCOME/WRITE_OFF;
- ручная корректировка `POST /api/finance/adjustment` → MANUAL_ADJUSTMENT (единственный способ отразить уплату налога, аренду и прочие расходы).

Почтовая доставка ([[delivery-flow]]) двигает баланс **без** записи Transaction — известное исключение.

## Инвариант

Каждая запись создаётся в одной MongoDB transaction с инкрементом баланса [[financial-stats]], поэтому Σ(INCOME) − Σ(EXPENSE) должна сходиться с `currentBalance` с точностью до операций доставки. История отображается через `GET /api/finance/history` на странице `app/admin/finance` ([[finance-model]]).
