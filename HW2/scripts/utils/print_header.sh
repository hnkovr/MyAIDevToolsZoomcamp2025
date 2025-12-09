#!/usr/bin/env bash
set -euo pipefail

print_header() {
  local msg="$1"
  printf "\n========== %s ==========%s\n" "$msg" ""
}

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
  print_header "utils loaded"
fi
