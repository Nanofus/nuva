<script lang="ts">
  import { getPostListByTag } from "$lib/database";
  import PostList from "$lib/components/PostList.svelte";
  import type { PostListByTagResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
  import PageContent from "$lib/components/reusable/PageContent.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";

  export let data: PostListByTagResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPostListByTag(data.tagSlug, data.endCursor);
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

<PageHead title={data.tag} />

<PageContent>
  <h2>Tagi: {data.tag}</h2>
  <PostList posts={data.posts} />
  {#if data.hasNextPage && !fetching}
    <Button on:click={fetchMorePosts}>Lataa lisää</Button>
  {:else if fetching}
    <LoadingSpinner />
  {/if}
</PageContent>
