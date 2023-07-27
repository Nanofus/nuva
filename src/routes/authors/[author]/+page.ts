import { error, type Load } from "@sveltejs/kit";
import { getPostListByAuthor } from "$lib/util/database";
import type { PostListByAuthorResponse } from "$lib/util/types";
import { t } from "$lib/translations";

export const load: Load = async ({ fetch, params }): Promise<PostListByAuthorResponse> => {
	if (params.author) {
		const response = await getPostListByAuthor(fetch, params.author);
		if (response) {
			return response;
		}
	}

	throw error(404, t.errors.e404);
};
