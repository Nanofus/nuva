<script>
  import { BANNER_COUNT } from "$lib/config";

  let header;
  let bannerUrl = `url("https://klaanon.fi/wp/wp-content/themes/klaanon/header-images/banner${(new Date().getMinutes() % BANNER_COUNT) + 1}.png")`;
</script>

<header bind:this={header} style="background-image: {bannerUrl}">
  <h1>Klaanon Nuva</h1>
</header>

<style>
    header {
        height: calc(var(--page-max-width) / var(--header-banner-dimensions-ratio));
        background-position: center;
    }

    header > * {
        position: absolute;
        top: 0;
        left: 0;
    }

    h1 {
        font-size: 0;
    }
</style>
