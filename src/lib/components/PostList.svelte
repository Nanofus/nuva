<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { Category, PostMeta } from "$lib/types";

  export let posts: PostMeta[];

  let parseCategories = (categories: Category[]) => {
    categories = categories.filter(c => c.slug !== "rope");
    if (categories.length === 0) return "";
    return `– ${categories.map(c => c.name).join(", ")}`;
  };
</script>

<table>
  <tr class="list-header">
    <td class="link">Nimi</td>
    <td class="comment-count hidden-mobile material-icons">forum</td>
    <td class="date">Julkaisu</td>
    <td class="authors hidden-mobile">Postaaja</td>
  </tr>
  {#each posts as post}
    <tr>
      <td class="link {post.mobileFriendly ? '' : 'mobile-unfriendly'}">
        <a href="/posts/{post.slug}">{post.title}</a>
        <span class="categories">{parseCategories(post.categories)}</span>
      </td>
      <td class="comment-count hidden-mobile">{post.commentCount ? post.commentCount : ""}</td>
      <td class="date">{post.date.toLocaleDateString(LOCALE)}</td>
      <td class="authors hidden-mobile">{post.authors[0]}</td>
    </tr>
  {/each}
</table>

<style lang="scss">
  table {
    width: var(--article-max-width);
  }

  td:not(:first-child) {
    padding-left: 1rem;
  }

  .comment-count {
    text-align: center;
    font-size: 1rem;
  }

  @media screen and (max-width: 41rem) { // TODO: Fix hardcoded value, media queries don't support calc() or var()
    .date {
      text-align: right;
    }

    .mobile-unfriendly {
      a {
        color: var(--hover-dark);
      }

      .categories {
        color: var(--hover-dark);
      }
    }

    table {
      width: 100%;
    }
  }

  .list-header {
    font-weight: bold;
  }

  .categories {
    color: var(--text-light-secondary);
    font-style: italic;
  }
</style>