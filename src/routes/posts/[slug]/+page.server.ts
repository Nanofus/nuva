import { error, type Load } from "@sveltejs/kit";
import { getPostBySlug } from "$lib/db/database";
import type { Post } from "$lib/util/types";
import { t } from "$lib/translations";
import { validateHTML } from "$lib/util/html-validator";

// Vercel should run this path in Node instead of edge, since html-validate uses `eval` for some reason
export const config = {
	runtime: "nodejs18.x",
};

export const load: Load = async ({ fetch, params, url }): Promise<Post | null> => {
	if (params.slug) {
		const isPreview = url.searchParams.get("preview") != null;
		const post = await getPostBySlug(fetch, params.slug);
		if (isPreview && post) {
			post.validationResult = await validateHTML(post.content);
		}

		return post;
	}

	throw error(404, t.errors.e404);
};
