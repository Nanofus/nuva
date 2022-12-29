<script lang="ts">
	import Search from '$lib/components/Search.svelte';
</script>

<nav>
	<a href="/">Etusivu</a>
	<a href="/categories">Kategoriat</a>
	<a href="/tags">Tagit</a>
	<Search />
</nav>

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
