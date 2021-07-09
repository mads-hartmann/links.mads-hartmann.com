# Development environment

## Table of contents

<!-- toc -->

- [Gitpod](#gitpod)
- [Environment variables](#environment-variables)
- [Ports](#ports)
- [Git hooks](#git-hooks)

<!-- tocstop -->

## Gitpod

I use [Gitpod](https://www.gitpod.io/) to manage my development environment. See [.gitpod.Dockerfile](./../.gitpod.Dockerfile) for the concrete development environment and [.gitpod.yaml](./../.gitpod.yml) for Gitpod specific configuration (which ports to expose, what command to run during start-up etc.).

## Environment variables

The following environment variables needed. For Gitpod these can be configured in [Settings -> Variables](https://gitpod.io/variables).

| Name | Description |
| - | - |
| ELEVENTY_ENV | Either `development` or `production`. Will use mock data during development and real data from Airtable when set to production. |
| AIRTABLE_BASE_ID | The table ID |
| AIRTABLE_KEY | Used. to authenticate with the Airtable API |

## Ports

TODO: add ports

## Git hooks

I'm using [Husky](https://typicode.github.io/husky/#/) to handle Git hooks. The hooks can be found in the `.husky` folder.

pre-commit uses [lint-staged](https://github.com/okonet/lint-staged) to only target staged files. The configuration of `lint-staged` can be found in `.lintstagedrc.js`.