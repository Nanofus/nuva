import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { getCommentsForPost, postComment } from '$lib/server/database';
import { t } from '$lib/client/localization';

export const GET: RequestHandler = async ({ params }) => {
  if (!params.slug) throw error(404, t.errors.e404);
  return json(await getCommentsForPost(params.slug));
};

export const POST: RequestHandler = async ({ params, request }) => {
  const authToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!authToken) throw error(403, t.errors.e403);
  const body = await request.json();
  if (!params.slug) throw error(404, t.errors.e404);
  const result = await postComment(authToken, body.post, body.parent, body.content);
  if (result) {
    return new Response();
  } else {
    throw error(500, t.errors.e500);
  }
};
