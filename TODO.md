# TODOs

Keeping track of various TODOs for experiments and so on.

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
  - [ ] Download the sqlite database when the function loads and store it in tmp. Means I need to have access to hosted URL (so I know where to fetch it from), and I have to refactor the search module into a class so I can pass in the DB.
