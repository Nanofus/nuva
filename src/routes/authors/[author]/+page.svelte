<script lang="ts">
  import type { PostListByAuthorResponse } from "$lib/util/types";
  import PostList from "$lib/components/PostList.svelte";
  import Button from "$lib/components/reusable/Button.svelte";
  import { getPageTitle, getPageUrl } from "$lib/util/util";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import { onMount } from "svelte";
  import { scrolledToBottom } from "$lib/util/stores";
  import { t } from "$lib/util/translations";
  import { getPosts } from "$lib/client/api";

  export let data: PostListByAuthorResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPosts("author", data.author, data.endCursor, null);
    data = {
      posts: [...data.posts, ...newData.posts],
      author: data.author,
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
  <title>{getPageTitle(data.author)}</title>
  <meta content={data.author} property="og:title" />
  <meta content={getPageUrl(`authors/${encodeURI(data.author)}`)} property="og:url" />
</svelte:head>

<h1>{t.pages.author.title}: {data.author}</h1>
<PostList posts={data.posts} />
{#if data.hasNextPage && !fetching}
  <Button link on:click={fetchMorePosts}>{t.common.loadMore}</Button>
{:else if fetching}
  <LoadingSpinner />
{/if}
