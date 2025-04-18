import {
  getCommentById,
  getLatestPosts,
  getPostMeta
} from '$lib/server/database';
import { getConfig } from '$lib/util/config';
import { fireCommentHook, firePostHook } from '$lib/server/webhooks.discord';
import type { CommentMeta, PostMeta } from '$lib/util/types';

export const latestPostHook = async () => {
  const latestPosts = (await getLatestPosts()).sort((a, b) => b.date.getTime() - a.date.getTime());
  const latestPost = latestPosts[0];
  for (const hook of getConfig().webhooks.newPost) {
    if (!(await firePostHook(hook, latestPost))) console.error('Failed to fire webhook', hook.url);
  }
};

export const latestCommentHook = async (id: number) => {
  const latestComment: CommentMeta = await getCommentById(id);
  const announcedComment = {
    comment: latestComment,
    post: (await getPostMeta(latestComment.postSlug)) as PostMeta
  };
  for (const hook of getConfig().webhooks.newComment) {
    if (!(await fireCommentHook(hook, announcedComment.post, announcedComment.comment)))
      console.error('Failed to fire webhook', hook.url);
  }
};
