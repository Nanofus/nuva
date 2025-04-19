import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { t } from '$lib/util/translations';
import { invalidateByComment } from '$lib/server/cache';

export const POST: RequestHandler = async ({ params, request }) => {
  if (params.slug !== import.meta.env.VITE_WEBHOOK_SECRET) throw error(401, t.errors.e401);
  invalidateByComment(await request.json());
  return json({ success: true });
};
