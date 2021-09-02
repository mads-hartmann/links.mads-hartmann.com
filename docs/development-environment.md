# Development environment

## Table of contents

<!-- toc -->

- [Gitpod](#gitpod)
- [Environment variables](#environment-variables)
- [Ports](#ports)
- [Node version](#node-version)
- [Typescript version](#typescript-version)
- [Git hooks](#git-hooks)

<!-- tocstop -->

## Gitpod

I use [Gitpod](https://www.gitpod.io/) to manage my development environment. See [.gitpod.Dockerfile](./../.gitpod.Dockerfile) for the concrete development environment and [.gitpod.yaml](./../.gitpod.yml) for Gitpod specific configuration (which ports to expose, what command to run during start-up etc.).

## Environment variables

The following environment variables needed. For Gitpod these can be configured in [Settings -> Variables](https://gitpod.io/variables). For Vercel they can be configued in [Environment Variables](https://vercel.com/mads-hartmann/links-mads-hartmann-com/settings/environment-variables)

| Name             | Description                                 |
| ---------------- | ------------------------------------------- |
| AIRTABLE_BASE_ID | The table ID                                |
| AIRTABLE_KEY     | Used. to authenticate with the Airtable API |

## Ports

TODO: add ports

## Node version

Currently using 14.x as that's what Vercel supports. To make sure all environment match you should update the following whenever the version of Node is changed

- CircleCI configuration
- Gitpod configuration
- Vercel configuration

## Typescript version

TODO: how do I make sure it's the same version of Typescript that's used by ts-node and Vercel during compilation?

### Compilation target

As the Node runtime is 14 I have configured Typescript based on the recommendations [here](https://github.com/tsconfig/bases/blob/main/bases/node14.json); which is es2020.

## Git hooks

I'm using [Husky](https://typicode.github.io/husky/#/) to handle Git hooks. The hooks can be found in the `.husky` folder.

pre-commit uses [lint-staged](https://github.com/okonet/lint-staged) to only target staged files. The configuration of `lint-staged` can be found in `.lintstagedrc.js`.
