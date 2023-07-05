<script lang="ts">
  import { getPostList } from "$lib/database";
  import PostList from "$lib/components/PostList.svelte";
  import type { PostListResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import Head from "$lib/components/reusable/Head.svelte";
  import PageContent from "$lib/components/reusable/PageContent.svelte";

  export let data: PostListResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPostList(data.endCursor);
    data = {
      posts: [...data.posts, ...newData.posts],
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage
    };
    fetching = false;
  };
</script>

<Head />

<PageContent>
  <h2>Kaikki ropeosat</h2>
  <PostList posts={data.posts} />
  {#if data.hasNextPage && !fetching}
    <Button on:click={fetchMorePosts}>Lataa lisää</Button>
  {/if}
</PageContent>
