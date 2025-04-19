import { error, type Load } from '@sveltejs/kit';
import { getPostsByCategory } from '$lib/server/database';
import type { PostListByCategoryResponse } from '$lib/types';
import { t } from '$lib/client/localization';

export const load: Load = async ({ params }): Promise<PostListByCategoryResponse> => {
  if (params.category) {
    const response = await getPostsByCategory(params.category);
    if (response) {
      return response;
    }
  }

  throw error(404, t.errors.e404);
};
