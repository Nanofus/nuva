<script lang="ts">
	import { getPostsByTag } from '$lib/api';
	import PostList from '$lib/components/PostList.svelte';

	export let data: any;
	let fetching = false;

	const fetchMorePosts = async () => {
		fetching = true;
		const newData = await getPostsByTag(data.tagSlug, data.endCursor);
		data = {
			posts: [...data.posts, ...newData.posts],
			tagSlug: data.tagSlug,
			tag: data.tag,
			endCursor: newData.endCursor,
			hasNextPage: newData.hasNextPage
		};
		fetching = false;
	};
</script>

<html lang="fi">
	<h2>Tagi: {data.tag}</h2>
	<PostList posts={data.posts} />
	{#if data.hasNextPage && !fetching}
		<button on:click={fetchMorePosts}>Lataa lisää</button>
	{/if}
</html>
