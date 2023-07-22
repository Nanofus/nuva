<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { CommentMeta } from "$lib/types";

  export let comments: CommentMeta[];
</script>

<table>
  <tr class="table-header">
    <td class="link">Postaus</td>
    <td class="date">Päiväys</td>
    <td class="authors">Kommentoija</td>
  </tr>
  {#each comments as comment}
    <tr>
      <td class="link">
        <a href="/posts/{comment.postSlug}#comment-{comment._id}">{comment.postTitle}</a>
      </td>
      <td class="date">{comment.date.toLocaleDateString(LOCALE)}</td>
      <td class="authors"><a href="/authors/{encodeURI(comment.author)}">{comment.author}</a></td>
    </tr>
  {/each}
</table>

<style lang="scss">
  .comment-count {
    text-align: center;
    font-size: 1rem;
  }

  @media screen and (max-width: 41rem) { // var(--mobile-threshold)
    .date {
      text-align: right;
    }

    .mobile-unfriendly {
      color: var(--hover-dark);

      a, .categories {
        color: var(--hover-dark);
      }
    }
  }

  .categories {
    color: var(--text-light-secondary);
    font-style: italic;
  }
</style>
