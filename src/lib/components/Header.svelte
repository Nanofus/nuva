<script lang="ts">
  import { onMount } from 'svelte';
  import { postOptions } from '$lib/client/stores';
  import { getRandomBannerUrl } from '$lib/client/util';
  import { page } from '$app/state';
  import { clientConfig } from '$lib/client/config';

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
      <div class="title">
        <h1>{clientConfig.siteName}</h1>
        <h2>{clientConfig.subHeader}</h2>
      </div>
    </a>
  </header>
{/if}

<style>
  a {
    height: 100%;
    width: 100%;

    &:hover {
      text-decoration: none;
    }
    
    > .title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      text-align: center;
    }
  }

  header {
    height: calc(var(--page-max-width) / var(--header-banner-dimensions-ratio));
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
