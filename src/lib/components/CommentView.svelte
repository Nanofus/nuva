<script lang="ts">
  import CommentView from './CommentView.svelte';
  import type { Comment, Post } from '$lib/types';
  import CommentForm from '$lib/components/CommentForm.svelte';
  import { createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import Button from '$lib/components/reusable/Button.svelte';
  import { t } from '$lib/client/localization';
  import { auth } from '$lib/client/stores';
  import { clientConfig } from '$lib/client/config';

  interface Props {
    comment: Comment;
    post: Post;
  }

  let { comment, post }: Props = $props();
  let replyFormOpen = $state(false);

  const dispatch = createEventDispatcher();

  const commentSent = () => {
    replyFormOpen = false;
    dispatch('commentSent');
  };

  const isCurrentUser = () => {
    if (browser) {
      const user = $auth?.displayName;
      if (!user) return false;
      return user === comment.author;
    }
  };

  const isHighlighted = () => {
    return post.coAuthors.indexOf(comment.author) > -1;
  };
</script>

<div class="comment {isHighlighted() ? 'highlighted' : ''}" id="comment-{comment._id}">
  <header class="comment-header">
    <span class="comment-author"> {comment.author}</span>
    <span class="comment-date">{comment.date.toLocaleDateString(clientConfig.locale)}</span>
  </header>
  <div class="comment-content">{@html comment.content}</div>
  <div class="child-comments">
    {#each comment.children as child (child._id)}
      <CommentView on:commentSent={commentSent} comment={child} {post} />
    {/each}
  </div>
  {#if isCurrentUser()}
    <Button link onclick={() => (document.location = `${clientConfig.urls.commentEdit}${comment._id}`)}>{t.common.edit}</Button>
  {/if}
  {#if !replyFormOpen && $auth}
    <Button link onclick={() => (replyFormOpen = true)}>{t.common.reply}</Button>
  {:else}
    <CommentForm
      on:commentSent={commentSent}
      on:close={() => (replyFormOpen = false)}
      parent={comment._id}
      postId={post._id}
      postSlug={post.slug}
      isReply={true}
    />
  {/if}
</div>

<style lang="scss">
  .comment {
    margin: 1rem 0;
    padding: 1rem;
    background: var(--comment-background);
    border-radius: var(--border-radius);

    &.highlighted {
      border: var(--highlight-border);

      .comment-author::before {
        font-family: var(--icon-font);
        content: 'history_edu';
        position: relative;
        top: 0.2rem;
        margin-right: 0.3rem;
      }
    }
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    border-bottom: var(--highlight-border);
    font-family: var(--accent-font-family);
  }
</style>
