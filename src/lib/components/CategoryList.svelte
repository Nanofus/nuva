<script lang="ts">
    import type { Category } from '$lib/types';

    export let categories: Category[];
</script>

<ul class="categories">
    {#each categories as category}
        <li><a href="/categories/{category.slug}" class="category">{category.name}</a></li>
    {/each}
</ul>

<style lang="scss">
  .categories {
    list-style: none;
    padding: 0;

    li {
      display: inline-block;
      margin-right: 1rem;
    }
  }
</style>
