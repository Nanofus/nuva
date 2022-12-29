import { error, type Load } from '@sveltejs/kit';
import { getPostList } from '$lib/database';
import type { PostListResponse } from '$lib/types';

export const load: Load = async (): Promise<PostListResponse> => {
	const data = await getPostList();
	if (data) return data;
	throw error(404, 'Not found');
}
