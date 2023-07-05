<script lang="ts">
	import { getTagList } from '$lib/database';
	import type { TagListResponse } from '$lib/types';
	import Button from "$lib/components/reusable/Button.svelte";

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

<h2>Tagit</h2>
<ul>
	{#each data.tags as tag}
		<li><a href="/tags/{tag.slug}">{tag.name}</a></li>
	{/each}
</ul>
{#if data.hasNextPage && !fetching}
	<Button on:click={fetchMoreTags}>Lataa lisää</Button>
{/if}

<style lang="scss">
	ul {
		list-style: none;
		padding: 0;
	}
</style>
