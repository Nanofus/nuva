import { createKysely } from "@vercel/postgres-kysely";
import type { DB, Meta } from "$lib/server/database.types";

const db = createKysely<DB>({
  connectionString: import.meta.env.VITE_POSTGRES_URL,
});

export const getLatestPostSlug = async () => {
  const result: Meta | undefined = await db
    .selectFrom("Meta")
    .where("key", "=", "latestPost")
    .selectAll()
    .executeTakeFirst();
  if (!result) return null;
  return result.value;
};

export const setLatestPostSlug = async (slug: string) => {
  const result = await db
    .updateTable("Meta")
    .where("key", "=", "latestPost")
    .set({
      value: slug,
    })
    .executeTakeFirst();
  return BigInt(1) === result.numUpdatedRows;
};

export const getLatestCommentId = async () => {
  const result: Meta | undefined = await db
    .selectFrom("Meta")
    .where("key", "=", "latestComment")
    .selectAll()
    .executeTakeFirst();
  if (!result || !result.value) return null;
  return parseInt(result.value);
};

export const setLatestCommentId = async (id: number) => {
  const result = await db
    .updateTable("Meta")
    .where("key", "=", "latestComment")
    .set({
      value: String(id),
    })
    .executeTakeFirst();
  return BigInt(1) === result.numUpdatedRows;
};
