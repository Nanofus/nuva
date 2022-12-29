import { error, type Load } from '@sveltejs/kit';
import { getPostListByTag } from '$lib/database';
import type { PostListByTagResponse } from '$lib/types';

export const load: Load = async ({ params }): Promise<PostListByTagResponse> => {
	const data = await getPostListByTag(params.tag!);
	if (data) return data;
	throw error(404, 'Not found');
}
