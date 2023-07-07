<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { Category, PostMeta } from "$lib/types";
  import List from "$lib/components/reusable/List.svelte";

  export let posts: PostMeta[];

  let parseCategories = (categories: Category[]) => {
    categories = categories.filter(c => c.slug !== "rope");
    if (categories.length === 0) return "";
    return `– ${categories.map(c => c.name).join(", ")}`;
  };
</script>

<List>
  <li class="list-header">
    <span class="link">Nimi</span>
    <span class="comment-count"></span>
    <span class="date">Julkaisu</span>
    <span class="authors">Kirjoittajat</span>
  </li>
  {#each posts as post}
    <li>
      <span class="link"><a href="/posts/{post.slug}">{post.title}</a>
        <span class="categories">{parseCategories(post.categories)}</span>
      </span>
      <span class="comment-count">{post.commentCount ? post.commentCount : ""}</span>
      <span class="date">{post.date.toLocaleDateString(LOCALE)}</span>
      <span class="authors">{post.authors.join(', ')}</span>
    </li>
  {/each}
</List>

<style lang="scss">
  li {
    display: grid;
    grid-template-columns: 3fr 0fr 1fr 2fr;
    gap: 1rem;
    padding-bottom: 0.2rem;
  }

  .list-header {
    font-weight: bold;

    .comment-count:before {
      font: normal 1rem "Genericons-Neue";
      content: "\f300";
    }
  }

  .categories {
    color: var(--text-light-secondary);
    font-style: italic;
  }
</style>