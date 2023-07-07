<script lang="ts">
  export let icon: string | null = null;

  let button;

  if (icon && button) {
    button.setAttribute("data-content", icon);
  }
</script>

<button bind:this={button} on:click>
  <slot />
</button>

<style lang="scss">
  button {
    align-self: center;
    width: fit-content;
    transition: 0.2s ease-in-out;
    background: var(--accent-dark);
    color: var(--main-nav-color);
    padding: 0.3rem 0.5rem;
    border-radius: 0.5rem;
    border: 0;
    font-family: var(--body-text-font-family);
    font-size: 1rem;

    &:hover {
      cursor: pointer;
      background: var(--accent-light);
      transition: 0s;
    }

    &:before {
      content: attr(data-content);
      position: relative;
      font: normal 1rem/1 "Genericons-Neue";
      top: 0.1rem;
      margin-right: 0.1rem;
    }
  }
</style>
