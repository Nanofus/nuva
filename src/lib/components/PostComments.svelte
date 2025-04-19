<script lang="ts">
  import type { Post } from '$lib/types';
  import CommentForm from '$lib/components/CommentForm.svelte';
  import Button from '$lib/components/reusable/Button.svelte';
  import { t } from '$lib/client/localization';
  import CommentView from '$lib/components/CommentView.svelte';
  import { auth } from '$lib/client/stores';
  import { getCommentsByPost } from '$lib/client/api';

  interface Props {
    post: Post;
  }

  let { post = $bindable() }: Props = $props();
  let replyFormOpen = $state(false);

  const refreshComments = async () => {
    replyFormOpen = false;
    post.comments = await getCommentsByPost(post.slug);
    post = post;
  };
</script>

<div class="vertically-separated" id="comments">
  <h2>
    {post.commentCount ? post.commentCount : 0}
    {post.commentCount === 1 ? t.common.commentSingular : t.common.commentPlural}
  </h2>
  {#each post.comments as comment (comment.date)}
    <CommentView on:commentSent={refreshComments} {post} {comment} />
  {/each}
  {#if !post.previewMode}
    {#if !replyFormOpen && $auth}
      <Button link onclick={() => (replyFormOpen = true)}>{t.common.comment}</Button>
    {:else}
      <CommentForm
        on:commentSent={refreshComments}
        on:close={() => (replyFormOpen = false)}
        parent={0}
        postId={post._id}
        postSlug={post.slug}
        isReply={false}
      />
    {/if}
  {/if}
</div>
