import { error, type Load } from '@sveltejs/kit';
import { getPostList } from '$lib/database';
import type { PostListBySearchResponse } from '$lib/types';

export const load: Load = async ({ params }): Promise<PostListBySearchResponse> => {
	if (params.term) {
		const response = await getPostList(null, params.term);
		if (response) return response;
	}
	throw error(404, 'Not found');
};
