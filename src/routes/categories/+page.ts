import { error, type Load } from "@sveltejs/kit";
import { getCategoryList } from "$lib/db/graphql";
import type { CategoryListResponse } from "$lib/util/types";
import { t } from "$lib/translations";

export const load: Load = async ({ fetch }): Promise<CategoryListResponse> => {
	const response = await getCategoryList(fetch);
	if (response) {
		return response;
	}

	throw error(404, t.errors.e404);
};
