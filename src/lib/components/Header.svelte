<script>
  import { BANNER_COUNT } from "$lib/config";

  let header;
  let bannerUrl = `url("/images/banner-${(new Date().getMinutes() % BANNER_COUNT) + 1}.png")`;
</script>

<a href="/">
  <header bind:this={header} style="background-image: {bannerUrl}">
    <h1>Klaanon</h1>
    <h2>Bio-Klaanin yhteinen tarina</h2>
  </header>
</a>

<style lang="scss">
  a {
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
  }

  h1 {
    padding-top: 3.5rem;
  }

  h2 {
    font-size: 1rem;
    text-transform: lowercase;
    padding-top: -0.5rem;
  }
</style>
