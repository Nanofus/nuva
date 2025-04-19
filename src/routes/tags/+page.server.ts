import { error, type Load } from '@sveltejs/kit';
import { getTags } from '$lib/server/database';
import type { TagListResponse } from '$lib/util/types';
import { t } from '$lib/util/translations';
import { ISR_BYPASS_TOKEN } from '$env/static/private';

export const config = {
  isr: {
    expiration: 60,
    bypassToken: ISR_BYPASS_TOKEN
  }
};

export const load: Load = async (): Promise<TagListResponse> => {
  const response = await getTags();
  if (response) return response;

  throw error(404, t.errors.e404);
};
