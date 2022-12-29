import { error } from '@sveltejs/kit';
import { getPostListByTag } from '$lib/database';
import type { PostListByTagResponse } from '$lib/types';

export async function load({ params }: any): Promise<PostListByTagResponse> {
	const data = await getPostListByTag(params.tag);
	if (data) return data;
	throw error(404, 'Not found');
}
