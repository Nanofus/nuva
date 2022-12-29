import { error } from '@sveltejs/kit';
import { getPostListByCategory } from '$lib/database';
import type { PostListByCategoryResponse } from '$lib/types';

export async function load({ params }: any): Promise<PostListByCategoryResponse> {
	const data = await getPostListByCategory(params.category);
	if (data) return data;
	throw error(404, 'Not found');
}
