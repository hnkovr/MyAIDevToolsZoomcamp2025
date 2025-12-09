# TODO / План реализации (HW2 — Coding Interview Platform)

## Цели и стек
- Совместный редактор кода (ссылки/сессии), realtime обновления, подсветка JS/Python, безопасный запуск кода в браузере (WASM/Pyodide).
- Стек: React + Vite (client), Express + Socket.IO (server), CodeMirror 6, Pyodide, `concurrently`.

## Структура
- `client/`, `server/`, `tests/`, `scripts/`, `conf/`, `docs/`.

## Этапы (итерации)
1. Инициализация монорепо: client (Vite), server (Express), базовые скрипты.
2. Реалтайм: комнаты по `sessionId`, события `join`, `code:update` (Socket.IO).
3. Редактор: CodeMirror 6, языки JS/Python, переключатель языка.
4. Выполнение кода: JS — iframe/Web Worker; Python — Pyodide (в воркере).
5. Интеграционные тесты (HTTP+WS), `README.md` с командами.
6. Единый `npm run dev` (root) через `concurrently`.
7. Билд: раздача `client/dist` сервером (статические файлы).
8. Контейнеризация (один Dockerfile, базовый `node:20-alpine`).
9. Деплой (Render/Railway/Fly.io), конфиг `PORT`, WS.
10. Документация: ответы на Q1–Q7, Roadmap, обновление логов.

## Команды (план)
- Dev: `npm run dev` (root; запускает client+server).
- Тесты сервера: `npm --prefix server test`.
- Сборка клиента: `npm --prefix client run build`.

## Ответы ДЗ (куда внести)
- Q1: начальный промпт — в `PROMPTS-LOG.md` и `README.md` (summary).
- Q2–Q7: зафиксировать точные команды/библиотеки в `README.md` и `STATUS.md`.
