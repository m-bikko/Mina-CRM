---
title: Аутентификация
type: concept
tags: [auth, security, middleware]
created: 2026-07-31
updated: 2026-10-10
sources: [middleware.ts, lib/auth.ts, app/api/auth/, app/login/page.tsx, docs/superpowers/specs/2026-07-31-admin-login-design.md]
---

# Аутентификация

Логин для админ-части: один пользователь (владелец), креды в env (`ADMIN_LOGIN`, `ADMIN_PASSWORD`), без модели User в базе.

## Механика

- `POST /api/auth/login` сверяет креды с env (SHA-256 + `timingSafeEqual`, при неверных кредах задержка 500 мс) и ставит httpOnly-куку `mina_admin_token` с JWT (HS256, библиотека `jose`, секрет `AUTH_SECRET`, срок 30 дней, без продления).
- `middleware.ts` (Edge) проверяет JWT на каждом запросе по matcher `/admin/*`, `/api/*`, `/login`:
  - страницы без валидной куки → redirect на `/login?from=<путь>`;
  - API без валидной куки → 401 JSON;
  - залогиненный пользователь на `/login` → redirect в дашборд.
- `POST /api/auth/logout` очищает куку; кнопка «Выйти» — внизу sidebar в `components/AdminNav.tsx`.
- Страница `/login` — форма на shadcn/ui, после входа возвращает на исходную страницу (`from`).

## Публичные исключения (нужны витрине [[storefront]])

- `POST /api/page-visits` — счётчик визитов;
- `/api/auth/*`.

`GET /api/products` до 2026-10-10 тоже был публичным, но он отдаёт точные остатки (`sizes[].quantity`). Теперь витрина читает каталог на сервере (`lib/catalog.ts`, наружу уходит только «в наличии / нет»), а этот эндпоинт доступен только с кукой.

Всё остальное, включая опасные `/api/clear-db` и `/api/sales/clear`, — только с кукой.

## Осознанные упрощения

- Пароль в env открытым текстом: доступ к env эквивалентен доступу к серверу.
- Rate-limiting — только задержка 500 мс на неверный вход.

## См. также

- [[architecture]] — место middleware в общей картине
