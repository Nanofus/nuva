import { error } from '@sveltejs/kit';
import { getAllPosts } from '$lib/api';

export async function load() {
    const posts = await getAllPosts();
    if (posts) return { posts: posts };
    throw error(404, 'Not found');
}
