<script lang="ts">
	import { LOCALE } from "$lib/config";
	import type { Comment, Post } from "$lib/util/types";
	import CommentForm from "$lib/components/CommentForm.svelte";
	import { createEventDispatcher } from "svelte";
	import { browser } from "$app/environment";
	import { getAuthInfo, isLoggedIn } from "$lib/db/database";
	import Button from "$lib/components/reusable/Button.svelte";
	import { t } from "$lib/translations";

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
			const user = getAuthInfo()?.displayName;
			if (!user) return false;
			return user === comment.author;
		}
	};

	const isHighlighted = () => {
		return post.coAuthors.indexOf(comment.author) > -1;
	};
</script>

<div class="comment {isHighlighted() ? 'highlighted' : ''}" id="comment-{comment._id}">
	<header class="comment-header">
		<span class="comment-author">
			{#if isHighlighted()}<span class="material-icons inline-icon">history_edu</span>{/if}
			{comment.author}</span>
		<span class="comment-date">{comment.date.toLocaleDateString(LOCALE)}</span
		>
	</header>
	<div class="comment-content">{@html comment.content}</div>
	<div class="child-comments">
		{#each comment.children as child}
			<svelte:self on:commentSent={commentSent} comment={child} {post} />
		{/each}
	</div>
	{#if isCurrentUser()}
		<a target="_blank" href="{t.components.comment.editUrl}{comment._id}">{t.common.edit}</a>
	{/if}
	{#if !replyFormOpen && isLoggedIn()}
		<Button link on:click={() => (replyFormOpen = true)}>{t.common.reply}</Button>
	{:else}
		<CommentForm
			on:commentSent={commentSent}
			on:close={() => (replyFormOpen = false)}
			parent={comment._id}
			postId={post._id}
			isReply={true}
		/>
	{/if}
</div>

<style lang="scss">
	.comment {
		margin: 1rem 0;
		padding: 1rem;
		background: var(--comment-background);
		border-radius: var(--border-radius);

		&.highlighted {
			border: var(--highlight-border);
		}
	}

	.comment-header {
		display: flex;
		justify-content: space-between;
		border-bottom: var(--highlight-border);
		font-family: var(--accent-font-family);
	}
</style>
