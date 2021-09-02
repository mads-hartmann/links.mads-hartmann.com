# TODOs

Keeping track of various TODOs for experiments and so on.

## Ideas

- [ ] Extend the app POST route to check for an RSS feed for the domain, if it exits find the specific URL item and grab the categories from the RSS feed and prefill the tags for any that match my tags.

## Monorepo

- [ ] Do I need those tsconfig.ref.json files?
  - [ ] I don't think TypeScript/NPM deals with dependencies well. E.g. if I change packages/lib and run `npm run build -w packages/web` it doesn't recompile lib. This is what TypeScript references is supposed to fix, so maybe it isn't configured correctly yet.

## Docs

- [x] Automatically create TOCs
- [ ] Spell-check
- [ ] Markdown linting
