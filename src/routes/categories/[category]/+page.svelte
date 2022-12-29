<script lang="ts">
	import { getPostsByCategory } from '$lib/api';
	import PostList from '$lib/components/PostList.svelte';

	export let data: any;
	let fetching = false;

	const fetchMorePosts = async () => {
		fetching = true;
		const newData = await getPostsByCategory(data.categorySlug, data.endCursor);
		data = {
			posts: [...data.posts, ...newData.posts],
			categorySlug: data.categorySlug,
			category: data.category,
			endCursor: newData.endCursor,
			hasNextPage: newData.hasNextPage
		};
		fetching = false;
	};
</script>

<html lang="fi">
	<h2>Kategoria: {data.category}</h2>
	<PostList posts={data.posts} />
	{#if data.hasNextPage && !fetching}
		<button on:click={fetchMorePosts}>Lataa lisää</button>
	{/if}
</html>
