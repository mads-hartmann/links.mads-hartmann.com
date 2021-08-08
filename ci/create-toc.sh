#!/usr/bin/env bash

set -euo pipefail

# Make sure we're in the root of the repository.
path="$(git rev-parse --show-toplevel)"
echo "Changing directory to ${path}"
cd "${path}"

# Format all tracked markdown files.
files="$(
    git ls-tree -r --name-only HEAD \
    | grep -E '.md$'
)"
echo "Running markdoc-toc on files: ${files}"

echo "${files}" \
| xargs -I{} ./node_modules/.bin/markdown-toc -i '{}'
