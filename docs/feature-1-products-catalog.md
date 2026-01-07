# Фича 1: Каталог товаров

## Реализовано

### Backend (API)

#### MongoDB Модель Product
- Название товара (name)
- Цена продажи (price)
- Изображения (images) - массив URL из Cloudinary
- Размеры (sizes) - массив с параметрами:
  - label - размер (S, M, L)
  - measurements - замеры для каждого размера
  - quantity - количество товара в данном размере
- Активность товара (isActive)
- Timestamps (createdAt, updatedAt)

Файл: [models/Product.ts](../models/Product.ts)

#### API Endpoints

**Products CRUD:**
- `GET /api/products` - Получить все товары
- `POST /api/products` - Создать товар
- `GET /api/products/[id]` - Получить товар по ID
- `PUT /api/products/[id]` - Обновить товар
- `DELETE /api/products/[id]` - Удалить товар

Файлы:
- [app/api/products/route.ts](../app/api/products/route.ts)
- [app/api/products/[id]/route.ts](../app/api/products/[id]/route.ts)

**Upload:**
- `POST /api/upload` - Загрузить изображение в Cloudinary

Файл: [app/api/upload/route.ts](../app/api/upload/route.ts)

#### Валидация
- Zod схемы для валидации входных данных
- Строгая типизация TypeScript

Файл: [lib/validations/product.ts](../lib/validations/product.ts)

### Frontend (Admin панель)

#### Страница каталога товаров
Путь: `/admin/products`

**Функциональность:**
- ✅ Просмотр всех товаров
- ✅ Переключение между видами отображения:
  - Карточки (grid)
  - Список (list)
- ✅ Добавление нового товара
- ✅ Редактирование товара
- ✅ Удаление товара

**Модальное окно добавления/редактирования:**
- Название товара
- Цена
- Загрузка множественных изображений в Cloudinary
- Управление размерами:
  - Добавление размера (S, M, L и т.д.)
  - Редактирование размера (изменение label и замеров)
  - Добавление замеров для каждого размера
  - Удаление размеров и замеров
- Примечание: Количество товара управляется через систему завоза (будет реализовано отдельно)

Файл: [app/admin/products/page.tsx](../app/admin/products/page.tsx)

#### UI Компоненты
- **Button** - Переиспользуемая кнопка с вариантами стилей
- **Input** - Поле ввода с поддержкой label и error
- **Textarea** - Текстовое поле
- **ProductCard** - Карточка товара для grid view
- **ProductListItem** - Элемент списка для list view

Файлы: [components/](../components/)

### Утилиты

#### MongoDB Connection
- Кеширование подключения для production
- Обработка ошибок

Файл: [lib/db/mongodb.ts](../lib/db/mongodb.ts)

#### Cloudinary Integration
- Загрузка изображений
- Удаление изображений
- Организация в папки

Файл: [lib/cloudinary.ts](../lib/cloudinary.ts)

## Технологический стек

- **Next.js 15** с App Router
- **TypeScript** (strict mode)
- **Tailwind CSS** для стилизации
- **MongoDB** с Mongoose
- **Cloudinary** для хранения изображений
- **Zod** для валидации данных

## Соответствие правилам

✅ App Router структура
✅ Строгий TypeScript без `any`
✅ Named exports
✅ Functional components
✅ Zod валидация для API
✅ Без комментариев в коде
✅ Чистый, модульный код
✅ 0 ESLint ошибок и предупреждений
✅ Успешная сборка проекта

## Запуск проекта

1. Установить зависимости:
```bash
npm install
```

2. Настроить `.env`:
```
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Запустить dev сервер:
```bash
npm run dev
```

4. Открыть: http://localhost:3000

## Следующие шаги

Проект готов к добавлению следующих фич:
- Авторизация и аутентификация
- Управление заказами
- Управление клиентами
- Аналитика и отчеты
