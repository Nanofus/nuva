import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { latestCommentHook } from '$lib/server/webhooks';
import { t } from '$lib/util/translations';

export const GET: RequestHandler = async ({ params }) => {
  if (params.slug !== import.meta.env.VITE_WEBHOOK_SECRET) throw error(401, t.errors.e401);
  await latestCommentHook();
  return json({ success: true });
};
