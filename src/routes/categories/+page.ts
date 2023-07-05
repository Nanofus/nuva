import { error, type Load } from '@sveltejs/kit';
import { getCategoryList } from '$lib/database';
import type { CategoryListResponse } from '$lib/types';

export const load: Load = async ({ fetch }): Promise<CategoryListResponse> => {
	const response = await getCategoryList(fetch);
	if (response) return response;
	throw error(404, 'Not found');
};
