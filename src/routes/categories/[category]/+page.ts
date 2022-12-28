import { error } from '@sveltejs/kit';
import { getPostsByCategory } from '$lib/api';

export async function load({ params }: any) {
    const data = await getPostsByCategory(params.category);
    if (data) return data;
    throw error(404, 'Not found');
}
