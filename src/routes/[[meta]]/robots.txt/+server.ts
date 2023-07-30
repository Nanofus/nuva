import { BASE_PATH } from "$lib/config";

export const GET = async () => {
  return new Response(
    `User-agent: *
Allow: /
  
Sitemap: ${BASE_PATH}/sitemap.xml`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
};
