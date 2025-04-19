import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { latestPostHook } from '$lib/server/webhooks';
import { t } from '$lib/util/translations';
import { invalidateByPost } from '$lib/server/cache';

export const POST: RequestHandler = async ({ params, request }) => {
  if (params.slug !== import.meta.env.VITE_WEBHOOK_SECRET) throw error(401, t.errors.e401);
  await invalidateByPost(await request.json());
  await latestPostHook();
  return json({ success: true });
};
