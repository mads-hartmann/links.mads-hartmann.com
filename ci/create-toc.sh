#!/usr/bin/env bash

set -euo pipefail

# Make sure we're in the root of the repository.
path="$(git rev-parse --show-toplevel)"
echo "Changing directory to ${path}"
cd "${path}"

# Format all tracked markdown files.
echo "Running markdoc-toc on files"
git ls-tree -r main --name-only \
| grep -E '.md$' \
| xargs -I{} ./node_modules/.bin/markdown-toc -i '{}'