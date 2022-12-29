<script lang="ts">
	import type { Tag } from '$lib/types';

	export let tags: Tag[];
</script>

<ul class="tags">
	{#each tags as tag}
		<li><a href="/tags/{tag.slug}" class="tag">{tag.name}</a></li>
	{/each}
</ul>

<style lang="scss">
	.tags {
		list-style: none;
		padding: 0;

		li {
			display: inline-block;
			margin-right: 0.5rem;
		}
	}
</style>
