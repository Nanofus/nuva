<script lang="ts">
  import { getPostList } from "$lib/database";
  import PostList from "$lib/components/PostList.svelte";
  import type { PostListResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import { META_CATEGORY_SLUG } from "$lib/config";
  import { getPageTitle, getPageUrl } from "$lib/util";
  import FeaturedPost from "$lib/components/FeaturedPost.svelte";

  export let data: PostListResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPostList(fetch, data.endCursor);
    data = {
      posts: [...data.posts, ...newData.posts]
        .filter(post => post.categories
          .map(category => category.slug)
          .indexOf(META_CATEGORY_SLUG) === -1),
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage
    };
    fetching = false;
  };
</script>

<svelte:head>
  <title>{getPageTitle("Etusivu")}</title>
  <meta content={"Etusivu"} property="og:title" />
  <meta content={getPageUrl(`/`)} property="og:url" />
</svelte:head>

<FeaturedPost postMeta={data.posts[0]} />
<h3>Kaikki julkaisut</h3>
<PostList posts={data.posts} />
{#if data.hasNextPage && !fetching}
  <Button on:click={fetchMorePosts}>Lataa lisää</Button>
{:else if fetching}
  <LoadingSpinner />
{/if}
