<script lang="ts">
  import type { Post } from "$lib/types";
  import PostHeader from "$lib/components/PostHeader.svelte";
  import PostFooter from "$lib/components/PostFooter.svelte";
  import PostContent from "$lib/components/PostContent.svelte";
  import { onMount } from "svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import { getPageTitle, getPageUrl } from "$lib/util";

  export let data: Post;
  let noAccess = false;

  onMount(() => {
    if (!data.content) {
      noAccess = true;
    }
  });
</script>

<svelte:head>
  <title>{getPageTitle(data.title)}</title>
  <meta content={data.title} property="og:title" />
  <meta content="article" property="og:type" />
  <meta content={getPageUrl(`posts/${data.slug}`)} property="og:url" />
  <meta content={data.authors.join(", ")} property="article:author" />
  <meta content={data.date} property="article:published_time" />
</svelte:head>

{#if data.content}
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

  :global(article li) {
    margin-bottom: 0.5rem;
  }
</style>