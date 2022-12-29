import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/api';

export async function load() {
	const data = await getPosts();
	if (data) return data;
	throw error(404, 'Not found');
}
