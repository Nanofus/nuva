<script lang="ts">
	import Button from "$lib/components/reusable/Button.svelte";

	let searchTerm = '';

	const search = () => {
		window.location.href = `/search/${encodeURI(searchTerm)}`;
	};
</script>

<div class="search-area">
	<input bind:value={searchTerm} type="text" placeholder="Hakusanat" />
	<Button on:click={search}>Etsi</Button>
</div>

<style lang="scss">
	.search-area {
		margin: 0 1rem;
		vertical-align: middle;
		line-height: 3rem;
	}
</style>