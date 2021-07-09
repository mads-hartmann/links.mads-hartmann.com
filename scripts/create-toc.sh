#!/usr/bin/env bash

set -euo pipefail

# TODO: Check that the location is the root of the repo (can I use git to find it?)

git ls-tree -r main --name-only \
| grep -E '.md$' \
| xargs -I{} ./node_modules/.bin/markdown-toc -i '{}'