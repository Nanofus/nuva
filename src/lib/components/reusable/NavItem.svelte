<script lang="ts">
  interface Props {
    href?: string;
    children?: import('svelte').Snippet;
    onclick?: () => void;
    onkeydown?: () => void;
  }

  let { href = '', children, onclick, onkeydown }: Props = $props();
  let openInNewTab = $state(false);

  $effect(() => {
    href.indexOf('http') === 0 && (openInNewTab = true);
  });
</script>

{#if href}
  <a {href} target={openInNewTab ? '_blank' : ''} onclick={onclick}>
    {@render children?.()}
  </a>
{:else}
  <div role="button" onclick={onclick} onkeydown={onkeydown} tabindex="0">
    {@render children?.()}
  </div>
{/if}

<style lang="scss">
  div,
  a {
    display: block;
    line-height: var(--navigation-height);
    height: var(--navigation-height);
    padding: 0 0.5em;
    cursor: pointer;

    &:hover {
      background-color: var(--hover-transparent);
    }
  }

  a {
    transition: var(--unfocus-speed) ease-in-out;

    &:active,
    &:hover {
      color: var(--text-light);
      transition: 0s;
    }

    &:link,
    &:visited {
      color: var(--text-dark);
      text-decoration: none;
    }
  }
</style>
