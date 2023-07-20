<script lang="ts">
  import type { Post } from "$lib/types";
  import PostHeader from "$lib/components/PostHeader.svelte";
  import PostFooter from "$lib/components/PostFooter.svelte";
  import PostContent from "$lib/components/PostContent.svelte";
  import { onDestroy, onMount } from "svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import { getPageTitle, getPageUrl } from "$lib/util";
  import { postOptions } from "$lib/stores";

  export let data: Post;
  let noAccess = false;

  onMount(() => {
    if (!data.content) {
      noAccess = true;
    } else {
      postOptions.set({
        bannerVisible: data.bannerVisible,
        customBannerUrl: data.customBanner === "" ? null : data.customBanner,
        stickyMenu: false
      });
    }
  });

  onDestroy(() => {
    postOptions.set({
      bannerVisible: true,
      customBannerUrl: null,
      stickyMenu: true
    });
  });
</script>

<svelte:head>
  <title>{getPageTitle(data.title)}</title>
  <meta content={getPageTitle(data.title)} property="og:title" />
  <meta content={data.description} name="og:description" />
  <meta content="article" property="og:type" />
  <meta content={getPageUrl(`posts/${data.slug}`)} property="og:url" />
  <meta content={data.authors?.join(", ")} property="article:author" />
  <meta content={data.date} property="article:published_time" />
  {#if data.featuredImage}
    <meta content={data.featuredImage} property="og:image" />
  {/if}
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