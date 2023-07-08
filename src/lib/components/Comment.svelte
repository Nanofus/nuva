<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { Comment, Post } from "$lib/types";
  import CommentForm from "$lib/components/CommentForm.svelte";
  import { createEventDispatcher } from "svelte";
  import { browser } from "$app/environment";

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
      const user = JSON.parse(localStorage.getItem("auth"))?.displayName;
      if (!user) return false;
      return user === comment.author;
    }
  };

  const isHighlighted = () => {
    return post.authors.indexOf(comment.author) > -1;
  };
</script>

<div class="comment {isHighlighted() ? 'highlighted' : ''}">
  <header class="comment-header">
    <span class="comment-author">{comment.author}</span>
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
  {#if !replyFormOpen}
    <a role="button" tabindex="0" on:click={() => (replyFormOpen = true)}>Vastaa</a>
  {:else}
    <CommentForm on:commentSent={commentSent} parent={comment._id} postId={post._id} isReply="true" />
  {/if}
</div>

<style lang="scss">
  .comment {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.1);

    &.highlighted {
      background: var(--highlight-gradient);
      border: var(--accent-light) 0.125rem solid;
    }
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.125rem solid var(--hover-dark);
    font-family: var(--accent-font-family);
  }
</style>
