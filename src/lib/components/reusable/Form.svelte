<script lang="ts">
  interface Props {
    vertical?: boolean;
    children?: import('svelte').Snippet;
    onsubmit?: (e: Event) => void;
  }

  let { vertical = false, children, onsubmit }: Props = $props();
</script>

<form class={vertical ? 'vertical' : ''} {onsubmit}>
  {@render children?.()}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
</style>
