<button on:click>
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
  }
</style>
