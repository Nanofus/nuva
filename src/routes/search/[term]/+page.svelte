<script lang="ts">
  import { getPostList } from "$lib/database";
  import PostList from "$lib/components/PostList.svelte";
  import type { PostListBySearchResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import { getPageTitle, getPageUrl } from "$lib/util";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import { onMount } from "svelte";
  import { scrolledToBottom } from "$lib/stores";

  export let data: PostListBySearchResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPostList(fetch, data.endCursor, data.searchTerm);
    data = {
      posts: [...data.posts, ...newData.posts],
      searchTerm: data.searchTerm,
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage
    };
    fetching = false;
  };

  onMount(() => {
    scrolledToBottom.subscribe(scrolled => scrolled && data.hasNextPage && !fetching && fetchMorePosts());
  });
</script>

<svelte:head>
  <title>{getPageTitle(data.searchTerm)}</title>
  <meta content={data.searchTerm} property="og:title" />
  <meta content={getPageUrl(`search/${encodeURI(data.searchTerm)}`)} property="og:url" />
</svelte:head>

<h1>Haku: {data.searchTerm}</h1>
<PostList posts={data.posts} />
{#if data.hasNextPage && !fetching}
  <Button link on:click={fetchMorePosts}>Lataa lisää</Button>
{:else if fetching}
  <LoadingSpinner />
{/if}
