<script lang="ts">
  import { globalConfig } from "$lib/util/config";
  import type { Post } from "$lib/util/types";
  import { t } from "$lib/util/translations";

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
    <time class="post-date" datetime={post.date.toISOString()}>
      {post.date.toLocaleDateString(globalConfig.locale)}
    </time>
    <span class="post-authors">
      <span class="author-list">
        {#each post.coAuthors as author, i}
          <a href="/authors/{encodeURI(author)}">{author}</a>{#if i !== post.coAuthors.length - 1}<span>, </span>{/if}
        {/each}
      </span>
    </span>
    <span class="post-comments-link">
      <a href="#comments"
        >{post.commentCount ? post.commentCount : 0}
        {post.commentCount === 1 ? t.common.commentSingular : t.common.commentPlural}</a
      >
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

      &::before {
        margin-right: 0.3rem;
        position: relative;
        top: 0.2rem;
        font: 1rem var(--icon-font);
      }
    }

    .post-categories::before {
      content: "folder";
    }
    .post-date::before {
      content: "calendar_today";
    }
    .post-authors::before {
      content: "history_edu";
    }
    .post-comments-link::before {
      content: "forum";
    }
  }
</style>
