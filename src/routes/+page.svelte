<script lang="ts">
  import { getPostList } from "$lib/database";
  import PostList from "$lib/components/PostList.svelte";
  import type { PostListResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
  import PageContent from "$lib/components/reusable/PageContent.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";

  export let data: PostListResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPostList(null, data.endCursor);
    data = {
      posts: [...data.posts, ...newData.posts],
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage
    };
    fetching = false;
  };
</script>

<PageHead />

<PageContent>
  <h2>Kaikki ropeosat</h2>
  <PostList posts={data.posts} />
  {#if data.hasNextPage && !fetching}
    <Button on:click={fetchMorePosts}>Lataa lisää</Button>
  {:else if fetching}
    <LoadingSpinner />
  {/if}
</PageContent>
