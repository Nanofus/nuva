# Klaanon Nuva

This is a SvelteKit-based frontend for a WordPress backend, with a bunch of features specialized for a Finnish
fanfiction project.

Might also be usable for other use cases.

## Developing

Once you've created a project and installed dependencies with `pnpm install`, create a `.env.local` file and fill it
with the environment variables listed in `.env.example` (database schema to be defined).

When this is done, start the development server:

```bash
npm run dev
```

The app is automatically deployed upon commits to the `main` branch.
