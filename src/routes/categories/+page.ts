import { error, type Load } from "@sveltejs/kit";
import { getCategoriesPaginated } from "$lib/db/graphql";
import type { Category } from "$lib/util/types";
import { t } from "$lib/util/translations";

export const load: Load = async ({ fetch }): Promise<Category[]> => {
  const response = await getCategoriesPaginated(fetch);
  if (response) {
    return response;
  }

  throw error(404, t.errors.e404);
};
