<script lang="ts">
  export let target = "";
</script>

{#if target}
  <a href={target}>
    <slot />
  </a>
{:else}
  <div>
    <slot />
  </div>
{/if}

<style lang="scss">
  div, a {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding: 0.25em;

    &:active, &:hover {
      color: var(--text-light);
      background-color: var(--hover-light);
    }

    &:link, &:visited {
      color: var(--main-nav-color);
      text-decoration: none;
    }
  }
</style>