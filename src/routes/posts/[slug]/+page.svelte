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

<main>
	{#if loading}
		<div>Ladataan...</div>
	{:else if data.content}
		<PostView post={data} />
	{:else}
		<h2>Postausta ei löytynyt tai sinulla ei ole pääsyä siihen.</h2>
	{/if}
</main>
