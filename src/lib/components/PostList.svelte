<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { PostMeta } from "$lib/types";

  export let posts: PostMeta[];
</script>

<table>
  <tr>
    <th class="link">Nimi</th>
    <th class="date">Julkaisu</th>
    <th class="authors">Kirjoittajat</th>
    <th class="comments">Kommentteja</th>
  </tr>
  {#each posts as post}
    <tr>
      <td class="link"><a href="/posts/{post.slug}">{post.title}</a></td>
      <td class="date">{post.date.toLocaleDateString(LOCALE)}</td>
      <td class="authors">{post.authors.join(', ')}</td>
      <td class="comments">{post.commentCount ? post.commentCount : 0}</td>
    </tr>
  {/each}
</table>

<style lang="scss">
  table {
    width: 100%;
    padding: 2rem;

    td, th {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
</style>