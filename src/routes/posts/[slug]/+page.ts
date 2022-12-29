import { error, type Load } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/database';
import type { Post } from '$lib/types';

export const load: Load = async ({ params }): Promise<Post> => {
	if (params.slug) {
		const response = await getPostBySlug(params.slug);
		if (response) return response;
	}
	throw error(404, 'Not found');
};
