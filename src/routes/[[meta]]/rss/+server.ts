import { getLatestPosts } from '$lib/server/database';
import type { PostMeta } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import { clientConfig } from '$lib/client/config';

export const GET: RequestHandler = async () => {
  const body = rss(await getLatestPosts());
  const response = new Response(body);
  response.headers.set('Cache-Control', `max-age=${0}, s-maxage=${600}`);
  response.headers.set('Content-Type', 'application/xml');
  return response;
};

const rss = (posts: PostMeta[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<atom:link href="${clientConfig.baseUrl}/rss" rel="self" type="application/rss+xml" />
<title>${clientConfig.siteName}</title>
<link>${clientConfig.baseUrl}</link>
<description>${clientConfig.subHeader}</description>
${posts
    .map((post) => {
      return `<item>
<guid>${clientConfig.baseUrl}/posts/${post.slug}</guid>
<title>${post.title}</title>
<link>${clientConfig.baseUrl}/posts/${post.slug}</link>
<author>${post.author}</author>
<language>${clientConfig.locale}</language>
<description>${post.description || ''}</description>
<pubDate>${new Date(post.date).toLocaleString()}</pubDate>
</item>`;
    })
    .join('')}
</channel>
</rss>
`;
