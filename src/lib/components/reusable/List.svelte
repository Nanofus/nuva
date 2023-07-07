<script lang="ts">
  export let table: boolean = false;
</script>

<ul>
  <slot />
</ul>

<style lang="scss">
  ul {
    max-width: var(--article-text-width);
    list-style: none;
    padding: 0 0 0 2em;
    margin: 0;
  }
</style>
