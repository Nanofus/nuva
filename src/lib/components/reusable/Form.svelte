<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let vertical: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<form class="{vertical ? 'vertical' : null}" on:submit|preventDefault={() => {dispatch("submit")}}>
  <slot />
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    &.vertical {
      > :not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
</style>