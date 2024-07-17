import { error, json, type RequestHandler } from '@sveltejs/kit';
import { getPost } from '$lib/server/database';
import { t } from '$lib/util/translations';
import { validateHTML } from '$lib/server/html-validator';

export const GET: RequestHandler = async ({ url, params, request }) => {
  const authToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!params.slug) throw error(404, t.errors.e404);
  const isPreview = url.searchParams.get('preview') != null;
  const post = await getPost(params.slug, authToken);
  if (isPreview && post) {
    post.validationResult = validateHTML(post.content);
  }
  if (post) return json(post);
  throw error(404, t.errors.e404);
};
