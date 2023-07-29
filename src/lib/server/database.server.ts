import { createKysely } from "@vercel/postgres-kysely";
import type { Database } from "$lib/server/database.schema.server";

// New Postgres queries

const db = createKysely<Database>({
	connectionString: import.meta.env.VITE_POSTGRES_URL,
});
