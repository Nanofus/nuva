<script lang="ts">
  import { onMount } from "svelte";

  export let icon: string | null = null;

  let button;
</script>

<button bind:this={button} on:click>
  {#if icon}
    <span class="icon material-icons">{icon}</span>
  {/if}
  <slot />
</button>

<style lang="scss">
  button {
    align-self: center;
    width: fit-content;
    transition: var(--unfocus-speed) ease-in-out;
    background: var(--accent-dark);
    color: var(--main-nav-color);
    padding: 0.3rem 0.5rem;
    border-radius: var(--border-radius);
    border: 0;
    font-family: var(--body-text-font-family);
    font-size: 1rem;

    > * {
      user-select: none;
    }

    .icon {
      display: inline-block;
      font-size: 1rem;
      position: relative;
      top: 0.1rem;
    }

    &:hover {
      cursor: pointer;
      background: var(--accent-light);
      transition: 0s;
    }
  }
</style>
