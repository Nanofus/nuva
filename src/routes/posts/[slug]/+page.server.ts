import { error, type Load } from "@sveltejs/kit";
import { getPost } from "$lib/server/database";
import type { Post } from "$lib/util/types";
import { t } from "$lib/util/translations";
import { validateHTML } from "$lib/server/html-validator";

export const load: Load = async ({ params, url }): Promise<Post | null> => {
  if (params.slug) {
    const isPreview = url.searchParams.get("preview") != null;
    const post = await getPost(params.slug);
    if (isPreview && post) {
      post.validationResult = validateHTML(post.content);
    }
    return post;
  }

  throw error(404, t.errors.e404);
};
