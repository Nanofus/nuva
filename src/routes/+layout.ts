export const prerender = true;

export const load = ({ url }: any) => {
  const { pathname } = url

  return {
    pathname
  }
}
