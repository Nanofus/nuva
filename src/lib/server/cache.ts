import { getConfig } from '$lib/util/config';
import { ISR_BYPASS_TOKEN } from '$env/static/private';

// Invalidation requests for ISR cache for each page with ISR enabled.

export const defaultIsrConfig = {
  isr: {
    expiration: false,
    bypassToken: ISR_BYPASS_TOKEN
  }
};

const requestData = {
  method: 'HEAD',
  headers: {
    Authorization: 'Bearer ' + import.meta.env.VITE_WEBHOOK_SECRET,
    'x-prerender-revalidate': ISR_BYPASS_TOKEN,
  }
};

export const invalidateByPost = async (postData: any) => {
  await invalidatePost(postData.post.post_name);
  await invalidatePost(postData.post_id);
  await invalidateFrontPage();
  await invalidateTagsPage();
  await invalidateCategoriesPage();
  await invalidatePostsPage();
  await invalidateYearPage(postData.post.post_date.split('-')[0]);
}

export const invalidateByComment = async (commentData: any) => {
  await invalidatePost(commentData.current_post_data.post_name);
  await invalidatePost(commentData.current_post_id);
  await invalidateFrontPage();
  await invalidateYearPage(commentData.current_post_data.post_date.split('-')[0]);
}

export const invalidatePost = async (slug: string) => {
  await fetch(new Request(getConfig().baseUrl + '/posts/' + slug, requestData));
}

export const invalidateFrontPage = async () => {
  await fetch(new Request(getConfig().baseUrl + '/', requestData));
}

export const invalidatePostsPage = async () => {
  await fetch(new Request(getConfig().baseUrl + '/posts', requestData));
}

export const invalidateTagsPage = async () => {
  await fetch(new Request(getConfig().baseUrl + '/tags', requestData));
}

export const invalidateCategoriesPage = async () => {
  await fetch(new Request(getConfig().baseUrl + '/categories', requestData));
}

export const invalidateYearPage = async (year: string) => {
  await fetch(new Request(getConfig().baseUrl + '/posts/year/' + year, requestData));
}
