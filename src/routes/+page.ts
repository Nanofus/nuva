import { error, type Load } from "@sveltejs/kit";
import { getLatestComments, getPostList } from "$lib/db/graphql";
import type { PostsAndCommentsResponse } from "$lib/util/types";
import { LATEST_POSTS_PER_FETCH } from "$lib/config";
import { filterExcludedCategories } from "$lib/util/util";
import { t } from "$lib/translations";

export const load: Load = async ({ fetch }): Promise<PostsAndCommentsResponse> => {
  const [postResponse, commentResponse] = await Promise.all([
    getPostList(fetch, null, "", LATEST_POSTS_PER_FETCH),
    getLatestComments(fetch),
  ]);
  if (postResponse && commentResponse) {
    postResponse.posts = filterExcludedCategories(postResponse.posts);
    return {
      posts: postResponse,
      comments: commentResponse,
    };
  }

  throw error(404, t.errors.e404);
};
