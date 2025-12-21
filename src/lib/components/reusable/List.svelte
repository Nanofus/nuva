<script lang="ts">
  interface Props {
    stagger?: boolean;
    children?: import('svelte').Snippet;
  }

  let { stagger = false, children }: Props = $props();
</script>

<ul class={stagger ? 'stagger' : ''}>
  {@render children?.()}
</ul>

<style>
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
