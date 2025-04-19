import { error, type Load } from '@sveltejs/kit';
import { getCategories } from '$lib/server/database';
import { t } from '$lib/client/localization';
import type { CategoryListResponse } from '$lib/types';
import { defaultIsrConfig } from '$lib/server/cache';

export const config = defaultIsrConfig;

export const load: Load = async (): Promise<CategoryListResponse> => {
  const response = await getCategories();
  if (response) return { categories: response };

  throw error(404, t.errors.e404);
};
