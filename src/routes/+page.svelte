<script lang="ts">
	import { getPostList } from '$lib/database';
	import PostList from '$lib/components/PostList.svelte';
	import { type PostListResponse } from '$lib/types';

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

<html lang="fi">
	<h2>Kaikki ropeosat</h2>
	<PostList posts={data.posts} />
	{#if data.hasNextPage && !fetching}
		<button on:click={fetchMorePosts}>Lataa lisää</button>
	{/if}
</html>

<style lang="scss">
</style>
