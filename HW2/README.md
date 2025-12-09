# Coding Interview Platform (HW2)

Реализация платформы для онлайн-собеседований по коду: совместное редактирование, realtime обновления, подсветка синтаксиса (JS/Python) и безопасное выполнение кода в браузере (WASM/Pyodide).

## Статус
- На текущий момент создана структура и документация. Кодовая база будет добавлена согласно плану из `PLAN.md` и `TODO.md`.

## Быстрый старт
- Dev (оба): `npm run dev` — запускает client и server через `concurrently`.
- Тесты сервера: `npm --prefix server test` (Vitest, HTTP+WS integration).
- Сборка клиента: `npm --prefix client run build` (Express раздаёт `server/public`).
- Docker (локально): `docker build -t hw2 . && docker run -p 8080:8080 hw2`.

## Документация и дорожная карта
- План: `docs/PLAN.md`
- Задачи/ToDo: `docs/TODO.md`
- Статус/риски: `docs/STATUS.md`
- Журнал промптов: `docs/PROMPTS-LOG.md`
- Конфигурация: `conf/`
- Доп. материалы: `docs/`

## Требования окружения (план)
- Node.js 20+, npm 10+.
- Docker (для контейнеризации), опционально.

## Roadmap (высокоуровневый)
 - Реалтайм Socket.IO → Редактор CodeMirror → Выполнение JS/Pyodide → Тесты → Единый dev → Билд/статик → Docker → Деплой.

## Ответы ДЗ (ориентиры)
- Q2 (тесты): `npm --prefix server test`
- Q3 (оба): `npm run dev` (`concurrently -k -n client,server "npm:dev:client" "npm:dev:server"`)
- Q4 (подсветка): CodeMirror 6 (`@uiw/react-codemirror`, `@codemirror/lang-*`)
- Q5 (Python→WASM): Pyodide (через web worker)
