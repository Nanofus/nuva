import { error, json } from "@sveltejs/kit";
import { t } from "$lib/util/translations";
import { authenticated } from "$lib/server/auth";

export const GET = async ({ request }: { request: any }) => {
  const authResult = await authenticated(request);
  if (!authResult) throw error(401, t.errors.e401);
  return json(authResult);
};
