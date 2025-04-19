import { error, type Load } from '@sveltejs/kit';
import { getPostsByAuthor } from '$lib/server/database';
import type { PostListByAuthorResponse } from '$lib/util/types';
import { t } from '$lib/util/translations';

export const load: Load = async ({ params }): Promise<PostListByAuthorResponse> => {
  if (params.author) {
    const response = await getPostsByAuthor(params.author);
    if (response) {
      return response;
    }
  }

  throw error(404, t.errors.e404);
};
