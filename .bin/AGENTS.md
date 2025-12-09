# Repository Guidelines

## Project Structure & Module Organization
- Expected layout:
  - `src/` — application/library code (e.g., `src/hw2/`).
  - `tests/` — pytest tests mirroring `src/` (e.g., `tests/test_utils.py`).
  - `scripts/` — small CLI helpers for tasks/data.
  - `notebooks/` — exploratory work; keep outputs cleared.
  - `data/` — local datasets (ignored by Git).
  - `configs/` — YAML/JSON config files and `.env.example`.

## Build, Test, and Development Commands
- Create env: `python -m venv .venv && source .venv/bin/activate`.
- Install deps: `pip install -r requirements.txt` or `pip install -e .[dev]`.
- Run tests: `pytest -q` (add `-k <pattern>` to filter).
- Lint/format: `ruff check .` and `black .`.
- Optional Make targets (if present): `make init`, `make test`, `make lint`, `make format`.

## Coding Style & Naming Conventions
- Python, 4-space indents, UTF-8, Unix line endings.
- Formatting: Black (line length 88). Imports: isort or Ruff’s isort rules.
- Linting: Ruff; fix warnings or add clear, minimal `# noqa` justifications.
- Types: prefer type hints; run `mypy` if configured.
- Naming: modules/files `snake_case.py`, functions/vars `snake_case`, classes `CamelCase`.
- Docstrings: concise, actionable; explain assumptions and side effects.

## Testing Guidelines
- Framework: pytest. Place tests under `tests/` with `test_*.py` files.
- Coverage goal ≥ 80% for changed code (`pytest --cov=src -q`).
- Use fixtures in `tests/conftest.py`; mark slow/network tests with `@pytest.mark.slow` and skip by default.

## Commit & Pull Request Guidelines
- Use Conventional Commits (e.g., `feat: add feature`, `fix: correct bug`, `docs: update guide`).
- Keep PRs focused and small; include:
  - What/why, screenshots if UI, and breaking-change notes.
  - Linked issues (e.g., `Closes #123`).
  - Tests for new behavior and updated docs.

## Security & Configuration Tips
- Never commit secrets or large data. Use `.env` (provide `.env.example`).
- Add local-only files to `.gitignore` (`data/`, `.venv/`, `.env`).
- Prefer config via `configs/*.yaml` and environment variables.

## Agent-Specific Instructions
- Make surgical changes; do not rename/move files unless required.
- Follow this guide’s style and structure; update docs when behavior changes.
- Avoid adding new dependencies without clear justification.
- When adding code, include tests and run `ruff`, `black`, and `pytest` locally.
