<script>
  import { BANNER_COUNT } from "$lib/config";
  import Navigation from "$lib/components/Navigation.svelte";

  let header;
  let bannerUrl = `url("https://klaanon.fi/wp/wp-content/themes/klaanon/header-images/banner${(new Date().getMinutes() % BANNER_COUNT) + 1}.png")`;
</script>

<a href="/">
  <header bind:this={header} style="background-image: {bannerUrl}">
    <h1>Klaanon Nuva</h1>
  </header>
</a>

<style>
    header {
        height: calc(var(--page-max-width) / var(--header-banner-dimensions-ratio));
        background-position: center;
    }

    h1 {
        font-size: 0;
    }
</style>
