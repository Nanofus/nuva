<!--
@component
This component simply enables submitting forms by pressing Enter.
The form container should implement its own submission functionality.
-->
<script lang="ts">
  export let vertical: boolean = false;
</script>

<form class="{vertical ? 'vertical' : null}" on:submit|preventDefault={() => {}}>
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