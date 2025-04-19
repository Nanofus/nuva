<script lang="ts">
  import type { PostListByCategoryResponse } from '$lib/types';
  import PostList from '$lib/components/PostList.svelte';
  import Button from '$lib/components/reusable/Button.svelte';
  import { getPageTitle, getPageUrl } from '$lib/client/util';
  import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';
  import { onMount } from 'svelte';
  import { scrolledToBottom } from '$lib/client/stores';
  import { t } from '$lib/client/localization';
  import { getPosts } from '$lib/client/api';

  interface Props {
    data: PostListByCategoryResponse;
  }

  let { data = $bindable() }: Props = $props();
  let fetching = $state(false);

  const fetchMorePosts = async () => {
    fetching = true;
    const newData = await getPosts('category', data.categorySlug, data.endCursor, null);
    data = {
      posts: [...data.posts, ...newData.posts],
      categorySlug: data.categorySlug,
      category: data.category,
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
  <title>{getPageTitle(data.category)}</title>
  <meta content={data.category} property="og:title" />
  <meta content={getPageUrl(`categories/${data.categorySlug}`)} property="og:url" />
</svelte:head>

<h1>{t.pages.category.title}: {data.category}</h1>
<PostList posts={data.posts} />
{#if data.hasNextPage && !fetching}
  <Button link onclick={fetchMorePosts}>{t.common.loadMore}</Button>
{:else if fetching}
  <LoadingSpinner />
{/if}
