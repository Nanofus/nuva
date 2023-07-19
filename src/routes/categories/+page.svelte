<script lang="ts">
  import type { CategoryListResponse } from "$lib/types";
  import List from "$lib/components/reusable/List.svelte";
  import { getPageTitle, getPageUrl } from "$lib/util";

  export let data: CategoryListResponse;
</script>

<svelte:head>
  <title>{getPageTitle("Kategoriat")}</title>
  <meta content={"Kategoriat"} property="og:title" />
  <meta content={getPageUrl(`categories`)} property="og:url" />
</svelte:head>

<h1>Kategoriat</h1>
<List>
  {#each data.categories as category}
    <li>
      <a href="/categories/{category.slug}">{category.name}</a>
      {#if category.children.length > 0}
        <List stagger="true">
          {#each category.children as child}
            <li>
              <a href="/categories/{child.slug}">{child.name}</a>
            </li>
          {/each}
        </List>
      {/if}
    </li>
  {/each}
</List>
