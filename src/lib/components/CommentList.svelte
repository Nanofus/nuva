<script lang="ts">
  import { clientConfig } from '$lib/client/config';
  import type { CommentMeta } from '$lib/types';
  import { t } from '$lib/client/localization';

  export let comments: CommentMeta[];
</script>

<table>
  <tbody>
    <tr class="table-header">
      <td class="link">{t.components.commentList.post}</td>
      <td class="date">{t.components.commentList.date}</td>
      <td class="commenter">{t.components.commentList.commenter}</td>
    </tr>
    {#each comments as comment (comment._id)}
      <tr>
        <td class="link">
          <a href="/posts/{comment.postSlug}#comment-{comment._id}">{comment.postTitle}</a>
        </td>
        <td class="date">{comment.date.toLocaleDateString(clientConfig.locale)}</td>
        <td class="commenter"
        ><a href="/authors/{encodeURI(comment.author)}">{comment.author}</a></td
        >
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  @media screen and (max-width: 41rem) {
    // var(--mobile-threshold)
    .date {
      text-align: right;
    }
  }
</style>
