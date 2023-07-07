<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { Comment } from "$lib/types";
  import CommentForm from "$lib/components/CommentForm.svelte";
  import { createEventDispatcher } from "svelte";

  export let comment: Comment;
  export let postId: number;

  const dispatch = createEventDispatcher();

  const commentSent = () => {
    dispatch("commentSent");
  };
</script>

<div class="comment">
  <header class="comment-header">
    <span class="comment-author">{comment.author}</span>
    <span class="comment-date">{comment.date.toLocaleDateString(LOCALE)}</span>
  </header>
  <div class="comment-content">{@html comment.content}</div>
  <div class="child-comments">
    {#each comment.children as child}
      <svelte:self on:commentSent={commentSent} comment={child} {postId} />
    {/each}
  </div>
  <CommentForm on:commentSent={commentSent} parent={comment._id} {postId} />
</div>

<style lang="scss">
  .comment {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.1);
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.125rem solid rgba(0, 0, 0, 0.5);
    font-family: var(--accent-font-family);
    font-size: 1.25em;
  }
</style>
