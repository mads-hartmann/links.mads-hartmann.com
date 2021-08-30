# Project structure

This is a monorepo. It's been implemented using [NPM workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) and [TypeScript project references](https://www.typescriptlang.org/docs/handbook/project-references.html). Each packages uses [ESM (ECMAScript Modules)](https://nodejs.org/api/esm.html).

- package.json : the top-level package.json specifies the `workspaces`
- ./packages/tsconfig.json : This specifies the TypeScript project references
- ./packages/*/package.json : describes the individual packages (notice type: module, exports, and typesVersions)
- ./packages/*/tsconfig.json : The typescript config for the individual package
- ./packages/*/tsconfig.ref.json : TODO: I'm not sure I actually need this.

This is based on [this guide](https://2ality.com/2021/07/simple-monorepos.html) and leave a reference to it here

To run a command, in this case `build`, for all workspaces, use the `--workspaces` flag:

```sh
npm run build --workspaces
```

To run a command for a single workspace, in this case `lib`, use the `--workspace` flag:

```sh
npm run rest --workspace packages/lib
```
