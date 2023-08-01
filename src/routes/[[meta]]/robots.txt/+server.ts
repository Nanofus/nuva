export const GET = async () => {
  return new Response(
    `User-agent: *
Allow: /
  
Sitemap: ${import.meta.env.BASE_URL}/sitemap.xml`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
};
