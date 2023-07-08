<script lang="ts">
	import type { Post } from "$lib/types";
	import CommentForm from "$lib/components/CommentForm.svelte";
	import { getCommentsForPostBySlug } from "$lib/database";
  import Comment from "$lib/components/Comment.svelte";

	export let post: Post;

  const refreshComments = () => {
    getCommentsForPostBySlug(fetch, post.slug).then((comments) => {
      post.comments = comments;
    });
  };
</script>

<div id="comments">
  <h2>{post.commentCount ? post.commentCount : 0} kommenttia</h2>
  {#each post.comments as comment}
    <Comment on:commentSent={refreshComments} postId={post._id} {comment} />
  {/each}
  <CommentForm on:commentSent={refreshComments} parent={0} postId={post._id} />
</div>

<style lang="scss">
  #comments {
    margin-top: 3rem;
  }
</style>