<script lang="ts">
  import type { Post } from "$lib/types";

  export let post: Post;
</script>

<div id="previous-next-post">
  {#if post.previous}
    <div class="previous"><span class="material-icons inline-icon">arrow_back</span><a
      href="/posts/{post.previous.slug}">{post.previous.title}</a></div>
  {/if}
  {#if post.next}
    <div class="next"><a href="/posts/{post.next.slug}">{post.next.title}</a><span
      class="material-icons inline-icon">arrow_forward</span></div>
  {/if}
</div>

<style lang="scss">
  #previous-next-post {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0;

    .previous, .next {
      display: flex;
      flex-direction: row;

      > * {
        margin: 0 0.2rem;
      }
    }

    .previous {
      text-align: left;
    }

    .next {
      text-align: right;
    }
  }
</style>
