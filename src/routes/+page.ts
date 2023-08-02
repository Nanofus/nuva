import { error, type Load } from "@sveltejs/kit";
import { getLatestComments, getPostsPaginated } from "$lib/db/graphql";
import type { PostsAndCommentsResponse } from "$lib/util/types";
import { filterExcludedCategories } from "$lib/util/util";
import { t } from "$lib/util/translations";
import { globalConfig } from "$lib/util/config";

export const load: Load = async ({ fetch }): Promise<PostsAndCommentsResponse> => {
  const [postResponse, commentResponse] = await Promise.all([
    getPostsPaginated(fetch, null, "", globalConfig.latestPostsPerFetch),
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
