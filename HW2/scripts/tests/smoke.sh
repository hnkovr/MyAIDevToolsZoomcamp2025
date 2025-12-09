#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/../utils/print_header.sh"
print_header "smoke"

echo "[smoke] checking conf/.env.example..."
test -f "$(dirname "$0")/../../conf/.env.example" && echo "[ok] .env.example found" || { echo "[fail] .env.example missing"; exit 1; }

echo "[smoke] done"
