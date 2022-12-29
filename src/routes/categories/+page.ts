import { error, type Load } from '@sveltejs/kit';
import { getCategoryList } from '$lib/database';
import type { CategoryListResponse } from '$lib/types';

export const load: Load = async (): Promise<CategoryListResponse> => {
	const categories = await getCategoryList();
	if (categories) return categories;
	throw error(404, 'Not found');
}
