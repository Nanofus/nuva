<script lang="ts">
</script>

<!--
@component
This component simply enables submitting forms by pressing Enter.
The form container should implement its own submission functionality.
-->
<form on:submit|preventDefault={() => {}}>
  <slot />
</form>

<style lang="scss">
</style>
