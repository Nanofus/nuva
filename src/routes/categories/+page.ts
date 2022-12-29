import { error } from '@sveltejs/kit';
import { getCategories } from '$lib/api';

export async function load() {
	const categories = await getCategories();
	if (categories) return categories;
	throw error(404, 'Not found');
}
