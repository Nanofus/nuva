<script lang="ts">
	import type { Post } from '$lib/types';
	import CommentView from '$lib/components/CommentView.svelte';
	import CommentReply from './CommentReply.svelte';
	import { getCommentsForPostBySlug } from '$lib/database';

	export let post: Post;

	const refreshComments = () => {
		getCommentsForPostBySlug(post.slug).then((comments) => {
			post.comments = comments;
		});
	};
</script>

<div id="comments">
	<h2>{post.commentCount ? post.commentCount : 0} kommenttia</h2>
	{#each post.comments as comment}
		<CommentView on:commentSent={refreshComments} postId={post._id} {comment} />
	{/each}
	<CommentReply on:commentSent={refreshComments} postId={post._id} parent={0} />
</div>

<style lang="scss">
	.comments {
		margin-top: 5rem;
	}
</style>