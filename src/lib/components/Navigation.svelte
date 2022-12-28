<nav>
	<a href="/">Etusivu</a>
	<a href="/categories">Kategoriat</a>
	<a href="/tags">Tagit</a>
	<input bind:value={searchTerm} type="text" placeholder="Hakusanat" />
	<button on:click={search}>Etsi</button>
</nav>

<script>
	let searchTerm = "";

	const search = () => {
		window.location.href = `/search/${encodeURI(searchTerm)}`;
	};
</script>

<style lang="scss">
	nav {
		margin: 1rem;
		margin-left: 10%;
		margin-right: 10%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		a {
			margin-left: 0.5rem;
			margin-right: 0.5rem;
		}
	}
</style>