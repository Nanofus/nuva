import { error, type Load } from "@sveltejs/kit";
import { getTagsPaginated } from "$lib/db/graphql";
import type { TagListResponse } from "$lib/util/types";
import { t } from "$lib/util/translations";

export const load: Load = async ({ fetch }): Promise<TagListResponse> => {
  const response = await getTagsPaginated(fetch);
  if (response) {
    return response;
  }

  throw error(404, t.errors.e404);
};
