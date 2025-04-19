import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { t } from '$lib/client/localization';
import { invalidateByPost } from '$lib/server/cache';

export const POST: RequestHandler = async ({ params, request }) => {
  if (params.slug !== import.meta.env.VITE_WEBHOOK_SECRET) throw error(401, t.errors.e401);
  invalidateByPost(await request.json());
  return json({ success: true });
};
