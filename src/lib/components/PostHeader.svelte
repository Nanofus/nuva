<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { Post } from "$lib/types";

  export let post: Post;
</script>

<header id="post-header">
  <h1 id="post-title">{post.title}</h1>
  <div id="post-meta">
    <span class="post-categories">
      <span class="material-icons">folder</span>
      {#each post.categories as category}
        <span class="post-category"><a href="/categories/{category.slug}">{category.name}</a></span>
      {/each}
    </span>
    <time class="post-date"><span class="material-icons">calendar_today</span> {post.date.toLocaleDateString(LOCALE)}
    </time>
    <span class="post-authors"><span class="material-icons">person</span> {post.authors.join(', ')}</span>
    <span class="post-comments-link">
      <span class="material-icons">forum</span>
			<a href="#comments">{post.commentCount ? post.commentCount : 0} kommenttia</a>
		</span>
  </div>
</header>

<style lang="scss">
  #post-meta {
    font-family: var(--accent-font-family);
    text-align: center;

    .material-icons {
      font-size: 1rem;
      position: relative;
      top: 0.2rem;
    }

    > * {
      display: inline-block;
      margin-left: 0.2rem;
      margin-right: 0.2rem;

      &:before {
        margin-right: 0.3rem;
        position: relative;
        top: 0.1rem;
        font: 1rem var(--icon-font);
      }
    }

    .post-category:not(:last-child):after {
      content: ', ';
    }
  }
</style>