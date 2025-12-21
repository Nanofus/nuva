<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="settings-wrapper editor-wrapper">
  {@render children?.()}
</div>

<style>
  .settings-wrapper {
    width: 100%;
    max-width: var(--article-max-width);

    :global(> *) {
      border-top: var(--subtle-border);
    }

    :global(> *:last-child) {
      border-bottom: var(--subtle-border);
    }
  }
</style>
