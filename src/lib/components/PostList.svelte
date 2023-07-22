<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { Category, PostMeta } from "$lib/types";
  import { onMount } from "svelte";

  export let posts: PostMeta[];

  let parseCategories = (categories: Category[]) => {
    categories = categories.filter(c => c.slug !== "rope");
    if (categories.length === 0) return "";
    return `– ${categories.map(c => c.name).join(", ")}`;
  };
</script>

<table>
  <tr class="table-header">
    <td class="link">Nimi</td>
    <td class="comment-count hidden-mobile material-icons">forum</td>
    <td class="date">Julkaisu</td>
    <td class="authors hidden-mobile">Postaaja</td>
  </tr>
  {#each posts as post}
    <tr class={post.mobileFriendly ? "" : "mobile-unfriendly"}>
      <td class="link">
        <a href="/posts/{post.slug}">{post.title}</a>
        <span class="categories">{parseCategories(post.categories)}</span>
      </td>
      <td class="comment-count hidden-mobile">{post.commentCount ? post.commentCount : ""}</td>
      <td class="date">{post.date.toLocaleDateString(LOCALE)}</td>
      <td class="authors hidden-mobile"><a href="/authors/{encodeURI(post.author.username)}">{post.author.displayName}</a></td>
    </tr>
  {/each}
</table>

<style lang="scss">
  .comment-count {
    text-align: center;
    font-size: 1rem;
  }

  @media screen and (max-width: 41rem) { // TODO: Fix hardcoded value, media queries don't support calc() or var()
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