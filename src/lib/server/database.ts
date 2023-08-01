import { createKysely } from "@vercel/postgres-kysely";
import type { DB } from "$lib/server/database.types";

// New Postgres queries

const db = createKysely<DB>({
  connectionString: import.meta.env.VITE_POSTGRES_URL,
});
