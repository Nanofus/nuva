import { error, type Load } from '@sveltejs/kit';
import { getPostsByTag } from '$lib/server/database';
import type { PostListByTagResponse } from '$lib/types';
import { t } from '$lib/client/localization';

export const load: Load = async ({ params }): Promise<PostListByTagResponse> => {
  if (params.tag) {
    const response = await getPostsByTag(params.tag);
    if (response) {
      return response;
    }
  }

  throw error(404, t.errors.e404);
};
