import { error, type Load } from "@sveltejs/kit";
import { getPostsForAuthorPaginated } from "$lib/db/graphql";
import type { PostListByAuthorResponse } from "$lib/util/types";
import { t } from "$lib/util/translations";

export const load: Load = async ({ fetch, params }): Promise<PostListByAuthorResponse> => {
  if (params.author) {
    const response = await getPostsForAuthorPaginated(fetch, params.author);
    if (response) {
      return response;
    }
  }

  throw error(404, t.errors.e404);
};
