import { error, type Load } from '@sveltejs/kit';
import { getPostList } from '$lib/database';
import type { PostListBySearchResponse } from '$lib/types';

export const load: Load = async ({ params }): Promise<PostListBySearchResponse> => {
	const posts = await getPostList(null, params.term);
	if (posts) return posts;
	throw error(404, 'Not found');
}
