import { ISR_BYPASS_TOKEN } from '$env/static/private';
import { clientConfig } from '$lib/client/config';

// Invalidation requests for ISR cache for each page with ISR enabled.

export const defaultIsrConfig = {
  /*isr: {
    expiration: false,
    bypassToken: ISR_BYPASS_TOKEN
  }*/
};

const requestConfig = {
  method: 'HEAD',
  headers: {
    Authorization: 'Bearer ' + import.meta.env.VITE_WEBHOOK_SECRET,
    'x-prerender-revalidate': ISR_BYPASS_TOKEN
  }
};

export const invalidateByPost = async (postData: any) => {
  await Promise.all([
    invalidatePost(postData.post.post_name),
    invalidatePost(postData.post_id),
    invalidateFrontPage(),
    invalidateTagsPage(),
    invalidateCategoriesPage(),
    invalidatePostsPage(),
    invalidateYearPage(postData.post.post_date.split('-')[0])
  ]);
};

export const invalidateByComment = async (commentData: any) => {
  await Promise.all([
    invalidatePost(commentData.current_post_data.post_name),
    invalidatePost(commentData.current_post_id),
    invalidateFrontPage(),
    invalidateYearPage(commentData.current_post_data.post_date.split('-')[0])
  ]);
};

export const invalidatePost = (slug: string): Promise<Response> => {
  return fetch(new Request(clientConfig.baseUrl + '/posts/' + slug, requestConfig));
};

export const invalidateFrontPage = (): Promise<Response> => {
  return fetch(new Request(clientConfig.baseUrl + '/', requestConfig));
};

export const invalidatePostsPage = (): Promise<Response> => {
  return fetch(new Request(clientConfig.baseUrl + '/posts', requestConfig));
};

export const invalidateTagsPage = (): Promise<Response> => {
  return fetch(new Request(clientConfig.baseUrl + '/tags', requestConfig));
};

export const invalidateCategoriesPage = (): Promise<Response> => {
  return fetch(new Request(clientConfig.baseUrl + '/categories', requestConfig));
};

export const invalidateYearPage = (year: string): Promise<Response> => {
  return fetch(new Request(clientConfig.baseUrl + '/posts/year/' + year, requestConfig));
};
