<script lang="ts">
  import List from '$lib/components/reusable/List.svelte';
  import { getPageTitle, getPageUrl } from '$lib/client/util';
  import { t } from '$lib/client/localization';
  import type { CategoryListResponse } from '$lib/types';

  interface Props {
    data: CategoryListResponse;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.categories.title)}</title>
  <meta content={t.pages.categories.title} property="og:title" />
  <meta content={getPageUrl('categories')} property="og:url" />
</svelte:head>

<h1>{t.pages.categories.title}</h1>
<List>
  {#each data.categories as category (category._id)}
    <li>
      <a href="/categories/{category.slug}">{category.name}</a>
      {#if category.children.length > 0}
        <List stagger={true}>
          {#each category.children as child (child._id)}
            <li>
              <a href="/categories/{child.slug}">{child.name}</a>
            </li>
          {/each}
        </List>
      {/if}
    </li>
  {/each}
</List>
