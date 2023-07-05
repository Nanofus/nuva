<script lang="ts">
  import type { Tag } from "$lib/types";

  export let tags: Tag[];
</script>

<ul class="tags">
  {#each tags as tag}
    <li><a href="/tags/{tag.slug}" class="tag">{tag.name}</a></li>
  {/each}
</ul>

<style lang="scss">
  .tags {
    list-style: none;
    text-align: center;
    padding: 0;

    li {
      display: inline-block;
      background: rgba(0, 0, 0, 0.1);
      margin: 0.125rem 0.25rem;
      position: relative;
      border-radius: 0.25rem;
      font-size: 0.8em;
      font-weight: 700;
      line-height: 1.2727272727;
      font-family: var(--accent-font-family);
      text-transform: uppercase;

      a {
        display: block;
        text-decoration: none;
        padding: 0.25rem 0.5rem;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.03);
      }
    }
  }
</style>
