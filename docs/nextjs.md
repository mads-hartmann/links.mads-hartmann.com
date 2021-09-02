# NextJS

## Table of contents

<!-- toc -->

- [Project structure](#project-structure)
- [Building](#building)
- [Runnings tests](#runnings-tests)
  * [Running a single test](#running-a-single-test)
- [SQLite](#sqlite)

<!-- tocstop -->

## Project structure

This is a monorepo. It's been implemented using [NPM workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) and [TypeScript project references](https://www.typescriptlang.org/docs/handbook/project-references.html). Each packages uses [ESM (ECMAScript Modules)](https://nodejs.org/api/esm.html).

- package.json : the top-level package.json specifies the `workspaces`
- ./packages/tsconfig.json : This specifies the TypeScript project references
- ./packages/*/package.json : describes the individual packages (notice type: module, exports, and typesVersions)
- ./packages/*/tsconfig.json : The typescript config for the individual package
- ./packages/*/tsconfig.ref.json : TODO: I'm not sure I actually need this.

This is based on [this guide](https://2ality.com/2021/07/simple-monorepos.html) and leave a reference to it here

## Building

To run an NPM command, in this case `build`, for all workspaces, use the `--workspaces` flag:

```sh
npm run build --workspaces
```

To run a command for a single workspace, in this case `lib`, use the `--workspace` flag:

```sh
npm run build --workspace packages/lib
```

## Runnings tests

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

### Running a single test

Either use `.only` on the `describe` or `it` invocation and then use the `npm` scripts. Our you can manually use `mocha`

```sh
 (cd packages/lib && ../../node_modules/.bin/mocha ts/scrape.e2e.ts)
```

## SQLite

I export my Airtable to an SQLite database for easy querying. See [/ci/refresh-links-db.sh](/ci/refresh-links-db.sh) for details.

To query the SQLite database

```sh
sqlite3 packages/web/public/data/links.db
```

See [db-queriers](./db-queries.md) for example queries.
