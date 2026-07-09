#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Installing dependencies"
npm install --prefix "$ROOT"

echo "==> Initialising database"
SQLITE_DB="$ROOT/shared-core/data/products.sqlite"
INIT_SQL="$ROOT/shared-core/data/init.sql"

if [ ! -f "$SQLITE_DB" ]; then
  sqlite3 "$SQLITE_DB" < "$INIT_SQL"
  echo "    Database created: $SQLITE_DB"
else
  echo "    Database already exists, skipping"
fi

echo "==> Building all sites"
npm run build-all --prefix "$ROOT"

echo "==> Done"
