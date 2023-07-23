<script lang="ts">
  import type { Post } from "$lib/types";
  import CommentForm from "$lib/components/CommentForm.svelte";
  import { getCommentsForPostBySlug, isLoggedIn } from "$lib/database";
  import Comment from "$lib/components/Comment.svelte";
  import Button from "$lib/components/reusable/Button.svelte";

  export let post: Post;
  let replyFormOpen = false;

  const refreshComments = () => {
    replyFormOpen = false;
    getCommentsForPostBySlug(fetch, post.slug).then((comments) => {
      post.comments = comments;
    });
  };
</script>

<div class="vertically-separated" id="comments">
  <h2>{post.commentCount ? post.commentCount : 0} kommentti{post.commentCount === 1 ? "" : "a"}</h2>
  {#each post.comments as comment}
    <Comment on:commentSent={refreshComments} {post} {comment} />
  {/each}
  {#if !replyFormOpen && isLoggedIn()}
    <Button link on:click={() => replyFormOpen = true}>Kommentoi</Button>
  {:else}
    <CommentForm on:commentSent={refreshComments} on:close={() => replyFormOpen = false} parent={0} postId={post._id}
                 isReply={false} />
  {/if}
</div>
