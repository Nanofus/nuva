<script lang="ts">
  import PostList from '$lib/components/PostList.svelte';
  import type { PostListBySearchResponse } from '$lib/types';
  import Button from '$lib/components/reusable/Button.svelte';
  import { getPageTitle, getPageUrl } from '$lib/client/util';
  import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';
  import { onMount } from 'svelte';
  import { scrolledToBottom } from '$lib/client/stores';
  import { t } from '$lib/client/localization';
  import { getPosts } from '$lib/client/api';

  interface Props {
    data: PostListBySearchResponse;
  }

  let { data = $bindable() }: Props = $props();
  let fetching = $state(false);

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPosts(null, null, data.endCursor, data.searchTerm);
    data = {
      posts: [...data.posts, ...newData.posts],
      searchTerm: data.searchTerm,
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
  <title>{getPageTitle(data.searchTerm)}</title>
  <meta content={data.searchTerm} property="og:title" />
  <meta content={getPageUrl(`search/${encodeURI(data.searchTerm)}`)} property="og:url" />
</svelte:head>

<h1>{t.pages.searchResults.title}: {data.searchTerm}</h1>
<PostList posts={data.posts} />
{#if data.hasNextPage && !fetching}
  <Button link onclick={fetchMorePosts}>{t.common.loadMore}</Button>
{:else if fetching}
  <LoadingSpinner />
{/if}
