import { error, type Load } from '@sveltejs/kit';
import { getPostsByAuthor } from '$lib/server/database';
import type { PostListByAuthorResponse } from '$lib/types';
import { t } from '$lib/client/localization';

export const load: Load = async ({ params }): Promise<PostListByAuthorResponse> => {
  if (params.author) {
    const response = await getPostsByAuthor(params.author);
    if (response) {
      return response;
    }
  }

  throw error(404, t.errors.e404);
};
