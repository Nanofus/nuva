<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import { createBaseSettings, handleScrolledToBottom, handleViewportResize } from '$lib/client/util';
  import { auth, postOptions } from '$lib/client/stores';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Navigation from '$lib/components/Navigation.svelte';
  import LoadingSpinner from '$lib/components/reusable/LoadingSpinner.svelte';
  import '$lib/style/variables.css';
  import '$lib/style/input-range.css';
  import '$lib/style/theme.css';
  import { getLoginStatus } from '$lib/client/auth';
  import { clientConfig } from '$lib/client/config';

  let { data, children } = $props();

  let fullWidth: boolean = $state(page.data.fullWidth ? page.data.fullWidth : false);

  onMount(() => {
    createBaseSettings();
    handleViewportResize();
    document.addEventListener('scroll', handleScrolledToBottom);
    window.addEventListener('resize', handleViewportResize);
    if (!$auth) getLoginStatus();
    postOptions.subscribe((options) => {
      fullWidth = options.fullWidth;
    });
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener('scroll', handleScrolledToBottom);
      window.removeEventListener('resize', handleViewportResize);
    }
  });
</script>

<svelte:head>
  <meta content={clientConfig.siteName} property="og:site_name" />
  <meta content={clientConfig.locale.replace('-', '_')} property="og:locale" />
  <meta content="website" property="og:type" />
  {#each clientConfig.externalStylesheets as stylesheet (stylesheet)}
    <link href={stylesheet} rel="stylesheet" />
  {/each}
</svelte:head>

<div class={fullWidth ? 'wide' : ''} id="layout">
  <Header />
  <Navigation />
  <main>
    {#key data.pathname}
      {@render children()}
    {/key}
  </main>
  <Footer />
  <SvelteToast options={{ reversed: true, duration: 3000, intro: { y: -20 } }} />
</div>

