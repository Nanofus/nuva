import type { Category, Post, Tag } from "$lib/util/types";

export const GET = async () => {
  const body = sitemap([], [], []);
  const response = new Response(body);
  response.headers.set("Cache-Control", "max-age=0, s-maxage=3600");
  response.headers.set("Content-Type", "application/xml");
  return response;
};

const sitemap = (posts: Post[], categories: Category[], tags: Tag[]) =>
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
    <loc>${import.meta.env.BASE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${import.meta.env.BASE_URL}/posts</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  ${categories
    .map(
      (category) => `
  <url>
    <loc>${import.meta.env.BASE_URL}/categories/${category}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `,
    )
    .join("")}
    ${tags
      .map(
        (tag) => `
  <url>
    <loc>${import.meta.env.BASE_URL}/tags/${tag}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `,
      )
      .join("")}
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${import.meta.env.BASE_URL}/posts/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${post.date}</lastmod>
    <priority>0.3</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`.trim();
