// export const prerender = true; TODO: Figure out if this has value

export const load = ({ url }: any) => {
  const { pathname } = url

  return {
    pathname
  }
}
