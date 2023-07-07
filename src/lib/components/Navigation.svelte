<script lang="ts">
  import Search from "$lib/components/Search.svelte";
  import Login from "$lib/components/Login.svelte";
  import NavItem from "$lib/components/reusable/NavItem.svelte";
</script>

<nav>
  <NavItem target="/">Etusivu</NavItem>
  <NavItem target="/categories">Kategoriat</NavItem>
  <NavItem target="/tags">Tagit</NavItem>
  <NavItem target="/posts/muotoiluohje">Muotoilu</NavItem>
  <NavItem target="https://arkisto.klaanon.fi/soundtracks/">Soundtrackit</NavItem>
  <NavItem target="/profile">Profiili</NavItem>
  <NavItem target="/search">Haku</NavItem>
</nav>

<style lang="scss">
  nav {
    background: var(--main-nav-background);
    font-family: var(--nav-font-family);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
