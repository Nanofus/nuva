<script lang="ts">
	import { getPostList } from '$lib/database';
	import PostList from '$lib/components/PostList.svelte';
	import type { PostListResponse } from '$lib/types';
	import Button from "$lib/components/reusable/Button.svelte";

	export let data: PostListResponse;
	let fetching = false;

	const fetchMorePosts = async () => {
		fetching = true;
		const newData = await getPostList(data.endCursor);
		data = {
			posts: [...data.posts, ...newData.posts],
			endCursor: newData.endCursor,
			hasNextPage: newData.hasNextPage
		};
		fetching = false;
	};
</script>

<section>
	<h2>Kaikki ropeosat</h2>
	<PostList posts={data.posts} />
	{#if data.hasNextPage && !fetching}
		<Button on:click={fetchMorePosts}>Lataa lisää</Button>
	{/if}
</section>
<aside class="sidebar">

</aside>

<style lang="scss">
	:global(#page main) {
		display: flex;
	}

	section {
		flex: 4;
	}

	aside {
		flex: 1;
	}

	section, aside {
		padding: 3em 0 3em 3em;
		box-sizing: border-box;
	}
</style>
