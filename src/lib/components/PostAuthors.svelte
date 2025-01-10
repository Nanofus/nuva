<script lang="ts">
  import type { Post } from '$lib/util/types';
  import AuthorList from '$lib/components/reusable/AuthorList.svelte';

  interface Props {
    post: Post;
  }

  let { post }: Props = $props();
</script>

<div class="vertically-separated" id="authors">
  {#if post.coAuthors.length > 0}
    <div class="author-list">
      <AuthorList authors={post.coAuthors} />
    </div>
  {/if}
  {#if post.artists.length > 0}
    <div class="artist-list">
      {post.artists.join(', ')}
    </div>
  {/if}
</div>

<style lang="scss">
  #authors {
    font-family: var(--accent-font-family);
    text-align: center;
  }

  .artist-list {
    margin-top: 0.5rem;
  }

  #authors > div::before {
    margin-right: 0.5rem;
    position: relative;
    top: 0.2rem;
    font: 1rem var(--icon-font);
  }

  .author-list::before {
    content: 'history_edu';
  }

  .artist-list::before {
    content: 'palette';
  }
</style>
