<script lang="ts">
  import type { Post, PostResponse } from '$lib/types';
  import PostHeader from '$lib/components/PostHeader.svelte';
  import PostFooter from '$lib/components/PostFooter.svelte';
  import PostContent from '$lib/components/PostContent.svelte';
  import { onDestroy, onMount } from 'svelte';
  import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';
  import { getPageTitle, getPageUrl, recursivelyConvertDates } from '$lib/client/util';
  import { auth, postOptions } from '$lib/client/stores';
  import { t } from '$lib/client/localization';
  import { toast } from '@zerodevx/svelte-toast';
  import { clientConfig } from '$lib/client/config';

  interface Props {
    data: PostResponse;
  }

  let { data = $bindable() }: Props = $props();
  let noAccess = $state(false);

  const scrollToAnchor = () => {
    const { hash } = document.location;
    if (!hash) return;
    const scrollTo = document.getElementById(hash.slice(1)) as HTMLElement;
    if (hash.indexOf('#comment-') === 0) scrollTo.classList.add('anchor-highlight');
    if (scrollTo) scrollTo.scrollIntoView();
  };

  const tryFetchPreview = async (): Promise<Post | null> => {
    const isPreview = new URLSearchParams(window.location.search).get('preview') != null;
    const authToken = $auth?.authToken;
    const result = (await (
      await fetch(`/api/posts/${data.slug}${isPreview ? '?preview' : ''}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken ? `Bearer ${authToken}` : ''
        }
      })
    ).json()) as Post;
    if (!result.content) return null;
    result.date = new Date(result.date);
    return result;
  };

  onMount(async () => {
    if (!data.post) {
      data.post = await tryFetchPreview();
      if (!data.post) {
        noAccess = true;
        return;
      }
    }
    setPostStyles();
    scrollToAnchor();
  });

  onDestroy(() => {
    toast.pop(0); // Destroy all toasts
    postOptions.set({
      bannerVisible: true,
      customBannerUrl: null,
      stickyMenu: true,
      fullWidth: false
    });
  });

  const setPostStyles = () => {
    if (data.post && data.post.content) {
      recursivelyConvertDates(data.post.comments);
      postOptions.set({
        bannerVisible: data.post.bannerVisible,
        customBannerUrl: data.post.customBanner === '' ? null : data.post.customBanner,
        stickyMenu: false,
        fullWidth: data.post.fullWidth
      });
    }
  };

  setPostStyles();
</script>

<svelte:head>
  {#if data.post && data.post.content}
    <title>{getPageTitle(data.post.title)}</title>
    <meta content={getPageTitle(data.post.title)} property="og:title" />
    <meta content={data.post.description} name="og:description" />
    <meta content="article" property="og:type" />
    {#if !data.post.metaPage}
      <meta content={getPageUrl(`posts/${data.slug}`)} property="og:url" />
      <meta content={data.post.coAuthors?.join(', ')} property="article:author" />
      {#if data.post.date}
        <meta content={data.post.date?.toLocaleDateString(clientConfig.locale)} property="article:published_time" />
      {/if}
    {/if}
    {#if data.post.featuredImage}
      <meta content={data.post.featuredImage} property="og:image" />
      <meta name="twitter:card" content="summary_large_image" />
    {/if}
  {/if}
</svelte:head>

{#if data.post}
  <article>
    <PostHeader post={data.post} />
    {#if data.post.content}
      <PostContent post={data.post} />
    {/if}
    <PostFooter post={data.post} />
  </article>
{:else if noAccess}
  <h2>{t.pages.post.noAccess}</h2>
{:else}
  <LoadingSpinner />
{/if}
