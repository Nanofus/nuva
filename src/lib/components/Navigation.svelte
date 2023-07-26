<script lang="ts">
  import NavItem from "$lib/components/reusable/NavItem.svelte";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import { loginInfo, postOptions } from "$lib/util/stores";
  import type { AuthInfo } from "$lib/util/types";
  import { t } from "$lib/translations";

  let smallLogo: HTMLElement;
  let menuOpen = false;
  let stickyMenu = true;
  let bannerVisible = true;
  let userInfo: AuthInfo | null = null;

  const getTotalNavigationHeight = () => {
    return document.querySelector("header")?.offsetHeight || 0;
  };

  const isMobile = () => {
    const match = window.matchMedia("screen and (max-width: 54rem)");
    return match.matches;
  };

  const handleStickyMenu = () => {
    if (!browser) return;
    if ((stickyMenu && document.documentElement.scrollTop > getTotalNavigationHeight()) || isMobile() || !bannerVisible) {
      smallLogo.style.opacity = "1";
      smallLogo.style.pointerEvents = "auto";
    } else {
      smallLogo.style.opacity = "0";
      smallLogo.style.pointerEvents = "none";
    }
  };

  onMount(() => {
    if (browser) {
      handleStickyMenu();
      document.addEventListener("scroll", handleStickyMenu);
      window.addEventListener("resize", handleStickyMenu);
      postOptions.subscribe(options => {
        stickyMenu = options.stickyMenu;
        bannerVisible = options.bannerVisible;
      });
      loginInfo.subscribe(info => (userInfo = info));
    }
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener("scroll", handleStickyMenu);
      window.removeEventListener("resize", handleStickyMenu);
    }
  });

  const toggleMenu = () => menuOpen = !menuOpen;
  const menuClicked = () => menuOpen = false;
</script>

<nav class={stickyMenu ? "sticky" : ""}>
  <div class="nav-wrapper">
    <div class="section-logo-area">
      <div bind:this={smallLogo} class="section-logo">
        <NavItem href="/"><h1>{t.siteName}</h1></NavItem>
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
    <div class="section-menu-items {menuOpen ? 'menu-open' : ''}" on:click={menuClicked} on:keypress={menuClicked}
         role="button"
         tabindex="0">
      <NavItem href="/">{t.components.navigation.frontPage}</NavItem>
      <NavItem href="/posts">{t.components.navigation.posts}</NavItem>
      <NavItem href="/categories">{t.components.navigation.categories}</NavItem>
      <NavItem href="/tags">{t.components.navigation.tags}</NavItem>
      <NavItem href={t.components.navigation.guideUrl}>{t.components.navigation.guide}</NavItem>
      <NavItem href={t.components.navigation.soundtracksUrl}>{t.components.navigation.soundtracks}</NavItem>
      {#if userInfo}
        <NavItem href={t.components.navigation.writeUrl}>{t.components.navigation.write}</NavItem>
      {/if}
      <NavItem href="/profile">{userInfo ? t.components.navigation.profile : t.components.navigation.login}</NavItem>
      <NavItem href="/search">{t.components.navigation.search}</NavItem>
    </div>
    <div class="section-filler">
    </div>
  </div>
</nav>

<style lang="scss">
  nav {
    &.sticky {
      position: sticky;
    }

    top: 0;
    margin: auto;
    min-width: var(--page-min-width);
    width: 100%;
    z-index: 1;

    background: var(--main-nav-background);
    backdrop-filter: blur(var(--blur-intensity));
    -webkit-backdrop-filter: blur(var(--blur-intensity));
    font-family: var(--nav-font-family);
  }

  .nav-wrapper {
    margin: auto;
    max-width: var(--page-max-width);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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
    font-size: var(--navigation-logo-size);
    margin: 0 0.5rem;
    color: var(--text-dark);
    text-align: left;
  }

  .hamburger-menu {
    height: var(--navigation-height);
    color: var(--text-dark);
    user-select: none;

    > span {
      font-size: var(--mobile-icon-size);
      line-height: var(--navigation-height);
    }
  }

  @media screen and (max-width: 54rem) { // var(--compact-navigation-threshold)
    .nav-wrapper {
      display: block;
    }

    .section-menu-items, .section-filler {
      display: none;
    }

    .section-menu {
      display: block;
    }

    .nav-wrapper > .section-menu-items.menu-open {
      display: block;

      :global(> a) {
        padding-left: 1rem;
      }
    }
  }
</style>
