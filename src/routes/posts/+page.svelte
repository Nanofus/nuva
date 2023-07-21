<script lang="ts">
  import { getPostList } from "$lib/database";
  import PostList from "$lib/components/PostList.svelte";
  import type { PostListResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import { META_CATEGORY_SLUG } from "$lib/config";
  import { getPageTitle, getPageUrl } from "$lib/util";

  export let data: PostListResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPostList(fetch, data.endCursor);
    data = {
      posts: [...data.posts, ...newData.posts]
        .filter(post => !post.categories.map(cat => cat.slug).includes(META_CATEGORY_SLUG)),
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage
    };
    fetching = false;
  };
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
