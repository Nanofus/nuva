import { clientConfig } from '$lib/client/config';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  return new Response(
    `User-agent: *
Allow: /
  
Sitemap: ${clientConfig.baseUrl}/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  );
};
