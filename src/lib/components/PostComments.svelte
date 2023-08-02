<script lang="ts">
  import type { Post } from "$lib/util/types";
  import CommentForm from "$lib/components/CommentForm.svelte";
  import { getCommentsForPost } from "$lib/db/graphql";
  import Button from "$lib/components/reusable/Button.svelte";
  import { t } from "$lib/util/translations";
  import CommentView from "$lib/components/CommentView.svelte";
  import { auth } from "$lib/util/stores";

  export let post: Post;
  let replyFormOpen = false;

  const refreshComments = () => {
    replyFormOpen = false;
    getCommentsForPost(fetch, post.slug).then((comments) => {
      post.comments = comments;
    });
  };
</script>

<div class="vertically-separated" id="comments">
  <h2>
    {post.commentCount ? post.commentCount : 0}
    {post.commentCount === 1 ? t.common.commentSingular : t.common.commentPlural}
  </h2>
  {#each post.comments as comment}
    <CommentView on:commentSent={refreshComments} {post} {comment} />
  {/each}
  {#if !replyFormOpen && $auth}
    <Button link on:click={() => (replyFormOpen = true)}>{t.common.comment}</Button>
  {:else}
    <CommentForm
      on:commentSent={refreshComments}
      on:close={() => (replyFormOpen = false)}
      parent={0}
      postId={post._id}
      isReply={false}
    />
  {/if}
</div>
