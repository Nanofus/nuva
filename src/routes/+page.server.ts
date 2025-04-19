import { error, type Load } from '@sveltejs/kit';
import { getLatestComments, getLatestPosts } from '$lib/server/database';
import type { PostsAndCommentsResponse } from '$lib/util/types';
import { filterExcludedCategories } from '$lib/util/util';
import { t } from '$lib/util/translations';
import { ISR_BYPASS_TOKEN } from '$env/static/private';

export const config = {
  isr: {
    expiration: 60,
    bypassToken: ISR_BYPASS_TOKEN
  }
};

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
