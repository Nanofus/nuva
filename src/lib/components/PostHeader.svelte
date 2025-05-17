<script lang="ts">
  import type { Post } from '$lib/types';
  import { t } from '$lib/client/localization';
  import AuthorList from '$lib/components/reusable/AuthorList.svelte';
  import { auth } from '$lib/client/stores';
  import { clientConfig } from '$lib/client/config';

  interface Props {
    post: Post;
  }

  let { post }: Props = $props();
</script>

<header id="post-header">
  <h1 id="post-title">{post.title}</h1>
  {#if !post.metaPage}
    <div id="post-meta">
      <span class="post-categories">
        {#each post.categories as category, i (category.slug)}
          <span class="post-category"><a href="/categories/{category.slug}">{category.name}</a>{#if i !== post.categories.length - 1},{' '}{/if}</span>
        {/each}
      </span>
      <time class="post-date" datetime={post.date.toLocaleString()} title={post.date.toLocaleString()}>
        <a href={`/posts/date/${post.date.getFullYear()}-${post.date.getMonth() + 1}-${post.date.getDate()}`}>{post.date.toLocaleDateString(clientConfig.locale)}</a>
      </time>
      <span class="post-authors">
        <span class="author-list">
          <AuthorList authors={post.coAuthors}/>
        </span>
      </span>
      <span class="post-comments-link">
        <a href="#comments"
        >{post.commentCount ? post.commentCount : 0}
          {post.commentCount === 1 ? t.common.commentSingular : t.common.commentPlural}</a
        >
      </span>
      {#if !!$auth}
        <span class="post-edit">
          <a target="_blank" href={clientConfig.urls.postEdit.replace('{ID}', ''+post._id)}>{t.common.edit}</a>
        </span>
      {/if}
    </div>
  {/if}
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
        margin-right: 0.5rem;
        position: relative;
        top: 0.2rem;
        font: 1rem var(--icon-font);
      }
    }

    .post-categories::before {
      content: 'folder';
    }

    .post-date::before {
      content: 'calendar_today';
    }

    .post-authors::before {
      content: 'history_edu';
    }

    .post-comments-link::before {
      content: 'forum';
    }

    .post-edit::before {
      content: 'edit';
    }
  }
</style>
