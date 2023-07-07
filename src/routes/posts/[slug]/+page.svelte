<script lang="ts">
  import type { Post } from "$lib/types";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
  import PostHeader from "$lib/components/PostHeader.svelte";
  import PostFooter from "$lib/components/PostFooter.svelte";
  import PostContent from "$lib/components/PostContent.svelte";
  import { onMount } from "svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";

  export let data: Post;
  let noAccess = false;

  onMount(() => {
    if (!data.content) {
      noAccess = true;
    }
  });
</script>

{#if data.content}
  <PageHead title={data.title} />
  <article>
    <PostHeader post={data} />
    <PostContent post={data} />
    <PostFooter post={data} />
  </article>
{:else if noAccess}
  <h2>Postausta ei löytynyt tai sinulla ei ole pääsyä siihen</h2>
{:else}
  <LoadingSpinner />
{/if}

<style lang="scss">
  article {
    width: 100%;
    max-width: var(--article-max-width);
  }
</style>