import type { CommentMeta, PostMeta, WebhookMeta } from '$lib/types';
import { stripHtml } from '$lib/client/util';
import { t } from '$lib/client/localization';
import { clientConfig } from '$lib/client/config';

export const discordPostHook = async (meta: WebhookMeta, post: PostMeta) => {
  return (
    await fetch(meta.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: meta.contentText,
        embeds: [
          {
            title: post.title,
            description: post.description ? stripHtml(post.description) : '',
            url: clientConfig.baseUrl + '/posts/' + post.slug,
            color: meta.color,
            author: {
              name: post.author,
              url: clientConfig.baseUrl + '/authors/' + post.author,
              icon_url: meta.icon
            },
            image: {
              url: post.featuredImage ? post.featuredImage : ''
            }
          }
        ]
      })
    })
  ).ok;
};

export const discordCommentHook = async (meta: WebhookMeta, post: PostMeta, comment: CommentMeta) => {
  return (
    await fetch(meta.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: meta.contentText,
        embeds: [
          {
            title: t.webhooks.newComment + post.title,
            url: clientConfig.baseUrl + '/posts/' + post.slug + '#comment-' + comment._id,
            color: meta.color,
            author: {
              name: comment.author,
              url: clientConfig.baseUrl + '/authors/' + comment.author,
              icon_url: meta.icon
            }
          }
        ]
      })
    })
  ).ok;
};
