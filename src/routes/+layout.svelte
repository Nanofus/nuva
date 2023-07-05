<script lang="ts">
  import { onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { isLoggedIn } from "$lib/database";
  import Login from "$lib/components/Login.svelte";
  import Navigation from "$lib/components/Navigation.svelte";
  import Header from "$lib/components/Header.svelte";
  import PageHead from "$lib/components/reusable/PageHead.svelte";

  // Global styles
  import "$lib/style/variables.scss";
  import "$lib/style/style.scss";
  import "$lib/style/fonts.css";
  import "$lib/style/font_class.css";

  let loggedIn: boolean;

  onMount(() => {
    loggedIn = isLoggedIn();
  });
</script>

<PageHead />

<div id="page">
  <Header />
  <Navigation />
  <Login />
  <main>
    <slot />
  </main>
  <SvelteToast options={{ reversed: true, intro: { y: -20 } }} />
</div>

<style lang="scss">
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: var(--background-dark);
  }

  #page {
    position: relative;
    margin: auto;
    min-width: var(--article-text-width);
    width: 100%;
    max-width: var(--page-max-width);
    background-color: var(--background-light);
  }

  main {
    padding-bottom: 3rch;
    margin-bottom: 3rch;
  }
</style>