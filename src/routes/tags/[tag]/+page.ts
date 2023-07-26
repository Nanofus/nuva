import { error, type Load } from "@sveltejs/kit";
import { getPostListByTag } from "$lib/util/database";
import type { PostListByTagResponse } from "$lib/util/types";
import { t } from "$lib/translations";

export const load: Load = async ({ fetch, params }): Promise<PostListByTagResponse> => {
  if (params.tag) {
    const response = await getPostListByTag(fetch, params.tag);
    if (response) return response;
  }
  throw error(404, t.errors.e404);
};
