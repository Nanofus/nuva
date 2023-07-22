import { error, type Load } from "@sveltejs/kit";
import { getPostList } from "$lib/database";
import type { PostListResponse } from "$lib/types";
import { filterExcludedCategories } from "$lib/util";

export const load: Load = async ({ fetch }): Promise<PostListResponse> => {
  const response = await getPostList(fetch);
  if (response) {
    response.posts = filterExcludedCategories(response.posts);
    return response;
  }
  throw error(404, "Not found");
};