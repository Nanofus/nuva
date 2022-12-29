<script lang="ts">
	import { getPostList } from '$lib/database';
	import PostList from '$lib/components/PostList.svelte';
	import type { PostListBySearchResponse } from '$lib/types';

	export let data: PostListBySearchResponse;
	let fetching = false;

	const fetchMorePosts = async () => {
		fetching = true;
		const newData = await getPostList(data.endCursor, data.searchTerm);
		data = {
			posts: [...data.posts, ...newData.posts],
			searchTerm: data.searchTerm,
			endCursor: newData.endCursor,
			hasNextPage: newData.hasNextPage
		};
		fetching = false;
	};
</script>

<html lang="fi">
	<h2>Haku: {data.searchTerm}</h2>
	<PostList posts={data.posts} />
	{#if data.hasNextPage && !fetching}
		<button on:click={fetchMorePosts}>Lataa lisää</button>
	{/if}
</html>
