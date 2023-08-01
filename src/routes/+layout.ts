import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ url }) => {
  const { pathname } = url;

  return {
    pathname,
  };
};
