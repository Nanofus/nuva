<script lang="ts">
  import { onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { isLoggedIn } from "$lib/database";
  import Login from "$lib/components/Login.svelte";
  import Navigation from "$lib/components/Navigation.svelte";
  import Header from "$lib/components/Header.svelte";
  import Head from "$lib/components/reusable/Head.svelte";

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

<Head/>

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
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  #page {
    position: relative;
    margin: auto;
    min-width: var(--article-text-width);
    width: 100%;
    max-width: var(--page-max-width);

    > * {
      position: relative;
      width: 100%;
      float: left;
      clear: both;
      box-sizing: border-box;
    }
  }
</style>