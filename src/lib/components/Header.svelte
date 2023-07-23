<script lang="ts">
  import { onMount } from "svelte";
  import { postOptions } from "$lib/stores";
  import { getRandomBannerUrl } from "$lib/util";

  let bannerUrl = getRandomBannerUrl();
  let bannerVisible = true;
  let customBannerUrl: string | null = null;

  onMount(() => {
    postOptions.subscribe(options => {
      bannerVisible = options.bannerVisible;
      customBannerUrl = options.customBannerUrl ? `url("${options.customBannerUrl}")` : null;
    });
  });
</script>

{#if bannerVisible}
  <header style="background-image: {customBannerUrl ? customBannerUrl : bannerUrl}">
    <a href="/">
      <h1>Klaanon</h1>
      <h2>Bio-Klaanin yhteinen tarina</h2>
    </a>
  </header>
{/if}

<style lang="scss">
  a {
    display: block;
    height: calc(var(--page-max-width) / var(--header-banner-dimensions-ratio));

    &:hover {
      text-decoration: none;
    }
  }

  header {
    height: calc(var(--page-max-width) / var(--header-banner-dimensions-ratio));
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  h1, h2 {
    color: var(--text-dark);
    user-select: none;
    margin: 0;
    text-shadow: var(--banner-shadow);
  }

  h1 {
    padding-top: 3.5rem;
  }

  h2 {
    font-size: 1rem;
    text-transform: lowercase;
  }
</style>
