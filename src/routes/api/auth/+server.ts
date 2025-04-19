import { login } from '$lib/server/auth';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { t } from '$lib/client/localization';

export const POST: RequestHandler = async ({ request }: { request: any }) => {
  const { username, password } = await request.json();
  const loginResult = await login(username, password);
  if (!loginResult) throw error(401, t.errors.e401);
  return json(loginResult);
};
