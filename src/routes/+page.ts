import { error, type Load } from "@sveltejs/kit";
import { getLatestComments, getPostList } from "$lib/database";
import type { PostsAndCommentsResponse } from "$lib/types";
import { LATEST_POSTS_PER_FETCH, META_CATEGORY_SLUG } from "$lib/config";

export const load: Load = async ({ fetch }): Promise<PostsAndCommentsResponse> => {
  const [postResponse, commentResponse] = await Promise.all([
    getPostList(fetch, null, "", LATEST_POSTS_PER_FETCH),
    getLatestComments(fetch)
  ]);
  if (postResponse && commentResponse) {
    postResponse.posts = postResponse.posts
      .filter(post => !post.categories.map(cat => cat.slug).includes(META_CATEGORY_SLUG));
    return {
      posts: postResponse,
      comments: commentResponse
    };
  }
  throw error(404, "Not found");
};
