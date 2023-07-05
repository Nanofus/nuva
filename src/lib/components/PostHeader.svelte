<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { Post } from "$lib/types";
  import PostCategories from "$lib/components/PostCategories.svelte";

  export let post: Post;
</script>

<header class="post-header">
  <div class="post-meta">
    <PostCategories categories={post.categories} />
  </div>
  <h1 class="post-title">{post.title}</h1>
  <div class="post-meta">
    <time class="post-date">{post.date.toLocaleDateString(LOCALE)}</time>
    <span class="post-authors">{post.authors.join(', ')}</span>
    <span class="post-comments-link">
			<a href="#comments">{post.commentCount ? post.commentCount : 0} kommenttia</a>
		</span>
  </div>
</header>

<style lang="scss">
  .post-meta {
    font-family: var(--accent-font-family);
    font-weight: bold;

    > * {
      margin: 0 1rem 0 0;

      &:before {
        margin-right: 0.2rem;
        position: relative;
        top: 0.1rem;
        font: normal 1rem/1 "Genericons-Neue";
      }

      a, a:link, a:visited {
        text-decoration: none;
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
  }
</style>