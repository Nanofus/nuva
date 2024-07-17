import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { latestCommentHook, latestPostHook } from '$lib/server/webhooks';
import { t } from '$lib/util/translations';

export const GET: RequestHandler = async ({ request }) => {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== process.env.CRON_SECRET) throw error(401, t.errors.e401);
  await latestPostHook();
  await latestCommentHook();
  return json({ success: true });
};
