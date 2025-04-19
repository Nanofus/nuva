import { error, type Load } from '@sveltejs/kit';
import { getPosts } from '$lib/server/database';
import type { PostListBySearchResponse } from '$lib/types';
import { t } from '$lib/client/localization';

export const load: Load = async ({ params }): Promise<PostListBySearchResponse> => {
  if (params.term) {
    const response = await getPosts(null, params.term);
    if (response) {
      return response;
    }
  }

  throw error(404, t.errors.e404);
};
