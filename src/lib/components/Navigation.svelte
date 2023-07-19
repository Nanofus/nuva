<script lang="ts">
  import NavItem from "$lib/components/reusable/NavItem.svelte";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";

  let interval;
  let smallLogo;
  let menuItems;
  let menuOpen = false;

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

  const toggleMenu = () => menuOpen = !menuOpen;
  const menuClicked = () => menuOpen = false;
</script>

<nav>
  <div class="section-logo-area">
    <div bind:this={smallLogo} class="section-logo">
      <NavItem href="/"><h1>Klaanon</h1></NavItem>
    </div>
    <div class="section-menu">
      <NavItem on:click={toggleMenu}>
        <div class="hamburger-menu">
          {#if !menuOpen}
            <span class="material-icons">menu</span>
          {:else}
            <span class="material-icons">close</span>
          {/if}
        </div>
      </NavItem>
    </div>
  </div>
  <div bind:this={menuItems} class="section-menu-items {menuOpen ? 'menu-open' : ''}" on:click={menuClicked}>
    <NavItem href="/">Etusivu</NavItem>
    <NavItem href="/categories">Kategoriat</NavItem>
    <NavItem href="/tags">Tagit</NavItem>
    <NavItem href="/posts/muotoiluopas">Muotoiluopas</NavItem>
    <NavItem href="https://arkisto.klaanon.fi/soundtracks/">Soundtrackit</NavItem>
    <NavItem href="/profile">Profiili</NavItem>
    <NavItem href="/search">Haku</NavItem>
  </div>
  <div class="section-filler">
  </div>
</nav>

<style lang="scss">
  nav {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: auto;
    min-width: var(--page-min-width);
    width: 100%;
    max-width: var(--page-max-width);;
    z-index: 1;

    background: var(--main-nav-background);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    font-family: var(--nav-font-family);

    display: flex;
    justify-content: center;
    flex-wrap: wrap
  }

  .section-logo-area {
    flex: 1;
    display: flex;
    justify-content: space-between;

    .section-logo {
      opacity: 0;
      transition: var(--unfocus-speed) ease-in-out;
    }
  }

  .section-menu-items {
    flex: 0 0 auto;
    display: flex;
  }

  .section-filler {
    flex: 1;
  }

  .section-menu {
    display: none;
    text-align: right;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0 1rem;
    color: var(--main-nav-color);
    text-align: left;
  }

  .hamburger-menu {
    color: var(--text-dark);
    user-select: none;

    > span {
      line-height: var(--navigation-height);
    }
  }

  @media screen and (max-width: 50rem) { // TODO: Fix hardcoded value, media queries don't support calc() or var()
    nav {
      display: block;
    }

    .section-menu-items, .section-filler {
      display: none;
    }

    .section-menu {
      display: block;
    }

    nav > .section-menu-items.menu-open {
      display: block;
    }
  }
</style>
