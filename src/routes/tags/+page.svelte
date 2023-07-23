<script lang="ts">
  import { getTagList } from "$lib/database";
  import type { TagListResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import Pill from "$lib/components/reusable/Pill.svelte";
  import { getPageTitle, getPageUrl } from "$lib/util";
  import { onMount } from "svelte";
  import { scrolledToBottom } from "$lib/stores";

  export let data: TagListResponse;
  let fetching = false;

  const fetchMoreTags = async () => {
    fetching = true;
    const newData = await getTagList(fetch, data.endCursor);
    data = {
      tags: [...data.tags, ...newData.tags],
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage
    };
    fetching = false;
  };

  onMount(() => {
    scrolledToBottom.subscribe(scrolled => scrolled && data.hasNextPage && !fetching && fetchMoreTags());
  });
</script>

<svelte:head>
  <title>{getPageTitle("Tagit")}</title>
  <meta content={"Tagit"} property="og:title" />
  <meta content={getPageUrl(`tags`)} property="og:url" />
</svelte:head>

<h1>Tagit</h1>
<div class="tags">
  {#each data.tags as tag}
    <Pill sizeByCount={tag.count} href="/tags/{tag.slug}">{tag.name}</Pill>
  {/each}
</div>
<br />
{#if data.hasNextPage && !fetching}
  <Button link on:click={fetchMoreTags}>Lataa lisää</Button>
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

