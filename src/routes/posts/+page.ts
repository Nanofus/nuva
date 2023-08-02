import { error, type Load } from "@sveltejs/kit";
import { getPostsPaginated } from "$lib/db/graphql";
import type { PostListResponse } from "$lib/util/types";
import { filterExcludedCategories } from "$lib/util/util";
import { t } from "$lib/util/translations";

export const load: Load = async ({ fetch }): Promise<PostListResponse> => {
  const response = await getPostsPaginated(fetch);
  if (response) {
    response.posts = filterExcludedCategories(response.posts);
    return response;
  }

  throw error(404, t.errors.e404);
};
