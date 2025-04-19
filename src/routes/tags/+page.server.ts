import { error, type Load } from '@sveltejs/kit';
import { getTags } from '$lib/server/database';
import type { TagListResponse } from '$lib/util/types';
import { t } from '$lib/util/translations';
import { defaultIsrConfig } from '$lib/server/cache';

export const config = defaultIsrConfig;

export const load: Load = async (): Promise<TagListResponse> => {
  const response = await getTags();
  if (response) return response;

  throw error(404, t.errors.e404);
};
