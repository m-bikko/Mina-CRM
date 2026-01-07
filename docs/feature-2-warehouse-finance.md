# Фича 2: Складской учет и Финансы

## Реализовано

### Backend (API & Models)

#### Новые MongoDB Модели

**1. PaymentType** ([models/PaymentType.ts](../models/PaymentType.ts))
- `name` - Название типа оплаты (например, "Kaspi QR", "Наличные")
- `taxRate` - Процент налога (0-100%)
- `isActive` - Активность типа оплаты

**2. Supply** ([models/Supply.ts](../models/Supply.ts))
- `date` - Дата завоза
- `items[]` - Массив товаров:
  - `product` - Ссылка на Product
  - `productName` - Снэпшот названия
  - `sizeLabel` - Размер
  - `quantity` - Количество
  - `costPrice` - Цена закупа
- `totalCost` - Общая сумма завоза

**3. Sale** ([models/Sale.ts](../models/Sale.ts))
- `date` - Дата продажи
- `customerPhone` - Номер клиента
- `paymentType` - Ссылка на PaymentType
- `paymentTypeName` - Снэпшот названия
- `taxRateSnapshot` - Снэпшот налоговой ставки
- `items[]` - Массив товаров:
  - `product` - Ссылка на Product
  - `productName` - Снэпшот названия
  - `sizeLabel` - Размер
  - `quantity` - Количество
  - `priceAtSale` - Цена продажи
- `totalAmount` - Общая сумма продажи
- `taxAmount` - Сумма налога

**4. Transaction** ([models/Transaction.ts](../models/Transaction.ts))
- `type` - INCOME | EXPENSE
- `category` - SALE | SUPPLY | MANUAL_ADJUSTMENT
- `amount` - Сумма
- `reason` - Описание
- `referenceId` - Ссылка на Sale или Supply
- `date` - Дата транзакции

**5. FinancialStats** ([models/FinancialStats.ts](../models/FinancialStats.ts))
- `currentBalance` - Текущий баланс кассы

#### API Endpoints

**PaymentTypes:**
- `GET /api/payment-types` - Получить активные типы оплаты
- `POST /api/payment-types` - Создать тип оплаты
  - Body: `{ name, taxRate }`

**Supplies (Завозы):**
- `GET /api/supplies` - Получить все завозы
- `POST /api/supplies` - Создать завоз
  - Использует MongoDB транзакцию
  - Увеличивает quantity товаров
  - Уменьшает баланс
  - Создает Transaction
  - Body: `{ date?, items: [{ product, productName, sizeLabel, quantity, costPrice }] }`
- `GET /api/supplies/[id]` - Получить детали завоза

**Sales (Продажи):**
- `GET /api/sales` - Получить все продажи
- `POST /api/sales` - Создать продажу
  - Проверяет наличие товара
  - Использует MongoDB транзакцию
  - Уменьшает quantity товаров
  - Увеличивает баланс
  - Рассчитывает налог
  - Создает Transaction
  - Body: `{ date?, customerPhone, paymentType, items: [{ product, productName, sizeLabel, quantity, priceAtSale }] }`
- `GET /api/sales/[id]` - Получить детали продажи

**Finance (Финансы):**
- `POST /api/finance/adjustment` - Ручная корректировка баланса
  - Body: `{ type: 'INCOME' | 'EXPENSE', amount, reason }`
- `GET /api/finance/history` - История транзакций с пагинацией
  - Query: `page`, `limit`
  - Возвращает также текущий баланс

**Dashboard (Аналитика):**
- `GET /api/dashboard` - Получить данные для дашборда
  - Query: `period` (week | month)
  - Возвращает:
    - `balance` - Текущий баланс
    - `capital` - Капитал (баланс + стоимость товаров)
    - `taxPayable` - Налог к уплате
    - `salesChart` - График продаж по дням
    - `salesToday` - Продажи сегодня
    - `inventoryValue` - Стоимость товаров на складе

### Бизнес-логика

**Атомарные операции:**
- Все операции с финансами и остатками выполняются в MongoDB транзакциях
- При ошибке все изменения откатываются

**Расчет капитала:**
```typescript
capital = currentBalance + Σ(product.price * size.quantity)
```

**Расчет налога:**
```typescript
taxAmount = totalAmount * (taxRateSnapshot / 100)
```

**Снэпшоты:**
- Сохраняем названия товаров, типов оплаты и налоговые ставки на момент операции
- Защита от изменений справочников

## Проверка качества

- ✅ **0 TypeScript ошибок**
- ✅ **0 ESLint предупреждений**
- ✅ **Сборка проходит успешно**
- ✅ Все API endpoints созданы
- ✅ MongoDB транзакции реализованы
- ✅ Валидация Zod для всех входных данных

## Следующие шаги

UI для следующих страниц (будет реализовано отдельно):
1. `/admin/supply` - Страница завозов
2. `/admin/sales` - Страница продаж
3. `/admin/finance` - Страница баланса и транзакций
4. Dashboard - Главная страница с аналитикой

## Важные примечания

- Все расчеты выполняются на сервере
- Используются MongoDB транзакции для целостности данных
- Количество товара управляется только через завозы и продажи
- История всех операций сохраняется в Transaction
