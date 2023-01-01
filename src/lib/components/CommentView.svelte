<script lang="ts">
	import { LOCALE } from '$lib/config';
	import type { Comment } from '$lib/types';
	import CommentReply from '$lib/components/CommentReply.svelte';
	import { createEventDispatcher } from 'svelte';

	export let comment: Comment;
	export let postId: number;

	const dispatch = createEventDispatcher();

	const commentSent = () => {
		dispatch('commentSent');
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
	<CommentReply on:commentSent={commentSent} {postId} parent={comment._id} />
</div>

<style lang="scss">
	.comment {
		margin: 1rem 0;
		padding: 0.5rem;
		border: 0.125em solid rgba(0,0,0,0.5);
		border-radius: 0.5rem;
		background: rgba(0,0,0,0.1);
	}

	.comment-header {
		display: flex;
		justify-content: space-between;
		padding: 0 0.25rem 0.25rem;
		border-bottom: 0.125rem solid rgba(0,0,0,0.5);
	}

	.comment-content {
		margin: 0.5rem 0;
	}

	.child-comments {
		margin-left: 1rem;
	}
</style>
