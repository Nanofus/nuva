<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { PostMeta } from "$lib/types";

  export let posts: PostMeta[];
</script>

<table>
  <tr>
    <th class="link">Nimi (kommentit)</th>
    <th class="date">Julkaisu</th>
    <th class="authors">Kirjoittajat</th>
  </tr>
  {#each posts as post}
    <tr>
      <td class="link"><a href="/posts/{post.slug}">{post.title}</a> ({post.commentCount ? post.commentCount : 0})</td>
      <td class="date">{post.date.toLocaleDateString(LOCALE)}</td>
      <td class="authors">{post.authors.join(', ')}</td>
    </tr>
  {/each}
</table>

<style lang="scss">
  table {
    max-width: calc(var(--article-text-width) * 1.5);
    padding: 2rem;

    td, th {
      text-align: left;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
</style>