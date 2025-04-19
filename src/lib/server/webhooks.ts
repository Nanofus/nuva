import { getLatestComments, getLatestPosts, getPostMeta } from '$lib/server/database';
import { discordCommentHook, discordPostHook } from '$lib/server/webhooks-discord';
import type { CommentMeta, PostMeta } from '$lib/types';
import { serverConfig } from '$lib/server/config';

export const latestPostHook = async () => {
  const latestPosts = (await getLatestPosts()).sort((a, b) => b.date.getTime() - a.date.getTime());
  const latestPost = latestPosts[0];
  for (const hook of serverConfig.webhooks.newPost) {
    if (!(await discordPostHook(hook, latestPost))) console.error('Failed to fire webhook', hook.url);
  }
};

export const latestCommentHook = async () => {
  const latestComments = (await getLatestComments()).sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
  const latestComment: CommentMeta = latestComments[0];
  const announcedComment = {
    comment: latestComment,
    post: (await getPostMeta(latestComment.postSlug)) as PostMeta
  };
  for (const hook of serverConfig.webhooks.newComment) {
    if (!(await discordCommentHook(hook, announcedComment.post, announcedComment.comment)))
      console.error('Failed to fire webhook', hook.url);
  }
};
