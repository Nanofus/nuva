<script lang="ts">
  import { onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { isLoggedIn } from "$lib/database";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import PageHead from "$lib/components/reusable/PageHead.svelte";
  import "$lib/style/variables.scss";
  import "$lib/style/theme.scss";
  import "$lib/style/fonts.css";
  import "$lib/style/font_class.css";
  import PageContent from "$lib/components/reusable/PageContent.svelte";
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
  <PageContent>
    <slot />
  </PageContent>
  <Footer />
  <SvelteToast options={{ reversed: true, intro: { y: -20 } }} />
</div>

<style lang="scss">
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: var(--background-dark);
    background-image: var(--background-image-default);
  }

  :global(::selection) {
    background-color: var(--selection);
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
    min-width: var(--article-text-width);
    width: 100%;
    max-width: var(--page-max-width);
  }
</style>