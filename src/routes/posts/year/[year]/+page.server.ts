import { error, type Load } from '@sveltejs/kit';
import type { PostListByYearResponse } from '$lib/util/types';
import { filterExcludedCategories } from '$lib/util/util';
import { t } from '$lib/util/translations';
import { getPostsByYear } from '$lib/server/database';
import { ISR_BYPASS_TOKEN } from '$env/static/private';

export const config = {
  isr: {
    expiration: 60,
    bypassToken: ISR_BYPASS_TOKEN
  }
};

export const load: Load = async ({ params }): Promise<PostListByYearResponse> => {
  if (!params.year || isNaN(Number(params.year))) throw error(400, t.errors.e400);
  const response = await getPostsByYear(Number(params.year));
  if (response) {
    response.posts = filterExcludedCategories(response.posts);
    return response;
  }

  throw error(404, t.errors.e404);
};
