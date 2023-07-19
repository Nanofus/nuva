<script lang="ts">
  import type { Post } from "$lib/types";
  import CommentForm from "$lib/components/CommentForm.svelte";
  import { getCommentsForPostBySlug, isLoggedIn } from "$lib/database";
  import Comment from "$lib/components/Comment.svelte";

  export let post: Post;
  let replyFormOpen = false;

  const refreshComments = () => {
    replyFormOpen = false;
    getCommentsForPostBySlug(fetch, post.slug).then((comments) => {
      post.comments = comments;
    });
  };
</script>

<div id="comments">
  <h2>{post.commentCount ? post.commentCount : 0} kommenttia</h2>
  {#each post.comments as comment}
    <Comment on:commentSent={refreshComments} {post} {comment} />
  {/each}
  {#if !replyFormOpen && isLoggedIn()}
    <a role="button" tabindex="0" on:click={() => (replyFormOpen = true)}>Kommentoi</a>
  {:else}
    <CommentForm on:commentSent={refreshComments} parent={0} postId={post._id} isReply={false} />
  {/if}
</div>

<style lang="scss">
  #comments {
    margin-top: 3rem;
  }
</style>