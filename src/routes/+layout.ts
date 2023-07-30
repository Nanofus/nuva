export const load = async ({ url }: any) => {
  const { pathname } = url;

  return {
    pathname,
  };
};
