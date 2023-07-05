<script lang="ts">
  import Search from "$lib/components/Search.svelte";
</script>

<nav>
  <a href="/">Etusivu</a>
  <a href="/categories">Kategoriat</a>
  <a href="/tags">Tagit</a>
  <a href="https://arkisto.klaanon.fi/soundtracks/">Soundtrackit</a>
  <Search />
</nav>

<style lang="scss">
  nav {
    background: rgba(0, 0, 0, 0) linear-gradient(#252525, #0a0a0a) repeat scroll 0 0;
    font-family: var(--nav-font-family);
    height: 3em;
    padding: 0;
    width: 100%;
    margin: 0;
    line-height: 2.5em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    a {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      padding: 0.25em;

      &:link, &:visited {
        color: var(--main-nav-color);
        text-decoration: none;
      }

      &:active, &:hover {
        color: var(--text-light);
        background-color: var(--hover-light);
      }
    }
  }
</style>
