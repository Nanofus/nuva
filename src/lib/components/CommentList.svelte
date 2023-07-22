<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { CommentMeta } from "$lib/types";

  export let comments: CommentMeta[];
</script>

<table>
  <tr class="table-header">
    <td class="link">Postaus</td>
    <td class="date">Kommentoitu</td>
    <td class="authors">Kommentoija</td>
  </tr>
  {#each comments as comment}
    <tr>
      <td class="link">
        <a href="/posts/{comment.postSlug}#comment-{comment._id}">{comment.postTitle}</a>
      </td>
      <td class="date">{comment.date.toLocaleDateString(LOCALE)}</td>
      <td class="authors"><a href="/authors/{encodeURI(comment.author.username)}">{comment.author.displayName}</a></td>
    </tr>
  {/each}
</table>

<style lang="scss">
</style>
