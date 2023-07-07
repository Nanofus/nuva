<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { Post } from "$lib/types";
  import PostCategories from "$lib/components/PostCategories.svelte";

  export let post: Post;
</script>

<header id="post-header">
  <h1 id="post-title">{post.title}</h1>
  <div id="post-meta">
    <span class="post-categories">
      {#each post.categories as category}
        <span class="post-category"><a href="/categories/{category.slug}">{category.name}</a></span>
      {/each}
    </span>
    <time class="post-date">{post.date.toLocaleDateString(LOCALE)}</time>
    <span class="post-authors">{post.authors.join(', ')}</span>
    <span class="post-comments-link">
			<a href="#comments">{post.commentCount ? post.commentCount : 0} kommenttia</a>
		</span>
  </div>
</header>

<style lang="scss">
  #post-meta {
    font-family: var(--accent-font-family);
    text-align: center;

    > * {
      display: inline-block;
      margin-left: 0.2rem;
      margin-right: 0.2rem;

      &:before {
        margin-right: 0.3rem;
        position: relative;
        top: 0.1rem;
        font: normal 1rem "Genericons-Neue";
      }
    }

    .post-date:before, .post-authors:before {
      content: "\f303";
    }

    .post-authors:before {
      content: "\f304";
    }

    .post-comments-link:before {
      content: "\f300";
    }

    .post-categories:before {
      content: "\f301";
    }

    .post-category:not(:last-child):after {
      content: ', ';
    }
  }
</style>