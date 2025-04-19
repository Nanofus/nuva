import { error, type Load } from '@sveltejs/kit';
import { getCategories } from '$lib/server/database';
import { t } from '$lib/util/translations';
import type { CategoryListResponse } from '$lib/util/types';
import { ISR_BYPASS_TOKEN } from '$env/static/private';

export const config = {
  isr: {
    expiration: 60,
    bypassToken: ISR_BYPASS_TOKEN
  }
};

export const load: Load = async (): Promise<CategoryListResponse> => {
  const response = await getCategories();
  if (response) return { categories: response };

  throw error(404, t.errors.e404);
};
