#!/usr/bin/env bash

set -euo pipefail

PATH_TO_NEXTJS_DB="nextjs/public/data/links.db"

if [[ -f "${PATH_TO_NEXTJS_DB}" ]]; then
    echo "Deleting existing database at ${PATH_TO_NEXTJS_DB}"
    rm "${PATH_TO_NEXTJS_DB}"
fi

echo "Generating new SQLite DB at ${PATH_TO_NEXTJS_DB}"
airtable-export data "${AIRTABLE_BASE_ID}" Links --sqlite "${PATH_TO_NEXTJS_DB}" --key "${AIRTABLE_KEY}"

echo "Enabling FTS"
sqlite-utils enable-fts "${PATH_TO_NEXTJS_DB}" Links Title airtable_id
