import { error, type Load } from "@sveltejs/kit";
import { getPost } from "$lib/server/database";
import type { PostResponse } from "$lib/util/types";
import { t } from "$lib/util/translations";

export const load: Load = async ({ params }): Promise<PostResponse> => {
  if (params.slug) {
    return {
      slug: params.slug,
      post: await getPost(params.slug),
    };
  }

  throw error(404, t.errors.e404);
};
