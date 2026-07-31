---
title: Доставка
type: concept
tags: [delivery, finance]
created: 2026-07-31
updated: 2026-07-31
sources: [app/api/sales/[id]/delivery/route.ts, models/Sale.ts, app/admin/delivery/page.tsx]
---

# Доставка

Доставка — не отдельная модель, а набор полей внутри [[sale]]. Статусы: `not_attached` (по умолчанию) → `shipped`. Управление — `PUT`/`DELETE` на `/api/sales/[id]/delivery`, админ-страница `app/admin/delivery`.

## Два типа

- **`local`** — местная, бесплатная, без финансовых операций; все денежные поля доставки очищаются.
- **`postal`** — почтовая, платная:
  - `deliveryCharge` — сколько платит клиент (по умолчанию 2000 ₸);
  - `postalCost` — стоимость услуг почты (наш расход);
  - тип оплаты доставки выбирается отдельно от оплаты товара — свой [[payment-type]] со своими снапшотами ставок ([[snapshot-pattern]]);
  - в баланс: `deliveryBalanceAmount = deliveryCharge − bankCommission − postalCost`;
  - налог с доставки (`deliveryTaxAmount`) не вычитается из баланса, а накапливается в «налог к уплате» ([[finance-model]]).

## Особенности реализации

- Повторное сохранение доставки идемпотентно по балансу: применяется разница `новый deliveryBalanceAmount − прежний`.
- `DELETE` откатывает баланс на `deliveryBalanceAmount` и сбрасывает все поля в `not_attached`.
- **Отличия от прочих денежных операций**: не создаётся [[transaction]] (движение денег видно только в балансе, не в истории финансов) и не используется MongoDB session — обновление продажи и баланса не атомарно. Это осознанное упрощение, но потенциальное место рассинхрона.

## См. также

- [[sale]] — где живут поля
- [[finance-model]] — учёт в метриках дашборда
