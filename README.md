# links.mads-hartmann.com

For quite a while I've been keeping track of blog posts, conference talks, etc. that I have read or might want to read at some point. I store it all in Airtable, but in this repository I experiment with different ways of augmenting and exploring the data.

## Table of contents

<!-- toc -->

- [Development environment](#development-environment)
  * [Environment variables](#environment-variables)
  * [Ports](#ports)
  * [Node version](#node-version)
  * [Typescript version](#typescript-version)
    + [Compilation target](#compilation-target)
  * [Git hooks](#git-hooks)
- [Source code](#source-code)
  * [Project structure](#project-structure)
  * [Building](#building)
  * [Runnings tests](#runnings-tests)
    + [Running a single test](#running-a-single-test)
- [Exploring the SQLite data](#exploring-the-sqlite-data)
  * [Datasette](#datasette)
  * [SQLite](#sqlite)

<!-- tocstop -->

## Development environment

I use [Gitpod](https://www.gitpod.io/) to manage my development environment. See [.gitpod.Dockerfile](./../.gitpod.Dockerfile) for the concrete development environment and [.gitpod.yaml](./../.gitpod.yml) for Gitpod specific configuration (which ports to expose, what command to run during start-up etc.).

### Environment variables

The following environment variables are required. For Gitpod these can be configured in [Settings -> Variables](https://gitpod.io/variables). For Vercel they can be configured in [Environment Variables](https://vercel.com/mads-hartmann/links-mads-hartmann-com/settings/environment-variables)

| Name             | Description                                |
| ---------------- | ------------------------------------------ |
| AIRTABLE_BASE_ID | The table ID                               |
| AIRTABLE_KEY     | Used to authenticate with the Airtable API |


### Ports

- 3000 is the NextJS web app
- 8001 is Datasette

### Node version

Currently using 14.x as that's what Vercel supports. To make sure all environment match you should update the following whenever the version of Node is changed

- CircleCI configuration
- Gitpod configuration
- Vercel configuration

### Typescript version

TODO: how do I make sure it's the same version of Typescript that's used by ts-node and Vercel during compilation?

#### Compilation target

As the Node runtime is 14 I have configured Typescript based on the recommendations [here](https://github.com/tsconfig/bases/blob/main/bases/node14.json); which is es2020.

### Git hooks

I'm using [Husky](https://typicode.github.io/husky/#/) to handle Git hooks. The hooks can be found in the `.husky` folder.

pre-commit uses [lint-staged](https://github.com/okonet/lint-staged) to only target staged files. The configuration of `lint-staged` can be found in `.lintstagedrc.js`.

## Source code

### Project structure

This is a monorepo. It's been implemented using [NPM workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) and [TypeScript project references](https://www.typescriptlang.org/docs/handbook/project-references.html).

- package.json : the top-level package.json specifies the `workspaces`
- ./packages/tsconfig.json : This specifies the TypeScript project references
- ./packages/*/package.json : Describes the individual packages (notice type: module, exports, and typesVersions)
- ./packages/*/tsconfig.json : The TypeScript config for the individual package
- ./packages/*/tsconfig.ref.json : TODO:**** I'm not sure I actually need this.

This is based on [this guide](https://2ality.com/2021/07/simple-monorepos.html) and leave a reference to it here

### Building

To run an NPM command, in this case `build`, for all workspaces, use the `--workspaces` flag:

```sh
npm run build --workspaces
```

To run a command for a single workspace, in this case `lib`, use the `--workspace` flag:

```sh
npm run build --workspace packages/lib
```

### Runnings tests

The tests are written using [Mocha](https://mochajs.org/) with [Chai](https://www.chaijs.com/) as the assertion library (with the [chai as promised](https://www.chaijs.com/plugins/chai-as-promised/) plugin) and [ts-node](https://github.com/TypeStrong/ts-node) as the executor.

Chai has been configured to use the chai-as-promised plugin in [packages/lib/ts/test/chai-setup.ts](../packages/lib/ts/test/chai-setup.ts) which is begin required in [packages/lib/.mocharc.json](../packages/lib/.mocharc.json).

For coverage [nyc](https://github.com/istanbuljs/nyc) is used; see [packages/lib/.nycrc](.../packages/lib//.nycrc) for the configuration.

To run an NPM command, in this case `test:unit`, for all workspaces, use the `--workspaces` flag:

```sh
npm run test:unit --workspaces
```

To run a command for a single workspace, in this case `lib`, use the `--workspace` flag:

```sh
npm run test:unit --workspace packages/lib
```

#### Running a single test

Either use `.only` on the `describe` or `it` invocation and then use the `npm` scripts. Our you can manually use `mocha`

```sh
 (cd packages/lib && ../../node_modules/.bin/mocha ts/scrape.e2e.ts)
```

## Exploring the SQLite data

### Datasette

One way to view the data is to use [Datasette](https://datasette.io/). I use the [Airtable Exporter](https://datasette.io/tools/airtable-export) to generate a SQLite database from my Airtable base and then use Datasette to explore the data:

- Links are queryable using SQL
- Full-text search is enabled

See [docs/datasette.md](./docs/datasette.md) for more notes.

### SQLite

I export my Airtable to an SQLite database for easy querying. See [/ci/refresh-links-db.sh](/ci/refresh-links-db.sh) for details.

To query the SQLite database

```sh
sqlite3 packages/web/public/data/links.db
```

See [db-queriers](./docs/db-queries.md) for example queries.
