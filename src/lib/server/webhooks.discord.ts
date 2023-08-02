import { globalConfig } from "$lib/util/config";
import type { CommentMeta, PostMeta, WebhookMeta } from "$lib/util/types";
import { stripHtml } from "$lib/util/util";
import { t } from "$lib/util/translations";

export const firePostHook = async (meta: WebhookMeta, post: PostMeta) => {
  return (
    await fetch(meta.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: meta.contentText,
        embeds: [
          {
            title: post.title,
            description: post.description ? stripHtml(post.description) : "",
            url: globalConfig.baseUrl + "/posts/" + post.slug,
            color: meta.color,
            author: {
              name: post.author,
              url: globalConfig.baseUrl + "/authors/" + post.author,
              icon_url: meta.icon,
            },
            image: {
              url: post.featuredImage ? post.featuredImage : "",
            },
          },
        ],
      }),
    })
  ).ok;
};

export const fireCommentHook = async (meta: WebhookMeta, post: PostMeta, comment: CommentMeta) => {
  return (
    await fetch(meta.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: meta.contentText,
        embeds: [
          {
            title: t.webhooks.newComment + post.title,
            url: globalConfig.baseUrl + "/posts/" + post.slug + "#comment-" + comment._id,
            color: meta.color,
            author: {
              name: comment.author,
              url: globalConfig.baseUrl + "/authors/" + comment.author,
              icon_url: meta.icon,
            },
          },
        ],
      }),
    })
  ).ok;
};
