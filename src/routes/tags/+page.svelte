<script lang="ts">
  import type { TagListResponse } from '$lib/types';
  import Button from '$lib/components/reusable/Button.svelte';
  import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';
  import Pill from '$lib/components/reusable/Pill.svelte';
  import { getPageTitle, getPageUrl } from '$lib/client/util';
  import { onMount } from 'svelte';
  import { scrolledToBottom } from '$lib/client/stores';
  import { t } from '$lib/client/localization';
  import { getTags } from '$lib/client/api';

  interface Props {
    data: TagListResponse;
  }

  let { data = $bindable() }: Props = $props();
  let fetching = $state(false);

  const fetchMoreTags = async () => {
    fetching = true;
    const newData = await getTags(data.endCursor);
    data = {
      tags: [...data.tags, ...newData.tags],
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage
    };
    fetching = false;
  };

  onMount(() => {
    scrolledToBottom.subscribe(
      (scrolled) => scrolled && data.hasNextPage && !fetching && fetchMoreTags()
    );
  });
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.tags.title)}</title>
  <meta content={t.pages.tags.title} property="og:title" />
  <meta content={getPageUrl('tags')} property="og:url" />
</svelte:head>

<h1>{t.pages.tags.title}</h1>
<div class="tags">
  {#each data.tags as tag (tag.slug)}
    <Pill sizeByCount={tag.count} href="/tags/{tag.slug}">{tag.name}</Pill>
  {/each}
</div>
<br />
{#if data.hasNextPage && !fetching}
  <Button link onclick={fetchMoreTags}>{t.common.loadMore}</Button>
{:else if fetching}
  <LoadingSpinner />
{/if}

<style lang="scss">
  .tags {
    max-width: var(--article-max-width);
    text-align: center;
    padding-bottom: 2rem;
  }
</style>
