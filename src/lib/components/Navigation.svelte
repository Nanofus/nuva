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
  <NavItem><Search /></NavItem>
  <NavItem><Login /></NavItem>
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
  }
</style>
