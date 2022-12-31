<script lang="ts">
	import { LOCALE } from '$lib/config';
	import type { Post } from '$lib/types';
	import { onMount } from 'svelte';
	import TagList from '$lib/components/TagList.svelte';
	import CommentArea from '$lib/components/CommentArea.svelte';

	export let post: Post;

	onMount(() => {
		// Eval magic to run scripts in the post
		// (1, eval) is a trick to make eval run in the global scope
		(1, eval)(post.scripts);

		// Parse JS from post content and eval it
		var doc = document.implementation.createHTMLDocument(); // Sandbox
		doc.body.innerHTML = post.content;
		[].map.call(doc.getElementsByTagName('script'), (scriptTag: HTMLScriptElement) => {
			(1, eval)(scriptTag.innerText);
		});
	});
</script>

<header class="post-header">
	<h1 class="post-title">{post.title}</h1>

	{#if post.styles}
		<div class="post-style-container">{@html `<style>${post.styles}</style>`}</div>
	{/if}

	<div class="post-meta">
		<time class="post-date">{post.date.toLocaleDateString(LOCALE)}</time>
		<span class="post-authors">{post.authors.join(', ')}</span>
		<span class="post-comments-link">
			<a href="#comments">{post.commentCount} kommenttia</a>
		</span>
	</div>
</header>

<div class="post-content">{@html post.content}</div>

<footer class="post-footer">
	<TagList tags={post.tags} />
	<CommentArea {post} />
</footer>

<style lang="scss">
	.post-content {
		margin: 2rem 0;
	}
</style>