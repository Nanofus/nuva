import { error, type Load } from "@sveltejs/kit";
import { getPostsPaginated } from "$lib/db/graphql";
import type { PostListBySearchResponse } from "$lib/util/types";
import { t } from "$lib/util/translations";

export const load: Load = async ({ fetch, params }): Promise<PostListBySearchResponse> => {
  if (params.term) {
    const response = await getPostsPaginated(fetch, null, params.term);
    if (response) {
      return response;
    }
  }

  throw error(404, t.errors.e404);
};
