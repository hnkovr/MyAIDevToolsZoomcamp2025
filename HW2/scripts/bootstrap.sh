#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "$0")/.." && pwd)"
echo "[bootstrap] root: $root_dir"

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
