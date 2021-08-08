# links.mads-hartmann.com

For quite a while I've been keeping track of blog posts, conference talks, etc. that I have read or might want to read at some point. I store it all in Airtable, but in this repository I experiment with different ways of consuming the data.

See [./docs/development-environment.md](./docs/development-environment.md) for notes on how the development environment is set up.

## Table of contents

<!-- toc -->

- [Datasette](#datasette)
- [NextJS](#nextjs)

<!-- tocstop -->

## Datasette

One way to view the data is to use [Datasette](https://datasette.io/). I use the [Airtable Exporter](https://datasette.io/tools/airtable-export) to generate a SQLite database from my Airtable base and then use Datasette to explore the data:

- Links are queryable using SQL
- Full-text search is enabled

See [docs/datasette.md](./docs/datasette.md) for more notes.

## NextJS

I'm using NextJS to create a website to browse my links.

See [docs/nextjs.md](./docs/nextjs.md) for more notes.
