<script lang="ts">
	import { getTagList } from '$lib/database';
    import { type TagListResponse } from '$lib/types';

	export let data: TagListResponse;
	let fetching = false;

	const fetchMoreTags = async () => {
		fetching = true;
		const newData = await getTagList(data.endCursor);
		data = {
			tags: [...data.tags, ...newData.tags],
			endCursor: newData.endCursor,
			hasNextPage: newData.hasNextPage
		};
		fetching = false;
	};
</script>

<html lang="fi">
	<h2>Tagit</h2>
	<ul>
		{#each data.tags as tag}
			<li><a href="/tags/{tag.slug}">{tag.name}</a></li>
		{/each}
	</ul>
	{#if data.hasNextPage && !fetching}
		<button on:click={fetchMoreTags}>Lataa lisää</button>
	{/if}
</html>

<style lang="scss">
	ul {
		list-style: none;
		padding: 0;
	}
</style>
