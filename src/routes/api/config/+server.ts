import { json, type RequestHandler } from '@sveltejs/kit';
import { getConfig } from '$lib/util/config';

export const GET: RequestHandler = async () => {
  return json(await getConfig());
};
