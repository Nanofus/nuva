import { getLatestPosts } from "$lib/db/graphql";
import type { PostMeta } from "$lib/util/types";
import { globalConfig } from "$lib/util/config";

export const GET = async () => {
  const body = rss(await getLatestPosts(fetch));
  const response = new Response(body);
  response.headers.set("Cache-Control", `max-age=${0}, s-maxage=${600}`);
  response.headers.set("Content-Type", "application/xml");
  return response;
};

const rss = (posts: PostMeta[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<atom:link href="${globalConfig.baseUrl}/rss" rel="self" type="application/rss+xml" />
<title>${globalConfig.siteName}</title>
<link>${globalConfig.baseUrl}</link>
<description>${globalConfig.subHeader}</description>
${posts
  .map((post) => {
    return `<item>
<guid>${globalConfig.baseUrl}/posts/${post.slug}</guid>
<title>${post.title}</title>
<link>${globalConfig.baseUrl}/posts/${post.slug}</link>
${post.coAuthors
  .map((author) => {
    return `<author><name>${author}</name></author>`;
  })
  .join("")}
<language>${globalConfig.locale}</language>
<description>${post.description || ""}</description>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>`;
  })
  .join("")}
</channel>
</rss>
`;
