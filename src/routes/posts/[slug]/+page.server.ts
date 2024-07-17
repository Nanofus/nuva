import { error, type Load } from '@sveltejs/kit';
import { getPost } from '$lib/server/database';
import type { PostResponse } from '$lib/util/types';
import { t } from '$lib/util/translations';
import { validateHTML } from '$lib/server/html-validator';

export const load: Load = async ({ params, url }): Promise<PostResponse> => {
  if (params.slug) {
    const isPreview = url.searchParams.get('preview') != null;
    const post = await getPost(params.slug);
    if (isPreview && post) {
      post.validationResult = await validateHTML(post.content);
    }
    return {
      slug: params.slug,
      post
    };
  }

  throw error(404, t.errors.e404);
};
