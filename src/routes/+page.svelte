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

<div id="feature-carousel-wrapper" class="vertically-separated-top hidden-mobile">
  <FeatureCarousel postList={data.posts} />
</div>
<h3>{t.pages.index.newestReleases}</h3>
<PostList posts={data.posts} />
<h3>{t.pages.index.newestComments}</h3>
<CommentList comments={data.comments} />

<style>
  #feature-carousel-wrapper {
    --featured-post-width: calc(var(--article-max-width) + var(--feature-carousel-leeway));
    width: var(--featured-post-width);
    max-width: 100%;
    height: calc(9 * var(--featured-post-width) / 21);
    overflow: clip;
    position: relative;
  }
</style>
