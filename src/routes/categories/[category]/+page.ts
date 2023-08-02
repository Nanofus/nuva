import { error, type Load } from "@sveltejs/kit";
import { getPostsForCategoryPaginated } from "$lib/db/graphql";
import type { PostListByCategoryResponse } from "$lib/util/types";
import { t } from "$lib/util/translations";

export const load: Load = async ({ fetch, params }): Promise<PostListByCategoryResponse> => {
  if (params.category) {
    const response = await getPostsForCategoryPaginated(fetch, params.category);
    if (response) {
      return response;
    }
  }

  throw error(404, t.errors.e404);
};
