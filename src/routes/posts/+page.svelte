<script lang="ts">
  import { getPostList } from "$lib/database";
  import PostList from "$lib/components/PostList.svelte";
  import type { PostListResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import { filterExcludedCategories, getPageTitle, getPageUrl } from "$lib/util";
  import { onMount } from "svelte";
  import { scrolledToBottom } from "$lib/stores";

  export let data: PostListResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPostList(fetch, data.endCursor);
    data = {
      posts: filterExcludedCategories([...data.posts, ...newData.posts]),
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
  <title>{getPageTitle("Julkaisut")}</title>
  <meta content={"Julkaisut"} property="og:title" />
  <meta content={getPageUrl(`/posts`)} property="og:url" />
</svelte:head>

<h1>Kaikki julkaisut</h1>
<PostList posts={data.posts} />
<div class="vertically-separated">
  {#if data.hasNextPage && !fetching}
    <Button on:click={fetchMorePosts}>Lataa lisää</Button>
  {:else if fetching}
    <LoadingSpinner />
  {/if}
</div>
