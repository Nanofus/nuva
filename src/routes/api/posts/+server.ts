import { getPosts, getPostsByAuthor, getPostsByCategory, getPostsByTag } from '$lib/server/database';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const byParam = url.searchParams.get('by');
  const forParam = url.searchParams.get('for');
  let after = url.searchParams.get('after');
  if (after) after = decodeURI(after);
  if (byParam && forParam) {
    switch (byParam) {
    case 'author':
      return json(await getPostsByAuthor(forParam, after));
    case 'tag':
      return json(await getPostsByTag(forParam, after));
    case 'category':
      return json(await getPostsByCategory(forParam, after));
    }
  }
  const search = url.searchParams.get('search');
  return json(await getPosts(after, search || ''));
};
