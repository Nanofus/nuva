import type { ClientInit } from '@sveltejs/kit';
import { loadClientConfig } from '$lib/util/config';

export const init: ClientInit = async () => {
  await loadClientConfig();
};
