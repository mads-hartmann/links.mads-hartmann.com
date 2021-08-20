# Queries

Or query using `sqlite3`

```sh
sqlite3 nextjs/public/data/links.db
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

Count the links by domain name

```sql
SELECT 
    SUBSTR(SUBSTR(Link, INSTR(Link, '//') + 2), 0, INSTR(SUBSTR(Link, INSTR(Link, '//') + 2), '/')) as domain,
    COUNT(*) as count
FROM Links
GROUP BY domain
ORDER BY count DESC
;
```
