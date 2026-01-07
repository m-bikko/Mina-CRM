# Amina CRM

CRM система для магазина женской одежды

## Технологии

- **Next.js 15** (App Router)
- **TypeScript** (строгий режим)
- **Tailwind CSS**
- **MongoDB** (с Mongoose)
- **Cloudinary** (хранение изображений)
- **Zod** (валидация данных)

## Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Настройте переменные окружения в `.env`:
```
MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Запустите проект в режиме разработки:
```bash
npm run dev
```

4. Откройте [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
├── app/                    # Next.js App Router
│   ├── admin/             # Админ панель
│   │   └── products/      # Управление товарами
│   ├── api/               # API endpoints
│   │   ├── products/      # CRUD для товаров
│   │   └── upload/        # Загрузка изображений
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Корневой layout
│   └── page.tsx           # Главная страница
├── components/            # Переиспользуемые компоненты
├── lib/                   # Утилиты и хелперы
│   ├── db/               # MongoDB подключение
│   └── validations/      # Zod схемы
├── models/               # Mongoose модели
└── utils/                # Вспомогательные функции
```

## Функциональность

### Каталог товаров
- Добавление нового товара
- Редактирование товара
- Удаление товара
- Просмотр в виде карточек или списка
- Загрузка множественных изображений
- Управление размерами:
  - Добавление размеров (label и замеры)
  - Редактирование размеров (изменение label и замеров)
  - Удаление размеров
  - Отображение количества товара (управляется через систему завоза)
- Управление замерами для каждого размера

### API Endpoints

#### Products
- `GET /api/products` - Получить все товары
- `POST /api/products` - Создать новый товар
- `GET /api/products/[id]` - Получить товар по ID
- `PUT /api/products/[id]` - Обновить товар
- `DELETE /api/products/[id]` - Удалить товар

#### Upload
- `POST /api/upload` - Загрузить изображение в Cloudinary

## Модель товара

```typescript
{
  name: string;           // Название
  price: number;          // Цена продажи
  images: string[];       // Массив URL изображений
  sizes: [                // Размеры
    {
      label: string;      // Размер (S, M, L)
      quantity: number;   // Количество товара
      measurements: [     // Замеры
        {
          parameterName: string;  // Название параметра
          value: string;          // Значение
        }
      ]
    }
  ];
  isActive: boolean;      // Активность товара
  createdAt: Date;        // Дата создания
  updatedAt: Date;        // Дата обновления
}
```
