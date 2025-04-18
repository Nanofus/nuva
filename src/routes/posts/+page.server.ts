import { error, type Load } from '@sveltejs/kit';
import { getPosts } from '$lib/server/database';
import type { PostListResponse } from '$lib/util/types';
import { filterExcludedCategories } from '$lib/util/util';
import { t } from '$lib/util/translations';
import { getConfig } from '$lib/util/config';

export const config = {
  isr: {
    expiration: 600,
    bypassToken: getConfig().isrBypassToken,
  },
};

export const load: Load = async (): Promise<PostListResponse> => {
  const response = await getPosts();
  if (response) {
    response.posts = filterExcludedCategories(response.posts);
    return response;
  }

  throw error(404, t.errors.e404);
};
