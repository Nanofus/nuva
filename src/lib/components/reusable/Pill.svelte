<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    href?: string | null;
    sizeByCount?: number | boolean;
    children?: import('svelte').Snippet;
  }

  let { href = null, sizeByCount = false, children }: Props = $props();

  let pill: HTMLElement = $state();

  onMount(() => {
    if (!sizeByCount) return;
    pill.style.fontSize = `${(sizeByCount as number) * 0.01 + 0.8}rem`;
  });
</script>

<div bind:this={pill} class="pill">
  {#if href}
    <a {href}>
      {@render children?.()}
    </a>
  {:else}
    {@render children?.()}
  {/if}
</div>

<style lang="scss">
  div.pill {
    display: inline-block;
    background: rgba(0, 0, 0, 0.1);
    margin: 0.25rem;
    position: relative;
    border-radius: var(--border-radius);
    font-size: 0.8rem;
    font-weight: bold;
    line-height: 1.2;
    font-family: var(--accent-font-family);
    text-transform: uppercase;

    a {
      display: block;
      text-decoration: none;
      padding: 0.25rem 0.5rem;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
  }
</style>
