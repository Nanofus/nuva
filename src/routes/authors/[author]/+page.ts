import { error, type Load } from "@sveltejs/kit";
import { getPostListByAuthor } from "$lib/database";
import type { PostListByAuthorResponse } from "$lib/types";

export const load: Load = async ({ fetch, params }): Promise<PostListByAuthorResponse> => {
  if (params.author) {
    const response = await getPostListByAuthor(fetch, params.author);
    if (response) return response;
  }
  throw error(404, "Not found");
};
