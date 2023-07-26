import { error, type Load } from "@sveltejs/kit";
import { getPostListByTag } from "$lib/database";
import type { PostListByTagResponse } from "$lib/types";
import { t } from "$lib/translations";

export const load: Load = async ({ fetch, params }): Promise<PostListByTagResponse> => {
  if (params.tag) {
    const response = await getPostListByTag(fetch, params.tag);
    if (response) return response;
  }
  throw error(404, t.errors.e404);
};
