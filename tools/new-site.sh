#!/usr/bin/env bash
# tools/new-site.sh — Új site scaffold generátor
# Használat: ./tools/new-site.sh site-5 "Cég Neve" "https://cegnev.hu"
# Port-tartomány: 3010–3085

set -e

SITE_NAME="${1:?Adj meg egy site nevet (pl. site-5)}"
SITE_TITLE="${2:-Site Title}"
SITE_URL="${3:-https://example.hu}"

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE_DIR="$ROOT_DIR/template"
TARGET_DIR="$ROOT_DIR/$SITE_NAME"

# --- port allokáció ---
USED_PORTS=$(grep -hEo '"[0-9]+:[0-9]+"' "$ROOT_DIR"/docker-compose.yml 2>/dev/null \
  | grep -Eo '[0-9]+' | sort -u)

SITE_PORT=""
for p in $(seq 3010 3085); do
  if ! echo "$USED_PORTS" | grep -qx "$p"; then
    SITE_PORT=$p
    break
  fi
done

if [ -z "$SITE_PORT" ]; then
  echo "HIBA: Nincs szabad port a 3010–3085 tartományban." >&2
  exit 1
fi

echo "→ Site: $SITE_NAME | Port: $SITE_PORT | Title: $SITE_TITLE"

# --- másolás és placeholder csere ---
cp -r "$TEMPLATE_DIR" "$TARGET_DIR"

find "$TARGET_DIR" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.json" \
  -o -name "Dockerfile" -o -name "*.yml" \) | while read -r f; do
  sed -i \
    -e "s|SITE_NAME|$SITE_NAME|g" \
    -e "s|SITE_PORT|$SITE_PORT|g" \
    -e "s|SITE_TITLE|$SITE_TITLE|g" \
    -e "s|SITE_SUBTITLE|$SITE_URL|g" \
    "$f"
done

# --- docker-compose patch ---
DC="$ROOT_DIR/docker-compose.yml"
FRAGMENT=$(sed \
  -e "s|SITE_NAME|$SITE_NAME|g" \
  -e "s|SITE_PORT|$SITE_PORT|g" \
  "$TEMPLATE_DIR/docker-compose.fragment.yml" \
  | grep -v '^#')

# services blokk végére + volumes
awk -v block="$FRAGMENT" '
  /^volumes:/ { print block; print ""; in_volumes=1 }
  { print }
  in_volumes && /^  [a-z]/ { print "  '"$SITE_NAME"'-node-modules:" }
' "$DC" > "${DC}.tmp" && mv "${DC}.tmp" "$DC"

echo "✓ $TARGET_DIR létrehozva"
echo "✓ docker-compose.yml frissítve (port $SITE_PORT)"
echo ""
echo "Következő lépés:"
echo "  cd $TARGET_DIR && npm install && npm run dev"
