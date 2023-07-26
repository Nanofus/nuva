import { error, type Load } from "@sveltejs/kit";
import { getPostBySlug } from "$lib/database";
import type { Post } from "$lib/types";
import { t } from "$lib/translations";

export const load: Load = async ({ fetch, params }): Promise<Post | null> => {
  if (params.slug) {
    return await getPostBySlug(fetch, params.slug);
  }
  throw error(404, t.errors.e404);
};
