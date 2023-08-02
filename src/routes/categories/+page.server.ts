import { error, type Load } from "@sveltejs/kit";
import { getCategories } from "$lib/server/database";
import { t } from "$lib/util/translations";
import type { CategoryListResponse } from "$lib/util/types";

export const load: Load = async (): Promise<CategoryListResponse> => {
  const response = await getCategories();
  if (response) return { categories: response };

  throw error(404, t.errors.e404);
};
