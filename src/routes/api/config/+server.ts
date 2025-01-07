import { json, type RequestHandler } from '@sveltejs/kit';
import { loadServerConfig } from '$lib/util/config';

export const GET: RequestHandler = async () => {
  return json(await loadServerConfig());
};
