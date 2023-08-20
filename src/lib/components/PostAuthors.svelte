<script lang="ts">
  import type { Post } from "$lib/util/types";

  export let post: Post;
</script>

<div class="vertically-separated" id="authors">
  {#if post.coAuthors.length > 0}
    <div class="author-list">
      {#each post.coAuthors as author, i}
        <a href="/authors/{encodeURI(author)}">{author}</a>{#if i !== post.coAuthors.length - 1}<span>, </span>{/if}
      {/each}
    </div>
  {/if}
  {#if post.artists.length > 0}
    <div class="artist-list">
      {post.artists.join(", ")}
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

  .author-list::before, .artist-list::before {
    margin-right: 0.3rem;
    position: relative;
    top: 0.2rem;
    font: 1rem var(--icon-font);
  }

  .author-list::before {
    content: "history_edu";
  }

  .artist-list::before {
    content: "palette";
  }

</style>
