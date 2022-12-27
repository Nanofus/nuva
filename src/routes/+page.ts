import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/api';

export async function load() {
    const posts = await getPosts();
    if (posts) return posts;
    throw error(404, 'Not found');
}
