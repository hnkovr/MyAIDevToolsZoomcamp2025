#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "$0")/.." && pwd)"
echo "[bootstrap] root: $root_dir"

if ! command -v npm >/dev/null 2>&1; then
  echo "[bootstrap] error: npm not found. Install Node.js 20+ (e.g., 'brew install node@20' or nvm)." >&2
  exit 127
fi

if [ -d "$root_dir/client" ]; then
  echo "[bootstrap] installing client deps..."
  npm --prefix "$root_dir/client" install
else
  echo "[bootstrap] skip: client/ not found"
fi

if [ -d "$root_dir/server" ]; then
  echo "[bootstrap] installing server deps..."
  npm --prefix "$root_dir/server" install
else
  echo "[bootstrap] skip: server/ not found"
fi

echo "[bootstrap] done"
