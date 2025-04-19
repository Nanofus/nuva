# Nuva

This is a frontend + serverless API for a WordPress+ACF backend, with a bunch of features specialized for a Finnish
fanfiction project. The eventual goal is to remove WordPress from the equation.

Might also be usable for other use cases, and as learning material, so feel free to fork and tinker.

Tech stack: SvelteKit, TypeScript, SASS, Kysely, Prisma, Postgres, AWS S3, Vercel.

The production environment runs on Vercel. There's a couple of Vercel-specific things in the repo, which you should replace if not hosting in Vercel. These are:

- `svelte.config.js` uses `@sveltejs/adapter-vercel`. Replace with `@sveltejs/adapter-node` or other adapter.
- `src/lib/server/database.ts` connects to Postgres using `@vercel/postgres`, and can be directly replaced with `node-postgres`.
- `src/lib/server/cache.ts` manages caching using Vercel ISR.

## Development

First, install dependencies with `npm install`.

If you're using Vercel, create a Postgres database there, then add the credentials to `.env`. Note that the env variables need to have the `VITE_` prefix. Otherwise, host Postgres elsewhere (and update `.env` like above).

Populate the Postgres database with Prisma:

```bash
prisma db push
```

When this is done, start the development server:

```bash
turbo dev
```

## Build

To create an production version of the app:

```bash
turbo build
```
