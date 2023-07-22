<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { Comment, Post } from "$lib/types";
  import CommentForm from "$lib/components/CommentForm.svelte";
  import { createEventDispatcher } from "svelte";
  import { browser } from "$app/environment";
  import { getAuthInfo, isLoggedIn } from "$lib/database";

  export let comment: Comment;
  export let post: Post;
  let replyFormOpen = false;

  const dispatch = createEventDispatcher();

  const commentSent = () => {
    replyFormOpen = false;
    dispatch("commentSent");
  };

  const isCurrentUser = () => {
    if (browser) {
      const currentUserDisplayName = getAuthInfo()?.displayName;
      if (!currentUserDisplayName) return false;
      return currentUserDisplayName === comment.author.displayName;
    }
  };

  const isHighlighted = () => {
    return post.coAuthors.indexOf(comment.author) > -1;
  };
</script>

<div id="comment-{comment._id}" class="comment {isHighlighted() ? 'highlighted' : ''}">
  <header class="comment-header">
    <span class="comment-author">
      {#if isHighlighted()}<span class="material-icons inline-icon">history_edu</span>{/if} {comment.author.displayName}</span>
    <span class="comment-date">{comment.date.toLocaleString(LOCALE, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })}</span>
  </header>
  <div class="comment-content">{@html comment.content}</div>
  <div class="child-comments">
    {#each comment.children as child}
      <svelte:self on:commentSent={commentSent} comment={child} {post} />
    {/each}
  </div>
  {#if isCurrentUser()}
    <a target="_blank" href="https://klaanon.fi/wp/wp-admin/comment.php?action=editcomment&c={comment._id}">Muokkaa</a>
  {/if}
  {#if !replyFormOpen && isLoggedIn()}
    <a role="button" tabindex="0" on:click={() => replyFormOpen = true}>Vastaa</a>
  {:else}
    <CommentForm on:commentSent={commentSent} on:close={() => (replyFormOpen = false)} parent={comment._id}
                 postId={post._id} isReply={true} />
  {/if}
</div>

<style lang="scss">
  .comment {
    margin: 1rem 0;
    padding: 1rem;
    background: var(--comment-background);
    border-radius: var(--border-radius);

    &.highlighted {
      border: var(--hover-dark) 0.1rem solid;
    }
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    border-bottom: var(--border);
    font-family: var(--accent-font-family);
  }
</style>
