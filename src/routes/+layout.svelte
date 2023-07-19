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

  let loggedIn: boolean;

  onMount(() => {
    loggedIn = isLoggedIn();
    createBaseSettings();
  });
</script>

<svelte:head>
  <title>{SITE_NAME}</title>
  <meta content={SITE_NAME} property="og:site_name" />
  <meta content={OG_LOCALE} property="og:locale" />
  <meta content="website" property="og:type" />
</svelte:head>

<Navigation />
<div id="page">
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
  <SvelteToast options={{ reversed: true, duration: 3000, intro: { y: -20 } }} />
</div>

<style lang="scss">
  @import "$lib/style/variables.scss";

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: var(--body-text-font-family);
    color: var(--text-light);
    overflow-x: clip;
  }

  :global(html) {
    overflow-x: clip;
    scrollbar-gutter: stable; // TODO: fix gutter so that it doesn't break 100vw as the horizontal width
  }

  :global(img) {
    max-width: 100%;
    vertical-align: middle;
  }

  :global(p) {
    text-align: justify;
  }

  #page {
    margin: auto;
    min-width: var(--page-min-width);
    width: 100%;
    max-width: var(--page-max-width);
    padding-top: var(--navigation-height);
  }

  main {
    padding-bottom: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--background-light);
    border-radius: var(--border-radius);
  }

  :global(code) {
    font-family: var(--code-font-family);
    font-size: 0.9rem;
  }

  :global(.hidden) {
    display: none !important;
  }

  :global(.hidden-desktop) {
    display: none !important;
  }

  :global(.center) {
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 41rem) { // TODO: Fix hardcoded value, media queries don't support calc() or var()
    :global(h1) {
      font-size: 2.5rem;
    }
    :global(h2) {
      font-size: 1.5rem;
    }

    main {
      padding-left: var(--mobile-horizontal-padding);
      padding-right: var(--mobile-horizontal-padding);
    }

    :global(.hidden-mobile) {
      display: none !important;
    }

    :global(.hidden-desktop) {
      display: inherit !important;
    }
  }

  @media screen and (max-width: 76rem) { // TODO: Fix hardcoded value
    main {
      border-radius: 0;
    }
  }
</style>