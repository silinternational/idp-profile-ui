#!/usr/bin/env bash
set -x

export UI_VERSION=7.2.12

wget https://github.com/silinternational/idp-profile-ui/archive/${UI_VERSION}.tar.gz
tar -xzf ${UI_VERSION}.tar.gz
mv idp-profile-ui-${UI_VERSION} build

cp favicon.ico build
cp logo.png build/src/assets
cp .env build/

# Handle custom locales
LOCALES_DIR="build/src/locales"
SCRIPT_DIR=$(dirname "$0")
CUSTOM_LOCALES_DIR="$SCRIPT_DIR/custom_locales"

if [ -d "$CUSTOM_LOCALES_DIR" ]; then
    shopt -s nullglob  # Avoid running loop if no JSON files exist
    echo "Merging custom translations..."
    for file in "$CUSTOM_LOCALES_DIR"/*.json; do
        lang=$(basename "$file")  # Extract filename (e.g., en.json)
        if [[ -f "$LOCALES_DIR/$lang" && -f "$file" ]]; then
            node "$SCRIPT_DIR/merge-locales.js" "$LOCALES_DIR/$lang" "$file"
        else
            echo "Error: Required files for merging not found: '$LOCALES_DIR/$lang' or '$file'" >&2
            exit 1
        fi
    done
else
    echo "No custom translations found, using default locales."
fi

cd build
npm install
npm run build
