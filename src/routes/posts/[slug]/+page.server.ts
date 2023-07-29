import { error, type Load } from "@sveltejs/kit";
import { getPostBySlug } from "$lib/db/graphql";
import type { Post } from "$lib/util/types";
import { t } from "$lib/translations";

export const load: Load = async ({ fetch, params, url }): Promise<Post | null> => {
	if (params.slug) {
		const isPreview = url.searchParams.get("preview") != null;
		const post = await getPostBySlug(fetch, params.slug);
		if (isPreview && post) {
			const { body } = await fetch("/api/html-validator", {
				method: "POST",
				body: JSON.stringify({
					html: post.content,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => res.json());
			post.validationResult = body;
		}
		return post;
	}

	throw error(404, t.errors.e404);
};
