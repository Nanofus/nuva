<script lang="ts">
	import { onMount } from 'svelte';
	import type { Post } from '$lib/types';
	import PostView from '$lib/components/PostView.svelte';

	export let data: Post;
	let loading = true;

	onMount(() => {
		loading = false;
	});
</script>

<article>
	{#if loading}
		<div>Ladataan...</div>
	{:else if data.content}
		<PostView post={data} />
	{:else}
		<h2>Postausta ei löytynyt tai sinulla ei ole pääsyä siihen.</h2>
	{/if}
</article>

<style lang="scss">
	article {
		width: var(--article-text-width);
		padding: 5em calc((var(--page-max-width) - var(--article-text-width)) / 2);
	}
</style>