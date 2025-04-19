import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { latestCommentHook } from '$lib/server/webhooks';
import { t } from '$lib/client/localization';
import { invalidateByComment } from '$lib/server/cache';

export const POST: RequestHandler = async ({ params, request }) => {
  if (params.slug !== import.meta.env.VITE_WEBHOOK_SECRET) throw error(401, t.errors.e401);
  invalidateByComment(await request.json());
  await latestCommentHook();
  return json({ success: true });
};
