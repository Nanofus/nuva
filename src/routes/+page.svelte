<script lang="ts">
  import PostList from "$lib/components/PostList.svelte";
  import type { CommentMeta, PostMeta } from "$lib/util/types";
  import { getPageTitle, getPageUrl } from "$lib/util/util";
  import CommentList from "$lib/components/CommentList.svelte";
  import { t } from "$lib/util/translations";
  import FeatureCarousel from "$lib/components/FeatureCarousel.svelte";

  export let data: { posts: PostMeta[]; comments: CommentMeta[] };
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.index.title)}</title>
  <meta content={t.pages.index.title} property="og:title" />
  <meta content={getPageUrl(`/`)} property="og:url" />
</svelte:head>

<div id="feature-carousel" class="vertically-separated-top">
  <FeatureCarousel postList={data.posts} />
</div>
<h3>{t.pages.index.newestReleases}</h3>
<PostList posts={data.posts} />
<h3>{t.pages.index.newestComments}</h3>
<CommentList comments={data.comments} />

<style>
  #feature-carousel {
    max-width: calc(var(--article-max-width) + 4rem);
    width: 100%;
    height: 16rem;
    overflow: clip;
    position: relative;
    border-radius: var(--border-radius);
  }
</style>