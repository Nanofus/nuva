import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/api';

export async function load({ params }: any) {
	const posts = await getPosts(null, params.term);
	if (posts) return posts;
	throw error(404, 'Not found');
}
