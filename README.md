# links.mads-hartmann.com

For quite a while I've been keeping track of blog posts, conference talks, etc. that I have read or might want to read at some point. I store it all in Airtable, but in this repository I experiment with different ways of consuming the data.

See [./docs/development-environment.md](./docs/development-environment.md) for notes on how the development environment is set up.

## Datasette

One way to view the data is to use [Datasette](https://datasette.io/). I use the [Airtable Exporter](https://datasette.io/tools/airtable-export) to generate a SQLite database from my Airtable base and then use Datasette to explore the data:

- Links are queryable using SQL
- Full-text search is enabled

See [docs/datasette.md](./docs/datasette.md) for more notes.

## 11ty

I use 11ty to generate a static site rendering all he links in my Airtable base. I have created a custom data source that uses the Airtable API to fetch all the records. The static site is published on links.mads-hartmann.com.

See [docs/11ty.md](./docs/11ty.md) for more notes.