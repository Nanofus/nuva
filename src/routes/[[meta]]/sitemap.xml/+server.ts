import type { Category, PostMeta, Tag } from '$lib/util/types';
import { getAllPosts, getCategories, getTags } from '$lib/server/database';
import { globalConfig } from '$lib/util/config';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const body = sitemap(await getAllPosts(), await getCategories(), (await getTags()).tags);
  const response = new Response(body);
  response.headers.set('Cache-Control', `max-age=${0}, s-maxage=${3600}`);
  response.headers.set('Content-Type', 'application/xml');
  return response;
};

// TODO: Authors
const sitemap = (posts: PostMeta[], categories: Category[], tags: Tag[]) =>
  `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${globalConfig.baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${globalConfig.baseUrl}/posts</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${globalConfig.baseUrl}/categories</loc>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${globalConfig.baseUrl}/tags</loc>
    <changefreq>daily</changefreq>
    <priority>0.4</priority>
  </url>
  ${categories
    .map(
      (category) => `
  <url>
    <loc>${globalConfig.baseUrl}/categories/${category.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
    ${tags
    .map(
      (tag) => `
  <url>
    <loc>${globalConfig.baseUrl}/tags/${tag.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${globalConfig.baseUrl}/posts/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${post.date}</lastmod>
    <priority>0.3</priority>
  </url>
  `
    )
    .join('')}
</urlset>`.trim();
