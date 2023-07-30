<script lang="ts">
  export let stagger: boolean = false;
</script>

<ul class={stagger ? "stagger" : null}>
  <slot />
</ul>

<style lang="scss">
  ul {
    max-width: var(--article-max-width);
    list-style: none;
    padding: 0 0 2rem;
    margin: 0;

    &.stagger {
      padding: 0 0 0 1.5rem;
    }
  }
</style>
