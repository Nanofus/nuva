<script lang="ts">
  import type { Post } from "$lib/types";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
  import PostHeader from "$lib/components/PostHeader.svelte";
  import PostFooter from "$lib/components/PostFooter.svelte";
  import PostContent from "$lib/components/PostContent.svelte";

  export let data: Post;
</script>

{#if data.content}
  <PageHead title={data.title} />
  <article>
    <PostHeader post={data} />
    <PostContent post={data} />
    <PostFooter post={data} />
  </article>
{:else}
  <h2>Postausta ei löytynyt tai sinulla ei ole pääsyä siihen.</h2>
{/if}

<style lang="scss">
  article {
    max-width: var(--article-max-width);
  }
</style>