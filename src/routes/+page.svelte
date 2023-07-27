<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import type { CommentMeta, PostListResponse } from '$lib/util/types';
	import { getPageTitle, getPageUrl } from '$lib/util/util';
	import FeaturedPost from '$lib/components/FeaturedPost.svelte';
	import CommentList from '$lib/components/CommentList.svelte';
	import { t } from '$lib/translations';

	export let data: { posts: PostListResponse; comments: CommentMeta[] };
</script>

<svelte:head>
	<title>{getPageTitle(t.pages.index.title)}</title>
	<meta content={t.pages.index.title} property="og:title" />
	<meta content={getPageUrl(`/`)} property="og:url" />
</svelte:head>

<div class="vertically-separated-top">
	<FeaturedPost postMeta={data.posts.posts[0]} />
</div>
<h3>{t.pages.index.newestReleases}</h3>
<PostList posts={data.posts.posts} />
<h3>{t.pages.index.newestComments}</h3>
<CommentList comments={data.comments} />
