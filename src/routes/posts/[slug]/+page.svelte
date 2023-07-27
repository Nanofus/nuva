<script lang="ts">
	import type { Post } from '$lib/util/types';
	import PostHeader from '$lib/components/PostHeader.svelte';
	import PostFooter from '$lib/components/PostFooter.svelte';
	import PostContent from '$lib/components/PostContent.svelte';
	import { onDestroy, onMount } from 'svelte';
	import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';
	import { getPageTitle, getPageUrl } from '$lib/util/util';
	import { postOptions } from '$lib/util/stores';
	import { t } from '$lib/translations';

	export let data: Post;
	let noAccess = false;

	const scrollToAnchor = () => {
		const { hash } = document.location;
		if (!hash) return;
		const scrollTo = document.getElementById(hash.slice(1)) as HTMLElement;
		if (hash.indexOf('#comment-') === 0) scrollTo.classList.add('anchor-highlight');
		if (scrollTo) scrollTo.scrollIntoView();
	};

	onMount(() => {
		if (!data.content) {
			noAccess = true;
		} else {
			postOptions.set({
				bannerVisible: data.bannerVisible,
				customBannerUrl: data.customBanner === '' ? null : data.customBanner,
				stickyMenu: false,
				fullWidth: data.fullWidth
			});
		}
		scrollToAnchor();
	});

	onDestroy(() => {
		postOptions.set({
			bannerVisible: true,
			customBannerUrl: null,
			stickyMenu: true,
			fullWidth: false
		});
	});
</script>

<svelte:head>
	<title>{getPageTitle(data.title)}</title>
	<meta content={getPageTitle(data.title)} property="og:title" />
	<meta content={data.description} name="og:description" />
	<meta content="article" property="og:type" />
	<meta content={getPageUrl(`posts/${data.slug}`)} property="og:url" />
	<meta content={data.coAuthors?.join(', ')} property="article:author" />
	<meta content={data.date.toDateString()} property="article:published_time" />
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
	<h2>{t.pages.post.noAccess}</h2>
{:else}
	<LoadingSpinner />
{/if}
