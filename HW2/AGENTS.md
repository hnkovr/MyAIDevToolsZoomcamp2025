# Repository Guidelines

## Project Structure & Module Organization
- `client/` — React + Vite frontend with CodeMirror editor and Pyodide worker.
- `server/` — Node.js + Express + Socket.IO backend (rooms by `sessionId`).
- `tests/` — integration tests (HTTP + WebSocket). Script tests in `scripts/tests/`.
- `scripts/` — helper scripts; `scripts/utils/` for shared bash helpers.
- `conf/` — environment and YAML config examples.
- `docs/` — documentation, plan, status, prompts log, and homework source.

## Build, Test, and Development Commands
- Dev (both): `npm run dev` — runs client and server concurrently.
- Tests (server): `npm --prefix server test` — Vitest integration tests.
- Build client: `npm --prefix client run build` — static assets under `server/public/`.
- Bootstrap: `bash scripts/bootstrap.sh` — install sub-project deps.

## Coding Style & Naming Conventions
- JS/TS: 2-space indent, Prettier-like formatting; React components `PascalCase`, variables/functions `camelCase`.
- Python scripts: 4 spaces; Black (88), Ruff if added; modules `snake_case.py`.
- Keep functions small; add brief JSDoc/docstrings for non-trivial logic.

## Testing Guidelines
- Focus on integration first: join and code propagation over Socket.IO.
- Place server tests in `server/tests/` with `*.test.js` or `*.test.ts`.
- Aim for ≥80% coverage on changed code; avoid flakiness (timeouts, retries).

## Commit & Pull Request Guidelines
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`.
- PRs: clear what/why, linked issues (`Closes #id`), screenshots if UI, tests/docs updated.

## Agent-Specific Tips
- Make surgical changes; avoid renames/moves unless necessary.
- Document new commands in `README.md` and update `PROMPTS-LOG.md` after major steps.
- Don’t add dependencies without rationale; keep the solution simple and robust.
