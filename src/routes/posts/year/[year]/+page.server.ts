import { error, type Load } from '@sveltejs/kit';
import type { PostListByYearResponse } from '$lib/types';
import { filterExcludedCategories } from '$lib/server/util';
import { t } from '$lib/client/localization';
import { getPostsByYear } from '$lib/server/database';
import { defaultIsrConfig } from '$lib/server/cache';

export const config = defaultIsrConfig;

export const load: Load = async ({ params }): Promise<PostListByYearResponse> => {
  if (!params.year || isNaN(Number(params.year))) throw error(400, t.errors.e400);
  const response = await getPostsByYear(Number(params.year));
  if (response) {
    response.posts = filterExcludedCategories(response.posts);
    return response;
  }

  throw error(404, t.errors.e404);
};
