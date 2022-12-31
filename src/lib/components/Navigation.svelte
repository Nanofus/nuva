<script lang="ts">
	import Search from '$lib/components/Search.svelte';
</script>

<nav>
	<a href="/">Etusivu</a>
	<a href="/categories">Kategoriat</a>
	<a href="/tags">Tagit</a>
	<a href="https://arkisto.klaanon.fi/soundtracks/">Soundtrackit</a>
	<Search />
</nav>

<style lang="scss">
	nav {
		height: 3em;
		padding: 0;
		margin: 0;
		line-height: 2.5em;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		a {
			margin-left: 0.5rem;
			margin-right: 0.5rem;
		}
	}
</style>
