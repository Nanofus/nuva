import { error } from '@sveltejs/kit';
import { getTagList } from '$lib/database';
import type { TagListResponse } from '$lib/types';

export async function load(): Promise<TagListResponse> {
	const tags = await getTagList();
	if (tags) return tags;
	throw error(404, 'Not found');
}
