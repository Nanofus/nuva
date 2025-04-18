import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { latestCommentHook } from '$lib/server/webhooks';
import { t } from '$lib/util/translations';

export const GET: RequestHandler = async ({ params, request }) => {
  if (params.slug !== import.meta.env.VITE_WEBHOOK_SECRET) throw error(401, t.errors.e401);
  const body = await request.json();
  const commentId = body.comment_id;
  await latestCommentHook(commentId);
  return json({ success: true });
};
