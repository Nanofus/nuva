import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/api';

export async function load({ params }: any) {
	const post = await getPostBySlug(params.slug);
	if (post) return { post: post.data.post };
	throw error(404, 'Not found');
}
