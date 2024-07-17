<script lang="ts">
  import PostList from '$lib/components/PostList.svelte';
  import type { PostListByTagResponse } from '$lib/util/types';
  import Button from '$lib/components/reusable/Button.svelte';
  import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';
  import { getPageTitle, getPageUrl } from '$lib/util/util';
  import { onMount } from 'svelte';
  import { scrolledToBottom } from '$lib/util/stores';
  import { t } from '$lib/util/translations';
  import { getPosts } from '$lib/client/api';

  export let data: PostListByTagResponse;
  let fetching = false;

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPosts('tag', data.tagSlug, data.endCursor, null);
    data = {
      posts: [...data.posts, ...newData.posts],
      tagSlug: data.tagSlug,
      tag: data.tag,
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage
    };
    fetching = false;
  };

  onMount(() => {
    scrolledToBottom.subscribe(
      (scrolled) => scrolled && data.hasNextPage && !fetching && fetchMorePosts()
    );
  });
</script>

<svelte:head>
  <title>{getPageTitle(data.tag)}</title>
  <meta content={data.tag} property="og:title" />
  <meta content={getPageUrl(`tags/${data.tagSlug}`)} property="og:url" />
</svelte:head>

<h1>{t.pages.tag.title}: {data.tag}</h1>
<PostList posts={data.posts} />
{#if data.hasNextPage && !fetching}
  <Button link on:click={fetchMorePosts}>{t.common.loadMore}</Button>
{:else if fetching}
  <LoadingSpinner />
{/if}
