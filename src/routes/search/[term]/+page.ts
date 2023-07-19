import { error, type Load } from "@sveltejs/kit";
import { getPostList } from "$lib/database";
import type { PostListBySearchResponse } from "$lib/types";

export const load: Load = async ({ fetch, params }): Promise<PostListBySearchResponse> => {
  if (params.term) {
    const response = await getPostList(fetch, null, params.term);
    response.termSlug = params.term;
    if (response) return response;
  }
  throw error(404, "Not found");
};
