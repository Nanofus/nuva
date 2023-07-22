<script lang="ts">
  import type { Post } from "$lib/types";

  export let post: Post;
</script>

<div class="vertically-separated" id="authors">
  {#if post.coAuthors.length > 0}
    <div>
      <span class="material-icons inline-icon">history_edu</span>
      <span class="author-list">
        {#each post.coAuthors as author}
          <a href="/authors/{encodeURI(author.username)}">{author.displayName}</a>
        {/each}
      </span>
    </div>
  {/if}
  {#if post.artists.length > 0}
    <div>
      <span class="material-icons inline-icon">palette</span> {post.artists.join(", ")}
    </div>
  {/if}
</div>

<style lang="scss">
  #authors {
    font-family: var(--accent-font-family);
    text-align: center;
  }
</style>
