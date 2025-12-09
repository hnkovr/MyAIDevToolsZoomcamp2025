# Justfile — команды проекта

Установите `just` (один из вариантов):
- macOS: `brew install just`
- Ubuntu/Debian: `sudo apt-get install just` (или `cargo install just`)
- Windows: `scoop install just` или `choco install just`

Запуск справки: `just` или `just help`.

Доступные рецепты:
- `just install` — установка root-зависимостей (для `npm run dev`).
- `just bootstrap` — установка зависимостей в `client/` и `server/` (если каталоги существуют).
- `just dev` — запуск клиента и сервера одновременно (через `concurrently`).
- `just test` — запуск серверных интеграционных тестов (Vitest).
- `just build` — сборка клиента (Vite → `client/dist`).
- `just stage` — копирование `client/dist` в `server/public` для раздачи Express.
- `just smoke` — базовые проверки (конфиги и пр.).
- `just docker-build [IMAGE=hw2]` — сборка Docker-образа.
- `just docker-run [IMAGE=hw2] [PORT=8080]` — запуск образа локально.

Примеры:
- Локальная разработка: `just install && just bootstrap && just dev`
- Тесты: `just test`
- Продакшен-сборка: `just build && just stage && just docker-build`
- Запуск в Docker: `just docker-run PORT=8080`

Подсказки:
- Переменные окружения клиента берутся из `client/.env` (`VITE_API_BASE`). Без неё используется `window.location.origin`.
- Сервер слушает `PORT` (по умолчанию `8080`). См. `server/.env.example`.
