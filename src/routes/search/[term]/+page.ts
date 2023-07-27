import { error, type Load } from '@sveltejs/kit';
import { getPostList } from '$lib/util/database';
import type { PostListBySearchResponse } from '$lib/util/types';
import { t } from '$lib/translations';

export const load: Load = async ({ fetch, params }): Promise<PostListBySearchResponse> => {
	if (params.term) {
		const response = await getPostList(fetch, null, params.term);
		if (response) return response;
	}
	throw error(404, t.errors.e404);
};
