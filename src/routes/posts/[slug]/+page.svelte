<script lang="ts">
	import { onMount } from 'svelte';

	export let data: any;
	let loading = true;

	onMount(() => {
		loading = false;
	});
</script>

<html lang="fi">
	{#if loading}
		<div>Ladataan...</div>
	{:else if data.post}
		<div>{@html data.post.content}</div>
	{:else}
		<h2>Postausta ei löytynyt tai sinulla ei ole pääsyä siihen.</h2>
	{/if}
</html>
