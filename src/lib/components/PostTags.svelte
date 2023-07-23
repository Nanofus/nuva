<script lang="ts">
  import Pill from "$lib/components/reusable/Pill.svelte";
  import type { Tag } from "$lib/types";

  export let tags: Tag[];
</script>

<div class="vertically-separated" id="tags">
  {#each tags as tag}
    <Pill sizeByCount={false} href="/tags/{tag.slug}">{tag.name}</Pill>
  {/each}
</div>

<style lang="scss">
  #tags {
    text-align: center;
  }
</style>
