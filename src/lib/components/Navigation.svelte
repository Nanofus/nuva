<script lang="ts">
  import Search from "$lib/components/Search.svelte";
  import Login from "$lib/components/Login.svelte";
  import NavItem from "$lib/components/reusable/NavItem.svelte";
</script>

<nav>
  <NavItem target="/">Etusivu</NavItem>
  <NavItem target="/categories">Kategoriat</NavItem>
  <NavItem target="/tags">Tagit</NavItem>
  <NavItem target="https://arkisto.klaanon.fi/soundtracks/">Soundtrackit</NavItem>
  <NavItem target="/search">Haku</NavItem>
  <NavItem target="/profile">Profiili</NavItem>
</nav>

<style lang="scss">
  nav {
    background: var(--main-nav-background);
    font-family: var(--nav-font-family);
    height: 3em;
    padding: 0;
    width: 100%;
    margin: 0;
    line-height: 2.5em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
