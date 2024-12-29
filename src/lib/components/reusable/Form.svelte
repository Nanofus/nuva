<script lang="ts">
  import { preventDefault } from 'svelte/legacy';

  import { createEventDispatcher } from 'svelte';

  interface Props {
    vertical?: boolean;
    children?: import('svelte').Snippet;
  }

  let { vertical = false, children }: Props = $props();

  const dispatch = createEventDispatcher();
</script>

<form
  class={vertical ? 'vertical' : ''}
  onsubmit={preventDefault(() => {
    dispatch('submit');
  })}
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
