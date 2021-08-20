# NextJS

Nothing specific for now.

## SQLite

I export my Airtable to an SQLite database for easy querying. See [/ci/refresh-links-db.sh](/ci/refresh-links-db.sh) for details.

## Node version

Currently using 14.x as that's what Vercel supports. To make sure all environment match you should update the following whenever the version of Node is changed

- CircleCI configuration
- Gitpod configuration
- Vercel configuration

## Typescript version

TODO: how do I make sure it's the same version of Typescript that's used by ts-node and Vercel during compilation?

## Tests

Using [Mocha](https://mochajs.org/) with [Chai](https://www.chaijs.com/) as the assertion library (with the [chai as promised](https://www.chaijs.com/plugins/chai-as-promised/) plugin) with [ts-node](https://github.com/TypeStrong/ts-node) as the executor.

Chai has been configured to use the chai-as-promised plugin in [nextjs/test/chai-setup.ts](../nextjs/test/chai-setup.ts) which is begin required in [nextjs/.mocharc.json](./../nextjs/.mocharc.json).

For coverage [nyc](https://github.com/istanbuljs/nyc) is used; see [.nycrc](.../nextjs/.nycrc) for the configuration.

This uses a slightly different Typescript configuration, see [tsconfig.test.json](./../nextjs/tsconfig.test.json); this is needed as NextJS uses esnext modules whereas mocha needs commonjs modules.

### Unit tests

To run unit tests:

```sh
npm run test:unit
```

For coverage run

```sh
npm run test:unit-coverage
```

### E2E tests

```sh
npm run test:e2e
```

### Running a single test

Either use `.only` on the `describe` or `it` invocation and then use the `npm` scripts. Our you can manually use `mocha`

```sh
 ./node_modules/.bin/mocha lib/scrape.e2e.ts
```
