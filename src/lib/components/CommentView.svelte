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
    }
</script>

<div class="comment">
	<div class="comment-header">
		<span class="comment-author">{comment.author}</span>
		<span class="comment-date">{comment.date.toLocaleDateString(LOCALE)}</span>
	</div>
	<div class="comment-content">{@html comment.content}</div>
	<div class="child-comments">
		{#each comment.children as child}
			<svelte:self on:commentSent={commentSent} comment={child} postId={postId} />
		{/each}
	</div>
	<CommentReply on:commentSent={commentSent} postId={postId} parent={comment._id} />
</div>

<style lang="scss">
	.comment {
		margin: 1rem 0;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
	}

	.comment-header {
		display: flex;
		justify-content: space-between;
	}

	.comment-content {
		margin: 0.5rem 0;
	}

	.child-comments {
		margin-left: 1rem;
	}
</style>