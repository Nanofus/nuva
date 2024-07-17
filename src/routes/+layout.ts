import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ url, data }) => {
  const config = data?.config;
  const { pathname } = url;

  return {
    pathname,
    config
  };
};
