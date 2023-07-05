<script lang="ts">
  import { getTagList } from "$lib/database";
  import type { TagListResponse } from "$lib/types";
  import Button from "$lib/components/reusable/Button.svelte";
  import Head from "$lib/components/reusable/Head.svelte";
  import PageContent from "$lib/components/reusable/PageContent.svelte";
  import List from "$lib/components/reusable/List.svelte";

  export let data: TagListResponse;
  let fetching = false;

  const fetchMoreTags = async () => {
    fetching = true;
    const newData = await getTagList(data.endCursor);
    data = {
      tags: [...data.tags, ...newData.tags],
      endCursor: newData.endCursor,
      hasNextPage: newData.hasNextPage
    };
    fetching = false;
  };
</script>

<Head title="Tagit" />

<PageContent>
  <h2>Tagit</h2>
  <List>
    {#each data.tags as tag}
      <li><a href="/tags/{tag.slug}">{tag.name}</a></li>
    {/each}
  </List>
  {#if data.hasNextPage && !fetching}
    <Button on:click={fetchMoreTags}>Lataa lisää</Button>
  {/if}
</PageContent>
