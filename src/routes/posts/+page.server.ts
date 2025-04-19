import { error, type Load } from '@sveltejs/kit';
import { t } from '$lib/util/translations';
import { getConfig } from '$lib/util/config';
import type { YearResponse } from '$lib/util/types';
import { defaultIsrConfig } from '$lib/server/cache';

export const config = defaultIsrConfig;

export const load: Load = async (): Promise<YearResponse> => {
  const yearConfig = getConfig().years;
  const response = {
    years: yearConfig
  };
  if (response) return response;

  throw error(404, t.errors.e404);
};
