import type { RequestHandler } from "@sveltejs/kit";
import { error, json } from "@sveltejs/kit";
import { latestCommentHook, latestPostHook } from "$lib/server/webhooks";
import { t } from "$lib/util/translations";
import { globalConfig } from "$lib/util/config";

// TODO: Require a secret key to be passed in the request
export const GET: RequestHandler = async ({ url }) => {
  const password = url.searchParams.get("password");
  if (password !== globalConfig.webhooks.password) throw error(401, t.errors.e401);
  await latestPostHook();
  await latestCommentHook();
  return json({ success: true });
};
