import { getCategories } from '$lib/server/database';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  return json(await getCategories());
};
