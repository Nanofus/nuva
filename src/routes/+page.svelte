<script lang="ts">
	import { getPosts } from '$lib/api';
	import PostList from '$lib/components/PostList.svelte';

	export let data: any;
	let fetching = false;

	const fetchMorePosts = async () => {
		fetching = true;
		const newData = await getPosts(data.endCursor);
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
