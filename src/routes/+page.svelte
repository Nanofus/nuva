<script lang="ts">
  import PostList from '$lib/components/PostList.svelte';
  import type { CommentMeta, PostMeta } from '$lib/util/types';
  import { getPageTitle, getPageUrl } from '$lib/util/util';
  import CommentList from '$lib/components/CommentList.svelte';
  import { t } from '$lib/util/translations';
  import FeaturedPosts from '$lib/components/FeaturedPosts.svelte';

  interface Props {
    data: { posts: PostMeta[]; comments: CommentMeta[] };
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>{getPageTitle(t.pages.index.title)}</title>
  <meta content={t.pages.index.title} property="og:title"/>
  <meta content={getPageUrl('/')} property="og:url"/>
</svelte:head>

<FeaturedPosts postList={data.posts}/>
<h3>{t.pages.index.newestReleases}</h3>
<PostList posts={data.posts}/>
<h3>{t.pages.index.newestComments}</h3>
<CommentList comments={data.comments}/>
