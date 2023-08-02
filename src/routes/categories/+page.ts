import { error, type Load } from "@sveltejs/kit";
import { getCategoriesPaginated } from "$lib/db/graphql";
import type { CategoryListResponse } from "$lib/util/types";
import { t } from "$lib/util/translations";

export const load: Load = async ({ fetch }): Promise<CategoryListResponse> => {
  const response = await getCategoriesPaginated(fetch);
  if (response) {
    return { categories: response };
  }

  throw error(404, t.errors.e404);
};
