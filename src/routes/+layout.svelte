<script lang="ts">
  import { onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { isLoggedIn } from "$lib/database";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import "$lib/style/variables.scss";
  import "$lib/style/theme.scss";
  import Navigation from "$lib/components/Navigation.svelte";
  import { OG_LOCALE, SITE_NAME } from "$lib/config";
  import { createBaseSettings } from "$lib/util";
  import { navigating } from "$app/stores";
  import LoadingSpinner from "$lib/components/reusable/LoadingSpinner.svelte";
  import { fade } from "svelte/transition";
  import { postOptions } from "$lib/stores";

  export let data;

  let loggedIn: boolean;
  let fullWidth: boolean = false;

  onMount(() => {
    loggedIn = isLoggedIn();
    postOptions.subscribe(options => {
      fullWidth = options.fullWidth;
    });
    createBaseSettings();
  });
</script>

<svelte:head>
  <title>{SITE_NAME}</title>
  <meta content={SITE_NAME} property="og:site_name" />
  <meta content={OG_LOCALE} property="og:locale" />
  <meta content="website" property="og:type" />
</svelte:head>

<div class={fullWidth ? 'wide' : ''} id="page">
  <Header />
  <Navigation />
  <main>
    {#if $navigating}
      <div class="full-page-loader">
        <LoadingSpinner />
      </div>
    {/if}
    {#key data.pathname}
      <div class="transition"
           in:fade={{ duration: 150, delay: 0 }}>
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