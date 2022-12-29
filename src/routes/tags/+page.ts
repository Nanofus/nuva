import { error, type Load } from '@sveltejs/kit';
import { getTagList } from '$lib/database';
import type { TagListResponse } from '$lib/types';

export const load: Load = async (): Promise<TagListResponse> => {
	const response = await getTagList();
	if (response) return response;
	throw error(404, 'Not found');
};
