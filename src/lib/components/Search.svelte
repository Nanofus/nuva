<script lang="ts">
	let searchTerm = '';

	const search = () => {
		window.location.href = `/search/${encodeURI(searchTerm)}`;
	};
</script>

<div class="search-area">
	<input bind:value={searchTerm} type="text" placeholder="Hakusanat" />
	<button on:click={search}>Etsi</button>
</div>
