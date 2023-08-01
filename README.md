# Nuva

This is a frontend + serverless API for a WordPress+ACF backend, with a bunch of features specialized for a Finnish
fanfiction project. The eventual goal is to remove WordPress from the equation.

Might also be usable for other use cases, and as learning material, so feel free to fork and tinker.

Tech stack: SvelteKit, TypeScript, SASS, Kysely/Prisma, Postgres, AWS S3. The production environment runs on Vercel.

## Development

Once you've created a project and installed dependencies with `pnpm install` (or other package manager), create
a `.env` file and fill it
with the environment variables listed in `.env.example`.

When this is done, start the development server:

```bash
turbo dev
```

## Build

To create an production version of the app:

```bash
turbo build
```
