<script lang="ts">
  import { getPostListByCategory } from "$lib/database";
  import type { PostListByCategoryResponse } from "$lib/types";
  import PostList from "$lib/components/PostList.svelte";
  import Button from "$lib/components/reusable/Button.svelte";
  import Head from "$lib/components/reusable/Head.svelte";
  import PageContent from "$lib/components/reusable/PageContent.svelte";

  export let data: PostListByCategoryResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPostListByCategory(data.categorySlug, data.endCursor);
    data = {
      posts: [...data.posts, ...newData.posts],
      categorySlug: data.categorySlug,
      category: data.category,
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage
    };
    fetching = false;
  };
</script>

<Head title={data.category} />

<PageContent>
  <h2>Kategoria: {data.category}</h2>
  <PostList posts={data.posts} />
  {#if data.hasNextPage && !fetching}
    <Button on:click={fetchMorePosts}>Lataa lisää</Button>
  {/if}
</PageContent>
