import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { getTags } from "$lib/server/database";

export const GET: RequestHandler = async ({ url }) => {
  let after = url.searchParams.get("after");
  if (after) after = decodeURI(after);
  return json(await getTags(after));
};
