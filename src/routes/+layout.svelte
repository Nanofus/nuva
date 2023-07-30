<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { browser } from "$app/environment";
  import { navigating } from "$app/stores";
  import { OG_LOCALE, SITE_NAME } from "$lib/config";
  import { createBaseSettings, handleScrolledToBottom, handleViewportResize } from "$lib/util/util";
  import { auth, postOptions } from "$lib/util/stores";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Navigation from "$lib/components/Navigation.svelte";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";

  // Styles
  import "$lib/style/variables.scss";
  import "$lib/style/input-range.scss";
  import "$lib/style/theme.scss";
  import { loadAuthFromLocalStorage } from "$lib/db/auth";

  export let data;

  let fullWidth: boolean = false;

  onMount(() => {
    createBaseSettings();
    handleViewportResize();
    document.addEventListener("scroll", handleScrolledToBottom);
    window.addEventListener("resize", handleViewportResize);
    if (!$auth) loadAuthFromLocalStorage();
    postOptions.subscribe((options) => {
      fullWidth = options.fullWidth;
    });
  });

  onDestroy(() => {
    browser && document.removeEventListener("scroll", handleScrolledToBottom);
    browser && window.removeEventListener("resize", handleViewportResize);
  });
</script>

<svelte:head>
  <title>{SITE_NAME}</title>
  <meta content={SITE_NAME} property="og:site_name" />
  <meta content={OG_LOCALE} property="og:locale" />
  <meta content="website" property="og:type" />
</svelte:head>

<div class={fullWidth ? "wide" : ""} id="page">
  <Header />
  <Navigation />
  <main>
    {#if $navigating}
      <div class="full-page-loader">
        <LoadingSpinner />
      </div>
    {/if}
    {#key data.pathname}
      <div class="transition" in:fade={{ duration: 150, delay: 0 }}>
        {#if !$navigating}
          <slot />
        {/if}
      </div>
    {/key}
  </main>
  <Footer />
  <SvelteToast options={{ reversed: true, duration: 3000, intro: { y: -20 } }} />
</div>

<style lang="scss">
  // All styles in theme.scss
</style>
