<script lang="ts">
  import type { Category } from '$lib/types';

  interface Props {
    categories: Category[];
  }

  let { categories }: Props = $props();
</script>

<ul class="categories">
  {#each categories as category (category._id)}
    <li><a href="/categories/{category.slug}" class="category">{category.name}</a></li>
  {/each}
</ul>

<style>
  .categories {
    list-style: none;
    padding: 0;

    li {
      display: inline-block;
      margin-right: 1rem;
    }
  }
</style>
