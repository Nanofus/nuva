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

export const invalidateByPost = (postData: any) => {
  invalidatePost(postData.post.post_name);
  invalidatePost(postData.post_id);
  invalidateFrontPage();
  invalidateTagsPage();
  invalidateCategoriesPage();
  invalidatePostsPage();
  invalidateYearPage(postData.post.post_date.split('-')[0]);
}

export const invalidateByComment = (commentData: any) => {
  invalidatePost(commentData.current_post_data.post_name);
  invalidatePost(commentData.current_post_id);
  invalidateFrontPage();
  invalidateYearPage(commentData.current_post_data.post_date.split('-')[0]);
}

export const invalidatePost = (slug: string) => {
  fetch(new Request(getConfig().baseUrl + '/posts/' + slug, requestData)).then();
}

export const invalidateFrontPage = () => {
  fetch(new Request(getConfig().baseUrl + '/', requestData)).then();
}

export const invalidatePostsPage = () => {
  fetch(new Request(getConfig().baseUrl + '/posts', requestData)).then();
}

export const invalidateTagsPage = () => {
  fetch(new Request(getConfig().baseUrl + '/tags', requestData)).then();
}

export const invalidateCategoriesPage = () => {
  fetch(new Request(getConfig().baseUrl + '/categories', requestData)).then();
}

export const invalidateYearPage = (year: string) => {
  fetch(new Request(getConfig().baseUrl + '/posts/year/' + year, requestData)).then();
}
