import { error, type Load } from "@sveltejs/kit";
import { getPostBySlug } from "$lib/util/database";
import type { Post } from "$lib/util/types";
import { t } from "$lib/translations";
import { validateHTML } from "$lib/util/html-validator";

export const load: Load = async ({ fetch, params, url }): Promise<Post | undefined> => {
	if (params.slug) {
		const isPreview = url.searchParams.get("preview") != null;
		const post = await getPostBySlug(fetch, params.slug);
		if (isPreview && post) {
			post.isPreview = true;
			post.validationResult = await validateHTML(post.content);
		}

		return post;
	}

	throw error(404, t.errors.e404);
};
