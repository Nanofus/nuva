<script lang="ts">
  import { getPostListByCategory } from "$lib/database";
  import type { PostListByCategoryResponse } from "$lib/types";
  import PostList from "$lib/components/PostList.svelte";
  import Button from "$lib/components/reusable/Button.svelte";
  import PageHead from "$lib/components/reusable/PageHead.svelte";

  export let data: PostListByCategoryResponse;
  let fetching = false;

  const fetchMorePosts = async ({ fetch }) => {
    fetching = true;
    const newData = await getPostListByCategory(fetch, data.categorySlug, data.endCursor);
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

<PageHead title={data.category} />

<h1>Kategoria: {data.category}</h1>
<PostList posts={data.posts} />
{#if data.hasNextPage && !fetching}
  <Button on:click={fetchMorePosts}>Lataa lisää</Button>
{/if}
