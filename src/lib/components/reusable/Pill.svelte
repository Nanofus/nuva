<script lang="ts">
  import { onMount } from 'svelte';

  export let href: string | null = null;
  export let sizeByCount: number | boolean = false;

  let pill: HTMLElement;

  onMount(() => {
    if (!sizeByCount) return;
    pill.style.fontSize = `${(sizeByCount as number) * 0.01 + 0.8}rem`;
  });
</script>

<div bind:this={pill} class="pill">
  {#if href}
    <a {href}>
      <slot />
    </a>
  {:else}
    <slot />
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
