<script lang="ts">
</script>

<button on:click>
  <slot />
</button>

<style lang="scss">
  button {
    background: #000;
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 0px;
  }
</style>
