import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/database';
import type { Post } from '$lib/types';

export async function load({ params }: any): Promise<Post> {
	const post = await getPostBySlug(params.slug);
	if (post) return post;
	throw error(404, 'Not found');
}
