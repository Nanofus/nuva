<script lang="ts">
  import PostList from "$lib/components/PostList.svelte";
  import type { PostListResponse } from "$lib/util/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import { filterExcludedCategories, getPageTitle, getPageUrl } from "$lib/util/util";
  import { onMount } from "svelte";
  import { scrolledToBottom } from "$lib/util/stores";
  import { t } from "$lib/util/translations";
  import { getPosts } from "$lib/client/api";

  export let data: PostListResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPosts(null, null, data.endCursor, null);
    data = {
      posts: filterExcludedCategories([...data.posts, ...newData.posts]),
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage,
    };
    fetching = false;
  };

  onMount(() => {
    scrolledToBottom.subscribe((scrolled) => scrolled && data.hasNextPage && !fetching && fetchMorePosts());
  });
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.posts.title)}</title>
  <meta content={t.pages.posts.title} property="og:title" />
  <meta content={getPageUrl(`/posts`)} property="og:url" />
</svelte:head>

<h1>{t.pages.posts.title}</h1>
<PostList posts={data.posts} />
<div class="vertically-separated">
  {#if data.hasNextPage && !fetching}
    <Button link on:click={fetchMorePosts}>{t.common.loadMore}</Button>
  {:else if fetching}
    <LoadingSpinner />
  {/if}
</div>
