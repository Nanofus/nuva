import { error, type Load } from "@sveltejs/kit";
import { getPostListByCategory } from "$lib/util/database";
import type { PostListByCategoryResponse } from "$lib/util/types";
import { t } from "$lib/translations";
import { CodeError } from "$lib/util/util";

export const load: Load = async ({ fetch, params }): Promise<PostListByCategoryResponse> => {
	if (params.category) {
		const response = await getPostListByCategory(fetch, params.category);
		if (response) {
			return response;
		}
	}

	throw error(new CodeError({ code: 404, message: t.errors.e404 }));
};
