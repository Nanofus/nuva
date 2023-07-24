import { error, type Load } from "@sveltejs/kit";
import { getPostList } from "$lib/database";
import type { PostListResponse } from "$lib/types";
import { filterExcludedCategories } from "$lib/util";

export const load: Load = async ({ fetch }): Promise<PostListResponse> => {
  let allLoaded = false;
  let endCursor = null;
  let finalResponse: PostListResponse = {
    posts: [],
    endCursor: "",
    hasNextPage: false
  };
  while (!allLoaded) {
    const response = await getPostList(fetch, endCursor);
    if (!response) throw error(404, "Not found");
    if (!response.hasNextPage) allLoaded = true;
    endCursor = response.endCursor;
    finalResponse.posts = [...finalResponse.posts, ...response.posts];
  }
  finalResponse.posts = filterExcludedCategories(finalResponse.posts);
  return finalResponse;
};
