<script lang="ts">
  import type { Post } from "$lib/types";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
  import PostHeader from "$lib/components/PostHeader.svelte";
  import PostFooter from "$lib/components/PostFooter.svelte";
  import PostContent from "$lib/components/PostContent.svelte";

  export let data: Post;
</script>

<PageHead title={data.title} />

{#if data.content}
  <article>
    <PostHeader post={data} />
    <PostContent post={data} />
    <PostFooter post={data} />
  </article>
{:else}
  <h2>Postausta ei löytynyt tai sinulla ei ole pääsyä siihen.</h2>
{/if}
