<script lang="ts">
  import { onMount } from 'svelte';
  import { postOptions } from '$lib/util/stores';
  import { getRandomBannerUrl } from '$lib/util/util';
  import { getConfig } from '$lib/util/config';
  import { page } from '$app/state';

  let bannerUrl = getRandomBannerUrl();
  let bannerVisible = $state(page.data.bannerVisible ? page.data.bannerVisible : true);
  let customBannerUrl: string | null = $state(
    page.data.customBanner ? `url("${page.data.customBanner}")` : null
  );

  onMount(() => {
    postOptions.subscribe((options) => {
      bannerVisible = options.bannerVisible;
      customBannerUrl = options.customBannerUrl ? `url("${options.customBannerUrl}")` : null;
    });
  });
</script>

{#if bannerVisible}
  <header style="background-image: {customBannerUrl ? customBannerUrl : bannerUrl}">
    <a href="/">
      <h1>{getConfig().siteName}</h1>
      <h2>{getConfig().subHeader}</h2>
    </a>
  </header>
{/if}

<style lang="scss">
  a {
    display: block;
    height: calc(var(--page-max-width) / var(--header-banner-dimensions-ratio));
    padding-top: 3.5em;

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

  h1,
  h2 {
    color: var(--text-dark);
    user-select: none;
    margin: 0;
    text-shadow: var(--banner-shadow);
  }

  h2 {
    font-size: 1rem;
    text-transform: lowercase;
  }
</style>
