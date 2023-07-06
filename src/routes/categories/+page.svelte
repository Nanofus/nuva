<script lang="ts">
  import type { CategoryListResponse } from "$lib/types";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
  import List from "$lib/components/reusable/List.svelte";

  export let data: CategoryListResponse;
</script>

<PageHead title="Kategoriat" />

<h2>Kategoriat</h2>
<List>
  {#each data.categories as category}
    <li>
      <a href="/categories/{category.slug}">{category.name}</a>
      {#if category.children.length > 0}
        <List>
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
