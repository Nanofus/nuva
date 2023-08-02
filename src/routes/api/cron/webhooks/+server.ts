import {
  getLatestCommentId,
  getLatestPostSlug,
  setLatestCommentId,
  setLatestPostSlug,
} from "$lib/server/database";
import { globalConfig } from "$lib/util/config";
import { getLatestComments, getLatestPosts, getPostMeta } from "$lib/db/graphql";
import type { PostMeta } from "$lib/util/types";
import { fireCommentHook, firePostHook } from "$lib/util/webhooks.discord";

const latestPostHook = async () => {
  const latestPostSlug = await getLatestPostSlug();
  if (!latestPostSlug) return;
  const latestPosts = (await getLatestPosts(fetch)).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
  const latestPost = latestPosts.find((post) => post.slug === latestPostSlug);
  if (!latestPost) return;
  const announcedPosts = latestPosts.filter(
    (post) => post.date.getTime() > latestPost.date.getTime(),
  );
  for (const post of announcedPosts) {
    for (const hook of globalConfig.webhooks.newPost) {
      if (!(await firePostHook(hook, post))) console.error("Failed to fire webhook", hook.url);
    }
  }
  if (announcedPosts.length > 0)
    await setLatestPostSlug(announcedPosts[announcedPosts.length - 1].slug);
  return new Response();
};

const latestCommentHook = async () => {
  const latestCommentId = await getLatestCommentId();
  if (!latestCommentId) return;
  const latestComments = (await getLatestComments(fetch)).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
  const latestComment = latestComments.find((comment) => comment._id === latestCommentId);
  if (!latestComment) return;
  const announcedComments = await Promise.all(
    latestComments
      .filter((comment) => comment.date.getTime() > latestComment.date.getTime())
      .map(async (comment) => {
        return {
          comment: comment,
          post: (await getPostMeta(fetch, comment.postSlug)) as PostMeta,
        };
      }),
  );
  for (const announcedComment of announcedComments) {
    for (const hook of globalConfig.webhooks.newComment) {
      if (!(await fireCommentHook(hook, announcedComment.post, announcedComment.comment)))
        console.error("Failed to fire webhook", hook.url);
    }
  }
  if (announcedComments.length > 0)
    await setLatestCommentId(announcedComments[announcedComments.length - 1].comment._id);
  return new Response();
};

export const GET = async () => {
  //await latestPostHook();
  await latestCommentHook();
  return new Response();
};
