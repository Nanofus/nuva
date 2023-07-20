<script lang="ts">
  import type { Post } from "$lib/types";

  export let post: Post;
</script>

<div id="authors">
  {#if post.authors.length > 0}
    <div>
      <span class="material-icons">history_edu</span> {post.authors.join(", ")}
    </div>
  {/if}
  {#if post.artists.length > 0}
    <div>
      <span class="material-icons">palette</span> {post.artists.join(", ")}
    </div>
  {/if}
</div>

<style lang="scss">
  #authors {
    font-family: var(--accent-font-family);
    margin-top: 3rem;
    text-align: center;
  }

  .material-icons {
    font-size: 1rem;
    position: relative;
    top: 0.2rem;
  }
</style>
