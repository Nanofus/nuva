<script lang="ts">
  import { getPostListByCategory } from "$lib/database";
  import type { PostListByAuthorResponse, PostListByCategoryResponse } from "$lib/types";
  import PostList from "$lib/components/PostList.svelte";
  import Button from "$lib/components/reusable/Button.svelte";
  import { getPageTitle, getPageUrl } from "$lib/util";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";

  export let data: PostListByAuthorResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPostListByCategory(fetch, data.author.username, data.endCursor);
    data = {
      posts: [...data.posts, ...newData.posts],
      author: data.author,
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage
    };
    fetching = false;
  };
</script>

<svelte:head>
  <title>{getPageTitle(data.author.displayName)}</title>
  <meta content={data.author.displayName} property="og:title" />
  <meta content={getPageUrl(`authors/${encodeURI(data.author.username)}`)} property="og:url" />
</svelte:head>

<h1>Kirjoittaja: {data.author.displayName}</h1>
<PostList posts={data.posts} />
{#if data.hasNextPage && !fetching}
  <Button on:click={fetchMorePosts}>Lataa lisää</Button>
{:else if fetching}
  <LoadingSpinner />
{/if}
