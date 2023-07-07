<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { PostMeta } from "$lib/types";
  import List from "$lib/components/reusable/List.svelte";

  export let posts: PostMeta[];
</script>

<List>
  <li class="list-header">
    <span class="link">Nimi (kommentit)</span>
    <span class="date">Julkaisu</span>
    <span class="authors">Kirjoittajat</span>
  </li>
  {#each posts as post}
    <li>
        <span class="link"><a href="/posts/{post.slug}">{post.title}</a> ({post.commentCount ? post.commentCount : 0})
        </span>
      <span class="date">{post.date.toLocaleDateString(LOCALE)}</span>
      <span class="authors">{post.authors.join(', ')}</span>
    </li>
  {/each}
</List>

<style lang="scss">
  li {
    display: grid;
    grid-template-columns: 3fr 1fr 2fr;
    gap: 1rem;
    padding-bottom: 0.2rem;
  }

  .list-header {
    font-weight: bold;
  }
</style>