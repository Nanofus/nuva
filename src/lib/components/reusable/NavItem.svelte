<script lang="ts">
  export let href = "";
  let openInNewTab = false;

  $: href.indexOf("http") === 0 && (openInNewTab = true);
</script>

{#if href}
  <a {href} target={openInNewTab ? "_blank" : null}>
    <slot />
  </a>
{:else}
  <div>
    <slot />
  </div>
{/if}

<style lang="scss">
  div, a {
    line-height: 3rem;
    padding: 0 0.5em;
  }

  a {
    transition: var(--unfocus-speed) ease-in-out;

    &:active, &:hover {
      color: var(--text-light);
      background-color: var(--hover-light);
      transition: 0s;
    }

    &:link, &:visited {
      color: var(--main-nav-color);
      text-decoration: none;
    }
  }
</style>