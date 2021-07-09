#!/usr/bin/env bash

set -euo pipefail

# Make sure we're in the root of the repository.
cd "$(git rev-parse --show-toplevel)"

# Format all tracked markdown files.
git ls-tree -r main --name-only \
| grep -E '.md$' \
| xargs -I{} ./node_modules/.bin/markdown-toc -i '{}'