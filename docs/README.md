# Tempo Docs

This app is part of the Tempo workspace and depends on the root package via
`workspace:*`. Install dependencies from the repository root, not from
`docs/`.

## Requirements

- Node `^20.19.0 || >=22.12.0`
- Corepack-enabled `pnpm`

## Install

From the repository root:

```bash
corepack enable
pnpm install
```

Running `npm install` in the repository root or inside `docs/` will not set up
the docs app correctly because the local `@formkit/tempo` dependency is
resolved through the pnpm workspace.

## Development

From the repository root:

```bash
pnpm dev

# or

npm run dev
```

The docs app runs on `http://localhost:3000`.

## Production Build

From the repository root:

```bash
pnpm docs-build

# or

npm run docs-build
```

## Preview

After installing from the repository root, you can preview directly from the
docs app:

```bash
npm --prefix ./docs run preview
```
