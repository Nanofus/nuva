import { error, type Load } from '@sveltejs/kit';
import { t } from '$lib/client/localization';
import type { YearResponse } from '$lib/types';
import { defaultIsrConfig } from '$lib/server/cache';
import { clientConfig } from '$lib/client/config';

export const config = defaultIsrConfig;

export const load: Load = async (): Promise<YearResponse> => {
  const yearConfig = clientConfig.years;
  const response = {
    years: yearConfig
  };
  if (response) return response;

  throw error(404, t.errors.e404);
};
