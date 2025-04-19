import { error, type Load } from '@sveltejs/kit';
import { getLatestComments, getLatestPosts } from '$lib/server/database';
import type { PostsAndCommentsResponse } from '$lib/types';
import { filterExcludedCategories } from '$lib/server/util';
import { t } from '$lib/client/localization';
import { defaultIsrConfig } from '$lib/server/cache';

export const config = defaultIsrConfig;

export const load: Load = async (): Promise<PostsAndCommentsResponse> => {
  const [postResponse, commentResponse] = await Promise.all([
    getLatestPosts(),
    getLatestComments()
  ]);
  if (postResponse && commentResponse) {
    const posts = filterExcludedCategories(postResponse);
    return {
      posts,
      comments: commentResponse
    };
  }

  throw error(404, t.errors.e404);
};
