<script lang="ts">
  import type { Post } from "$lib/types";
  import { onMount } from "svelte";

  export let post: Post;

  onMount(() => {
    // Eval magic to run scripts in the post
    // (1, eval) is a trick to make eval run in the global scope
    (1, eval)(post.scripts);

    // Parse JS from post content and eval it
    const doc = document.implementation.createHTMLDocument(); // Sandbox
    doc.body.innerHTML = post.content;
    [].map.call(doc.getElementsByTagName("script"), (scriptTag: HTMLScriptElement) => {
      (1, eval)(scriptTag.innerText);
    });
  });
</script>

<article class="post-content">
  {#if post.styles}
    <div class="post-style-container">{@html `<style>${post.styles}</style>`}</div>
  {/if}
  {@html post.content}
</article>

<style lang="scss">
  article {
    width: var(--article-text-width);
    margin: 2rem 0;
  }
</style>
