import { globalConfig } from '$lib/util/config';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  return new Response(
    `User-agent: *
Allow: /
  
Sitemap: ${globalConfig.baseUrl}/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  );
};
