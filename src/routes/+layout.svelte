<script lang="ts">
  import { onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { isLoggedIn } from "$lib/database";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
  import "$lib/style/variables.scss";
  import "$lib/style/theme.scss";
  import "$lib/style/fonts.scss";
  import "$lib/style/custom.scss";
  import Navigation from "$lib/components/Navigation.svelte";

  let loggedIn: boolean;

  onMount(() => {
    loggedIn = isLoggedIn();
  });
</script>

<PageHead />

<div id="page">
  <Header />
  <Navigation />
  <main>
    <slot />
  </main>
  <Footer />
  <SvelteToast options={{ reversed: true, intro: { y: -20 } }} />
</div>

<style lang="scss">
  @import "$lib/style/variables.scss";

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: var(--body-text-font-family);
  }

  :global(html) {
    scrollbar-gutter: stable both-edges;
  }

  :global(img) {
    max-width: 100%;
    vertical-align: middle;
  }

  :global(p) {
    text-align: justify;
  }

  #page {
    position: relative;
    margin: auto;
    width: 100%;
    max-width: var(--page-max-width);
  }

  main {
    padding-bottom: 6rch;
    margin-bottom: 3rch;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--background-light);
  }

  @media screen and (max-width: 44rem) { // TODO: Fix hardcoded value, media queries don't support calc() or var()
    main {
      padding-left: var(--mobile-horizontal-padding);
      padding-right: var(--mobile-horizontal-padding);
    }
  }
</style>