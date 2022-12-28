import { error } from '@sveltejs/kit';
import { getPostsByTag } from '$lib/api';

export async function load({ params }: any) {
    const data = await getPostsByTag(params.tag);
    if (data) return data;
    throw error(404, 'Not found');
}
