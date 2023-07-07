<script lang="ts">
  export let stagger: boolean = false;
</script>

<ul class="{stagger ? 'stagger' : null}">
  <slot />
</ul>

<style lang="scss">
  ul {
    max-width: var(--article-max-width);
    list-style: none;
    padding: 0 0 3rch;
    margin: 0;

    &.stagger {
      padding: 0 0 0 2em;
    }
  }
</style>
