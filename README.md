# links.mads-hartmann.com

Static site rendering all the links in my link database. The data is managed as a table in Airtable and the site is generated using 11ty.

Environment variables

| Name | Description |
| - | - |
| ELEVENTY_ENV | Either `development` or `production`. Will use mock data during development and real data from Airtable when set to production. |
| AIRTABLE_API_KEY | Used in `production` mode to authenticate with the Airtable API |


## Development

Using mock data

```sh
npm run dev
```

Using the data in Airtable

```sh
ELEVENTY_ENV='production' AIRTABLE_API_KEY='xyz' npm run dev
```

## Resources

- [Airtable API documentation](https://airtable.com/app4qb1AkwWAND48o/api/docs#curl/introduction) for my table.
- [LiquidJS](https://liquidjs.com)
- [11ty](https://www.11ty.dev)
