import { globalConfig } from "$lib/util/config";

export const GET = async () => {
  return new Response(
    `User-agent: *
Allow: /
  
Sitemap: ${globalConfig.baseUrl}/sitemap.xml`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
};
