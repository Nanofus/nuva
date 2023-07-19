<script lang="ts">
  import NavItem from "$lib/components/reusable/NavItem.svelte";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";

  let interval;
  let smallLogo;

  const getTotalNavigationHeight = () => {
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");
    return nav.offsetHeight + header.offsetHeight;
  };

  onMount(() => {
    if (browser) {
      interval = setInterval(() => {
          if (document.documentElement.scrollTop > getTotalNavigationHeight()) {
            smallLogo.style.opacity = "1";
            smallLogo.style.pointerEvents = "auto";
          } else {
            smallLogo.style.opacity = "0";
            smallLogo.style.pointerEvents = "none";
          }
        }
        , 100);
    }
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<nav>
  <a tabindex="-1" bind:this={smallLogo} href="/"><h1>Klaanon</h1></a>
  <NavItem href="/">Etusivu</NavItem>
  <NavItem href="/categories">Kategoriat</NavItem>
  <NavItem href="/tags">Tagit</NavItem>
  <NavItem href="/posts/muotoiluopas">Muotoiluopas</NavItem>
  <NavItem href="https://arkisto.klaanon.fi/soundtracks/">Soundtrackit</NavItem>
  <NavItem href="/profile">Profiili</NavItem>
  <NavItem href="/search">Haku</NavItem>
</nav>

<style lang="scss">
  nav {
    position: sticky;
    top: 0;
    margin: auto;
    min-width: var(--page-min-width);
    width: 100%;
    max-width: var(--page-max-width);
    height: var(--navigation-height);
    background: var(--main-nav-background);
    backdrop-filter: blur(10px);
    font-family: var(--nav-font-family);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    z-index: 1;

    > a {
      line-height: var(--navigation-height);
      color: var(--text-light);
      transition: var(--unfocus-speed) ease-in-out;
      position: absolute;
      left: 0;

      &:hover {
        background-color: var(--hover-light);
        text-decoration: none;
      }

      > h1 {
        font-size: 1.25rem;
        margin: 0 1rem;
        color: var(--main-nav-color);
      }
    }
  }

  @media screen and (max-width: 50rem) { // TODO: Fix hardcoded value
    nav {
      height: calc(2 * var(--navigation-height));
    }
  }

  @media screen and (max-width: 41rem) { // TODO: Fix hardcoded value, media queries don't support calc() or var()
    nav {
      justify-content: space-evenly;
    }
  }
</style>
