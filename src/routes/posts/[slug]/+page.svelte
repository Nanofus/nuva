<script lang="ts">
  import type { Post, PostResponse } from "$lib/util/types";
  import PostHeader from "$lib/components/PostHeader.svelte";
  import PostFooter from "$lib/components/PostFooter.svelte";
  import PostContent from "$lib/components/PostContent.svelte";
  import { onDestroy, onMount } from "svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import {getPageTitle, getPageUrl, recursivelyConvertDates} from "$lib/util/util";
  import { auth, postOptions } from "$lib/util/stores";
  import { t } from "$lib/util/translations";
  import { toast } from "@zerodevx/svelte-toast";

  export let data: PostResponse;
  let noAccess = false;

  const scrollToAnchor = () => {
    const { hash } = document.location;
    if (!hash) return;
    const scrollTo = document.getElementById(hash.slice(1)) as HTMLElement;
    if (hash.indexOf("#comment-") === 0) scrollTo.classList.add("anchor-highlight");
    if (scrollTo) scrollTo.scrollIntoView();
  };

  const tryFetchPreview = async (): Promise<Post | null> => {
    const isPreview = new URLSearchParams(window.location.search).get("preview") != null;
    const authToken = $auth?.authToken;
    const result = (await (
      await fetch(`/api/posts/${data.slug}${isPreview ? "?preview" : ""}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
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
    if (data.post.content) {
      recursivelyConvertDates(data.post.comments);
      postOptions.set({
        bannerVisible: data.post.bannerVisible,
        customBannerUrl: data.post.customBanner === "" ? null : data.post.customBanner,
        stickyMenu: false,
        fullWidth: data.post.fullWidth,
      });
    }
    scrollToAnchor();
  });

  onDestroy(() => {
    toast.pop(0); // Destroy all toasts
    postOptions.set({
      bannerVisible: true,
      customBannerUrl: null,
      stickyMenu: true,
      fullWidth: false,
    });
  });
</script>

<svelte:head>
  {#if data.post && data.post.content}
    <title>{getPageTitle(data.post.title)}</title>
    <meta content={getPageTitle(data.post.title)} property="og:title" />
    <meta content={data.post.description} name="og:description" />
    <meta content="article" property="og:type" />
    <meta content={getPageUrl(`posts/${data.slug}`)} property="og:url" />
    <meta content={data.post.coAuthors?.join(", ")} property="article:author" />
    {#if data.post.date}
      <meta content={data.post.date?.toDateString()} property="article:published_time" />
    {/if}
    {#if data.post.featuredImage}
      <meta content={data.post.featuredImage} property="og:image" />
    {/if}
  {/if}
</svelte:head>

{#if data.post && data.post.content}
  <article>
    <PostHeader post={data.post} />
    <PostContent post={data.post} />
    <PostFooter post={data.post} />
  </article>
{:else if noAccess}
  <h2>{t.pages.post.noAccess}</h2>
{:else}
  <LoadingSpinner />
{/if}
