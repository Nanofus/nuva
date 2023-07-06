<script lang="ts">
  export let icon: string | null = null;

  let button;

  if (icon && button) {
    button.setAttribute('data-content', icon);
  }
</script>

<button bind:this={button} on:click>
  <slot />
</button>

<style lang="scss">
  button {
    &:hover {
      cursor: pointer;
    }

    background: #000;
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 0;

    &:before {
      content: attr(data-content);
      position: relative;
      font: normal 1rem/1 "Genericons-Neue";
      top: 0.1rem;
      margin-right: 0.1rem;
    }
  }
</style>
