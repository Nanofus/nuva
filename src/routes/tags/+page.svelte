<script lang="ts">
  import { getTagList } from "$lib/database";
  import type { TagListResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
  import List from "$lib/components/reusable/List.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import Pill from "$lib/components/reusable/Pill.svelte";

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
</script>

<PageHead title="Tagit" />

<h1>Tagit</h1>
<div class="tags">
  {#each data.tags as tag}
    <Pill href="/tags/{tag.slug}">{tag.name}</Pill>
  {/each}
</div>
<br />
{#if data.hasNextPage && !fetching}
  <Button on:click={fetchMoreTags}>Lataa lisää</Button>
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

