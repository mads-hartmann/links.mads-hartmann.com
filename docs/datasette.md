# Datasette

## Table of contents

<!-- toc -->

- [Generating SQLite database](#generating-sqlite-database)
- [Enable FTS (full text search)](#enable-fts-full-text-search)
- [Run datasette](#run-datasette)
- [Query using `sqlite3`](#query-using-sqlite3)
- [Relevant docs](#relevant-docs)

<!-- tocstop -->

## Generating SQLite database

To generate the SQLite database from Airtable

```sh
airtable-export data "${AIRTABLE_BASE_ID}" Links --sqlite data/links.db
```

## Enable FTS (full text search)

Enable FTS (full text search) - this creates a few virtual tables that Datasette uses to perform full text search (see [docs](https://docs.datasette.io/en/stable/full_text_search.html) for more info). I only care about searching the titles for now.

```sh
sqlite-utils enable-fts data/links.db Links Title
```

See the docs for more details [here](https://www.sqlite.org/fts5.html).

A basic query would be

```sql
SELECT * FROM Links_fts where Title MATCH '50ms';
```

## Run datasette

Start Datasette:

```sh
datasette serve -h 0.0.0.0 -p 8001 data/links.db
```

## Query using `sqlite3`

Or query using `sqlite3`

```sh
sqlite3 data/links.db
```

To describe the tables

```sql
.schema Links
```

The multiple-select Airtable columns are JSON arrays so to query them I have to use the [JSON support](https://www.sqlite.org/json1.html). The following example queries links with the SRE tag.

```sql
SELECT Title, json_each.value
FROM Links, json_each(Links.Topic)
WHERE json_each.value LIKE 'SRE%'
LIMIT 5;
 ```

The following counts the number of links for each tag.

```sql
SELECT json_each.value, COUNT(*) as count
FROM Links, json_each(Links.Topic)
GROUP BY json_each.value
ORDER BY count DESC;
```

## Relevant docs

- [Datasette Airtable Export](https://datasette.io/tools/airtable-export)
- [SQLite JSON support](https://www.sqlite.org/json1.html)

Plugins

- [datasette-render-markdown](https://datasette.io/plugins/datasette-render-markdown)
