---
title: FinancialStats (баланс)
type: entity
tags: [model, finance, singleton]
created: 2026-07-31
updated: 2026-07-31
sources: [models/FinancialStats.ts]
---

# FinancialStats (баланс)

Singleton-документ с единственным полем `currentBalance` — текущие деньги бизнеса. Все операции ищут его через `findOne()` и инкрементируют `$inc`; при первой операции документ создаётся автоматически.

Кто двигает баланс и на сколько — таблица в [[finance-model]]. История изменений — [[transaction]] (кроме доставки, см. [[delivery-flow]]).

Баланс — слагаемое «капитала» на дашборде: капитал = баланс + себестоимость остатков склада по партиям [[inventory-batch]].
