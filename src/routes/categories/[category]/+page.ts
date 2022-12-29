import { error, type Load } from '@sveltejs/kit';
import { getPostListByCategory } from '$lib/database';
import type { PostListByCategoryResponse } from '$lib/types';

export const load: Load = async ({ params }): Promise<PostListByCategoryResponse> => {
	if (params.category) {
		const response = await getPostListByCategory(params.category);
		if (response) return response;
	}
	throw error(404, 'Not found');
}
