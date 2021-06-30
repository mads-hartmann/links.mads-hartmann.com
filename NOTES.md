# Notes

I'm playing around with datasette. This might turn into the new README.

```sh
export AIRTABLE_BASE_ID="app4qb1AkwWAND48o"
export AIRTABLE_KEY=$AIRTABLE_API_KEY
airtable-export data "${AIRTABLE_BASE_ID}" Links --sqlite data/links.db
```

```sh
datasette data/links.db
```

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