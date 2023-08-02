import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { latestCommentHook, latestPostHook } from "$lib/server/webhooks";

export const GET: RequestHandler = async () => {
  await latestPostHook();
  await latestCommentHook();
  return json({ success: true });
};
