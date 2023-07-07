<script lang="ts">
  import type { Tag } from "$lib/types";
  import Pill from "$lib/components/reusable/Pill.svelte";

  export let tags: Tag[];
</script>

<div id="post-tags">
  {#each tags as tag}
    <Pill href="/tags/{tag.slug}">{tag.name}</Pill>
  {/each}
</div>

<style lang="scss">
  #post-tags {
    margin-top: 3rem;
    text-align: center;
  }
</style>
