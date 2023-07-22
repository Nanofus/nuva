import { error, type Load } from "@sveltejs/kit";
import { getLatestComments, getPostList } from "$lib/database";
import type { PostsAndCommentsResponse } from "$lib/types";
import { LATEST_POSTS_PER_FETCH } from "$lib/config";
import { filterExcludedCategories } from "$lib/util";

export const load: Load = async ({ fetch }): Promise<PostsAndCommentsResponse> => {
  const [postResponse, commentResponse] = await Promise.all([
    getPostList(fetch, null, "", LATEST_POSTS_PER_FETCH),
    getLatestComments(fetch)
  ]);
  if (postResponse && commentResponse) {
    postResponse.posts = filterExcludedCategories(postResponse.posts);
    return {
      posts: postResponse,
      comments: commentResponse
    };
  }
  throw error(404, "Not found");
};
