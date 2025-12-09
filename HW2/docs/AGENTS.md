# Repository Guidelines

## Project Structure & Module Organization
- `client/` — React + Vite frontend (CodeMirror editor, Pyodide loader).
- `server/` — Node.js + Express + Socket.IO backend (rooms by sessionId).
- `tests/` — integration tests for HTTP/WebSocket; script tests under `scripts/tests/`.
- `scripts/` — helper scripts; `scripts/utils/` for shared bash utils.
- `conf/` — configuration and examples (`.env.example`, `config.example.yaml`).
- `docs/` — documentation and design notes.

## Build, Test, and Development Commands
- Bootstrap: `bash scripts/bootstrap.sh` — installs deps (when client/server present).
- Dev (root): `npm run dev` — runs client and server concurrently.
- Tests (server): `npm --prefix server test` (e.g., Jest/Vitest + supertest + socket.io-client).
- Script tests: `bash scripts/tests/smoke.sh`.

## Coding Style & Naming Conventions
- JavaScript/TypeScript: 2-space indent, Prettier + ESLint; files `kebab-case` for directories, `camelCase` for vars/functions, `PascalCase` for React components.
- Python (scripts): 4-space indent, Black (88), Ruff; modules `snake_case.py`.
- Keep functions small, pure where possible; add brief JSDoc/docstrings for non-trivial logic.

## Testing Guidelines
- Aim for integration-first tests: client↔server events (`join`, `code:update`).
- Place server tests in `server/tests` or root `tests/` (consistent per chosen runner).
- Name tests `*.test.ts/js` (JS) or `test_*.py` (scripts).
- Target ≥80% coverage for changed code.

## Commit & Pull Request Guidelines
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`.
- Small, focused PRs with: what/why, repro or screenshots (if UI), linked issues (`Closes #123`), and tests/docs updated.

## Agent-Specific Tips
- Prefer surgical changes; avoid renames/moves unless required.
- Don’t add deps without justification; document new commands in `README.md`.
- Update `PROMPTS-LOG.md` after significant AI-assisted steps (prompt, approach, result, issues).
