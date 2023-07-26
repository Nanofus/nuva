<script lang="ts">
  import { LOCALE } from "$lib/config";
  import type { Post } from "$lib/util/types";
  import { t } from "$lib/translations";

  export let post: Post;
</script>

<header id="post-header">
  <h1 id="post-title">{post.title}</h1>
  <div id="post-meta">
    <span class="post-categories">
      <span class="material-icons inline-icon">folder</span>
      {#each post.categories as category}
        <span class="post-category"><a href="/categories/{category.slug}">{category.name}</a></span>
      {/each}
    </span>
    <time class="post-date"><span
      class="material-icons inline-icon">calendar_today</span> {post.date.toLocaleDateString(LOCALE)}
    </time>
    <span class="post-authors"><span
      class="material-icons inline-icon">history_edu</span>
      <span class="author-list">
        {#each post.coAuthors as author}
          <a href="/authors/{encodeURI(author)}">{author}</a>
        {/each}
      </span>
    </span>
    <span class="post-comments-link">
      <span class="material-icons inline-icon">forum</span>
			<a
        href="#comments">{post.commentCount ? post.commentCount : 0} {post.commentCount === 1 ? t.common.commentSingular : t.common.commentPlural}</a>
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
        font: 1rem var(--icon-font);
      }
    }

    .post-category:not(:last-child):after {
      content: ', ';
    }
  }
</style>