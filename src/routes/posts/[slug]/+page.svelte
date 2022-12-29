<script lang="ts">
	import { onMount } from 'svelte';
	import { type Post } from '$lib/types';

	export let data: Post;
	let loading = true;

	onMount(() => {
		loading = false;
	});
</script>

<html lang="fi">
	{#if loading}
		<div>Ladataan...</div>
	{:else if data}
		<div>{@html data.content}</div>
	{:else}
		<h2>Postausta ei löytynyt tai sinulla ei ole pääsyä siihen.</h2>
	{/if}
</html>
