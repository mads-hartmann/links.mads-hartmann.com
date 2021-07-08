# links.mads-hartmann.com

For a few years I've kept track of everything I have read, or that I might want to read at some point. I store it all in Airtable, but in this repository I experiment with different ways of consuming the data.

## Datasette

I'm playing around with datasette. This might turn into the new README.

```sh
airtable-export data "${AIRTABLE_BASE_ID}" Links --sqlite data/links.db
```

Enable FTS (full text search) - this creates a few virtual tables that Datasette uses to perform full text search (see [docs](https://docs.datasette.io/en/stable/full_text_search.html) for more info). I only care about searching the titles for now.

```sh
sqlite-utils enable-fts data/links.db Links Title
```

Start Datasette:

```sh
datasette serve -h 0.0.0.0 -p 8001 data/links.db
```

Or query using `sqlite3`

```sh
sqlite3 data/links.db
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

### Relevant docs

- [Datasette Airtable Export](https://datasette.io/tools/airtable-export)
- [SQLite JSON support](https://www.sqlite.org/json1.html)

Plugins

- [datasette-render-markdown](https://datasette.io/plugins/datasette-render-markdown)

## 11ty

### Resources

- [Airtable API documentation](https://airtable.com/app4qb1AkwWAND48o/api/docs#curl/introduction) for my table.
- [LiquidJS](https://liquidjs.com)
- [11ty](https://www.11ty.dev)

## Development

I use Gitpod to work on this.

Environment variables

| Name | Description |
| - | - |
| ELEVENTY_ENV | Either `development` or `production`. Will use mock data during development and real data from Airtable when set to production. |
| AIRTABLE_BASE_ID | The table ID |
| AIRTABLE_KEY | Used. to authenticate with the Airtable API |