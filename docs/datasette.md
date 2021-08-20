# Datasette

## Table of contents

<!-- toc -->

- [Generating SQLite database](#generating-sqlite-database)
- [Enable FTS (full text search)](#enable-fts-full-text-search)
- [Run datasette](#run-datasette)
- [Relevant docs](#relevant-docs)

<!-- tocstop -->

## Generating SQLite database

_see [ci/refresh-links-db.sh](../ci/refresh-links-db.sh) for working example_

To generate the SQLite database from Airtable

```sh
airtable-export data "${AIRTABLE_BASE_ID}" Links --sqlite nextjs/public/data/links.db
```

## Enable FTS (full text search)

_see [ci/refresh-links-db.sh](../ci/refresh-links-db.sh) for working example_

Enable FTS (full text search) - this creates a few virtual tables that Datasette uses to perform full text search (see [docs](https://docs.datasette.io/en/stable/full_text_search.html) for more info). I only care about searching the titles for now.

```sh
sqlite-utils enable-fts nextjs/public/data/links.db Links Title
```

See the docs for more details [here](https://www.sqlite.org/fts5.html).

A basic query would be

```sql
SELECT * FROM Links_fts where Title MATCH '50ms';
```

## Run datasette

Start Datasette:

```sh
datasette serve -h 0.0.0.0 -p 8001 nextjs/public/data/links.db
```

## Relevant docs

- [Datasette Airtable Export](https://datasette.io/tools/airtable-export)
- [SQLite JSON support](https://www.sqlite.org/json1.html)

Plugins

- [datasette-render-markdown](https://datasette.io/plugins/datasette-render-markdown)
