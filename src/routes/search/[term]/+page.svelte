<script lang="ts">
  import { getPostList } from "$lib/database";
  import PostList from "$lib/components/PostList.svelte";
  import type { PostListBySearchResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import PageHead from "$lib/components/reusable/PageHead.svelte";

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
</script>

<PageHead title={data.searchTerm} />

<h2>Haku: {data.searchTerm}</h2>
<PostList posts={data.posts} />
{#if data.hasNextPage && !fetching}
  <Button on:click={fetchMorePosts}>Lataa lisää</Button>
{/if}
