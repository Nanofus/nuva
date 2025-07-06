import { error, type Load } from '@sveltejs/kit';
import type { PostListByDateResponse } from '$lib/types';
import { filterExcludedCategories } from '$lib/server/util';
import { t } from '$lib/client/localization';
import { getPostsByDate } from '$lib/server/database';
import { defaultIsrConfig } from '$lib/server/cache';

export const config = defaultIsrConfig;

export const load: Load = async ({ params }): Promise<PostListByDateResponse> => {
  if (!params.date) throw error(400, t.errors.e400);
  const response = await getPostsByDate(params.date);
  if (response) {
    response.posts = filterExcludedCategories(response.posts);
    return response;
  }

  throw error(404, t.errors.e404);
};
