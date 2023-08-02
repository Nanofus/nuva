import { error, type Load } from "@sveltejs/kit";
import { getLatestComments, getLatestPosts } from "$lib/db/graphql";
import type { PostsAndCommentsResponse } from "$lib/util/types";
import { filterExcludedCategories } from "$lib/util/util";
import { t } from "$lib/util/translations";

export const load: Load = async ({ fetch }): Promise<PostsAndCommentsResponse> => {
  const [postResponse, commentResponse] = await Promise.all([
    getLatestPosts(fetch),
    getLatestComments(fetch),
  ]);
  if (postResponse && commentResponse) {
    const posts = filterExcludedCategories(postResponse);
    return {
      posts,
      comments: commentResponse,
    };
  }

  throw error(404, t.errors.e404);
};
