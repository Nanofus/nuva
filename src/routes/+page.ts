import { error, type Load } from "@sveltejs/kit";
import { getPostList } from "$lib/database";
import type { PostListResponse } from "$lib/types";
import { META_CATEGORY_SLUG } from "$lib/config";

export const load: Load = async ({ fetch }): Promise<PostListResponse> => {
  const response = await getPostList(fetch);
  if (response) {
    response.posts = response.posts
      .filter(post => !post.categories.map(cat => cat.slug).includes(META_CATEGORY_SLUG));
    return response;
  }
  throw error(404, "Not found");
};
