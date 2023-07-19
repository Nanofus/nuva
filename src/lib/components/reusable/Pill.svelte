<script lang="ts">
  import { onMount } from "svelte";

  export let href = null;
  export let sizeByCount: number | boolean = false;

  let pill;

  onMount(() => {
    if (!sizeByCount) return;
    // Base font size on sizeByCount logarithmically
    pill.style.fontSize = `${sizeByCount as number * 0.01 + 0.8}em`;
  });
</script>

<div bind:this={pill} class="pill">
  {#if href}
    <a {href} class="tag">
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
    font-size: 0.8em;
    font-weight: 700;
    line-height: 1.2727272727;
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