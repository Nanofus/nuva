<script lang="ts">
  interface Props {
    vertical?: boolean;
    children?: import('svelte').Snippet;
    onsubmit?: (e: Event) => void;
  }

  let { vertical = false, children, onsubmit }: Props = $props();
</script>

<form
  class={vertical ? 'vertical' : ''}
  onsubmit={onsubmit}
>
  {@render children?.()}
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
