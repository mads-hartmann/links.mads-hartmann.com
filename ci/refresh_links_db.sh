#!/usr/bin/env bash

set -euo pipefail

airtable-export data "${AIRTABLE_BASE_ID}" Links --sqlite nextjs/data/links.db
sqlite-utils enable-fts nextjs/data/links.db Links Title airtable_id
