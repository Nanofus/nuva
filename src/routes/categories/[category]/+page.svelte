<script lang="ts">
	import { getPostListByCategory } from '$lib/util/database';
	import type { PostListByCategoryResponse } from '$lib/util/types';
	import PostList from '$lib/components/PostList.svelte';
	import Button from '$lib/components/reusable/Button.svelte';
	import { getPageTitle, getPageUrl } from '$lib/util/util';
	import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';
	import { onMount } from 'svelte';
	import { scrolledToBottom } from '$lib/util/stores';
	import { t } from '$lib/translations';

	export let data: PostListByCategoryResponse;
	let fetching = false;

	const fetchMorePosts = async () => {
		fetching = true;
		const newData = await getPostListByCategory(fetch, data.categorySlug, data.endCursor);
		data = {
			posts: [...data.posts, ...newData.posts],
			categorySlug: data.categorySlug,
			category: data.category,
			endCursor: newData.endCursor,
			hasNextPage: newData.hasNextPage
		};
		fetching = false;
	};

	onMount(() => {
		scrolledToBottom.subscribe(
			(scrolled) => scrolled && data.hasNextPage && !fetching && fetchMorePosts()
		);
	});
</script>

<svelte:head>
	<title>{getPageTitle(data.category)}</title>
	<meta content={data.category} property="og:title" />
	<meta content={getPageUrl(`categories/${data.categorySlug}`)} property="og:url" />
</svelte:head>

<h1>{t.pages.category.title}: {data.category}</h1>
<PostList posts={data.posts} />
{#if data.hasNextPage && !fetching}
	<Button link on:click={fetchMorePosts}>{t.common.loadMore}</Button>
{:else if fetching}
	<LoadingSpinner />
{/if}
