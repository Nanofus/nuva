import { error } from '@sveltejs/kit';
import { getTags } from '$lib/api';

export async function load() {
    const tags = await getTags();
    if (tags) return tags;
    throw error(404, 'Not found');
}
