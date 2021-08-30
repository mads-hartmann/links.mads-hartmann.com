# TODOs

Keeping track of various TODOs for experiments and so on.

## Monorepo

- [ ] Do I need those tsconfig.ref.json files?

## Docs

- [x] Automatically create TOCs
- [ ] Spell-check
- [ ] Markdown linting

## Datasette

- [x] Create a datasette/requirements.txt file to fix versions
- [x] Set up Github Action to create and commit sqlite database every 12h
- [ ] Deploy datasette AWS or GCP so I can use it as an API for a SPA

## NextJS

- [X] Add to gitpod setting
- [X] Finish basic browsing
- [ ] Add search functionality, preferably an API endpoint backed by SQLite
  - [x] Download the sqlite database when the function loads and store it in tmp. Means I need to have access to hosted URL (so I know where to fetch it from), and I have to refactor the search module into a class so I can pass in the DB.
    - [x] Node 14 doesn't support the node:fs import syntax which I believe zx uses (either figure out how to avoid it or perhaps use something else than zx; it was a bit overkill anyway)
      - [x] I decided to not use zx and just go with node-fetch
  - [ ] Fix my broken search UI
