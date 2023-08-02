import { error, json, type RequestHandler } from "@sveltejs/kit";
import { getPost } from "$lib/server/database";
import { t } from "$lib/util/translations";

export const GET: RequestHandler = async ({ params, request }) => {
  const authToken = request.headers.get("Authorization")?.split(" ")[1];
  if (!params.slug) throw error(404, t.errors.e404);
  const post = await getPost(params.slug, authToken);
  if (post) return json(post);
  throw error(404, t.errors.e404);
};
