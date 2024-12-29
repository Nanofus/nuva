<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { browser } from '$app/environment';
  import { navigating, page } from '$app/stores';
  import { createBaseSettings, handleScrolledToBottom, handleViewportResize } from '$lib/util/util';
  import { auth, postOptions } from '$lib/util/stores';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Navigation from '$lib/components/Navigation.svelte';
  import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';

  // Styles
  import '$lib/style/variables.scss';
  import '$lib/style/input-range.scss';
  import '$lib/style/theme.scss';
  import { loadLoginStatus } from '$lib/client/auth';
  import { globalConfig } from '$lib/util/config';

  let { data, children } = $props();

  let fullWidth: boolean = $state($page.data.fullWidth ? $page.data.fullWidth : false);

  onMount(() => {
    createBaseSettings();
    handleViewportResize();
    document.addEventListener('scroll', handleScrolledToBottom);
    window.addEventListener('resize', handleViewportResize);
    if (!$auth) loadLoginStatus();
    postOptions.subscribe((options) => {
      fullWidth = options.fullWidth;
    });
  });

  onDestroy(() => {
    browser && document.removeEventListener('scroll', handleScrolledToBottom);
    browser && window.removeEventListener('resize', handleViewportResize);
  });
</script>

<svelte:head>
  <meta content={globalConfig.siteName} property="og:site_name" />
  <meta content={globalConfig.locale.replace('-', '_')} property="og:locale" />
  <meta content="website" property="og:type" />
  {#each globalConfig.externalStylesheets as stylesheet}
    <link href={stylesheet} rel="stylesheet" />
  {/each}
</svelte:head>

<div class={fullWidth ? 'wide' : ''} id="layout">
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
          {@render children?.()}
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
